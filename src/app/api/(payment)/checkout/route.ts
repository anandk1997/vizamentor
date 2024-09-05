import { dbConnect } from "@/database/database";
import Order from "@/database/model/Order";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_ID!,
  key_secret: env.RAZORPAY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, userId, productId } = (await request.json()) as {
      amount: string;
      userId: string;
      productId: string;
    };

    const options = {
      amount: parseFloat(amount) * 100,
      currency: "INR",
      receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);

    await dbConnect();

    await Order.create({
      orderId: order.id,
      amount: amount,
      currency: "INR",
      userId,
      productId,
      paymentStatus: "pending",
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
