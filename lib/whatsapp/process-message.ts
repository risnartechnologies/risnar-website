import { db } from "@/lib/prisma/db";
import { MetaWebhook } from "./types";

export async function processMessage(
  payload: MetaWebhook
) {
  console.log(
    "WhatsApp Webhook:",
    JSON.stringify(payload, null, 2)
  );

  try {
    const change =
      payload.entry?.[0]?.changes?.[0];

    if (!change) {
      console.log("No webhook change found.");
      return;
    }

    const contactData =
      change.value.contacts?.[0];

    const messageData =
      change.value.messages?.[0];

    if (!contactData || !messageData) {
      console.log(
        "Webhook does not contain an incoming message."
      );
      return;
    }

    console.log(
      "Finding contact:",
      contactData.wa_id
    );

    let contact =
      await db.contact.findUnique({
        where: {
          phone: contactData.wa_id,
        },
      });

    if (!contact) {
      console.log(
        "Creating new contact..."
      );

      contact =
        await db.contact.create({
          data: {
            name:
              contactData.profile?.name ??
              `+${contactData.wa_id}`,
            phone:
              contactData.wa_id,
          },
        });
    }

    console.log(
      "Contact ID:",
      contact.id
    );

    let conversation =
      await db.conversation.findUnique({
        where: {
          contactId: contact.id,
        },
      });

    if (!conversation) {
      console.log(
        "Creating conversation..."
      );

      conversation =
        await db.conversation.create({
          data: {
            contactId: contact.id,
          },
        });
    }

    console.log(
      "Conversation ID:",
      conversation.id
    );

    const existing =
      await db.message.findUnique({
        where: {
          metaMessageId:
            messageData.id,
        },
      });

    if (existing) {
      console.log(
        "Duplicate webhook ignored."
      );
      return;
    }

    console.log(
      "Saving message..."
    );

    try {
      const saved =
        await db.message.create({
          data: {
            contactId:
              contact.id,

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
        "Message saved:",
        saved.id
      );

      /**
       * Increment unread counter
       * for every inbound message.
       */
      await db.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          unreadCount: {
            increment: 1,
          },
        },
      });

      console.log(
        "Unread count incremented."
      );
    } catch (error) {
      console.error(
        "MESSAGE CREATE FAILED"
      );

      console.error(error);

      throw error;
    }
  } catch (error) {
    console.error(
      "processMessage() ERROR"
    );

    console.error(error);

    throw error;
  }
}