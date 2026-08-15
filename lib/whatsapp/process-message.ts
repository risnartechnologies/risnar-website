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
      console.log(
        "No webhook change found."
      );
      return;
    }

    const value = change.value;

    /*
     * =====================================================
     * HANDLE OUTBOUND MESSAGE STATUS
     * sent / delivered / read / failed
     * =====================================================
     */

    const statuses =
      value.statuses ?? [];

    if (statuses.length > 0) {
      for (const status of statuses) {
        console.log(
          "=== META STATUS WEBHOOK ===",
          JSON.stringify(
            status,
            null,
            2
          )
        );

        await processStatus(status);
      }
    }

    /*
     * =====================================================
     * HANDLE INBOUND CUSTOMER MESSAGE
     * =====================================================
     */

    const contactData =
      value.contacts?.[0];

    const messageData =
      value.messages?.[0];

    /*
     * A status webhook normally has no messages[].
     * We already processed the status above.
     */
    if (!contactData || !messageData) {
      if (statuses.length > 0) {
        console.log(
          "Status webhook processed."
        );
      } else {
        console.log(
          "Webhook does not contain an incoming message or status."
        );
      }

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
    "Creating new WhatsApp contact..."
  );

  contact =
    await db.contact.create({
      data: {
        name:
          contactData.profile?.name ??
          `+${contactData.wa_id}`,

        phone:
          contactData.wa_id,

        source: "WHATSAPP",
      },
    });
}

    console.log(
      "Contact ID:",
      contact.id
    );

    /*
     * =====================================================
     * GET OR CREATE CONVERSATION
     * =====================================================
     */

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

    /*
     * =====================================================
     * DUPLICATE MESSAGE CHECK
     * =====================================================
     */

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

    /*
     * =====================================================
     * SAVE INBOUND MESSAGE
     * =====================================================
     */

    console.log(
      "Saving inbound message..."
    );

    /*
 * =====================================================
 * EXTRACT INBOUND MESSAGE CONTENT
 * =====================================================
 *
 * Meta does not always send inbound messages through
 * messageData.text.
 *
 * Depending on the WhatsApp message type, the readable
 * content may be stored in:
 *
 *   text
 *   button
 *   interactive.button_reply
 *   interactive.list_reply
 *   image.caption
 *   video.caption
 *   document.caption
 *   location
 *   contacts
 *   reaction
 *
 * Never silently convert an unsupported message into
 * an empty string. Keeping a meaningful fallback makes
 * the CRM conversation understandable and makes future
 * debugging much easier.
 */

let messageBody = "";

switch (messageData.type) {
  case "text":
    messageBody =
      messageData.text?.body ?? "";
    break;

  case "button":
    messageBody =
      messageData.button?.text ??
      messageData.button?.payload ??
      "";
    break;

  case "interactive":
    messageBody =
      messageData.interactive?.button_reply
        ?.title ??
      messageData.interactive?.list_reply
        ?.title ??
      "";
    break;

  case "image":
    messageBody =
      messageData.image?.caption ??
      "[Image]";
    break;

  case "video":
    messageBody =
      messageData.video?.caption ??
      "[Video]";
    break;

  case "audio":
    messageBody = "[Audio]";
    break;

  case "document":
    messageBody =
      messageData.document?.caption ??
      messageData.document?.filename ??
      "[Document]";
    break;

  case "sticker":
    messageBody = "[Sticker]";
    break;

  case "location": {
    const location =
      messageData.location;

    if (location) {
      const locationParts = [
        location.name,
        location.address,
        location.latitude !== undefined &&
        location.longitude !== undefined
          ? `${location.latitude}, ${location.longitude}`
          : null,
      ].filter(Boolean);

      messageBody =
        locationParts.join(" • ") ||
        "[Location]";
    } else {
      messageBody = "[Location]";
    }

    break;
  }

  case "contacts": {
    const contactNames =
      messageData.contacts
        ?.map(
          (item) =>
            item.name?.formatted ??
            [
              item.name?.first_name,
              item.name?.last_name,
            ]
              .filter(Boolean)
              .join(" ")
        )
        .filter(Boolean);

    messageBody =
      contactNames &&
      contactNames.length > 0
        ? contactNames.join(", ")
        : "[Contact]";
    break;
  }

  case "reaction":
    messageBody =
      messageData.reaction?.emoji ??
      "[Reaction]";
    break;

  default:
    /*
     * Unknown/new Meta message type.
     *
     * Do not save an empty string because that makes
     * the CRM conversation appear as if the customer
     * sent nothing.
     */
    messageBody =
      `[${messageData.type || "MESSAGE"}]`;
    break;
}

