import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function POST(
  request: NextRequest
) {

  try {

    const { ids } =
      await request.json();

    if (
      !Array.isArray(ids) ||
      ids.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No campaigns selected.",
        },
        {
          status: 400,
        }
      );
    }

    await db.campaignRecipient.deleteMany({
      where: {
        campaignId: {
          in: ids,
        },
      },
    });

    await db.campaign.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete campaigns.",
      },
      {
        status: 500,
      }
    );

  }

}