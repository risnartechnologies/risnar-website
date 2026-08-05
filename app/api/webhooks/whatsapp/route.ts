import { NextRequest, NextResponse } from "next/server";

import { processMessage } from "@/lib/whatsapp/process-message";
import { verifyWebhook } from "@/lib/whatsapp/verify-webhook";
import { MetaWebhook } from "@/lib/whatsapp/types";

export async function GET(request: NextRequest) {
  return verifyWebhook(request);
}

export async function POST(request: NextRequest) {
  try {
    const body: MetaWebhook =
      await request.json();

    console.log(
      "========== WHATSAPP WEBHOOK =========="
    );

    console.log(
      JSON.stringify(body, null, 2)
    );

    console.log(
      "======================================"
    );

    await processMessage(body);

    return NextResponse.json(
      {
        received: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "WhatsApp webhook failed:"
    );

    console.error(error);

    return NextResponse.json(
      {
        received: false,
      },
      {
        status: 500,
      }
    );
  }
}