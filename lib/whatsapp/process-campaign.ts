import { db } from "@/lib/prisma/db";
import { sendTemplateMessage } from "@/lib/whatsapp/whatsapp";

const BATCH_SIZE = 10;

// ============================================================
// WORKFLOW
// ============================================================

export async function processCampaign(
  campaignId: string
) {
  "use workflow";

  console.log(
    "=== CAMPAIGN WORKFLOW STARTED ===",
    {
      campaignId,
    }
  );

  while (true) {
    // ---------------------------------------
    // GET NEXT BATCH OF PENDING RECIPIENTS
    // ---------------------------------------

    const recipientIds =
      await getPendingRecipientIds(
        campaignId,
        BATCH_SIZE
      );

    console.log(
      "=== CAMPAIGN BATCH ===",
      {
        campaignId,
        count: recipientIds.length,
      }
    );

    // ---------------------------------------
    // NO MORE RECIPIENTS
    // ---------------------------------------

    if (recipientIds.length === 0) {
      await completeCampaign(
        campaignId
      );

      console.log(
        "=== CAMPAIGN WORKFLOW COMPLETED ===",
        {
          campaignId,
        }
      );

      return {
        success: true,
        completed: true,
        campaignId,
      };
    }

    // ---------------------------------------
    // PROCESS RECIPIENTS IN PARALLEL
    //
    // Maximum 10 WhatsApp API requests
    // at a time.
    // ---------------------------------------

    await Promise.all(
      recipientIds.map(
        (recipientId) =>
          processCampaignRecipient(
            campaignId,
            recipientId
          )
      )
    );

    console.log(
      "=== CAMPAIGN BATCH PROCESSED ===",
      {
        campaignId,
        processed:
          recipientIds.length,
      }
    );

    // ---------------------------------------
    // LOOP
    //
    // Workflow will get the next batch.
    // ---------------------------------------
  }
}

// ============================================================
// STEP: GET PENDING RECIPIENT IDS
// ============================================================

async function getPendingRecipientIds(
  campaignId: string,
  batchSize: number
): Promise<string[]> {
  "use step";

  const campaign =
    await db.campaign.findUnique({
      where: {
        id: campaignId,
      },

      select: {
        status: true,
      },
    });

  if (!campaign) {
    throw new Error(
      "Campaign not found."
    );
  }

  if (
    campaign.status !== "RUNNING"
  ) {
    console.log(
      "Campaign is no longer running.",
      {
        campaignId,
        status: campaign.status,
      }
    );

    return [];
  }

  const recipients =
    await db.campaignRecipient.findMany({
      where: {
        campaignId,
        status: "PENDING",
      },

      orderBy: {
        id: "asc",
      },

      take: batchSize,

      select: {
        id: true,
      },
    });

  return recipients.map(
    (recipient) => recipient.id
  );
}

// ============================================================
// STEP: PROCESS ONE RECIPIENT
// ============================================================

// ============================================================
// STEP: PROCESS ONE RECIPIENT
// ============================================================

