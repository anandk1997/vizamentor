import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { checkAuth, logout } from "../sessions";

export async function GET(request: Request) {
  try {
    const tokenValidation: any = await checkAuth(request);

    if (!tokenValidation.success) return tokenValidation;

    await logout();

    return NextResponse.json({ message: "Logout Success" }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
