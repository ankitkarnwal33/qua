/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const param = await context.params;
    const { id } = await param;
    const [userData]: any = await query(
      " SELECT u.user_type, u.phone, i.name  FROM users u LEFT JOIN individuals i ON u.id =user_id WHERE u.id = ? ",
      [id]
    );
    if (!userData)
      return NextResponse.json(
        { message: "Users are empty", userData },
        { status: 404 }
      );
    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json(
          { message: error.message || "Try again" },
          { status: 500 }
        )
      : NextResponse.json({ message: "Try again" }, { status: 500 });
  }
}
