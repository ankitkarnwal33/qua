// import { query } from "@/lib/db";
import { sendOtpSignup } from "@/lib/sendOtpSignup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { phone, name } = await request.json();

  try {
    const response = await sendOtpSignup(phone, name);
    if (response === "success")
      return NextResponse.json({ status: "success" }, { status: 200 });
    throw new Error(response || "Cannot send the otp.");
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
