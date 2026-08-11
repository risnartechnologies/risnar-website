"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

/**
 * RISNAR CRM — WhatsApp Embedded Signup
 *
 * Production implementation for Meta WhatsApp Embedded Signup.
 *
 * Flow:
 * 1. Load and initialize the Meta JavaScript SDK.
 * 2. Start WhatsApp Embedded Signup with FB.login().
 * 3. Store the one-time authorization code returned by Meta.
 * 4. Listen for the WA_EMBEDDED_SIGNUP postMessage completion event.
 * 5. Read WABA / phone / business identifiers from the completion event.
 * 6. Send those identifiers and the authorization code to the
 *    server-side WhatsApp connection endpoint.
 * 7. Persist the connection server-side.
 *
 * Important:
 * - Authorization codes are stored only temporarily in sessionStorage.
 * - Access tokens are never logged.
 * - The authorization code is never logged.
 * - Non-JSON Facebook messages are safely ignored.
 * - OAuth callback messages are NOT treated as Embedded Signup messages.
 * - Meta Facebook subdomains are accepted for the Embedded Signup
 *   postMessage because the completion message may originate from a
 *   Facebook subdomain other than www.facebook.com.
 * - A temporary watchdog is used only to diagnose whether Meta sends
 *   the WA_EMBEDDED_SIGNUP completion postMessage after OAuth succeeds.
 */

