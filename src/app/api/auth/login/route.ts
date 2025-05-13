import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  user_type: string;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user: User = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user?.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  console.log(user);
  const token = jwt.sign(
    { email: user.email, user_type: user.user_type, id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "4h" }
  );

  const response = NextResponse.json({ message: "Login successful", token });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
