import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const conversations =
      await db.conversation.findMany({
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

    return NextResponse.json(
      conversations,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/conversations failed"
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load conversations.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const conversation =
      await db.conversation.create({
        data: {
          contactId:
            body.contactId,
        },

        include: {
          contact: true,
        },
      });

    return NextResponse.json(
      conversation,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/conversations failed"
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create conversation.",
      },
      {
        status: 500,
      }
    );
  }
}