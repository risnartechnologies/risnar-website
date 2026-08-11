import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

const GRAPH_VERSION =
  process.env.WHATSAPP_API_VERSION || "v23.0";

const GRAPH_API =
  `https://graph.facebook.com/${GRAPH_VERSION}`;

/**
 * RISNAR CRM — WhatsApp Connection API
 *
 * DEBUG VERSION
 * --------------
 * This route keeps the existing WhatsApp connection flow intact
 * while logging every important server-side stage.
 *
 * Debug stages:
 *
 * 1. Request received
 * 2. Request body parsed
 * 3. Required identifiers validated
 * 4. Meta environment variables validated
 * 5. Authorization-code exchange started
 * 6. Meta token exchange response received
 * 7. Access token availability confirmed
 * 8. WhatsApp phone lookup started
 * 9. WhatsApp phone lookup response received
 * 10. WABA subscription started
 * 11. WABA subscription response received
 * 12. Prisma upsert started
 * 13. Prisma upsert completed
 * 14. Final success response
 *
 * SECURITY:
 * - Authorization code is NEVER logged.
 * - Access token is NEVER logged.
 * - META_APP_SECRET is NEVER logged.
 * - Only safe metadata and response statuses are logged.
 */

function debugPrefix() {
  return `[RISNAR WhatsApp API DEBUG ${new Date().toISOString()}]`;
}

