import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  const campaign = await db.campaign.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(campaign);
}

export async function PATCH(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  const body = await request.json();

  const campaign = await db.campaign.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(campaign);
}

export async function DELETE(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  await db.campaign.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}