async function processCampaignRecipient(
  campaignId: string,
  recipientId: string
) {
  "use step";

  const recipient =
    await db.campaignRecipient.findUnique({
      where: {
        id: recipientId,
      },

      include: {
        contact: true,
        campaign: true,
      },
    });

  if (!recipient) {
    console.log(
      "Recipient no longer exists.",
      {
        recipientId,
      }
    );

    return;
  }

  // ---------------------------------------
  // SAFETY CHECK
  //
  // Another workflow execution may have
  // already processed this recipient.
  // ---------------------------------------

  if (
    recipient.status !== "PENDING"
  ) {
    console.log(
      "Recipient already processed.",
      {
        campaignId,
        recipientId,
        status:
          recipient.status,
      }
    );

    return;
  }

  const contact =
    recipient.contact;

  const campaign =
    recipient.campaign;

  /*
   * Keep track of the CRM outbound Message
   * created before sending to Meta.
   *
   * This is important because Meta can accept
   * the message successfully, while a later
   * database operation could fail.
   *
   * By creating the Message first, the CRM
   * always has a record representing the
   * outbound campaign message.
   */
  let outboundMessageId:
    string | null = null;

  try {
    console.log(
      "=== PREPARING CAMPAIGN MESSAGE ===",
      {
        campaignId,
        recipientId,
        contactId:
          contact.id,
        phone:
          contact.phone,
        templateName:
          campaign.templateName,
      }
    );

    // ---------------------------------------
    // GET OR CREATE CONVERSATION
    //
    // We do this BEFORE sending so that the
    // outbound CRM Message can be created
    // before Meta receives the request.
    // ---------------------------------------

    const conversation =
      await db.conversation.upsert({
        where: {
          contactId:
            contact.id,
        },

        create: {
          contactId:
            contact.id,
        },

        update: {
          updatedAt:
            new Date(),
        },
      });

    // ---------------------------------------
    // CREATE OUTBOUND MESSAGE FIRST
    //
    // This is the important fix.
    //
    // The CRM now has a Message record even
    // before Meta accepts the WhatsApp request.
    // ---------------------------------------

    const outboundMessage =
      await db.message.create({
        data: {
          contactId:
            contact.id,

          conversationId:
            conversation.id,

          direction:
            "OUTBOUND",

          type:
            "TEMPLATE",

          body:
            campaign.templateName,

          status:
            "PENDING",
        },
      });

    outboundMessageId =
      outboundMessage.id;

    console.log(
      "=== OUTBOUND CRM MESSAGE CREATED ===",
      {
        messageId:
          outboundMessage.id,

        campaignId,
        recipientId,

        templateName:
          campaign.templateName,
      }
    );

    // ---------------------------------------
    // SEND TEMPLATE THROUGH WHATSAPP
    // ---------------------------------------

    console.log(
      "=== SENDING CAMPAIGN MESSAGE ===",
      {
        campaignId,
        recipientId,
        contactId:
          contact.id,
        phone:
          contact.phone,
        templateName:
          campaign.templateName,
      }
    );

    const result =
      await sendTemplateMessage(
        contact.phone,
        campaign.templateName,
        "en",
        [
          {
            name:
              "customer_name",

            value:
              contact.name ??
              "Customer",
          },
        ],
        "https://www.risnar.com/images/jaipur_plot_recommendation.jpeg"
      );

    const metaMessageId =
      result.messages?.[0]?.id ??
      null;

    console.log(
      "=== WHATSAPP MESSAGE ACCEPTED ===",
      {
        campaignId,
        recipientId,
        phone:
          contact.phone,
        metaMessageId,
      }
    );

    if (!metaMessageId) {
      throw new Error(
        "WhatsApp API did not return a message ID."
      );
    }

    // ---------------------------------------
    // SAVE META MESSAGE ID IMMEDIATELY
    //
    // The Message record already exists.
    // We now attach Meta's message ID to it.
    //
    // This allows a very fast Meta status
    // webhook to find the outbound Message.
    // ---------------------------------------

    await db.message.update({
      where: {
        id:
          outboundMessageId,
      },

      data: {
        metaMessageId,

        status:
          "SENT",
      },
    });

    console.log(
      "=== OUTBOUND MESSAGE LINKED TO META ===",
      {
        messageId:
          outboundMessageId,

        metaMessageId,

        templateName:
          campaign.templateName,
      }
    );

    // ---------------------------------------
    // CHECK RECIPIENT AGAIN
    //
    // Meta's webhook may have arrived
    // extremely quickly.
    // ---------------------------------------

    const currentRecipient =
      await db.campaignRecipient.findUnique({
        where: {
          id: recipientId,
        },
      });

    if (!currentRecipient) {
      throw new Error(
        "Campaign recipient no longer exists."
      );
    }

    // ---------------------------------------
    // PRESERVE WEBHOOK STATUS
    // ---------------------------------------

    const recipientStatus =
      currentRecipient.status ===
        "DELIVERED" ||
      currentRecipient.status ===
        "READ"
        ? currentRecipient.status
        : "SENT";

    // ---------------------------------------
    // SAVE META MESSAGE ID
    // ---------------------------------------

    await db.campaignRecipient.update({
      where: {
        id: recipientId,
      },

      data: {
        metaMessageId,

        status:
          recipientStatus,

        sentAt:
          currentRecipient.sentAt ??
          new Date(),
      },
    });

    // ---------------------------------------
    // UPDATE CAMPAIGN COUNTERS
    // ---------------------------------------

    await db.campaign.update({
      where: {
        id: campaignId,
      },

      data: {
        sentCount: {
          increment: 1,
        },

        queuedCount: {
          decrement: 1,
        },
      },
    });

    console.log(
      "=== CAMPAIGN RECIPIENT COMPLETED ===",
      {
        campaignId,
        recipientId,
        contactId:
          contact.id,
        metaMessageId,

        messageId:
          outboundMessageId,
      }
    );
  } catch (error: any) {
    console.error(
      "=== CAMPAIGN RECIPIENT FAILED ===",
      {
        campaignId,
        recipientId,
        contactId:
          contact.id,

        error:
          error?.response?.data ??
          error?.message ??
          error,
      }
    );

    // ---------------------------------------
    // MARK CRM OUTBOUND MESSAGE AS FAILED
    //
    // If the CRM Message was already created,
    // keep it as part of the conversation history
    // instead of losing the campaign message.
    // ---------------------------------------

    if (outboundMessageId) {
      try {
        await db.message.update({
          where: {
            id:
              outboundMessageId,
          },

          data: {
            status:
              "FAILED",
          },
        });
      } catch (
        messageUpdateError
      ) {
        console.error(
          "Failed to mark outbound CRM message as FAILED:",
          messageUpdateError
        );
      }
    }

    // ---------------------------------------
    // MARK RECIPIENT FAILED
    // ---------------------------------------

    await db.campaignRecipient.update({
      where: {
        id: recipientId,
      },

      data: {
        status:
          "FAILED",

        failedAt:
          new Date(),

        errorMessage:
          JSON.stringify(
            error?.response?.data ??
              error?.message ??
              error
          ),
      },
    });

    // ---------------------------------------
    // UPDATE CAMPAIGN FAILURE COUNTER
    // ---------------------------------------

    await db.campaign.update({
      where: {
        id: campaignId,
      },

      data: {
        failedCount: {
          increment: 1,
        },

        queuedCount: {
          decrement: 1,
        },
      },
    });

    // ---------------------------------------
    // IMPORTANT:
    //
    // Do not rethrow here.
    //
    // A WhatsApp API failure has already been
    // recorded as FAILED. The workflow should
    // continue with the remaining recipients.
    // ---------------------------------------

    console.log(
      "=== RECIPIENT MARKED FAILED ===",
      {
        campaignId,
        recipientId,
      }
    );
  }
}

// ============================================================
// STEP: COMPLETE CAMPAIGN
// ============================================================

async function completeCampaign(
  campaignId: string
) {
  "use step";

  const remaining =
    await db.campaignRecipient.count({
      where: {
        campaignId,
        status: "PENDING",
      },
    });

  if (remaining > 0) {
    console.log(
      "Campaign still has pending recipients.",
      {
        campaignId,
        remaining,
      }
    );

    return;
  }

  const campaign =
    await db.campaign.findUnique({
      where: {
        id: campaignId,
      },

      select: {
        status: true,
      },
    });

  if (!campaign) {
    return;
  }

  if (
    campaign.status ===
    "COMPLETED"
  ) {
    return;
  }

  await db.campaign.update({
    where: {
      id: campaignId,
    },

    data: {
      queuedCount: 0,

      status:
        "COMPLETED",

      completedAt:
        new Date(),
    },
  });

  console.log(
    "=== CAMPAIGN MARKED COMPLETED ===",
    {
      campaignId,
    }
  );
}