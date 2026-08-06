import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const contacts = await db.contact.findMany({
      include: {
        messages: true,
      },
      orderBy: {
        messages: {
          _count: "desc",
        },
      },
      take: 10,
    });

    return NextResponse.json(
      contacts.map((contact) => ({
        id: contact.id,
        name: contact.name ?? "Unknown",
        phone: contact.phone,
        messages: contact.messages.length,
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