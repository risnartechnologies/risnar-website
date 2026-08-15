import { NextResponse } from "next/server";
import { start } from "workflow/api";

import { db } from "@/lib/prisma/db";
import { processCampaign } from "@/lib/whatsapp/process-campaign";

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
    const { id } = await params;

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

    if (
      campaign.status ===
      "COMPLETED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign is already completed.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------
    // MARK CAMPAIGN AS RUNNING
    // ---------------------------------------

    const updatedCampaign =
      await db.campaign.update({
        where: {
          id,
        },

        data: {
          status: "RUNNING",

          startedAt:
            campaign.startedAt ??
            new Date(),
        },
      });

    // ---------------------------------------
    // START DURABLE WORKFLOW
    //
    // This returns immediately.
    // The campaign continues in the
    // background through Vercel Workflow.
    // ---------------------------------------

    const run =
      await start(
        processCampaign,
        [id]
      );

    console.log(
      "=== CAMPAIGN WORKFLOW STARTED ===",
      {
        campaignId: id,
        runId: run.runId,
      }
    );

    return NextResponse.json({
      success: true,

      message:
        "Campaign started successfully.",

      campaign:
        updatedCampaign,

      runId:
        run.runId,
    });
  } catch (error) {
    console.error(
      "Failed to start campaign:",
      error
    );

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