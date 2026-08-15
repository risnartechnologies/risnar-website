import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

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

    /*
     * IMPORTANT:
     *
     * body.contacts contains Contact IDs.
     *
     * We verify every supplied ID against the Contact table before
     * creating CampaignRecipient records.
     *
     * This prevents a campaign recipient from becoming associated
     * with the wrong contact because of phone-number matching or
     * normalization elsewhere.
     */
    const requestedContactIds = [
      ...new Set(
        body.contacts
          .filter(
            (contactId: unknown): contactId is string =>
              typeof contactId === "string" &&
              contactId.trim().length > 0
          )
          .map((contactId: string) => contactId.trim())
      ),
    ];

    if (requestedContactIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid contacts were supplied.",
        },
        {
          status: 400,
        }
      );
    }

    const contacts = await db.contact.findMany({
      where: {
        id: {
          in: requestedContactIds,
        },
      },

      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    /*
     * Every requested Contact ID must exist.
     *
     * We deliberately do NOT fall back to phone-number matching.
     */
    const foundContactIds = new Set(
      contacts.map((contact) => contact.id)
    );

    const missingContactIds =
      requestedContactIds.filter(
        (contactId) =>
          !foundContactIds.has(contactId)
      );

    if (missingContactIds.length > 0) {
      console.error(
        "=== CAMPAIGN CONTACT VALIDATION FAILED ===",
        {
          requestedContactIds,
          missingContactIds,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "One or more selected contacts no longer exist.",
          missingContactIds,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Preserve the exact Contact IDs supplied by the UI.
     *
     * CampaignRecipient.contactId is therefore always the same
     * Contact ID that the user selected.
     */
    const campaign =
      await db.campaign.create({
        data: {
          name: body.name,
          description: body.description,
          templateName: body.templateName,

          status: "DRAFT",

          scheduledAt: null,

          totalRecipients:
            requestedContactIds.length,

          queuedCount:
            requestedContactIds.length,

          sentCount: 0,
          deliveredCount: 0,
          readCount: 0,
          respondedCount: 0,
          failedCount: 0,

          recipients: {
            create: requestedContactIds.map(
              (contactId) => ({
                contactId,
              })
            ),
          },
        },

        include: {
          recipients: {
            include: {
              contact: true,
            },
          },
        },
      });

    /*
     * Final integrity check.
     *
     * This verifies that every CampaignRecipient points to the
     * exact Contact ID supplied by the campaign request.
     */
    const recipientContactIds =
      campaign.recipients.map(
        (recipient) => recipient.contactId
      );

    const integrityOk =
      recipientContactIds.length ===
        requestedContactIds.length &&
      requestedContactIds.every(
        (contactId) =>
          recipientContactIds.includes(
            contactId
          )
      );

    if (!integrityOk) {
      console.error(
        "=== CAMPAIGN RECIPIENT INTEGRITY FAILED ===",
        {
          campaignId: campaign.id,
          requestedContactIds,
          recipientContactIds,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign recipient integrity check failed.",
        },
        {
          status: 500,
        }
      );
    }

    console.log(
      "=== CAMPAIGN CREATED ===",
      {
        campaignId: campaign.id,
        totalRecipients:
          campaign.totalRecipients,
        templateName:
          campaign.templateName,
        recipients:
          campaign.recipients.map(
            (recipient) => ({
              recipientId: recipient.id,
              contactId:
                recipient.contactId,
              contactName:
                recipient.contact.name,
              contactPhone:
                recipient.contact.phone,
            })
          ),
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