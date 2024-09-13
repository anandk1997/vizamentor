import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { checkAuth, logout } from "../sessions";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  try {
    const tokenValidation: any = await checkAuth(request);
    if (!tokenValidation.success) return tokenValidation;

    await logout();

    revalidatePath(request.url);
    return NextResponse.json({ message: "Logout Success" }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
