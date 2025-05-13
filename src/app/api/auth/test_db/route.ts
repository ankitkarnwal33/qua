import { query } from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await query("SELECT * FROM users", []);
    return NextResponse.json(
      { status: "success", data: results },
      { status: 200 }
    );
  } catch (error) {
    console.log("error");
    return NextResponse.json({ status: "failed", error }, { status: 500 });
  }
}
