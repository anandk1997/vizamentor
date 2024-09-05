import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { checkAuth } from "../sessions";

export async function GET(request: Request) {
  try {
    await checkAuth(request);

    await dbConnect();

    const orders = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orderDetails",
        },
      },

      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          phone: 1,
          address: 1,

          orderDetails: {
            paymentStatus: 1,
            productId: 1,
            amount: 1,
          },
        },
      },
    ]);

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
