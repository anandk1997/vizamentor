import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getSession } from ".";

export async function GET() {
  try {
    const session = await getSession();

    const data = {
      session: session?.session,
      id: session?.user?._id,
      name: session?.user?.name,
      email: session?.user?.email,
      phone: session?.user?.phone,
      address: session?.user?.address,
      role: session?.user?.role,
    };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
