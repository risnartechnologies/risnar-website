import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const conversations =
      await db.conversation.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
        include: {
          contact: {
            select: {
              name: true,
              phone: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              body: true,
              createdAt: true,
              direction: true,
            },
          },
        },
      });

    return NextResponse.json(
      conversations
    );
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