import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const [
      contacts,
      conversations,
      messages,
      unreadConversations,
      campaigns,
      todayMessages,
    ] = await Promise.all([
      db.contact.count(),

      db.conversation.count(),

      db.message.count(),

      db.conversation.count({
        where: {
          unreadCount: {
            gt: 0,
          },
        },
      }),

      db.campaign.count(),

      db.message.count({
        where: {
          createdAt: {
            gte: new Date(
              new Date().setHours(
                0,
                0,
                0,
                0
              )
            ),
          },
        },
      }),
    ]);

    return NextResponse.json({
      contacts,
      conversations,
      messages,
      unreadConversations,
      campaigns,
      todayMessages,
    });
  } catch (error) {
    console.error(
      "GET /api/analytics/overview failed"
    );

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