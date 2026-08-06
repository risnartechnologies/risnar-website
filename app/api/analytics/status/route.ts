import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const sent =
      await db.message.count({
        where: {
          status: "SENT",
        },
      });

    const delivered =
      await db.message.count({
        where: {
          status: "DELIVERED",
        },
      });

    const read =
      await db.message.count({
        where: {
          status: "READ",
        },
      });

    const failed =
      await db.message.count({
        where: {
          status: "FAILED",
        },
      });

    return NextResponse.json([
      {
        name: "Sent",
        value: sent,
      },
      {
        name: "Delivered",
        value: delivered,
      },
      {
        name: "Read",
        value: read,
      },
      {
        name: "Failed",
        value: failed,
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