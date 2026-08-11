"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * RISNAR CRM — WhatsApp Embedded Signup
 *
 * DEBUG VERSION
 * --------------
 * This file contains detailed browser-console diagnostics for the
 * Meta WhatsApp Embedded Signup flow.
 *
 * The debug log intentionally traces every important stage:
 *
 * 1. Facebook SDK loading / initialization
 * 2. Connect button click
 * 3. FB.login invocation
 * 4. Meta login callback
 * 5. Authorization code reception
 * 6. sessionStorage write
 * 7. Every window.postMessage received from Meta
 * 8. Message origin
 * 9. Raw message data type/content
 * 10. JSON parsing
 * 11. WA_EMBEDDED_SIGNUP events
 * 12. FINISH / FINISH_ONLY_WABA / CANCEL / ERROR
 * 13. WABA / phone / business IDs
 * 14. /api/whatsapp/connect request
 * 15. HTTP response status
 * 16. API response body
 * 17. Final success/failure
 *
 * IMPORTANT:
 * - No access tokens are intentionally printed.
 * - The authorization code is logged only as a masked value.
 * - Existing UI and connection flow are preserved.
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
            sessionInfoVersion?: string;
          };
        }
      ) => void;
    };
  }
}

const META_APP_ID = "1876583616650920";

/**
 * NEW Meta WhatsApp Embedded Signup configuration.
 *
 * Old configuration:
 * 4412997948981440
 *
 * New template-created configuration:
 * 1583260966778990
 */
const WHATSAPP_CONFIG_ID = "1583260966778990";

const SIGNUP_CODE_STORAGE_KEY =
  "risnar_whatsapp_signup_code";

/**
 * Creates a timestamped debug prefix so the browser console
 * shows exactly when each stage happened.
 */
function debugPrefix() {
  return `[RISNAR WhatsApp DEBUG ${new Date().toISOString()}]`;
}

/**
 * Centralized debug logger.
 *
 * Keeping all diagnostics behind one function makes it easy
 * to remove or reduce logging later without changing the
 * actual WhatsApp connection logic.
 */
