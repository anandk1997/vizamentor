import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/database/model/User";
import { dbConnect } from "@/database/database";
import { customErrorResponse } from "@/lib/utils";
import { checkAuth } from "../../(auth)/sessions";

export async function PATCH(request: Request) {
  try {
    const tokenValidation: any = await checkAuth(request);

    if (!tokenValidation.success) return tokenValidation;

    await dbConnect();

    const { id, email, phone, address, oldPassword, newPassword } =
      await request.json();

    if (!id) {
      return customErrorResponse("User ID is required", 400);
    }

    const user = await User.findById(id);

    if (!user) {
      return customErrorResponse("User not found", 404);
    }

    const updates: any = {};

    if (email) {
      const existingUserByEmail = await User.findOne({ email });

      if (existingUserByEmail && existingUserByEmail._id.toString() !== id) {
        return customErrorResponse("Email already in use", 400);
      }

      updates.email = email;
    }

    if (newPassword) {
      if (!oldPassword) {
        return customErrorResponse(
          "Old password is required for changing password",
          400,
        );
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return customErrorResponse("Old password is incorrect", 400);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      updates.password = hashedPassword;
    }

    if (phone) {
      const existingUserByPhone = await User.findOne({ phone });

      if (existingUserByPhone && existingUserByPhone._id.toString() !== id) {
        return customErrorResponse("Phone already in use", 400);
      }

      updates.phone = phone;
    }

    if (address) updates.address = address;

    if (Object.keys(updates).length === 0) {
      return customErrorResponse("No fields to update", 400);
    }

    const update = await User.updateOne({ _id: id }, { $set: updates });

    return NextResponse.json(
      { message: "User details updated successfully", data: update },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);

    return customErrorResponse("Internal server error", 500);
  }
}