console.log(
  "=== INBOUND MESSAGE CONTENT ===",
  {
    metaMessageId:
      messageData.id,

    type:
      messageData.type,

    body:
      messageBody,
  }
);

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
        messageBody,

      status:
        "DELIVERED",
    },
  });

    console.log(
      "Message saved:",
      saved.id
    );

    /*
     * =====================================================
     * INCREMENT UNREAD COUNT
     * =====================================================
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

    /*
     * =====================================================
     * MARK CAMPAIGN RECIPIENT AS RESPONDED
     * =====================================================
     *
     * A contact is counted as responded only once
     * for a campaign.
     */

    const campaignRecipient =
      await db.campaignRecipient.findFirst({
        where: {
          contactId: contact.id,

          sentAt: {
            not: null,
          },

          respondedAt: null,
        },

        orderBy: {
          sentAt: "desc",
        },
      });

    if (campaignRecipient) {
      console.log(
        "Campaign response detected:",
        {
          campaignId:
            campaignRecipient.campaignId,

          contactId:
            contact.id,

          messageId:
            messageData.id,
        }
      );

      await db.$transaction([
        db.campaignRecipient.update({
          where: {
            id:
              campaignRecipient.id,
          },

          data: {
            respondedAt:
              new Date(),
          },
        }),

        db.campaign.update({
          where: {
            id:
              campaignRecipient.campaignId,
          },

          data: {
            respondedCount: {
              increment: 1,
            },
          },
        }),
      ]);

      console.log(
        "Campaign responded count updated:",
        campaignRecipient.campaignId
      );
    } else {
      console.log(
        "No unanswered campaign recipient found for this contact."
      );
    }
  } catch (error) {
    console.error(
      "processMessage() ERROR"
    );

    console.error(error);

    throw error;
  }
}

/*
 * =========================================================
 * PROCESS META MESSAGE STATUS
 * =========================================================
 */

async function processStatus(
  status: {
    id: string;
    status: string;
    timestamp: string;
    recipient_id: string;
  }
) {
  console.log(
    "Processing WhatsApp status:",
    status
  );

  const metaMessageId =
    status.id;

  /*
   * Find the campaign recipient
   * using Meta's message ID.
   */

  const campaignRecipient =
    await db.campaignRecipient.findFirst({
      where: {
        metaMessageId,
      },
    });

  /*
   * The status may arrive before the
   * outbound Message record exists.
   * CampaignRecipient is therefore our
   * primary tracking record.
   */

  if (!campaignRecipient) {
    console.log(
      "No campaign recipient found for Meta message:",
      metaMessageId
    );

    /*
     * Still try to update the Message
     * record if one exists.
     */
    await updateMessageStatus(
      metaMessageId,
      status.status
    );

    return;
  }

  const currentStatus =
    campaignRecipient.status;

  const newStatus =
    normalizeStatus(status.status);

  if (!newStatus) {
    console.log(
      "Ignoring unknown Meta status:",
      status.status
    );

    return;
  }

  /*
   * Never allow an old webhook event to
   * move a message backwards.
   *
   * SENT < DELIVERED < READ
   *
   * FAILED is terminal unless we have
   * already received a later successful
   * delivery/read status.
   */

  if (
    shouldIgnoreStatus(
      currentStatus,
      newStatus
    )
  ) {
    console.log(
      "Ignoring status regression:",
      {
        currentStatus,
        newStatus,
        metaMessageId,
      }
    );

    return;
  }

  /*
   * Calculate campaign counter changes
   * from the previous recipient status.
   */

  const campaignUpdate: any = {};

  if (
    currentStatus !== "SENT" &&
    newStatus === "SENT"
  ) {
    campaignUpdate.sentCount = {
      increment: 1,
    };
  }

  if (
    currentStatus !== "DELIVERED" &&
    currentStatus !== "READ" &&
    newStatus === "DELIVERED"
  ) {
    campaignUpdate.deliveredCount = {
      increment: 1,
    };
  }

  if (
    currentStatus !== "READ" &&
    newStatus === "READ"
  ) {
    campaignUpdate.readCount = {
      increment: 1,
    };
  }

  if (
    currentStatus !== "FAILED" &&
    newStatus === "FAILED"
  ) {
    campaignUpdate.failedCount = {
      increment: 1,
    };
  }

  /*
   * Update timestamps according to status.
   */

  const recipientUpdate: any = {
    status: newStatus,
  };

  const eventTime =
    status.timestamp
      ? new Date(
          Number(status.timestamp) * 1000
        )
      : new Date();

  if (newStatus === "SENT") {
    recipientUpdate.sentAt =
      eventTime;
  }

  if (newStatus === "DELIVERED") {
    recipientUpdate.deliveredAt =
      eventTime;
  }

  if (newStatus === "READ") {
    recipientUpdate.readAt =
      eventTime;
  }

  if (newStatus === "FAILED") {
    recipientUpdate.failedAt =
      eventTime;
  }

  /*
   * Update campaign recipient + campaign
   * counters together.
   */

  const operations: any[] = [
    db.campaignRecipient.update({
      where: {
        id:
          campaignRecipient.id,
      },

      data: recipientUpdate,
    }),
  ];

  if (
    Object.keys(campaignUpdate).length > 0
  ) {
    operations.push(
      db.campaign.update({
        where: {
          id:
            campaignRecipient.campaignId,
        },

        data: campaignUpdate,
      })
    );
  }

  await db.$transaction(
    operations
  );

  /*
   * Also update the outbound Message
   * record if it already exists.
   */

  await updateMessageStatus(
    metaMessageId,
    newStatus
  );

  console.log(
    "Campaign status updated:",
    {
      campaignId:
        campaignRecipient.campaignId,

      contactId:
        campaignRecipient.contactId,

      metaMessageId,

      previousStatus:
        currentStatus,

      newStatus,
    }
  );
}

