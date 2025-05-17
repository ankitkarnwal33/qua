/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/transactions/complete/route.ts
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log(id);
    if (!id) {
      return NextResponse.json(
        { error: "Missing or invalid fields in request body." },
        { status: 400 }
      );
    }
    console.log("Req");
    await query(`DELETE  FROM clients WHERE id = ?`, [id]);

    return NextResponse.json({ success: true });
  } catch (_Error) {
    // console.error("Cannot delete the lead:", _Error);
    return NextResponse.json(
      { message: "Cannot delete the lead." },
      { status: 500 }
    );
  }
}
