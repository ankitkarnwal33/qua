// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const data = await query("SELECT * FROM clients", []);

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
