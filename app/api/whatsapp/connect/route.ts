import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

const GRAPH_VERSION =
  process.env.WHATSAPP_API_VERSION || "v23.0";

const GRAPH_API =
  `https://graph.facebook.com/${GRAPH_VERSION}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const code = body.code;
    const wabaId = body.wabaId;
    const phoneNumberId = body.phoneNumberId;
    const businessId = body.businessId;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Authorization code is missing.",
        },
        { status: 400 }
      );
    }

    if (!wabaId) {
      return NextResponse.json(
        {
          success: false,
          error: "WhatsApp Business Account ID is missing.",
        },
        { status: 400 }
      );
    }

    if (!phoneNumberId) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone Number ID is missing.",
        },
        { status: 400 }
      );
    }

    const appId = process.env.META_APP_ID;
    const appSecret = process.env.META_APP_SECRET;

    if (!appId || !appSecret) {
      throw new Error(
        "META_APP_ID or META_APP_SECRET is missing."
      );
    }

    const tokenParams = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      code,
    });

    const tokenResponse = await fetch(
      `${GRAPH_API}/oauth/access_token?${tokenParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error(
        "Meta token exchange failed:",
        JSON.stringify(tokenData, null, 2)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            tokenData?.error?.message ??
            "Unable to exchange Meta authorization code.",
        },
        { status: 400 }
      );
    }

    const accessToken = tokenData?.access_token;

    if (!accessToken) {
      throw new Error(
        "Meta did not return an access token."
      );
    }

    const phoneResponse = await fetch(
      `${GRAPH_API}/${phoneNumberId}?fields=display_phone_number,verified_name`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const phoneData = await phoneResponse.json();

    if (!phoneResponse.ok) {
      console.error(
        "Unable to fetch WhatsApp phone:",
        JSON.stringify(phoneData, null, 2)
      );

      throw new Error(
        phoneData?.error?.message ??
          "Unable to fetch WhatsApp phone information."
      );
    }

    const subscribeResponse = await fetch(
      `${GRAPH_API}/${wabaId}/subscribed_apps`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const subscribeData = await subscribeResponse.json();

    if (!subscribeResponse.ok) {
      console.error(
        "Unable to subscribe WABA:",
        JSON.stringify(subscribeData, null, 2)
      );

      throw new Error(
        subscribeData?.error?.message ??
          "Unable to subscribe WhatsApp Business Account to the app."
      );
    }

    const connection =
      await db.whatsAppConnection.upsert({
        where: {
          phoneNumberId,
        },

        update: {
          businessId: businessId ?? null,
          wabaId,
          phoneNumber:
            phoneData?.display_phone_number ?? null,
          displayName:
            phoneData?.verified_name ?? null,
          accessToken,
          status: "CONNECTED",
          updatedAt: new Date(),
        },

        create: {
          businessId: businessId ?? null,
          wabaId,
          phoneNumberId,
          phoneNumber:
            phoneData?.display_phone_number ?? null,
          displayName:
            phoneData?.verified_name ?? null,
          accessToken,
          status: "CONNECTED",
        },
      });

    return NextResponse.json({
      success: true,

      connection: {
        id: connection.id,
        wabaId: connection.wabaId,
        phoneNumberId: connection.phoneNumberId,
        phoneNumber: connection.phoneNumber,
        displayName: connection.displayName,
        status: connection.status,
      },
    });
  } catch (error) {
    console.error(
      "WhatsApp connection failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to connect WhatsApp.",
      },
      { status: 500 }
    );
  }
}