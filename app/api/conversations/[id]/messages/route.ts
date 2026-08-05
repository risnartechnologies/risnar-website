import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET({
  params,
}: RouteParams) {
  try {
    const { id } =
      await params;

    const messages =
      await db.message.findMany({
        where: {
          conversationId: id,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

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