/*
 * =========================================================
 * NORMALIZE META STATUS
 * =========================================================
 */

function normalizeStatus(
  status: string
):
  | "SENT"
  | "DELIVERED"
  | "READ"
  | "FAILED"
  | null {
  switch (
    status.toLowerCase()
  ) {
    case "sent":
      return "SENT";

    case "delivered":
      return "DELIVERED";

    case "read":
      return "READ";

    case "failed":
      return "FAILED";

    default:
      return null;
  }
}

/*
 * =========================================================
 * PREVENT STATUS REGRESSION
 * =========================================================
 */

function shouldIgnoreStatus(
  currentStatus: string,
  newStatus:
    | "SENT"
    | "DELIVERED"
    | "READ"
    | "FAILED"
): boolean {
  const rank: Record<
    string,
    number
  > = {
    PENDING: 0,
    SENT: 1,
    DELIVERED: 2,
    READ: 3,
    FAILED: 4,
  };

  /*
   * If already READ, never move backwards.
   */

  if (
    currentStatus === "READ" &&
    newStatus !== "READ"
  ) {
    return true;
  }

  /*
   * A successful delivery/read event
   * should not be overwritten by FAILED.
   */

  if (
    newStatus === "FAILED" &&
    (
      currentStatus === "DELIVERED" ||
      currentStatus === "READ"
    )
  ) {
    return true;
  }

  /*
   * Ignore older lifecycle events.
   */

  if (
    rank[newStatus] <
    rank[currentStatus]
  ) {
    return true;
  }

  return false;
}

/*
 * =========================================================
 * UPDATE OUTBOUND MESSAGE STATUS
 * =========================================================
 */

async function updateMessageStatus(
  metaMessageId: string,
  status: string
) {
  const messageStatus =
    normalizeStatus(status);

  if (!messageStatus) {
    return;
  }

  const message =
    await db.message.findUnique({
      where: {
        metaMessageId,
      },
    });

  if (!message) {
    console.log(
      "Outbound message not found yet:",
      metaMessageId
    );

    return;
  }

  await db.message.update({
    where: {
      id: message.id,
    },

    data: {
      status: messageStatus,
    },
  });

  console.log(
    "Outbound message status updated:",
    {
      messageId:
        message.id,

      metaMessageId,

      status:
        messageStatus,
    }
  );
}