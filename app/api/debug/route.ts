import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const columns = await db.$queryRawUnsafe(`
      SELECT
        table_schema,
        column_name
      FROM information_schema.columns
      WHERE table_name='Conversation'
      ORDER BY ordinal_position;
    `);

    return NextResponse.json(columns);
  } catch (error) {
    return NextResponse.json(error);
  }
}