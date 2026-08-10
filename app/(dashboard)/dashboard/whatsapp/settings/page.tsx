"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

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
        }) => void,
        options: {
          config_id: string;
          response_type: string;
          override_default_response_type: boolean;
          extras?: {
            setup?: Record<string, unknown>;
          };
        }
      ) => void;
    };
  }
}

const META_APP_ID = "1876583616650920";
const WHATSAPP_CONFIG_ID = "4412997948981440";

export default function Page() {
  const [sdkReady, setSdkReady] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (
        event.origin !== "https://www.facebook.com" &&
        event.origin !== "https://web.facebook.com"
      ) {
        return;
      }

      let data: {
        type?: string;
        event?: string;
        data?: {
          waba_id?: string;
          phone_number_id?: string;
          business_id?: string;
        };
      };

      try {
        data =
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;
      } catch {
        return;
      }

      if (data?.type !== "WA_EMBEDDED_SIGNUP") {
        return;
      }

      console.log(
        "WhatsApp Embedded Signup event:",
        data
      );

      if (data.event === "FINISH") {
        const code = sessionStorage.getItem(
          "risnar_whatsapp_signup_code"
        );

        const wabaId = data.data?.waba_id;
        const phoneNumberId = data.data?.phone_number_id;
        const businessId = data.data?.business_id;

        if (!code) {
          console.error(
            "Embedded Signup finished but authorization code is missing."
          );
          setConnecting(false);
          return;
        }

        if (!wabaId || !phoneNumberId) {
          console.error(
            "Embedded Signup finished but WABA ID or Phone Number ID is missing.",
            {
              wabaId,
              phoneNumberId,
            }
          );
          setConnecting(false);
          return;
        }

        try {
          const response = await fetch(
            "/api/whatsapp/connect",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code,
                wabaId,
                phoneNumberId,
                businessId,
              }),
            }
          );

          const result = await response.json();

          if (!response.ok || !result.success) {
            console.error(
              "RISNAR WhatsApp connection failed:",
              result
            );

            alert(
              result?.error ??
                "Unable to connect WhatsApp Business."
            );

            setConnecting(false);
            return;
          }

          sessionStorage.removeItem(
            "risnar_whatsapp_signup_code"
          );

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

          alert(
            "Unable to connect WhatsApp Business."
          );

          setConnecting(false);
        }
      }

      if (data.event === "CANCEL") {
        sessionStorage.removeItem(
          "risnar_whatsapp_signup_code"
        );

        console.log(
          "WhatsApp signup cancelled."
        );

        setConnecting(false);
      }

      if (data.event === "ERROR") {
        sessionStorage.removeItem(
          "risnar_whatsapp_signup_code"
        );

        console.error(
          "WhatsApp signup error:",
          data
        );

        setConnecting(false);
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
  };

  const connectWhatsApp = () => {
    if (!window.FB) {
      alert(
        "WhatsApp connection is still loading. Please try again."
      );
      return;
    }

    setConnecting(true);

    window.FB.login(
      (response) => {
        console.log(
          "Meta Login response received."
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

        sessionStorage.setItem(
          "risnar_whatsapp_signup_code",
          code
        );
      },
      {
        config_id: WHATSAPP_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: {
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
            onClick={connectWhatsApp}
            disabled={!sdkReady || connecting}
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