declare global {
  interface Window {
    FB?: {
      init: (options: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;

      login: (
        callback: (response: {
          authResponse?: {
            code?: string;
            accessToken?: string;
          };
          status?: string;
        }) => void,
        options: {
          config_id: string;
          response_type: string;
          override_default_response_type: boolean;
          extras?: {
            setup?: Record<string, unknown>;
            featureType?: string;
            sessionInfoVersion?: string;
          };
        }
      ) => void;
    };
  }
}

const META_APP_ID = "1876583616650920";

const WHATSAPP_CONFIG_ID =
  "1583260966778990";

const SIGNUP_CODE_STORAGE_KEY =
  "risnar_whatsapp_signup_code";

/**
 * Meta may use different Facebook-owned subdomains while running
 * the Embedded Signup flow.
 *
 * The message listener must therefore not be restricted only to
 * www.facebook.com and web.facebook.com.
 */
function isAllowedFacebookOrigin(
  origin: string
): boolean {
  try {
    const url = new URL(origin);

    if (url.protocol !== "https:") {
      return false;
    }

    const hostname =
      url.hostname.toLowerCase();

    return (
      hostname === "facebook.com" ||
      hostname.endsWith(".facebook.com")
    );
  } catch {
    return false;
  }
}

/**
 * Embedded Signup completion payload received from Meta.
 */
type EmbeddedSignupMessage = {
  type?: string;
  event?: string;
  data?: {
    waba_id?: string;
    phone_number_id?: string;
    business_id?: string;
  };
};

export default function Page() {
  const [sdkReady, setSdkReady] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  /**
   * Temporary diagnostic watchdog.
   *
   * This does not participate in the WhatsApp connection logic.
   * It only records whether a WA_EMBEDDED_SIGNUP message arrives
   * after the OAuth authorization code has been received.
   */
  const waEmbeddedSignupWatchdogTimer =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  /**
   * Listen for Meta's Embedded Signup completion event.
   *
   * Meta can also send OAuth callback strings and other internal
   * Facebook messages through window.postMessage().
   *
   * Only:
   *
   *   type === "WA_EMBEDDED_SIGNUP"
   *
   * is processed by the RISNAR connection flow.
   */
  useEffect(() => {
    /**
     * FULL META MESSAGE DIAGNOSTIC
     *
     * IMPORTANT:
     * We intentionally log every Facebook-origin message first.
     * This allows us to determine whether Meta is sending:
     *
     *   WA_EMBEDDED_SIGNUP
     *   CANCEL
     *   ERROR
     *   FINISH
     *   FINISH_ONLY_WABA
     *   FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING
     *
     * or another message that the previous listener was silently ignoring.
     *
     * Authorization codes and access tokens are NEVER logged.
     */
    const handleMessage = async (
      event: MessageEvent
    ) => {
      /**
       * STEP 1:
       * Log every HTTPS Facebook-origin message BEFORE any filtering.
       *
       * This is the most important diagnostic change.
       */
      if (
        typeof event.origin === "string" &&
        event.origin.startsWith("https://") &&
        (
          event.origin.includes("facebook.com") ||
          event.origin.includes("fbcdn.net")
        )
      ) {
        let diagnosticData: unknown =
          event.data;

        /**
         * Never print a potential OAuth authorization
         * code or access token to the console.
         */
        if (
          typeof diagnosticData === "string"
        ) {
          const diagnosticString =
            diagnosticData
              .replace(
                /([?&]code=)[^&]*/gi,
                "$1[REDACTED]"
              )
              .replace(
                /([?&]access_token=)[^&]*/gi,
                "$1[REDACTED]"
              );

          diagnosticData =
            diagnosticString;
        }

        console.log(
          "[RISNAR WhatsApp DEBUG] FACEBOOK POSTMESSAGE RECEIVED",
          {
            origin:
              event.origin,
            dataType:
              typeof event.data,
            data:
              diagnosticData,
          }
        );
      }

      /**
       * STEP 2:
       * Only accept HTTPS Facebook-owned origins for the
       * actual Embedded Signup processing.
       */
      if (
        !isAllowedFacebookOrigin(
          event.origin
        )
      ) {
        return;
      }

      let data:
        | EmbeddedSignupMessage
        | null = null;

      /**
       * STEP 3:
       * Meta may send either:
       *
       *   JSON string
       *
       * or:
       *
       *   JavaScript object
       */
      if (
        typeof event.data === "string"
      ) {
        const rawData =
          event.data.trim();

        if (!rawData) {
          return;
        }

        /**
         * OAuth callback messages are ordinary strings
         * and are not Embedded Signup completion messages.
         */
        if (
          !rawData.startsWith("{")
        ) {
          console.log(
            "[RISNAR WhatsApp DEBUG] FACEBOOK STRING MESSAGE IGNORED",
            {
              origin:
                event.origin,
              data:
                rawData
                  .replace(
                    /([?&]code=)[^&]*/gi,
                    "$1[REDACTED]"
                  )
                  .replace(
                    /([?&]access_token=)[^&]*/gi,
                    "$1[REDACTED]"
                  ),
            }
          );

          return;
        }

        try {
          data =
            JSON.parse(
              rawData
            ) as EmbeddedSignupMessage;
        } catch {
          console.log(
            "[RISNAR WhatsApp DEBUG] FACEBOOK JSON MESSAGE COULD NOT BE PARSED",
            {
              origin:
                event.origin,
            }
          );

          return;
        }
      } else if (
        event.data &&
        typeof event.data === "object"
      ) {
        data =
          event.data as EmbeddedSignupMessage;
      }

      if (!data) {
        return;
      }

      /**
       * STEP 4:
       * Log the parsed Meta message.
       *
       * No authorization code or access token is present
       * in this object.
       */
      console.log(
        "[RISNAR WhatsApp DEBUG] PARSED FACEBOOK MESSAGE",
        {
          origin:
            event.origin,
          type:
            data.type,
          event:
            data.event,
          data:
            data.data,
        }
      );

      /**
       * STEP 5:
       * Only process the WhatsApp Embedded Signup message.
       */
      if (
        data.type !==
        "WA_EMBEDDED_SIGNUP"
      ) {
        console.log(
          "[RISNAR WhatsApp DEBUG] FACEBOOK MESSAGE IS NOT WA_EMBEDDED_SIGNUP",
          {
            type:
              data.type,
            event:
              data.event,
          }
        );

        return;
      }

      /**
       * STEP 6:
       * WA_EMBEDDED_SIGNUP has arrived.
       *
       * Therefore the watchdog must be cancelled.
       */
      if (
        waEmbeddedSignupWatchdogTimer.current
      ) {
        clearTimeout(
          waEmbeddedSignupWatchdogTimer.current
        );

        waEmbeddedSignupWatchdogTimer.current =
          null;

        console.log(
          "[RISNAR WhatsApp DEBUG]",
          "WA_EMBEDDED_SIGNUP WATCHDOG CLEARED: completion message received."
        );
      }

      /**
       * STEP 7:
       * Log the exact Embedded Signup event.
       */
      console.log(
        "[RISNAR WhatsApp DEBUG] WA_EMBEDDED_SIGNUP EVENT",
        {
          event:
            data.event,
          payload:
            data.data,
        }
      );

      /**
       * Meta can return any of these successful completion events:
       *
       * FINISH
       * FINISH_ONLY_WABA
       * FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING
       */
      const isSuccessfulCompletion =
        data.event === "FINISH" ||
        data.event ===
          "FINISH_ONLY_WABA" ||
        data.event ===
          "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING";

      /**
       * CANCEL and ERROR terminate the attempt.
       */
      if (
        data.event === "CANCEL" ||
        data.event === "ERROR"
      ) {
        console.error(
          "[RISNAR WhatsApp DEBUG] META EMBEDDED SIGNUP TERMINATED",
          {
            event:
              data.event,
            payload:
              data.data,
          }
        );

        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        setConnecting(false);

        alert(
          `WhatsApp Embedded Signup ended with Meta event: ${data.event}.`
        );

        return;
      }

      /**
       * Unknown Embedded Signup events are logged instead of
       * silently discarded.
       */
      if (!isSuccessfulCompletion) {
        console.warn(
          "[RISNAR WhatsApp DEBUG] UNKNOWN WA_EMBEDDED_SIGNUP EVENT",
          {
            event:
              data.event,
            payload:
              data.data,
          }
        );

        return;
      }

      /**
       * STEP 8:
       * Retrieve the authorization code returned earlier
       * by FB.login().
       *
       * The code itself is NEVER logged.
       */
      const code =
        sessionStorage.getItem(
          SIGNUP_CODE_STORAGE_KEY
        );

      if (!code) {
        console.error(
          "[RISNAR WhatsApp DEBUG] EMBEDDED SIGNUP COMPLETED BUT AUTHORIZATION CODE IS MISSING."
        );

        setConnecting(false);

        alert(
          "WhatsApp connection could not be completed because the authorization code is missing."
        );

        return;
      }

      /**
       * STEP 9:
       * Extract the identifiers supplied by Meta.
       */
      const wabaId =
        data.data?.waba_id;

      const phoneNumberId =
        data.data?.phone_number_id;

      const businessId =
        data.data?.business_id;

      console.log(
        "[RISNAR WhatsApp DEBUG] EMBEDDED SIGNUP IDENTIFIERS RECEIVED",
        {
          wabaId,
          phoneNumberId,
          businessId,
          event:
            data.event,
        }
      );

      /**
       * WABA ID is required by the server-side connection endpoint.
       */
      if (!wabaId) {
        console.error(
          "[RISNAR WhatsApp DEBUG] EMBEDDED SIGNUP COMPLETED WITHOUT WABA ID.",
          {
            event:
              data.event,
            payload:
              data.data,
          }
        );

        setConnecting(false);

        alert(
          "WhatsApp connection could not be completed because the WhatsApp Business Account ID is missing."
        );

        return;
      }

      try {
        /**
         * STEP 10:
         * Send the authorization code and Embedded Signup
         * identifiers to the server.
         */
        console.log(
          "[RISNAR WhatsApp DEBUG] SENDING EMBEDDED SIGNUP DATA TO SERVER",
          {
            wabaId,
            phoneNumberId,
            businessId,
          }
        );

        const response =
          await fetch(
            "/api/whatsapp/connect",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                code,
                wabaId,
                phoneNumberId,
                businessId,
              }),
            }
          );

        /**
         * Read the response as text first.
         */
        const rawResponse =
          await response.text();

        console.log(
          "[RISNAR WhatsApp DEBUG] SERVER RESPONSE RECEIVED",
          {
            status:
              response.status,
            ok:
              response.ok,
            responseLength:
              rawResponse.length,
          }
        );

        let result: {
          success?: boolean;
          error?: string;
          connection?: unknown;
          [key: string]: unknown;
        } = {};

        try {
          result = rawResponse
            ? (JSON.parse(
                rawResponse
              ) as typeof result)
            : {};
        } catch {
          console.error(
            "[RISNAR WhatsApp DEBUG] SERVER RETURNED INVALID JSON",
            {
              status:
                response.status,
            }
          );

          setConnecting(false);

          alert(
            `WhatsApp connection failed. Server returned HTTP ${response.status} with an invalid response.`
          );

          return;
        }

        if (
          !response.ok ||
          !result.success
        ) {
          console.error(
            "[RISNAR WhatsApp DEBUG] SERVER REJECTED WHATSAPP CONNECTION",
            {
              status:
                response.status,
              error:
                result?.error,
            }
          );

          setConnecting(false);

          alert(
            result?.error ??
              `Unable to connect WhatsApp Business. HTTP ${response.status}.`
          );

          return;
        }

        /**
         * Connection succeeded.
         *
         * The authorization code is now consumed.
         */
        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        setConnecting(false);

        console.log(
          "[RISNAR WhatsApp DEBUG] WHATSAPP CONNECTION COMPLETED SUCCESSFULLY"
        );

        alert(
          "WhatsApp Business connected successfully."
        );
      } catch (error) {
        console.error(
          "[RISNAR WhatsApp DEBUG] SERVER CONNECTION REQUEST FAILED",
          error
        );

        setConnecting(false);

        alert(
          "Unable to connect WhatsApp Business."
        );
      }
    };

    /**
     * Register the diagnostic message listener.
     */
    window.addEventListener(
      "message",
      handleMessage
    );

    /**
     * Cleanup.
     */
    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );

      if (
        waEmbeddedSignupWatchdogTimer.current
      ) {
        clearTimeout(
          waEmbeddedSignupWatchdogTimer.current
        );

        waEmbeddedSignupWatchdogTimer.current =
          null;
      }
    };
  }, []);

  /**
   * Initialize the Meta Facebook JavaScript SDK.
   */
  const initializeMetaSDK =
    () => {
      if (!window.FB) {
        setSdkReady(false);

        return;
      }

      window.FB.init({
        appId: META_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v26.0",
      });

      setSdkReady(true);
    };

  /**
   * Start Meta WhatsApp Embedded Signup.
   */
  const connectWhatsApp =
    () => {
      if (!window.FB) {
        alert(
          "WhatsApp connection is still loading. Please try again."
        );

        return;
      }

      if (connecting) {
        return;
      }

      /**
       * Remove any stale authorization code before
       * starting a completely new Embedded Signup attempt.
       *
       * This prevents a previous failed attempt from being
       * accidentally reused.
       */
      sessionStorage.removeItem(
        SIGNUP_CODE_STORAGE_KEY
      );

      /**
       * Clear any previous diagnostic watchdog before
       * beginning a new connection attempt.
       */
      if (
        waEmbeddedSignupWatchdogTimer.current
      ) {
        clearTimeout(
          waEmbeddedSignupWatchdogTimer.current
        );

        waEmbeddedSignupWatchdogTimer.current =
          null;
      }

      setConnecting(true);

      try {
window.FB.login(
  (response) => {
    /**
     * Meta returns the authorization code through
     * the FB.login callback.
     */
    const code =
      response?.authResponse
        ?.code;

    if (!code) {
      setConnecting(false);

      return;
    }

    try {
      sessionStorage.setItem(
        SIGNUP_CODE_STORAGE_KEY,
        code
      );
    } catch {
      setConnecting(false);

      alert(
        "Unable to continue WhatsApp connection because browser session storage is unavailable."
      );

      return;
    }

    waEmbeddedSignupWatchdogTimer.current =
      setTimeout(() => {
        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "=================================================="
        );

        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "WA_EMBEDDED_SIGNUP WATCHDOG FIRED."
        );

        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "No WA_EMBEDDED_SIGNUP message was received before the watchdog expired.",
          {
            waitedMilliseconds:
              30000,
            currentTime:
              new Date().toISOString(),
            configId:
              WHATSAPP_CONFIG_ID,
            sessionInfoVersion:
              3,
          }
        );

        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "IMPORTANT: OAuth authorization succeeded, but no usable WA_EMBEDDED_SIGNUP message reached the RISNAR page."
        );

        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "Check the FACEBOOK POSTMESSAGE RECEIVED entries immediately above this message."
        );

        console.error(
          "[RISNAR WhatsApp DEBUG]",
          "=================================================="
        );

        waEmbeddedSignupWatchdogTimer.current =
          null;

        setConnecting(false);
      }, 30000);

    console.log(
      "[RISNAR WhatsApp DEBUG]",
      "WA_EMBEDDED_SIGNUP WATCHDOG STARTED.",
      {
        startedAt:
          new Date().toISOString(),
        configId:
          WHATSAPP_CONFIG_ID,
        sessionInfoVersion:
          3,
      }
    );
  },
  {
    config_id:
      WHATSAPP_CONFIG_ID,

    response_type:
      "code",

    override_default_response_type:
      true,

    extras: {
      setup: {},
      featureType:
        "whatsapp_business_app_onboarding",
      sessionInfoVersion: "3",
    },
  }
);
      } catch {
        if (
          waEmbeddedSignupWatchdogTimer.current
        ) {
          clearTimeout(
            waEmbeddedSignupWatchdogTimer.current
          );

          waEmbeddedSignupWatchdogTimer.current =
            null;
        }

        setConnecting(false);

        alert(
          "Unable to start WhatsApp connection."
        );
      }
    };

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={
          initializeMetaSDK
        }
        onError={() => {
          setSdkReady(false);
        }}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Settings
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your RISNAR CRM integrations and account settings.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              WhatsApp Business
            </h2>

            <p className="text-sm text-gray-400">
              Connect your WhatsApp Business account to RISNAR CRM.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-300">
            <p>
              ✓ Receive WhatsApp messages in RISNAR Inbox
            </p>

            <p>
              ✓ Reply to leads from RISNAR CRM
            </p>

            <p>
              ✓ Manage WhatsApp contacts
            </p>

            <p>
              ✓ Send approved message templates
            </p>

            <p>
              ✓ Run WhatsApp campaigns
            </p>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={
              connectWhatsApp
            }
            disabled={
              !sdkReady ||
              connecting
            }
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {connecting
              ? "Connecting..."
              : sdkReady
                ? "Connect WhatsApp"
                : "Loading..."}
          </button>
        </div>
      </div>
    </>
  );
}