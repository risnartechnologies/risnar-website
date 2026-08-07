import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const campaign =
      await db.campaign.findUnique({
        where: {
          id,
        },
      });

    if (!campaign) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      campaign.status ===
      "RUNNING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign is already running.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedCampaign =
      await db.campaign.update({
        where: {
          id,
        },
        data: {
          status: "RUNNING",
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Campaign started successfully.",
      campaign:
        updatedCampaign,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to start campaign.",
      },
      {
        status: 500,
      }
    );
  }
}