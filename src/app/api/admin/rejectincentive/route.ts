/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/transactions/complete/route.ts
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, user_id, user_type, amount, status } = await request.json();

  if (
    !id ||
    !user_id ||
    !["individual", "partner"].includes(user_type) ||
    !amount ||
    !status
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields in request body." },
      { status: 400 }
    );
  }

  try {
    await query(`UPDATE transactions SET status = "failed" WHERE id = ?`, [id]);

    // 2. Update user’s payouts
    const table = user_type === "individual" ? "individuals" : "partners";
    await query(
      `UPDATE ${table} SET incentive = incentive + ?, amount_processing = amount_processing - ? WHERE user_id = ?`,
      [+amount, +amount, user_id]
    );

    return NextResponse.json({ success: true });
  } catch (_Error) {
    console.error("Error completing transaction:", _Error);
    return NextResponse.json(
      { message: "Failed to complete transaction." },
      { status: 500 }
    );
  }
}
