import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/database/model/User";
import { dbConnect } from "@/database/database";
import { customErrorResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { name, email, password, phone, address } = await request.json();

    if (!name || !email || !password || !phone || !address) {
      return customErrorResponse("Missing required fields", 400);
    }

    const existingUser = await User.findOne({ email });
    const existingUser1 = await User.findOne({ phone });

    if (existingUser) return customErrorResponse("Email already in use", 400);
    if (existingUser1) return customErrorResponse("Phone already in use", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal server error", 500);
  }
}
