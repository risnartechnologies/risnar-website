import { db } from "@/lib/prisma/db";
import { sendTemplateMessage } from "@/lib/whatsapp/whatsapp";

const BATCH_SIZE = 10;

function getTemplateImageUrl(templateName: string) {
  if (
    templateName ===
    "luxury_resort_ownership_offer"
  ) {
    return "https://www.risnar.com/images/luxury_resort_ownership_offer.png";
  }

  return "https://www.risnar.com/images/jaipur_plot_recommendation.jpeg";
}

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

    if (recipientIds.length === 0) {
      await completeCampaign(campaignId);

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
        processed: recipientIds.length,
      }
    );
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

  if (campaign.status !== "RUNNING") {
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

  if (recipient.status !== "PENDING") {
    console.log(
      "Recipient already processed.",
      {
        campaignId,
        recipientId,
        status: recipient.status,
      }
    );

    return;
  }

  const contact =
    recipient.contact;

  const campaign =
    recipient.campaign;

  // ----------------------------------------------------------
  // IMPORTANT:
  //
  // Create the CRM conversation BEFORE sending.
  // This guarantees that every campaign recipient has a
  // conversation available in the CRM, even if Meta rejects
  // the message.
  // ----------------------------------------------------------

  const conversation =
    await db.conversation.upsert({
      where: {
        contactId: contact.id,
      },

      create: {
        contactId: contact.id,
      },

      update: {
        updatedAt: new Date(),
      },
    });

  let outboundMessageId:
    | string
    | null = null;

  try {
    console.log(
      "=== PREPARING CAMPAIGN MESSAGE ===",
      {
        campaignId,
        recipientId,
        contactId: contact.id,
        phone: contact.phone,
        templateName:
          campaign.templateName,
      }
    );

    // --------------------------------------------------------
    // CREATE OUTBOUND MESSAGE BEFORE META REQUEST
    //
    // The template name is stored here deliberately.
    // This makes the CRM conversation self-contained.
    // --------------------------------------------------------

    const outboundMessage =
      await db.message.create({
        data: {
          contactId: contact.id,

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

    // --------------------------------------------------------
    // SEND TEMPLATE THROUGH META
    // --------------------------------------------------------

    const result =
      await sendTemplateMessage(
        contact.phone,
        campaign.templateName,
        "en",
        [
          {
            name:
              "name",
            value:
              contact.name ??
              "Customer",
          },
        ],
        getTemplateImageUrl(
          campaign.templateName
        )
      );

    const metaMessageId =
      result.messages?.[0]?.id ??
      null;

    console.log(
      "=== WHATSAPP MESSAGE ACCEPTED ===",
      {
        campaignId,
        recipientId,
        phone: contact.phone,
        metaMessageId,
      }
    );

    if (!metaMessageId) {
      throw new Error(
        "WhatsApp API did not return a message ID."
      );
    }

    // --------------------------------------------------------
    // LINK META MESSAGE TO CRM MESSAGE
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // UPDATE CAMPAIGN RECIPIENT
    // --------------------------------------------------------

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

    const recipientStatus =
      currentRecipient.status ===
        "DELIVERED" ||
      currentRecipient.status ===
        "READ"
        ? currentRecipient.status
        : "SENT";

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

    // --------------------------------------------------------
    // UPDATE CAMPAIGN COUNTERS
    // --------------------------------------------------------

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
        contactId: contact.id,
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
        contactId: contact.id,

        error:
          error?.response?.data ??
          error?.message ??
          error,
      }
    );

    // --------------------------------------------------------
    // KEEP FAILED CAMPAIGN MESSAGE IN CRM
    // --------------------------------------------------------

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

            // IMPORTANT:
            // Never remove the template name when a
            // Meta request fails.
            body:
              campaign.templateName,
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

    // --------------------------------------------------------
    // MARK CAMPAIGN RECIPIENT FAILED
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // UPDATE FAILURE COUNTER
    // --------------------------------------------------------

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