function debugLog(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.log(`${debugPrefix()} ${message}`);
  } else {
    console.log(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

/**
 * Debug warning logger.
 */
function debugWarn(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.warn(`${debugPrefix()} ${message}`);
  } else {
    console.warn(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

/**
 * Debug error logger.
 */
function debugError(
  message: string,
  data?: unknown
) {
  if (typeof data === "undefined") {
    console.error(`${debugPrefix()} ${message}`);
  } else {
    console.error(
      `${debugPrefix()} ${message}`,
      data
    );
  }
}

/**
 * Masks sensitive authorization-code data.
 *
 * We do NOT want the complete authorization code
 * printed into the browser console.
 */
function maskSensitiveValue(
  value?: string
) {
  if (!value) {
    return "(missing)";
  }

  if (value.length <= 8) {
    return "********";
  }

  return `${value.slice(
    0,
    4
  )}********${value.slice(-4)}`;
}

export default function Page() {
  const [sdkReady, setSdkReady] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  /**
   * Listen for messages posted by Meta's Embedded Signup iframe/window.
   *
   * This listener deliberately logs EVERY Facebook-origin message
   * before attempting to parse it.
   *
   * This is important because Meta can send messages that are not
   * the WA_EMBEDDED_SIGNUP completion message.
   */
  useEffect(() => {
    debugLog(
      "Installing window.message listener."
    );

    const handleMessage = async (
      event: MessageEvent
    ) => {
      debugLog(
        "window.postMessage RECEIVED."
      );

      debugLog(
        "Message origin:",
        event.origin
      );

      debugLog(
        "Message data type:",
        typeof event.data
      );

      debugLog(
        "Raw message data:",
        event.data
      );

      /**
       * Security check.
       *
       * Only messages originating from Facebook
       * are relevant to Embedded Signup.
       */
      if (
        event.origin !==
          "https://www.facebook.com" &&
        event.origin !==
          "https://web.facebook.com"
      ) {
        debugWarn(
          "Ignoring message because origin is not an allowed Facebook origin.",
          event.origin
        );

        return;
      }

      debugLog(
        "Message origin accepted."
      );

let data: {
        type?: string;
        event?: string;
        data?: {
          waba_id?: string;
          phone_number_id?: string;
          business_id?: string;
        };
      };

      /**
       * Meta sends several non-JSON messages from the same
       * facebook.com origin (e.g. cookie/xd_arbiter style
       * messages such as "cb=...&domain=...&is_canvas=...").
       *
       * These are NOT Embedded Signup messages and must be
       * silently ignored WITHOUT attempting JSON.parse,
       * otherwise every one of them is incorrectly logged
       * as a parsing failure.
       */
      const rawData = event.data;

      const looksLikeJson =
        typeof rawData === "object" ||
        (typeof rawData === "string" &&
          (rawData.trim().startsWith("{") ||
            rawData.trim().startsWith("[")));

      if (!looksLikeJson) {
        debugLog(
          "Ignoring non-JSON Facebook SDK message (not Embedded Signup related).",
          rawData
        );

        return;
      }

      try {
        data =
          typeof rawData === "string"
            ? JSON.parse(rawData)
            : rawData;

        debugLog(
          "Message JSON parsing SUCCESS.",
          data
        );
      } catch (error) {
        debugWarn(
          "Message JSON parsing FAILED. This message is being ignored because it is not valid JSON.",
          {
            error,
            rawData,
          }
        );

        return;
      }

      debugLog(
        "Parsed Meta message:",
        data
      );

      debugLog(
        "Parsed message type:",
        data?.type
      );

      debugLog(
        "Parsed message event:",
        data?.event
      );

      /**
       * We only process the WhatsApp Embedded Signup
       * messages.
       */
      if (
        data?.type !==
        "WA_EMBEDDED_SIGNUP"
      ) {
        debugLog(
          "Parsed message is NOT WA_EMBEDDED_SIGNUP. Ignoring it.",
          {
            type: data?.type,
            event: data?.event,
          }
        );

        return;
      }

      debugLog(
        "WA_EMBEDDED_SIGNUP MESSAGE RECEIVED.",
        data
      );

      /**
       * FINISH
       *
       * Standard Embedded Signup completion.
       *
       * FINISH_ONLY_WABA
       *
       * WABA-only completion variant.
       *
       * We currently process both because Meta can return either
       * depending on the configured Embedded Signup flow.
       */
      if (
        data.event === "FINISH" ||
        data.event ===
          "FINISH_ONLY_WABA"
      ) {
        debugLog(
          `Embedded Signup completion event received: ${data.event}`
        );

        debugLog(
          "Embedded Signup completion payload:",
          data.data
        );

        /**
         * Retrieve the authorization code that was returned
         * by FB.login.
         */
        const code =
          sessionStorage.getItem(
            SIGNUP_CODE_STORAGE_KEY
          );

        debugLog(
          "Authorization code retrieved from sessionStorage:",
          maskSensitiveValue(code ?? undefined)
        );

        const wabaId =
          data.data?.waba_id;

        const phoneNumberId =
          data.data?.phone_number_id;

        const businessId =
          data.data?.business_id;

        debugLog(
          "Embedded Signup identifiers:",
          {
            wabaId,
            phoneNumberId,
            businessId,
            event: data.event,
          }
        );

        /**
         * The authorization code is required by our
         * server-side connection endpoint.
         */
        if (!code) {
          debugError(
            "STOP: Embedded Signup finished but authorization code is missing from sessionStorage."
          );

          setConnecting(false);

          return;
        }

        /**
         * WABA ID is required.
         *
         * Phone Number ID may not be present for
         * FINISH_ONLY_WABA, so we deliberately do not
         * reject the event solely because phoneNumberId
         * is missing.
         */
        if (!wabaId) {
          debugError(
            "STOP: Embedded Signup finished but WABA ID is missing.",
            {
              wabaId,
              phoneNumberId,
              businessId,
              event: data.event,
            }
          );

          setConnecting(false);

          return;
        }

        debugLog(
          "Required Embedded Signup data is available. Preparing /api/whatsapp/connect request."
        );

        try {
          debugLog(
            "POST /api/whatsapp/connect STARTING.",
            {
              wabaId,
              phoneNumberId,
              businessId,
              event: data.event,
              hasAuthorizationCode:
                Boolean(code),
            }
          );

          const requestBody = {
            code,
            wabaId,
            phoneNumberId,
            businessId,
          };

          debugLog(
            "Request payload prepared.",
            {
              ...requestBody,
              code: maskSensitiveValue(
                code
              ),
            }
          );

          const requestStartedAt =
            Date.now();

          const response =
            await fetch(
              "/api/whatsapp/connect",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  requestBody
                ),
              }
            );

          const requestDuration =
            Date.now() -
            requestStartedAt;

          debugLog(
            "POST /api/whatsapp/connect RESPONSE RECEIVED.",
            {
              status: response.status,
              statusText:
                response.statusText,
              ok: response.ok,
              durationMs:
                requestDuration,
            }
          );

          /**
           * Read the response as text first.
           *
           * This lets us diagnose cases where the server returns
           * HTML, an empty body, malformed JSON, or JSON.
           */
          const rawResponse =
            await response.text();

          debugLog(
            "Raw /api/whatsapp/connect response:",
            rawResponse
          );

          let result: {
            success?: boolean;
            error?: string;
            connection?: unknown;
            [key: string]: unknown;
          } = {};

          try {
            result = rawResponse
              ? JSON.parse(
                  rawResponse
                )
              : {};

            debugLog(
              "API response JSON parsing SUCCESS.",
              result
            );
          } catch (error) {
            debugError(
              "API response JSON parsing FAILED.",
              {
                error,
                rawResponse,
              }
            );

            alert(
              `WhatsApp connection failed. Server returned HTTP ${response.status} but not valid JSON.`
            );

            setConnecting(false);

            return;
          }

          debugLog(
            "Final API response evaluation:",
            {
              httpStatus:
                response.status,
              responseOk:
                response.ok,
              success:
                result?.success,
              error:
                result?.error,
            }
          );

          if (
            !response.ok ||
            !result.success
          ) {
            debugError(
              "RISNAR WhatsApp connection FAILED.",
              {
                status:
                  response.status,
                statusText:
                  response.statusText,
                result,
              }
            );

            alert(
              result?.error ??
                `Unable to connect WhatsApp Business. HTTP ${response.status}.`
            );

            setConnecting(false);

            return;
          }

          /**
           * Connection succeeded.
           */
          debugLog(
            "RISNAR WhatsApp connection SUCCEEDED.",
            result.connection
          );

          /**
           * Authorization code is single-use.
           * Remove it only after the server confirms success.
           */
          sessionStorage.removeItem(
            SIGNUP_CODE_STORAGE_KEY
          );

          debugLog(
            "Authorization code removed from sessionStorage after successful connection."
          );

          alert(
            "WhatsApp Business connected successfully."
          );

          setConnecting(false);

          debugLog(
            "Embedded Signup flow COMPLETED SUCCESSFULLY."
          );
        } catch (error) {
          debugError(
            "FETCH /api/whatsapp/connect THREW AN EXCEPTION.",
            error
          );

          alert(
            "Unable to connect WhatsApp Business."
          );

          setConnecting(false);
        }

        return;
      }

      /**
       * User cancelled the Embedded Signup flow.
       */
      if (
        data.event === "CANCEL"
      ) {
        debugWarn(
          "WhatsApp Embedded Signup CANCEL event received.",
          data
        );

        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        debugLog(
          "Authorization code removed from sessionStorage because signup was cancelled."
        );

        setConnecting(false);

        return;
      }

      /**
       * Meta reported an Embedded Signup error.
       */
      if (
        data.event === "ERROR"
      ) {
        debugError(
          "WhatsApp Embedded Signup ERROR event received.",
          data
        );

        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        debugLog(
          "Authorization code removed from sessionStorage because signup returned an ERROR event."
        );

        setConnecting(false);

        return;
      }

      /**
       * WA_EMBEDDED_SIGNUP message received but event was
       * something other than FINISH / FINISH_ONLY_WABA /
       * CANCEL / ERROR.
       *
       * We log it rather than silently ignoring it.
       */
      debugWarn(
        "WA_EMBEDDED_SIGNUP message received with an unhandled event.",
        data
      );
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    debugLog(
      "window.message listener INSTALLED."
    );

    return () => {
      debugLog(
        "Removing window.message listener."
      );

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
      debugLog(
        "Meta Facebook SDK onLoad fired."
      );

      debugLog(
        "Checking window.FB:",
        Boolean(window.FB)
      );

      if (!window.FB) {
        debugError(
          "Meta Facebook SDK loaded callback fired, but window.FB is unavailable."
        );

        return;
      }

      debugLog(
        "Calling FB.init.",
        {
          appId: META_APP_ID,
          version: "v25.0",
          cookie: true,
          xfbml: true,
        }
      );

      window.FB.init({
        appId: META_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v25.0",
      });

      debugLog(
        "FB.init COMPLETED."
      );

      setSdkReady(true);

      debugLog(
        "sdkReady set to TRUE."
      );
    };

  /**
   * Start Meta WhatsApp Embedded Signup.
   */
  const connectWhatsApp =
    () => {
      debugLog(
        "=================================================="
      );

      debugLog(
        "CONNECT WHATSAPP BUTTON CLICKED."
      );

      debugLog(
        "Current SDK state:",
        {
          sdkReady,
          hasWindowFB:
            Boolean(window.FB),
          configId:
            WHATSAPP_CONFIG_ID,
          appId: META_APP_ID,
        }
      );

      debugLog(
        "Existing signup code in sessionStorage:",
        maskSensitiveValue(
          sessionStorage.getItem(
            SIGNUP_CODE_STORAGE_KEY
          ) ?? undefined
        )
      );

      if (!window.FB) {
        debugError(
          "Cannot start Embedded Signup because window.FB is unavailable."
        );

        alert(
          "WhatsApp connection is still loading. Please try again."
        );

        return;
      }

      setConnecting(true);

      debugLog(
        "connecting state set to TRUE."
      );

      /**
       * IMPORTANT:
       *
       * The authorization code returned by FB.login is saved
       * before the Embedded Signup completion postMessage
       * is processed.
       */
      debugLog(
        "Calling window.FB.login NOW.",
        {
          config_id:
            WHATSAPP_CONFIG_ID,
          response_type: "code",
          override_default_response_type:
            true,
          extras: {
            setup: {},
            sessionInfoVersion: "3",
          },
        }
      );

      try {
        window.FB.login(
          (response) => {
            debugLog(
              "=================================================="
            );

            debugLog(
              "Meta Login CALLBACK RECEIVED."
            );

            /**
             * Do not print the complete response because
             * authResponse may contain sensitive credentials.
             */
            debugLog(
              "Meta Login response summary:",
              {
                status:
                  response?.status,
                hasAuthResponse:
                  Boolean(
                    response?.authResponse
                  ),
                hasCode:
                  Boolean(
                    response?.authResponse
                      ?.code
                  ),
                hasAccessToken:
                  Boolean(
                    response?.authResponse
                      ?.accessToken
                  ),
              }
            );

            const code =
              response.authResponse
                ?.code;

            debugLog(
              "Authorization code returned:",
              maskSensitiveValue(code)
            );

            if (!code) {
              debugError(
                "Meta Login completed WITHOUT an authorization code.",
                {
                  status:
                    response?.status,
                  hasAuthResponse:
                    Boolean(
                      response?.authResponse
                    ),
                }
              );

              setConnecting(false);

              return;
            }

            debugLog(
              "Authorization code RECEIVED successfully."
            );

            /**
             * Store the code so the later
             * WA_EMBEDDED_SIGNUP message handler
             * can use it.
             */
            try {
              sessionStorage.setItem(
                SIGNUP_CODE_STORAGE_KEY,
                code
              );

              debugLog(
                "Authorization code SAVED to sessionStorage."
              );

              debugLog(
                "sessionStorage verification:",
                maskSensitiveValue(
                  sessionStorage.getItem(
                    SIGNUP_CODE_STORAGE_KEY
                  ) ?? undefined
                )
              );
            } catch (error) {
              debugError(
                "FAILED to save authorization code to sessionStorage.",
                error
              );

              setConnecting(false);

              return;
            }

            debugLog(
              "Waiting for WA_EMBEDDED_SIGNUP postMessage completion event..."
            );
          },
          {
            config_id:
              WHATSAPP_CONFIG_ID,

            response_type: "code",

            override_default_response_type:
              true,

            extras: {
              setup: {},
              sessionInfoVersion: "3",
            },
          }
        );

debugLog(
          "window.FB.login invocation completed without synchronous exception."
        );

        /**
         * DIAGNOSTIC TIMEOUT.
         *
         * If Meta never sends a WA_EMBEDDED_SIGNUP completion
         * message (FINISH / FINISH_ONLY_WABA / CANCEL / ERROR)
         * within 2 minutes, the button would otherwise be stuck
         * on "Connecting..." forever with no explanation.
         *
         * This does NOT fix a code bug — it surfaces that Meta's
         * side of the flow (the config_id's Embedded Signup setup)
         * never reached completion.
         */
        setTimeout(() => {
          setConnecting((current) => {
            if (current) {
              debugError(
                "TIMEOUT: No WA_EMBEDDED_SIGNUP completion message arrived within 120s. " +
                  "This means the popup never completed the WhatsApp signup wizard. " +
                  "Check the config_id's Embedded Signup setup in Meta App Dashboard " +
                  "(WhatsApp > Embedded Signup), and confirm the logged-in user is an " +
                  "approved tester/admin if the app is in Development Mode.",
                { config_id: WHATSAPP_CONFIG_ID, app_id: META_APP_ID }
              );

              alert(
                "WhatsApp connection timed out waiting for Meta to finish. Please check your Meta App's Embedded Signup configuration."
              );
            }

            return false;
          });
        }, 120000);
      } catch (error) {
        debugError(
          "window.FB.login THREW A SYNCHRONOUS EXCEPTION.",
          error
        );

        setConnecting(false);
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
          debugError(
            "Failed to load Meta Facebook SDK."
          );

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