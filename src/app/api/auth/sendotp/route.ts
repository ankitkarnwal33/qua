// import { query } from "@/lib/db";
import { sendOtp } from "@/lib/sendOtp";
import { findUserByPhone } from "@/lib/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { mobile } = await request.json();
  // Get the user from the table

  try {
    const user = await findUserByPhone(mobile);
    sendOtp(mobile, user?.email);
    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json(
          { status: "failed", message: error.message },
          { status: 404 }
        )
      : NextResponse.json(
          {
            status: "failed",
            message: "Cannot send the otp. Try again after sometime.",
          },
          { status: 404 }
        );
  }
}
