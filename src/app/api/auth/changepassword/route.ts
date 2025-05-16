// import { query } from "@/lib/db";
import { query } from "@/lib/db";
import { findUserByPhone } from "@/lib/userService";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { otp, password, password2, mobile } = await request.json();
  // Get the user from the table
  console.log(mobile);
  try {
    if (password !== password2) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please confirm the password.",
        },
        { status: 404 }
      );
    }
    const user = await findUserByPhone(mobile);
    console.log(user);
    if (!user) {
      throw new Error("Cannot change the password !");
    }

    if (otp !== user?.OTP) {
      throw new Error("Incorrect otp. Try again!");
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await query("UPDATE users SET password = ? WHERE phone = ?", [
      hashedPassword,
      mobile,
    ]);
    return NextResponse.json(
      { status: "Password has been changed." },
      { status: 200 }
    );
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
