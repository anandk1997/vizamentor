import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";
import { dbConnect } from "@/database/database";
import Order from "@/database/model/Order";
import { checkRateLimit } from "@/lib/rateLimiter";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
) => {
  const keySecret = env.RAZORPAY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables.",
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "";

    if (!(await checkRateLimit(ip))) {
      return customErrorResponse(
        "Too many requests, Try again in 5 minutes",
        429,
      );
    }

    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 },
      );
    }

    await dbConnect();

    await Order.updateOne(
      { orderId: orderCreationId },
      { paymentStatus: "completed" },
      { upsert: true }, // Create a new record if it doesn't exist
    );

    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 },
    );
  } catch (error) {
    return customErrorResponse("Internal Server Error", 500);
  }
}
