import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { token, newPassword } = await request.json();

    if (!token || !newPassword)
      return customErrorResponse("Missing required fields", 400);

    let decoded: any;

    try {
      decoded = jwt.verify(token, env.JWT_SECRET!);
    } catch (err) {
      return customErrorResponse("Invalid or expired token", 400);
    }

    const user = await User.findById(decoded.id);

    if (!user) return customErrorResponse("User not found", 404);

    if (
      user.resetPasswordToken !== token ||
      user.resetPasswordExpires < Date.now()
    ) {
      return customErrorResponse("Invalid or expired token", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("error...", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
