import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";
import { sendTemplateMessage } from "@/lib/whatsapp/whatsapp";

export async function GET() {
  const campaigns = await db.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      recipients: {
        include: {
          contact: true,
        },
      },
    },
  });

  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const campaign = await db.campaign.create({
      data: {
        name: body.name,
        description: body.description,
        templateName: body.templateName,
        status: body.status,
        scheduledAt: null,

        totalRecipients: body.contacts.length,
        queuedCount: body.contacts.length,

        recipients: {
          create: body.contacts.map(
            (contactId: string) => ({
              contactId,
            })
          ),
        },
      },

      include: {
        recipients: true,
      },
    });

    const contacts = await db.contact.findMany({
      where: {
        id: {
          in: body.contacts,
        },
      },
    });

    let sentCount = 0;
    let failedCount = 0;

    for (const contact of contacts) {
      try {
        // ---------------------------------------
        // SEND TEMPLATE THROUGH WHATSAPP
        // ---------------------------------------

      const result = await sendTemplateMessage(
        contact.phone,
        body.templateName,
        "en",
        [
          {
            name: "customer_name",
            value: contact.name ?? "Customer",
          },
        ],
        "https://risnar.com/images/jaipur-plot-recommendation.png"
      );

        console.log(
          "=== CAMPAIGN MESSAGE SENT ===",
          {
            contactId: contact.id,
            phone: contact.phone,
            templateName: body.templateName,
            metaMessageId:
              result.messages?.[0]?.id ?? null,
          }
        );

        console.log(
          "WhatsApp Response:",
          JSON.stringify(result, null, 2)
        );

        sentCount++;

        const metaMessageId =
          result.messages?.[0]?.id ?? null;

    // ---------------------------------------
    // SAVE META MESSAGE ID IMMEDIATELY
    // ---------------------------------------
    //
    // IMPORTANT:
    // Meta can send the SENT / DELIVERED
    // webhook very quickly after the API
    // accepts the message.
    //
    // Save metaMessageId FIRST so the webhook
    // can always find this campaign recipient.
    //

    await db.campaignRecipient.update({
      where: {
        campaignId_contactId: {
          campaignId: campaign.id,
          contactId: contact.id,
        },
      },

      data: {
        status: "SENT",
        sentAt: new Date(),
        metaMessageId,
      },
    });

    console.log(
      "=== CAMPAIGN RECIPIENT TRACKING SAVED ===",
      {
        campaignId: campaign.id,
        contactId: contact.id,
        metaMessageId,
      }
    );

    // ---------------------------------------
    // GET OR CREATE CONVERSATION
    // ---------------------------------------

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

        // ---------------------------------------
        // SAVE OUTBOUND MESSAGE
        // ---------------------------------------

        console.log(
            "=== ABOUT TO CREATE OUTBOUND MESSAGE ===",
            {
              contactId: contact.id,
              conversationId: conversation.id,
              metaMessageId,
              templateName: body.templateName,
            }
          );

        await db.message.create({
          data: {
            contactId: contact.id,
            conversationId: conversation.id,

            metaMessageId,

            direction: "OUTBOUND",
            type: "TEMPLATE",

            // Store the template name for now.
            // We can later store the complete rendered
            // template text here.
            body: body.templateName,

            status: "SENT",
          },
        });

        console.log(
          "=== OUTBOUND MESSAGE CREATED ==="
        );
      } catch (error: any) {
        console.error(
          "Meta Error:",
          error.response?.data ??
            error.message ??
            error
        );

        failedCount++;

        await db.campaignRecipient.update({
          where: {
            campaignId_contactId: {
              campaignId: campaign.id,
              contactId: contact.id,
            },
          },

          data: {
            status: "FAILED",
            failedAt: new Date(),

            errorMessage: JSON.stringify(
              error.response?.data ??
                error.message ??
                error
            ),
          },
        });
      }
    }

    // ---------------------------------------
    // UPDATE CAMPAIGN
    // ---------------------------------------

    const completedCampaign =
      await db.campaign.update({
        where: {
          id: campaign.id,
        },

        data: {
          sentCount,
          failedCount,
          queuedCount: 0,
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      campaign: completedCampaign,
      sentCount,
      failedCount,
    });
  } catch (error) {
    console.error(
      "POST /api/campaigns failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create campaign.",
      },
      {
        status: 500,
      }
    );
  }
}