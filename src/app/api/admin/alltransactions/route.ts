/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/transactions/route.ts
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all rows from `transactions`
    const transactions: any = await query("SELECT * FROM transactions", []);

    const [rows]: any = await query(
      `
        SELECT
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) AS total_paid,
          SUM(CASE WHEN status = 'failed'    THEN amount ELSE 0 END) AS total_rejected,
          SUM(CASE WHEN status = 'pending'   THEN amount ELSE 0 END) AS total_pending
        FROM transactions
      `,
      []
    );
    console.log(rows);
    // return NextResponse.json(rows[0]);

    return NextResponse.json({ transactions, rows });
  } catch (err: unknown) {
    console.error("Error fetching transactions:", err);
    return NextResponse.json(
      { error: "Unable to load transactions." },
      { status: 500 }
    );
  }
}
