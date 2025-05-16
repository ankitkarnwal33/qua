/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const [user]: any = await query("SELECT * FROM admin WHERE email = ?", [
    email,
  ]);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 404 }
    );
  }

  // const passwordMatch = await bcrypt.compare(password, user?.password);
  const passwordMatch = password === user?.password;
  if (!passwordMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  const token = jwt.sign(
    { email: user?.email, user_type: user?.role, id: user?.id },
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
