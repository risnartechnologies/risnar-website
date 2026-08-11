import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/prisma/db";
import { sendTextMessage } from "@/lib/whatsapp/whatsapp";

const requestSchema = z.object({
  phone: z.string().min(10),
  message: z.string().min(1).max(4096),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { phone, message } =
      requestSchema.parse(body);

    // --------------------------------
    // 1. Send message through Meta
    // --------------------------------

    const result =
      await sendTextMessage(
        phone,
        message
      );

    const metaMessageId =
      result?.messages?.[0]?.id ?? null;

    // --------------------------------
    // 2. Find the contact
    // --------------------------------

    const contact =
      await db.contact.findUnique({
        where: {
          phone,
        },
      });

    if (!contact) {
      throw new Error(
        `Contact not found for phone: ${phone}`
      );
    }

    // --------------------------------
    // 3. Get or create conversation
    // --------------------------------

    const conversation =
      await db.conversation.upsert({
        where: {
          contactId: contact.id,
        },
        update: {
          updatedAt: new Date(),
        },
        create: {
          contactId: contact.id,
        },
      });

    // --------------------------------
    // 4. Save OUTBOUND message
    // --------------------------------

    await db.message.create({
      data: {
        contactId: contact.id,

        conversationId:
          conversation.id,

        metaMessageId,

        direction: "OUTBOUND",

        type: "TEXT",

        body: message,

        status: "SENT",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "WHATSAPP SEND ERROR:"
    );

    console.error(
      error?.response?.status
    );

    console.error(
      JSON.stringify(
        error?.response?.data,
        null,
        2
      )
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.response?.data ||
          error?.message ||
          "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}