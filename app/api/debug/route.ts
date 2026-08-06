import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const result = await db.$queryRawUnsafe(`
      SELECT
        current_database() AS database,
        current_schema() AS schema,
        inet_server_addr() AS server,
        version();
    `);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}