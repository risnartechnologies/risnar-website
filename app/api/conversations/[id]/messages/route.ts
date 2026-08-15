import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const messages =
      await db.message.findMany({
        where: {
          conversationId: id,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

console.log(
  "=== MESSAGES API DEBUG ===",
  {
    conversationId: id,
    count: messages.length,
    messages: messages.map((message) => ({
      id: message.id,
      direction: message.direction,
      type: message.type,
      body: message.body,
      metaMessageId: message.metaMessageId,
      status: message.status,
      createdAt: message.createdAt,
    })),
  }
);

return NextResponse.json(
  messages,
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(
      "GET /api/conversations/[id]/messages failed"
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load messages.",
      },
      {
        status: 500,
      }
    );
  }
}