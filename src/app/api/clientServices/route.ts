/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@/components/RefferalForm";
import { query } from "@/lib/db";
import { saveClient } from "@/lib/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const client: Client = await req.json();
  try {
    const [user]: any = await query("SELECT * FROM clients WHERE phone = ?", [
      client.refPhone,
    ]);
    if (user) {
      throw new Error(
        `${client.refPhone} is already referred. Please use another mobile number.`
      );
    }
    console.log(client);
    const result = await saveClient(client);
    console.log(" user inserted is : ", result);
    if (result) {
      const superleapResponse = await fetch(
        "https://v1hooks.superleap.com/sT2CjN/sT2CjN_eVqdpZ3liuo9pcZOCcrP/",
        {
          method: "POST",
          body: JSON.stringify({
            name: client.refName,
            mobile: client.refPhone,
            email: client.refEmail,
            city: client.refCity,
            package: client.refPackage,
            message: client.refNotes,
            language: client.language,
            leadId: result,
            source: "quanutrition.in",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(superleapResponse);
      return NextResponse.json(
        {
          message: "Client has been referred .",
        },
        { status: 201 }
      );
    } else throw new Error(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message || "Something bad happened 😢",
        },
        { status: 500 }
      );
    }
  }
}
