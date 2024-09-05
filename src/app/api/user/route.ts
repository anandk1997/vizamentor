import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, role, password } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 },
      );
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return NextResponse.json(
        { message: "Phone number already in use" },
        { status: 400 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      phone,
      address,
      role,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User Created Successfully", data: user },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating user:", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
