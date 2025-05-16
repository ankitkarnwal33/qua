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
    await query(`UPDATE transactions SET status = "completed" WHERE id = ?`, [
      id,
    ]);

    // 2. Update user’s payouts
    const table = user_type === "individual" ? "individuals" : "partners";
    await query(
      `UPDATE ${table} SET incentive = incentive - ?, total_paid_out = total_paid_out + ?, amount_processing = amount_processing - ? WHERE user_id = ? AND incentive >= ?`,
      [+amount, +amount, +amount, user_id, +amount]
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
