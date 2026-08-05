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
  const body = await request.json();

  const campaign = await db.campaign.create({
    data: {
      name: body.name,
      description: body.description,
      templateName: body.templateName,
      status: body.status,

      totalRecipients: 0,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
    },
  });

  return NextResponse.json(campaign);
}