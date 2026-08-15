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

  try {
    console.log(
      "=== SENDING CAMPAIGN MESSAGE ===",
      {
        campaignId,
        recipientId,
        contactId:
          contact.id,
        phone:
          contact.phone,
      }
    );

    // ---------------------------------------
    // SEND TEMPLATE THROUGH WHATSAPP
    // ---------------------------------------

    const result =
      await sendTemplateMessage(
        contact.phone,
        campaign.templateName,
        "en",
        [
          {
            name: "customer_name",
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

    // ---------------------------------------
    // GET OR CREATE CONVERSATION
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
    // SAVE OUTBOUND MESSAGE
    // ---------------------------------------

    await db.message.create({
      data: {
        contactId:
          contact.id,

        conversationId:
          conversation.id,

        metaMessageId,

        direction:
          "OUTBOUND",

        type:
          "TEMPLATE",

        body:
          campaign.templateName,

        status:
          recipientStatus,
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
    // MARK RECIPIENT FAILED
    // ---------------------------------------

    await db.campaignRecipient.update({
      where: {
        id: recipientId,
      },

      data: {
        status: "FAILED",

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