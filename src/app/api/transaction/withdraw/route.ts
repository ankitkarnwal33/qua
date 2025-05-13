import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, message, amount, upiId, id, user_type } = await request.json();
  try {
    // find the user and update the incentive.
    if (user_type === "individual") {
      await query(
        `UPDATE individuals
       SET 
         incentive = incentive - ?,
         amount_processing = amount_processing + ?
       WHERE user_id = ? AND incentive >= ?`,
        [amount, amount, id, amount]
      );
    }
    if (user_type === "partner") {
      await query(
        `UPDATE partners
       SET 
         incentive = incentive - ?,
         amount_processing = amount_processing + ?
       WHERE user_id = ? AND incentive >= ?`,
        [amount, amount, id, amount]
      );
    }
    await query(
      `INSERT INTO transactions (user_id, user_type, amount, description, upi_id, acc_holder_name) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_type, amount, message, upiId, name]
    );

    return NextResponse.json(
      { message: "Withdraw request recieved !" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { message: error.message || "Something went wrong" },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
