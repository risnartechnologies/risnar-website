import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const messages =
      await db.message.findMany({
        include: {
          contact: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 15,
      });

    return NextResponse.json(
      messages.map((message) => ({
        id: message.id,
        name:
          message.contact.name ??
          "Unknown",
        phone: message.contact.phone,
        body: message.body ?? "",
        direction:
          message.direction,
        time:
          message.createdAt,
      }))
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}