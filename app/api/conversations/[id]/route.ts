import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const conversation = await db.conversation.findUnique({
    where: {
      id,
    },
    include: {
      contact: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return NextResponse.json(conversation);
}