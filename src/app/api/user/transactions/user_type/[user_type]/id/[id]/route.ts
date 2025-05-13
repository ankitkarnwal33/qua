/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { id: string; user_type: string } }
) {
  const parameters = await context;
  const { id } = await parameters.params;
  try {
    let userData: any = [];
    userData = await query("SELECT * FROM transactions WHERE user_id = ?", [
      id,
    ]);
    if (!userData)
      return NextResponse.json(
        { message: "No transactions.", userData },
        { status: 404 }
      );
    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json(
          { message: error.message || "Try again" },
          { status: 500 }
        )
      : NextResponse.json({ message: "Try again" }, { status: 500 });
  }
}
