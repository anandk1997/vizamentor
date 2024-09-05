import { customErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getSession } from ".";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json({ data: session }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}
