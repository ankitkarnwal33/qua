/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string; user_type: string } }
) {
  try {
    const param = await context.params;
    const { id, user_type } = await param;
    let userData: any = [];
    if (user_type === "individual") {
      userData = await query("SELECT * FROM individuals WHERE user_id = ?", [
        id,
      ]);
    }
    if (user_type === "partner") {
      userData = await query("SELECT * FROM partners WHERE user_id = ?", [id]);
    }

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
