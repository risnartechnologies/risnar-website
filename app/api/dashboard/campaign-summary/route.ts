import { NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    /**
     * Campaign summary for Dashboard.
     *
     * NOTE:
     * Valid CampaignStatus values from Prisma schema:
     * - DRAFT
     * - SCHEDULED
     * - RUNNING
     * - COMPLETED
     * - PAUSED
     * - CANCELLED
     */

    const [
      total,
      scheduled,
      running,
      completed,
      paused,
      cancelled,
      draft,
    ] = await Promise.all([
      db.campaign.count(),

      db.campaign.count({
        where: {
          status: "SCHEDULED",
        },
      }),

      db.campaign.count({
        where: {
          status: "RUNNING",
        },
      }),

      db.campaign.count({
        where: {
          status: "COMPLETED",
        },
      }),

      db.campaign.count({
        where: {
          status: "PAUSED",
        },
      }),

      db.campaign.count({
        where: {
          status: "CANCELLED",
        },
      }),

      db.campaign.count({
        where: {
          status: "DRAFT",
        },
      }),
    ]);

    return NextResponse.json({
      total,
      draft,
      scheduled,
      running,
      completed,
      paused,
      cancelled,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}