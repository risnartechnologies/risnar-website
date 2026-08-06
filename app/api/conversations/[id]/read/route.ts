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

  await db.conversation.update({
    where: {
      id,
    },
    data: {
      unreadCount: 0,
    },
  });

  return NextResponse.json({
    success: true,
  });
}