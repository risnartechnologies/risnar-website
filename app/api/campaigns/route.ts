import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";
import { sendTemplateMessage } from "@/lib/whatsapp/whatsapp";

export async function GET() {
const campaigns =
  await db.campaign.findMany({

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

    const body =
      await request.json();

    const campaign =
      await db.campaign.create({

        data: {

          name: body.name,

          description: body.description,

          templateName: body.templateName,

          status: body.status,

          scheduledAt: null,

          totalRecipients:
            body.contacts.length,

          queuedCount:
            body.contacts.length,

          recipients: {

            create:
              body.contacts.map(
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

      const contacts =
  await db.contact.findMany({
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

    const result =
      await sendTemplateMessage(
        contact.phone,
        body.templateName,
        "en"
      );

    console.log(
      "WhatsApp Response:",
      JSON.stringify(result, null, 2)
    );

    sentCount++;

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

        metaMessageId:
          result.messages?.[0]?.id ?? null,

      },

    });

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

        errorMessage:
          JSON.stringify(
            error.response?.data ??
            error.message ??
            error
          ),

      },

    });

  }

}

await db.campaign.update({
  where: {
    id: campaign.id,
  },
  data: {
    sentCount,
    failedCount,
    queuedCount: 0,
    status: "COMPLETED",
  },
});

    return NextResponse.json({
      success: true,
      campaign,
      sentCount,
      failedCount,
    });

  } catch (error) {

    console.error(error);

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