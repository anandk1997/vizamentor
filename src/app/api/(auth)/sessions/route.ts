import { customErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from ".";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "";

    if (!(await checkRateLimit(ip))) {
      return customErrorResponse(
        "Too many requests, Try again in 5 minutes",
        429,
      );
    }

    const session = await getSession();

    const data = {
      session: session?.session,
      id: session?.user?._id,
      name: session?.user?.name,
      email: session?.user?.email,
      phone: session?.user?.phone,
      address: session?.user?.address,
      role: session?.user?.role,
    };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
