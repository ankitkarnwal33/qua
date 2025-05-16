import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await query(`SELECT * FROM testimonials`, []);
    console.log(data);
    if (data) {
      return NextResponse.json({ message: "success", data }, { status: 200 });
    }
    throw new Error("No reviews availabe.");
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json({ message: error.message }, { status: 500 })
      : NextResponse.json(
          { message: "Cannot fetch testimonials." },
          { status: 500 }
        );
  }
}

export async function POST(request: NextRequest) {
  const { review, author } = await request.json();
  try {
    await query(`Insert INTO testimonials (review, author) values (?, ?)`, [
      review,
      author,
    ]);

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json({ message: error.message }, { status: 500 })
      : NextResponse.json(
          { message: "Cannot add testimonials." },
          { status: 500 }
        );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    await query(`DELETE FROM testimonials where id=?`, [id]);

    return NextResponse.json({ message: "success" }, { status: 301 });
  } catch (error) {
    return error instanceof Error
      ? NextResponse.json({ message: error.message }, { status: 500 })
      : NextResponse.json(
          { message: "Cannot add testimonials." },
          { status: 500 }
        );
  }
}
