import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function DELETE(
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

  await db.message.deleteMany({
    where: {
      conversationId: id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}