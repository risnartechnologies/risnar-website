import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  const campaigns = await db.campaign.findMany({
    orderBy: {
      createdAt: "desc",
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

          name:
            body.name,

          description:
            body.description,

          templateName:
            body.templateName,

          status:
            body.status,

          totalRecipients:
            body.contacts.length,

          queuedCount:
            body.contacts.length,

          recipients: {

            create:
              body.contacts.map(
                (
                  contactId: string
                ) => ({

                  contactId,

                })
              ),

          },

        },

        include: {

          recipients: true,

        },

      });

    return NextResponse.json({
      success: true,
      campaign,
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