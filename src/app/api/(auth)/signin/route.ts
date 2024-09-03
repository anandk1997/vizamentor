import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/database/database";
import User from "@/database/model/User";
import { customErrorResponse } from "@/lib/utils";
import { env } from "@/lib/env/intex";

export async function POST(request: Request, res: Response) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password)
      return customErrorResponse("Missing required fields", 400);

    const user = await User.findOne({ email });

    if (!user) return customErrorResponse("User not found", 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return customErrorResponse("Invalid password", 401);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      env.JWT_SECRET!,
      { expiresIn: "24h" },
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          token,
        },
      },
      { status: 200 },
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      // path: "/",
    });

    return response;
  } catch (error) {
    console.error("error...", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
