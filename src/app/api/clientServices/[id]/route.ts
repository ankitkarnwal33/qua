// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const par = await context.params;
  const userId = await par.id;
  try {
    const users = await query("SELECT * FROM clients WHERE referrer_id=?", [
      userId,
    ]);

    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(userId);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
