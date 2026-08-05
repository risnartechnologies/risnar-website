import { NextRequest, NextResponse } from "next/server";

import { verifyWebhook } from "@/lib/whatsapp/verify-webhook";
import { processMessage } from "@/lib/whatsapp/process-message";
import { MetaWebhook } from "@/lib/whatsapp/types";

export async function GET(request: NextRequest) {
  return verifyWebhook(request);
}

export async function POST(request: NextRequest) {
  try {
    const body: MetaWebhook = await request.json();

    await processMessage(body);

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
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