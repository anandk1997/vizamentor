import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";

const key = new TextEncoder().encode(env.JWT_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return "Invalid Token";
  }
}

export const checkAuth = async (request: Request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return customErrorResponse("Authorization token is missing", 401);
  }

  const res = await decrypt(token);

  if (!res) {
    return customErrorResponse("Invalid or expired token", 401);
  }
};

export const logout = async () => {
  cookies().set("session", "", { expires: new Date(0) });
};

const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

export const createSession = async (user: any) => {
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
};

export async function getSession() {
  try {
    const session = cookies().get("session")?.value;

    if (!session) return null;
    const decryptedData = await decrypt(session);
    return { ...decryptedData, session };
  } catch (error) {
    await logout();
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = expires;

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
