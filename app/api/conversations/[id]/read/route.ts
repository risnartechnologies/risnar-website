import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  /**
   * Placeholder endpoint.
   *
   * The unread counter will be implemented after the
   * Prisma Client is regenerated with the new
   * Conversation.unreadCount field.
   *
   * For now we simply verify that the conversation
   * exists and return success so the rest of the
   * WhatsApp Inbox continues to work.
   */
  await db.conversation.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}