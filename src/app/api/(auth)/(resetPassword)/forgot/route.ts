import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email } = await request.json();

    if (!email) return customErrorResponse("Email is required", 400);

    const user = await User.findOne({ email });

    if (!user) return customErrorResponse("User not found", 404);

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetUrl = `${env.CLIENT_URL}/reset?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",

      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: env.EMAIL_USER,
      to: user.email,

      subject: "Password Reset",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <p><a href="${resetUrl}">Reset Password</a></p>
             <p>This link will expire in 1 hour.</p>`,
    };

    const res = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset email sent", data: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("error...", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
