import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
const today = new Date();

today.setHours(
  0,
  0,
  0,
  0
);

const [
  contacts,
  conversations,
  unread,
  campaigns,
  messages,
  messagesToday,
  newContactsToday,
  activeCampaigns,
] = await Promise.all([
      db.contact.count(),
      db.conversation.count(),
      db.conversation.count({
        where: {
          unreadCount: {
            gt: 0,
          },
        },
      }),
      db.campaign.count(),
db.message.count(),

db.message.count({
  where: {
    createdAt: {
      gte: today,
    },
  },
}),

db.contact.count({
  where: {
    createdAt: {
      gte: today,
    },
  },
}),

db.campaign.count({
  where: {
    status: {
      in: [
        "RUNNING",
        "SCHEDULED",
      ],
    },
  },
}),
]);

    const recentMessages =
      await db.message.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        include: {
          contact: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      });

    return NextResponse.json({
  contacts,
  conversations,
  unread,
  campaigns,
  messages,

  messagesToday,

  newContactsToday,

  activeCampaigns,
      recentMessages,
    });
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