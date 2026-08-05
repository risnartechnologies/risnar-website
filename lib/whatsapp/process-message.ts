import { db } from "@/lib/prisma/db";
import { MetaWebhook } from "./types";

export async function processMessage(
  payload: MetaWebhook
) {
  const change =
    payload.entry?.[0]?.changes?.[0];

  if (!change) return;

  const contactData =
    change.value.contacts?.[0];

  const messageData =
    change.value.messages?.[0];

  if (!contactData || !messageData) {
    return;
  }

  let contact =
    await db.contact.findUnique({
      where: {
        phone: contactData.wa_id,
      },
    });

  if (!contact) {
    contact = await db.contact.create({
      data: {
        name:
          contactData.profile.name,
        phone:
          contactData.wa_id,
      },
    });
  }

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
}