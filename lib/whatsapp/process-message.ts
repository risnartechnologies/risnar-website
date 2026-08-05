import { db } from "@/lib/prisma/db";
import { MetaWebhook } from "./types";

/**
 * Processes incoming WhatsApp Cloud API webhook messages.
 *
 * Features:
 * - Creates contact automatically if it doesn't exist.
 * - Creates one conversation per contact.
 * - Prevents duplicate messages using Meta Message ID.
 * - Ignores non-message webhook events (statuses, delivery receipts, etc.).
 * - Safely handles missing optional fields.
 */
export async function processMessage(
  payload: MetaWebhook
) {
  try {
    // ------------------------------------------------------------
    // Extract webhook change
    // ------------------------------------------------------------
    const change =
      payload.entry?.[0]?.changes?.[0];

    if (!change) {
      return;
    }

    // ------------------------------------------------------------
    // Ignore webhook events that don't contain messages
    // (delivery receipts, read receipts, statuses, etc.)
    // ------------------------------------------------------------
    const contactData =
      change.value.contacts?.[0];

    const messageData =
      change.value.messages?.[0];

    if (!contactData || !messageData) {
      return;
    }

    // ------------------------------------------------------------
    // Find or create contact
    // ------------------------------------------------------------
    let contact =
      await db.contact.findUnique({
        where: {
          phone: contactData.wa_id,
        },
      });

    if (!contact) {
      contact =
        await db.contact.create({
          data: {
            name:
              contactData.profile
                ?.name ?? "Unknown",

            phone:
              contactData.wa_id,
          },
        });
    }

    // ------------------------------------------------------------
    // Find or create conversation
    // One conversation per contact.
    // ------------------------------------------------------------
    let conversation =
      await db.conversation.findUnique({
        where: {
          contactId: contact.id,
        },
      });

    if (!conversation) {
      conversation =
        await db.conversation.create({
          data: {
            contactId: contact.id,
          },
        });
    }

    // ------------------------------------------------------------
    // Prevent duplicate webhook inserts
    // Meta can resend webhook events.
    // ------------------------------------------------------------
    const existingMessage =
      await db.message.findUnique({
        where: {
          metaMessageId:
            messageData.id,
        },
      });

    if (existingMessage) {
      return;
    }

    // ------------------------------------------------------------
    // Save incoming message
    // ------------------------------------------------------------
    await db.message.create({
      data: {
        contactId: contact.id,

        conversationId:
          conversation.id,

        metaMessageId:
          messageData.id,

        direction:
          "INBOUND",

        type:
          "TEXT",

        body:
          messageData.text?.body ??
          "",

        status:
          "DELIVERED",
      },
    });

    console.log(
      "✅ Incoming WhatsApp message saved:",
      messageData.id
    );
  } catch (error) {
    console.error(
      "❌ processMessage() failed:",
      error
    );

    throw error;
  }
}