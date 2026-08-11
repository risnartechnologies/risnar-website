"use client";

import { useEffect, useState } from "react";
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
            sessionInfoVersion?: number;
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
    const handleMessage = async (
      event: MessageEvent
    ) => {
      /**
       * Only accept HTTPS Facebook-owned origins.
       *
       * This intentionally allows Facebook subdomains such as:
       *
       *   www.facebook.com
       *   web.facebook.com
       *   business.facebook.com
       *
       * because Embedded Signup may use a Facebook subdomain
       * other than the primary www host.
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
       * Meta may send strings that are not JSON.
       *
       * Example OAuth callback:
       *
       *   cb=...&domain=...&code=...
       *
       * That message is NOT the Embedded Signup completion
       * message and must not be passed to JSON.parse().
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
         * Embedded Signup completion messages are JSON.
         *
         * Ignore OAuth callback / internal Facebook strings.
         */
        if (
          !rawData.startsWith("{")
        ) {
          return;
        }

        try {
          data = JSON.parse(
            rawData
          ) as EmbeddedSignupMessage;
        } catch {
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
       * Ignore every Facebook message that is not the
       * WhatsApp Embedded Signup message.
       */
      if (
        data.type !==
        "WA_EMBEDDED_SIGNUP"
      ) {
        return;
      }

      /**
       * Meta can report the normal completion or the
       * WABA-only completion variant.
       */
      if (
        data.event !== "FINISH" &&
        data.event !==
          "FINISH_ONLY_WABA"
      ) {
        /**
         * CANCEL and ERROR both terminate the connection attempt.
         */
        if (
          data.event === "CANCEL" ||
          data.event === "ERROR"
        ) {
          sessionStorage.removeItem(
            SIGNUP_CODE_STORAGE_KEY
          );

          setConnecting(false);

          return;
        }

        /**
         * Unknown Embedded Signup events are ignored safely.
         */
        return;
      }

      /**
       * Retrieve the authorization code returned earlier by FB.login().
       *
       * The code is single-use and must be exchanged server-side.
       */
      const code =
        sessionStorage.getItem(
          SIGNUP_CODE_STORAGE_KEY
        );

      if (!code) {
        setConnecting(false);

        alert(
          "WhatsApp connection could not be completed because the authorization code is missing."
        );

        return;
      }

      /**
       * Extract the identifiers supplied by Meta.
       */
      const wabaId =
        data.data?.waba_id;

      const phoneNumberId =
        data.data?.phone_number_id;

      const businessId =
        data.data?.business_id;

      /**
       * WABA ID is required by the server-side connection endpoint.
       */
      if (!wabaId) {
        setConnecting(false);

        alert(
          "WhatsApp connection could not be completed because the WhatsApp Business Account ID is missing."
        );

        return;
      }

      try {
        /**
         * Send the authorization code and Embedded Signup
         * identifiers to the server.
         *
         * The server performs the Meta token exchange and
         * persists the WhatsApp connection.
         */
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
         * Read the body as text first so an unexpected HTML,
         * empty response, or malformed response cannot cause
         * an unhandled JSON parsing exception.
         */
        const rawResponse =
          await response.text();

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
         * The authorization code is now consumed by the
         * server-side flow, so remove it from sessionStorage.
         */
        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        setConnecting(false);

        alert(
          "WhatsApp Business connected successfully."
        );
      } catch {
        setConnecting(false);

        alert(
          "Unable to connect WhatsApp Business."
        );
      }
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );
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
        version: "v25.0",
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

            /**
             * Store the one-time authorization code until
             * the WA_EMBEDDED_SIGNUP completion message arrives.
             */
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
          },
          {
            config_id:
              WHATSAPP_CONFIG_ID,

            response_type: "code",

            override_default_response_type:
              true,

            /**
             * Meta Embedded Signup session information.
             *
             * sessionInfoVersion is intentionally numeric because
             * the local FB.login TypeScript declaration defines it
             * as a number.
             */
            extras: {
              setup: {},
              sessionInfoVersion: 3,
            },
          }
        );
      } catch {
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