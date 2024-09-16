import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { checkAuth } from "../(auth)/sessions";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET(request: Request) {
  try {
    const tokenValidation: any = await checkAuth(request);

    if (!tokenValidation.success) return tokenValidation;

    if (tokenValidation?.data?.user?.role !== "ADMIN") {
      return customErrorResponse("You are not authorized", 403);
    }

    const ip = request.headers.get("x-forwarded-for") || "";

    if (!(await checkRateLimit(ip))) {
      return customErrorResponse(
        "Too many requests, Try again in 5 minutes",
        429,
      );
    }

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
