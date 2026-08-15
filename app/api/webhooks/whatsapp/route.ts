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

    // ---------------------------------------
    // Ignore Meta's dummy/test webhook
    //
    // Meta can send test payloads containing
    // dummy phone_number_id / test messages.
    // Only process webhooks belonging to our
    // actual WhatsApp Business phone number.
    // ---------------------------------------

    const webhookPhoneNumberId =
      body.entry?.[0]?.changes?.[0]?.value
        ?.metadata?.phone_number_id;

    const configuredPhoneNumberId =
      process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (
      webhookPhoneNumberId &&
      configuredPhoneNumberId &&
      webhookPhoneNumberId !==
        configuredPhoneNumberId
    ) {
      console.log(
        "Ignoring webhook for different phone_number_id:",
        webhookPhoneNumberId
      );

      return NextResponse.json(
        {
          received: true,
          ignored: true,
        },
        {
          status: 200,
        }
      );
    }

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