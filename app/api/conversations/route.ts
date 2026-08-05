import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  const conversations = await db.conversation.findMany({
    include: {
      contact: true,
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const body = await request.json();

  const conversation = await db.conversation.create({
    data: {
      contactId: body.contactId,
    },
    include: {
      contact: true,
    },
  });

  return NextResponse.json(conversation);
}