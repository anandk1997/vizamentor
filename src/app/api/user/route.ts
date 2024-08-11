import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function GET() {
  await dbConnect();

  const users = await User.find();

  return NextResponse.json({ message: "success", data: users });
}

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();

    const parsed = schema.safeParse(requestBody);

    if (!parsed.success) {
      return NextResponse.json(
        { message: `Validation Error: ${parsed.error.message}` },
        { status: 400 }
      );
    }

    const { name, email, phone, address, role, password } = parsed.data;

    // Connect to the database
    await dbConnect();

    // Check for existing user with the same email or phone
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return NextResponse.json(
        { message: "Phone number already in use" },
        { status: 400 }
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

    console.log("User created:", user);

    return NextResponse.json(
      { message: "User Created Successfully", data: user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating user:", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
