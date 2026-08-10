"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface WhatsAppSignupData {
  waba_id?: string;
  phone_number_id?: string;
  business_id?: string;
}

interface WhatsAppSignupEvent {
  type?: string;
  event?: string;
  data?: WhatsAppSignupData & {
    current_step?: string;
    error_message?: string;
  };
  version?: number;
}

interface MetaLoginResponse {
  authResponse?: {
    code?: string;
    accessToken?: string;
  };
}

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
        callback: (response: MetaLoginResponse) => void,
        options: {
          config_id: string;
          response_type: string;
          override_default_response_type: boolean;
          extras?: {
            /**
             * Meta Embedded Signup session information version.
             *
             * Meta currently accepts this as part of the
             * Embedded Signup extras configuration.
             */
            sessionInfoVersion?: number | string;

            /**
             * Optional Embedded Signup setup configuration.
             */
            setup?: Record<string, unknown>;
          };
        }
      ) => void;
    };
  }
}

const META_APP_ID = "1876583616650920";
const WHATSAPP_CONFIG_ID = "4412997948981440";

const SIGNUP_CODE_STORAGE_KEY =
  "risnar_whatsapp_signup_code";

export default function Page() {
  const [sdkReady, setSdkReady] = useState(false);
  const [connecting, setConnecting] = useState(false);

  /**
   * Meta can deliver the authorization code through
   * FB.login() and the WhatsApp account information
   * through window.postMessage().
   *
   * These two events are asynchronous and their order
   * is not guaranteed.
   *
   * Refs allow us to safely retain both values until
   * the complete connection information is available.
   */
  const authorizationCodeRef =
    useRef<string | null>(null);

  const signupDataRef =
    useRef<WhatsAppSignupData | null>(null);

  /**
   * Prevent duplicate API requests if Meta sends
   * more than one completion message.
   */
  const connectionRequestStartedRef =
    useRef(false);

  /**
   * Complete the RISNAR WhatsApp connection once
   * both required pieces of information are available:
   *
   * 1. Meta authorization code
   * 2. WABA + phone number information
   */
  const completeWhatsAppConnection =
    async () => {
      if (
        connectionRequestStartedRef.current
      ) {
        return;
      }

      const code =
        authorizationCodeRef.current;

      const signupData =
        signupDataRef.current;

      if (!code || !signupData) {
        return;
      }

      const wabaId =
        signupData.waba_id;

      const phoneNumberId =
        signupData.phone_number_id;

      const businessId =
        signupData.business_id;

      if (!wabaId || !phoneNumberId) {
        console.error(
          "Embedded Signup completed but WABA ID or Phone Number ID is missing.",
          {
            wabaId,
            phoneNumberId,
            businessId,
          }
        );

        setConnecting(false);
        return;
      }

      connectionRequestStartedRef.current =
        true;

      try {
        console.log(
          "Sending WhatsApp connection data to RISNAR API."
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

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          console.error(
            "RISNAR WhatsApp connection failed:",
            result
          );

          alert(
            result?.error ??
              "Unable to connect WhatsApp Business."
          );

          connectionRequestStartedRef.current =
            false;

          setConnecting(false);

          return;
        }

        /**
         * Connection completed successfully.
         *
         * Remove the temporary authorization code
         * only after the backend confirms success.
         */
        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        authorizationCodeRef.current =
          null;

        signupDataRef.current =
          null;

        console.log(
          "WhatsApp Business connected successfully:",
          result.connection
        );

        alert(
          "WhatsApp Business connected successfully."
        );

        setConnecting(false);
      } catch (error) {
        console.error(
          "RISNAR WhatsApp connection request failed:",
          error
        );

        connectionRequestStartedRef.current =
          false;

        alert(
          "Unable to connect WhatsApp Business."
        );

        setConnecting(false);
      }
    };

  useEffect(() => {
    /**
     * Meta Embedded Signup uses window.postMessage()
     * to communicate the WABA / phone-number information
     * back to the RISNAR page.
     *
     * IMPORTANT:
     *
     * Meta can use different Facebook subdomains.
     * Therefore we must NOT restrict this to only:
     *
     *     https://www.facebook.com
     *
     * or:
     *
     *     https://web.facebook.com
     *
     * Instead, we accept facebook.com itself and any
     * HTTPS subdomain of facebook.com.
     */
    const handleMessage = (
      event: MessageEvent
    ) => {
      /**
       * Diagnostic logging.
       *
       * This is intentionally kept here so that
       * browser DevTools clearly shows the Meta event
       * while we verify the Embedded Signup flow.
       */
      console.log(
        "Meta postMessage received:",
        {
          origin: event.origin,
          data: event.data,
        }
      );

      /**
       * Security check:
       *
       * Only accept messages from HTTPS Facebook
       * origins.
       */
      const isFacebookOrigin =
        typeof event.origin === "string" &&
        (
          event.origin ===
            "https://facebook.com" ||
          event.origin.endsWith(
            ".facebook.com"
          )
        );

      if (!isFacebookOrigin) {
        return;
      }

      let data:
        | WhatsAppSignupEvent
        | null = null;

      /**
       * Meta normally sends event.data as a JSON
       * string, but support an object as well.
       */
      try {
        data =
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;
      } catch (error) {
        console.error(
          "Unable to parse Meta postMessage data:",
          error
        );

        return;
      }

      if (!data) {
        return;
      }

      /**
       * Ignore unrelated Facebook messages.
       */
      if (
        data.type !==
        "WA_EMBEDDED_SIGNUP"
      ) {
        return;
      }

      console.log(
        "WhatsApp Embedded Signup event received:",
        data
      );

      /**
       * Meta may report successful completion
       * using FINISH.
       *
       * Some Embedded Signup configurations can
       * also report FINISH_ONLY_WABA.
       */
      if (
        data.event === "FINISH" ||
        data.event ===
          "FINISH_ONLY_WABA"
      ) {
        const signupData =
          data.data ?? {};

        console.log(
          "WhatsApp Embedded Signup completed:",
          signupData
        );

        /**
         * Store the Meta account information first.
         *
         * The FB.login callback may already have
         * supplied the authorization code, or it may
         * arrive immediately after this event.
         */
        signupDataRef.current =
          signupData;

        /**
         * Keep the information in sessionStorage too.
         * This preserves the existing RISNAR flow and
         * provides a temporary recovery point during
         * the current browser session.
         */
        const storedCode =
          sessionStorage.getItem(
            SIGNUP_CODE_STORAGE_KEY
          );

        if (
          storedCode &&
          !authorizationCodeRef.current
        ) {
          authorizationCodeRef.current =
            storedCode;
        }

        /**
         * Try to complete immediately.
         *
         * If FB.login() has not returned the code yet,
         * this safely does nothing. The FB.login callback
         * will call the same function again.
         */
        void completeWhatsAppConnection();

        return;
      }

      /**
       * User cancelled Embedded Signup.
       */
      if (
        data.event === "CANCEL"
      ) {
        console.log(
          "WhatsApp signup cancelled.",
          data
        );

        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        authorizationCodeRef.current =
          null;

        signupDataRef.current =
          null;

        connectionRequestStartedRef.current =
          false;

        setConnecting(false);

        return;
      }

      /**
       * Meta reported an Embedded Signup error.
       */
      if (
        data.event === "ERROR"
      ) {
        console.error(
          "WhatsApp Embedded Signup error:",
          data
        );

        sessionStorage.removeItem(
          SIGNUP_CODE_STORAGE_KEY
        );

        authorizationCodeRef.current =
          null;

        signupDataRef.current =
          null;

        connectionRequestStartedRef.current =
          false;

        setConnecting(false);

        alert(
          data.data?.error_message ??
            "WhatsApp Embedded Signup failed. Please try again."
        );
      }
    };

    /**
     * Register the message listener before the
     * user starts the Embedded Signup flow.
     */
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
   * Initialize the Facebook JavaScript SDK
   * after the SDK script has loaded.
   */
  const initializeMetaSDK = () => {
    if (!window.FB) {
      console.error(
        "Meta Facebook SDK is not available."
      );

      return;
    }

    window.FB.init({
      appId: META_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v25.0",
    });

    setSdkReady(true);

    console.log(
      "Meta Facebook SDK initialized."
    );
  };

  /**
   * Start the Meta WhatsApp Embedded Signup flow.
   */
  const connectWhatsApp = () => {
    if (!window.FB) {
      alert(
        "WhatsApp connection is still loading. Please try again."
      );

      return;
    }

    /**
     * Reset the previous Embedded Signup state
     * before starting a new attempt.
     */
    authorizationCodeRef.current =
      null;

    signupDataRef.current =
      null;

    connectionRequestStartedRef.current =
      false;

    sessionStorage.removeItem(
      SIGNUP_CODE_STORAGE_KEY
    );

    setConnecting(true);

    console.log(
      "Starting Meta WhatsApp Embedded Signup."
    );

    window.FB.login(
      (response) => {
        console.log(
          "Meta Login response received:",
          response
        );

        const code =
          response.authResponse?.code;

        if (!code) {
          console.error(
            "No Embedded Signup authorization code returned."
          );

          setConnecting(false);

          return;
        }

        console.log(
          "Embedded Signup authorization code received."
        );

        /**
         * Store the authorization code immediately.
         *
         * The FINISH postMessage can arrive either
         * before or after this callback.
         */
        authorizationCodeRef.current =
          code;

        sessionStorage.setItem(
          SIGNUP_CODE_STORAGE_KEY,
          code
        );

        /**
         * If Meta has already delivered the FINISH
         * event, complete the connection now.
         *
         * Otherwise this safely waits for the
         * postMessage handler.
         */
        void completeWhatsAppConnection();
      },
      {
        config_id:
          WHATSAPP_CONFIG_ID,

        response_type: "code",

        override_default_response_type:
          true,

        extras: {
          /**
           * Meta Embedded Signup session
           * information version.
           */
          sessionInfoVersion: 3,

          setup: {},
        },
      }
    );
  };

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={initializeMetaSDK}
        onError={() => {
          console.error(
            "Failed to load Meta Facebook SDK."
          );
        }}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Settings
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your RISNAR CRM integrations and
            account settings.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              WhatsApp Business
            </h2>

            <p className="text-sm text-gray-400">
              Connect your WhatsApp Business account
              to RISNAR CRM.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-300">
            <p>
              ✓ Receive WhatsApp messages in RISNAR
              Inbox
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
            onClick={connectWhatsApp}
            disabled={
              !sdkReady || connecting
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