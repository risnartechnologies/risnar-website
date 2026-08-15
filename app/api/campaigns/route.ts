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

    if (
      !body.name ||
      !body.templateName ||
      !Array.isArray(body.contacts) ||
      body.contacts.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign name, template and contacts are required.",
        },
        {
          status: 400,
        }
      );
    }

    const campaign =
      await db.campaign.create({
        data: {
          name: body.name,
          description: body.description,
          templateName: body.templateName,

          // Campaign is created first.
          // Sending will happen separately.
          status: "DRAFT",

          scheduledAt: null,

          totalRecipients:
            body.contacts.length,

          queuedCount:
            body.contacts.length,

          sentCount: 0,
          deliveredCount: 0,
          readCount: 0,
          respondedCount: 0,
          failedCount: 0,

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

    console.log(
      "=== CAMPAIGN CREATED ===",
      {
        campaignId: campaign.id,
        totalRecipients:
          campaign.totalRecipients,
        templateName:
          campaign.templateName,
      }
    );

    return NextResponse.json(
      {
        success: true,
        campaign,
      },
      {
        status: 201,
      }
    );
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