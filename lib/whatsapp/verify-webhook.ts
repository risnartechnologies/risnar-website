import { NextRequest, NextResponse } from "next/server";

export function verifyWebhook(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  return NextResponse.json({
    mode,
    tokenReceived: token,
    envToken: process.env.WHATSAPP_VERIFY_TOKEN ?? null,
    match: token === process.env.WHATSAPP_VERIFY_TOKEN,
    challenge,
  });
}