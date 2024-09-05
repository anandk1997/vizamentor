import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { checkAuth, logout } from "../sessions";

export async function GET(request: Request) {
  try {
    const tokenValidation: any = await checkAuth(request);

    if (!tokenValidation.success) return tokenValidation;

    await logout();

    // const url = new URL(request.url);
    // const userId = url.searchParams.get("userId");

    // if (!userId) return customErrorResponse("User ID is required", 400);

    // await dbConnect();

    // const orders = await Order.find({ userId, paymentStatus: "completed" });

    return NextResponse.json({ message: "Logout Success" }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