function debugLog(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.log(
      `${debugPrefix()} ${message}`
    );
  } else {
    console.log(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

function debugWarn(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.warn(
      `${debugPrefix()} ${message}`
    );
  } else {
    console.warn(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

function debugError(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.error(
      `${debugPrefix()} ${message}`
    );
  } else {
    console.error(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

export async function POST(
  request: NextRequest
) {
  const requestStartedAt = Date.now();

  debugLog(
    "=================================================="
  );

  debugLog(
    "POST /api/whatsapp/connect REQUEST RECEIVED."
  );

  debugLog(
    "Request metadata:",
    {
      method: request.method,
      url: request.url,
      contentType:
        request.headers.get(
          "content-type"
        ),
      userAgent:
        request.headers.get(
          "user-agent"
        ),
    }
  );

  try {
    debugLog(
      "Parsing request JSON body..."
    );

    const body =
      await request.json();

    debugLog(
      "Request JSON body parsed successfully."
    );

    /**
     * Extract incoming values.
     *
     * We intentionally log only whether sensitive values
     * exist, never their contents.
     */
    const code = body.code;
    const wabaId = body.wabaId;
    const phoneNumberId =
      body.phoneNumberId;
    const businessId =
      body.businessId;

    debugLog(
      "Incoming WhatsApp connection data:",
      {
        hasAuthorizationCode:
          Boolean(code),
        authorizationCodeType:
          typeof code,

        wabaId:
          wabaId ?? null,

        hasWabaId:
          Boolean(wabaId),

        phoneNumberId:
          phoneNumberId ?? null,

        hasPhoneNumberId:
          Boolean(phoneNumberId),

        businessId:
          businessId ?? null,

        hasBusinessId:
          Boolean(businessId),
      }
    );

    /**
     * Validate authorization code.
     */
    if (!code) {
      debugWarn(
        "STOP: Authorization code is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Authorization code is missing.",
        },
        { status: 400 }
      );
    }

    debugLog(
      "Authorization code validation PASSED."
    );

    /**
     * Validate WABA ID.
     */
    if (!wabaId) {
      debugWarn(
        "STOP: WhatsApp Business Account ID is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "WhatsApp Business Account ID is missing.",
        },
        { status: 400 }
      );
    }

    debugLog(
      "WABA ID validation PASSED."
    );

    /**
     * Validate phone number ID.
     */
    if (!phoneNumberId) {
      debugWarn(
        "STOP: Phone Number ID is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Phone Number ID is missing.",
        },
        { status: 400 }
      );
    }

    debugLog(
      "Phone Number ID validation PASSED."
    );

    /**
     * Read Meta credentials.
     */
    const appId =
      process.env.META_APP_ID;

    const appSecret =
      process.env.META_APP_SECRET;

    debugLog(
      "Checking Meta environment variables:",
      {
        hasMetaAppId:
          Boolean(appId),
        metaAppId:
          appId ?? null,
        hasMetaAppSecret:
          Boolean(appSecret),
        graphVersion:
          GRAPH_VERSION,
        graphApi:
          GRAPH_API,
      }
    );

    if (!appId || !appSecret) {
      debugError(
        "STOP: META_APP_ID or META_APP_SECRET is missing."
      );

      throw new Error(
        "META_APP_ID or META_APP_SECRET is missing."
      );
    }

    debugLog(
      "Meta environment variable validation PASSED."
    );

    /**
     * --------------------------------------------------
     * STEP 1
     * Exchange Embedded Signup authorization code
     * for a Meta access token.
     * --------------------------------------------------
     */
    debugLog(
      "STEP 1: Starting Meta authorization-code exchange."
    );

    const tokenParams =
      new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        code,
      });

    const tokenRequestStartedAt =
      Date.now();

    const tokenResponse =
      await fetch(
        `${GRAPH_API}/oauth/access_token?${tokenParams.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

    const tokenRequestDuration =
      Date.now() -
      tokenRequestStartedAt;

    debugLog(
      "STEP 1: Meta token exchange response received.",
      {
        status:
          tokenResponse.status,
        statusText:
          tokenResponse.statusText,
        ok:
          tokenResponse.ok,
        durationMs:
          tokenRequestDuration,
      }
    );

    const tokenData =
      await tokenResponse.json();

    debugLog(
      "STEP 1: Meta token response parsed.",
      {
        ok:
          tokenResponse.ok,

        hasAccessToken:
          Boolean(
            tokenData?.access_token
          ),

        hasError:
          Boolean(
            tokenData?.error
          ),

        errorMessage:
          tokenData?.error?.message ??
          null,

        errorType:
          tokenData?.error?.type ??
          null,

        errorCode:
          tokenData?.error?.code ??
          null,
      }
    );

    if (!tokenResponse.ok) {
      debugError(
        "STEP 1 FAILED: Meta token exchange failed.",
        {
          status:
            tokenResponse.status,

          statusText:
            tokenResponse.statusText,

          error:
            tokenData?.error,
        }
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

    const accessToken =
      tokenData?.access_token;

    if (!accessToken) {
      debugError(
        "STEP 1 FAILED: Meta response was successful but no access token was returned."
      );

      throw new Error(
        "Meta did not return an access token."
      );
    }

    debugLog(
      "STEP 1 PASSED: Meta access token received."
    );

    /**
     * --------------------------------------------------
     * STEP 2
     * Retrieve WhatsApp phone information.
     * --------------------------------------------------
     */
    debugLog(
      "STEP 2: Starting WhatsApp phone lookup.",
      {
        phoneNumberId,
      }
    );

    const phoneRequestStartedAt =
      Date.now();

    const phoneResponse =
      await fetch(
        `${GRAPH_API}/${phoneNumberId}?fields=display_phone_number,verified_name`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        }
      );

    const phoneRequestDuration =
      Date.now() -
      phoneRequestStartedAt;

    debugLog(
      "STEP 2: WhatsApp phone lookup response received.",
      {
        status:
          phoneResponse.status,
        statusText:
          phoneResponse.statusText,
        ok:
          phoneResponse.ok,
        durationMs:
          phoneRequestDuration,
      }
    );

    const phoneData =
      await phoneResponse.json();

    debugLog(
      "STEP 2: WhatsApp phone response parsed.",
      {
        ok:
          phoneResponse.ok,

        displayPhoneNumber:
          phoneData?.display_phone_number ??
          null,

        verifiedName:
          phoneData?.verified_name ??
          null,

        hasError:
          Boolean(
            phoneData?.error
          ),

        errorMessage:
          phoneData?.error?.message ??
          null,

        errorType:
          phoneData?.error?.type ??
          null,

        errorCode:
          phoneData?.error?.code ??
          null,
      }
    );

    if (!phoneResponse.ok) {
      debugError(
        "STEP 2 FAILED: Unable to fetch WhatsApp phone information.",
        {
          status:
            phoneResponse.status,

          error:
            phoneData?.error,
        }
      );

      throw new Error(
        phoneData?.error?.message ??
          "Unable to fetch WhatsApp phone information."
      );
    }

    debugLog(
      "STEP 2 PASSED: WhatsApp phone information retrieved."
    );

    /**
     * --------------------------------------------------
     * STEP 3
     * Subscribe the WABA to the Meta app.
     * --------------------------------------------------
     */
    debugLog(
      "STEP 3: Starting WABA app subscription.",
      {
        wabaId,
      }
    );

    const subscribeRequestStartedAt =
      Date.now();

    const subscribeResponse =
      await fetch(
        `${GRAPH_API}/${wabaId}/subscribed_apps`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
        }
      );

    const subscribeRequestDuration =
      Date.now() -
      subscribeRequestStartedAt;

    debugLog(
      "STEP 3: WABA subscription response received.",
      {
        status:
          subscribeResponse.status,
        statusText:
          subscribeResponse.statusText,
        ok:
          subscribeResponse.ok,
        durationMs:
          subscribeRequestDuration,
      }
    );

    const subscribeData =
      await subscribeResponse.json();

    debugLog(
      "STEP 3: WABA subscription response parsed.",
      {
        ok:
          subscribeResponse.ok,

        response:
          subscribeData,

        hasError:
          Boolean(
            subscribeData?.error
          ),

        errorMessage:
          subscribeData?.error?.message ??
          null,

        errorType:
          subscribeData?.error?.type ??
          null,

        errorCode:
          subscribeData?.error?.code ??
          null,
      }
    );

    if (!subscribeResponse.ok) {
      debugError(
        "STEP 3 FAILED: Unable to subscribe WABA.",
        {
          status:
            subscribeResponse.status,

          error:
            subscribeData?.error,
        }
      );

      throw new Error(
        subscribeData?.error?.message ??
          "Unable to subscribe WhatsApp Business Account to the app."
      );
    }

    debugLog(
      "STEP 3 PASSED: WABA successfully subscribed to the app."
    );

    /**
     * --------------------------------------------------
     * STEP 4
     * Save the WhatsApp connection in Prisma.
     * --------------------------------------------------
     */
    debugLog(
      "STEP 4: Starting Prisma WhatsAppConnection upsert.",
      {
        phoneNumberId,
        wabaId,
        businessId:
          businessId ?? null,
        phoneNumber:
          phoneData?.display_phone_number ??
          null,
        displayName:
          phoneData?.verified_name ??
          null,
      }
    );

    const databaseRequestStartedAt =
      Date.now();

    const connection =
      await db.whatsAppConnection.upsert({
        where: {
          phoneNumberId,
        },

        update: {
          businessId:
            businessId ?? null,

          wabaId,

          phoneNumber:
            phoneData?.display_phone_number ??
            null,

          displayName:
            phoneData?.verified_name ??
            null,

          accessToken,

          status: "CONNECTED",

          updatedAt:
            new Date(),
        },

        create: {
          businessId:
            businessId ?? null,

          wabaId,

          phoneNumberId,

          phoneNumber:
            phoneData?.display_phone_number ??
            null,

          displayName:
            phoneData?.verified_name ??
            null,

          accessToken,

          status: "CONNECTED",
        },
      });

    const databaseRequestDuration =
      Date.now() -
      databaseRequestStartedAt;

    debugLog(
      "STEP 4 PASSED: Prisma WhatsAppConnection upsert completed.",
      {
        id:
          connection.id,

        wabaId:
          connection.wabaId,

        phoneNumberId:
          connection.phoneNumberId,

        phoneNumber:
          connection.phoneNumber,

        displayName:
          connection.displayName,

        status:
          connection.status,

        durationMs:
          databaseRequestDuration,
      }
    );

    /**
     * --------------------------------------------------
     * FINAL SUCCESS
     * --------------------------------------------------
     */
    const totalDuration =
      Date.now() -
      requestStartedAt;

    debugLog(
      "=================================================="
    );

    debugLog(
      "WHATSAPP CONNECTION COMPLETED SUCCESSFULLY.",
      {
        connectionId:
          connection.id,

        wabaId:
          connection.wabaId,

        phoneNumberId:
          connection.phoneNumberId,

        status:
          connection.status,

        totalDurationMs:
          totalDuration,
      }
    );

    return NextResponse.json({
      success: true,

      connection: {
        id: connection.id,
        wabaId:
          connection.wabaId,
        phoneNumberId:
          connection.phoneNumberId,
        phoneNumber:
          connection.phoneNumber,
        displayName:
          connection.displayName,
        status:
          connection.status,
      },
    });
  } catch (error) {
    const totalDuration =
      Date.now() -
      requestStartedAt;

    debugError(
      "=================================================="
    );

    debugError(
      "WHATSAPP CONNECTION FAILED.",
      {
        durationMs:
          totalDuration,

        errorName:
          error instanceof Error
            ? error.name
            : undefined,

        errorMessage:
          error instanceof Error
            ? error.message
            : String(error),

        error:
          error instanceof Error
            ? error.stack
            : error,
      }
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