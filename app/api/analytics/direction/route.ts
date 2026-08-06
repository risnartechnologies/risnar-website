import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const inbound =
      await db.message.count({
        where: {
          direction: "INBOUND",
        },
      });

    const outbound =
      await db.message.count({
        where: {
          direction: "OUTBOUND",
        },
      });

    return NextResponse.json([
      {
        name: "Incoming",
        value: inbound,
      },
      {
        name: "Outgoing",
        value: outbound,
      },
    ]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}