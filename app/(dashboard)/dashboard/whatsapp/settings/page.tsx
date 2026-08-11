"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface WhatsAppSignupData {
  waba_id?: string;
  phone_number_id?: string;
  business_id?: string;
  current_step?: string;
  error_message?: string;
}

interface WhatsAppSignupEvent {
  type?: string;
  event?: string;
  data?: WhatsAppSignupData;
  version?: number;
}

interface MetaLoginResponse {
  authResponse?: {
    code?: string;
    accessToken?: string;
  };
  status?: string;
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
            sessionInfoVersion?: string;
            setup?: Record<string, unknown>;
          };
        }
      ) => void;
    };
  }
}

const META_APP_ID = "1876583616650920";

const WHATSAPP_CONFIG_ID = "1583260966778990";

const SIGNUP_CODE_STORAGE_KEY =
  "risnar_whatsapp_signup_code";

export default function Page() {
  const [sdkReady, setSdkReady] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  /*
   * Meta returns the authorization code through
   * FB.login().
   *
   * The WABA / phone information arrives separately
   * through window.postMessage().
   *
   * These refs allow us to safely combine both pieces
   * regardless of which event arrives first.
   */
  const authorizationCodeRef =
    useRef<string | null>(null);

  const signupDataRef =
    useRef<WhatsAppSignupData | null>(null);

  /*
   * Prevent the backend connection request from
   * being sent more than once.
   */
  const connectionRequestStartedRef =
    useRef(false);

  /*
   * Sends the completed Embedded Signup information
   * to the RISNAR backend.
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

      /*
       * Both pieces are required.
       *
       * FB.login() provides the code.
       * WA_EMBEDDED_SIGNUP provides the WABA
       * and phone number information.
       */
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
          "WhatsApp Embedded Signup completed but WABA ID or Phone Number ID is missing.",
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

      console.log(
        "WhatsApp Embedded Signup data received.",
        {
          wabaId,
          phoneNumberId,
          businessId,
        }
      );

      try {
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

        console.log(
          "RISNAR WhatsApp connection API response:",
          result
        );

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

        /*
         * The backend confirmed success.
         * Remove the temporary authorization code.
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

        setConnecting(false);

        alert(
          "Unable to connect WhatsApp Business."
        );
      }
    };

  useEffect(() => {
    /*
     * Meta Embedded Signup communicates the selected
     * WhatsApp Business Account through postMessage().
     *
     * IMPORTANT:
     *
     * Facebook also sends other messages during OAuth.
     * Some of those messages are NOT JSON.
     *
     * Therefore we must NEVER assume every event.data
     * value can be passed directly to JSON.parse().
     */

    
    const handleMessage = (
      event: MessageEvent
    ) => {
      /*
       * Meta sends several different postMessage payloads
       * during the OAuth / Embedded Signup flow.
       *
       * Some messages are plain strings.
       * Some implementations can deliver the payload
       * as an already-parsed JavaScript object.
       *
       * We therefore normalize both formats before
       * checking for WA_EMBEDDED_SIGNUP.
       */

      console.log(
        "Meta postMessage received:",
        {
          origin: event.origin,
          data: event.data,
          dataType: typeof event.data,
        }
      );

      /*
       * Only process messages coming from Facebook.
       */
      if (
        !event.origin ||
        !event.origin.endsWith(
          ".facebook.com"
        ) &&
        event.origin !==
          "https://facebook.com"
      ) {
        return;
      }

      /*
       * Normalize event.data.
       *
       * Meta normally sends the Embedded Signup
       * event as a JSON string, but we also support
       * an already-parsed object.
       */
      let data:
        | WhatsAppSignupEvent
        | null = null;

      if (
        typeof event.data === "string"
      ) {
        const rawData =
          event.data.trim();

        /*
         * Ignore empty messages.
         */
        if (!rawData) {
          return;
        }

        /*
         * Facebook sends non-JSON OAuth messages too,
         * for example:
         *
         * data=...
         *
         * These are unrelated to Embedded Signup.
         */
        if (
          !rawData.startsWith("{")
        ) {
          return;
        }

        try {
          data =
            JSON.parse(rawData);
        } catch {
          /*
           * Ignore malformed/non-JSON Facebook
           * messages without interrupting the
           * Embedded Signup flow.
           */
          return;
        }
      } else if (
        typeof event.data === "object" &&
        event.data !== null
      ) {
        /*
         * Support an already-parsed postMessage
         * payload.
         */
        data =
          event.data as WhatsAppSignupEvent;
      } else {
        return;
      }

      /*
       * Ignore all Facebook messages that are not
       * WhatsApp Embedded Signup events.
       */
      if (
        data?.type !==
        "WA_EMBEDDED_SIGNUP"
      ) {
        return;
      }

      console.log(
        "WhatsApp Embedded Signup event received:",
        data
      );

      /*
       * Successful Embedded Signup.
       *
       * Meta provides the WABA, phone number and
       * business information in data.data.
       */
      if (
        data.event === "FINISH"
      ) {
        signupDataRef.current =
          data.data ?? {};

        console.log(
          "WhatsApp Embedded Signup FINISH received:",
          data.data
        );

        /*
         * completeWhatsAppConnection() checks both:
         *
         * 1. authorizationCodeRef
         * 2. signupDataRef
         *
         * This allows either Meta event to arrive first.
         */
        void completeWhatsAppConnection();

        return;
      }

      /*
       * Some configurations may complete with only
       * the WABA information.
       */
      if (
        data.event ===
        "FINISH_ONLY_WABA"
      ) {
        signupDataRef.current =
          data.data ?? {};

        console.log(
          "WhatsApp Embedded Signup FINISH_ONLY_WABA received:",
          data.data
        );

        void completeWhatsAppConnection();

        return;
      }

      /*
       * User cancelled the Embedded Signup flow.
       */
      if (
        data.event === "CANCEL"
      ) {
        console.warn(
          "WhatsApp Embedded Signup cancelled:",
          data.data
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

      /*
       * Meta reported an Embedded Signup error.
       */
      if (
        data.event === "ERROR"
      ) {
        console.error(
          "WhatsApp Embedded Signup error:",
          data.data
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
            "WhatsApp Embedded Signup failed."
        );

        return;
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

  /*
   * Initialize the Meta JavaScript SDK.
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

  /*
   * Starts Meta's WhatsApp Embedded Signup flow.
   */
  const connectWhatsApp = () => {
    if (!window.FB) {
      alert(
        "WhatsApp connection is still loading. Please try again."
      );

      return;
    }

    /*
     * Clear state from any previous attempt.
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
            "No Embedded Signup authorization code returned.",
            response
          );

          setConnecting(false);

          return;
        }

        /*
         * Save the authorization code.
         */
        authorizationCodeRef.current =
          code;

        sessionStorage.setItem(
          SIGNUP_CODE_STORAGE_KEY,
          code
        );

        console.log(
          "Embedded Signup authorization code received."
        );

        /*
         * The WA_EMBEDDED_SIGNUP FINISH message
         * may already have arrived.
         *
         * If so, complete the connection now.
         *
         * Otherwise this simply waits until the
         * message handler receives FINISH.
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
          /*
           * IMPORTANT:
           *
           * Meta Embedded Signup expects the
           * session information version as a string.
           */
          sessionInfoVersion: "3",

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
            Manage your RISNAR CRM integrations
            and account settings.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              WhatsApp Business
            </h2>

            <p className="text-sm text-gray-400">
              Connect your WhatsApp Business
              account to RISNAR CRM.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-300">
            <p>
              ✓ Receive WhatsApp messages in
              RISNAR Inbox
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