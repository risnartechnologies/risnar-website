import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

/**
 * GET /api/conversations
 *
 * IMPORTANT:
 * The Inbox is a LEAD inbox.
 *
 * A conversation is returned ONLY when the contact has
 * sent at least one INBOUND message.
 *
 * Therefore:
 *
 * - Contact who only received our marketing message → HIDDEN
 * - Contact who has never replied → HIDDEN
 * - Contact who replied at least once → SHOWN
 *
 * Once a contact becomes a lead, their conversation remains
 * visible and the latest message (inbound or outbound) is
 * used for the Inbox preview.
 */
export async function GET() {
  try {
    const conversations =
      await db.conversation.findMany({
        /*
         * =====================================================
         * LEAD-ONLY FILTER
         * =====================================================
         *
         * This is the critical condition.
         *
         * The conversation MUST contain at least one
         * message sent FROM the customer TO us.
         */
        where: {
          messages: {
            some: {
              direction: "INBOUND",
            },
          },
        },

        include: {
          /*
           * Contact information for the Inbox.
           */
          contact: true,

          /*
           * Get the latest message of the conversation,
           * regardless of direction.
           *
           * This means that once somebody is a lead, the
           * Inbox preview can correctly show their latest
           * inbound OR outbound message.
           */
          messages: {
            orderBy: {
              createdAt: "desc",
            },

            take: 1,
          },
        },
      });

    /*
     * =====================================================
     * SORT BY LATEST MESSAGE
     * =====================================================
     *
     * Newest lead activity appears at the top.
     */
    conversations.sort((a, b) => {
      const aTime =
        a.messages[0]?.createdAt?.getTime() ?? 0;

      const bTime =
        b.messages[0]?.createdAt?.getTime() ?? 0;

      return bTime - aTime;
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

/**
 * POST /api/conversations
 *
 * Creates a conversation for a contact.
 *
 * NOTE:
 * Creating a conversation does NOT make the contact
 * appear in the Inbox.
 *
 * The GET endpoint above will only return it after
 * the contact has actually sent an INBOUND message.
 */
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