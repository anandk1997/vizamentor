import { dbConnect } from "@/database/database";
import Order from "@/database/model/Order";
import { customErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return customErrorResponse("User ID is required", 400);

    await dbConnect();

    const orders = await Order.find({ userId, paymentStatus: "completed" });

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
