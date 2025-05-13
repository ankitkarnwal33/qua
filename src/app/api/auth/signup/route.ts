import { findUserByEmail, saveUser } from "@/lib/userService";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type User = {
  email: string;
  password: string;
  user_type: string;
  phone: string;
  name: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      user_type = "individual",
      phone,
      name,
    }: User = await req.json();

    if (await findUserByEmail(email)) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await saveUser({ email, hashedPassword, user_type, phone, name });

    const token = jwt.sign({ email, user_type }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "Signup successful", data: email },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      const response = NextResponse.json(
        { status: "failed", message: error.message },
        { status: 201 }
      );
      return response;
    } else {
      return NextResponse.json(
        { status: "failed", message: "Something bad happened." },
        { status: 500 }
      );
    }
  }
}
