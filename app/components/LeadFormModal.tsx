"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useLeadForm } from "@/app/context/LeadFormContext";

/* =========================================================
   LEAD FORM MODAL
   ---------------------------------------------------------
   FEATURES
   ---------------------------------------------------------
   ✓ Global modal
   ✓ Mailto submission
   ✓ Auto currency detection (Next Step)
   ✓ Dynamic budget options (Next Step)
   ✓ Dynamic UI (Next Step)
   ✓ Responsive
   ========================================================= */

export default function LeadFormModal() {
  /* =====================================================
     GLOBAL MODAL
     ===================================================== */

  const {
    isOpen,
    openLeadForm,
    closeLeadForm,
  } = useLeadForm();

  /* =====================================================
     USER DETAILS
     ===================================================== */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  /* =====================================================
     PROJECT
     ===================================================== */

  const [
    projectType,
    setProjectType,
  ] = useState(
    "App Development"
  );

  const [budget, setBudget] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =====================================================
     COUNTRY & CURRENCY
     -----------------------------------------------------
     Detects the visitor's country.
  
     INDIA
     -----
     Currency : INR (₹)
  
     OTHER COUNTRIES
     ----------------
     Currency : USD ($)
  
     NOTE:
     Actual detection will be implemented
     in the next step.
     ===================================================== */

  type Currency =
    | "INR"
    | "USD";

  const [
    currency,
    setCurrency,
  ] =
    useState<Currency>(
      "INR"
    );

  const isIndianUser =
    currency === "INR";

  const currencySymbol =
    isIndianUser
      ? "₹"
      : "$";

  /* =====================================================
     BUDGET OPTIONS
     -----------------------------------------------------
     Budget options change automatically based on:
  
     1. Visitor Currency
        • INR (India)
        • USD (Outside India)
  
     2. Selected Project Type
  
     This keeps the enquiry form relevant for every
     service and every country.
  
     ===================================================== */

  const budgetOptions =
    useMemo(() => {
      const options = {
        "App Development":
          isIndianUser
            ? [
              "< ₹50k",
              "₹50k – ₹1Lakh",
              "₹1L – ₹5Lakhs",
              "₹5Lakhs+",
            ]
            : [
              "< $500",
              "$500 – $2k",
              "$2k – $5k",
              "$5k+",
            ],

        "Website Development":
          isIndianUser
            ? [
              "< ₹50k",
              "₹50k – ₹1L",
              "₹1L – ₹5L",
              "₹5L+",
            ]
            : [
              "< $500",
              "$500 – $2k",
              "$2k – $5k",
              "$5k+",
            ],

        "AI Solutions":
          isIndianUser
            ? [
              "₹1L – ₹5L",
              "₹5L – ₹10L",
              "₹10L+",
            ]
            : [
              "$2k – $5k",
              "$5k – $10k",
              "$10k+",
            ],

        "SEO Solutions":
          isIndianUser
            ? [
              "< ₹25k",
              "₹25k – ₹50k",
              "₹50k+",
            ]
            : [
              "< $300",
              "$300 – $1k",
              "$1k+",
            ],

        "OTT Development":
          isIndianUser
            ? [
              "₹5L – ₹10L",
              "₹10L – ₹20L",
              "₹20L+",
            ]
            : [
              "$5k – $10k",
              "$10k – $20k",
              "$20k+",
            ],

        Other:
          isIndianUser
            ? [
              "< ₹50k",
              "₹50k – ₹1L",
              "₹1L – ₹5L",
              "₹5L+",
            ]
            : [
              "< $500",
              "$500 – $2k",
              "$2k – $5k",
              "$5k+",
            ],
      };

      return (
        options[
        projectType as keyof typeof options
        ] ??
        options.Other
      );
    }, [
      projectType,
      isIndianUser,
    ]);

  /* =====================================================
     EFFECTS
     -----------------------------------------------------
     1. Detect visitor country
        India  -> INR
        Others -> USD
  
     2. Whenever project type or currency changes,
        automatically select the first available
        budget option.
     ===================================================== */

  useEffect(() => {
    const detectCurrency =
      async () => {
        try {
          const response =
            await fetch(
              "https://ipapi.co/json/"
            );

          if (
            !response.ok
          ) {
            throw new Error(
              "Failed to detect country."
            );
          }

          const data =
            await response.json();

          if (
            data.country_code ===
            "IN"
          ) {
            setCurrency(
              "INR"
            );
          } else {
            setCurrency(
              "USD"
            );
          }
        } catch {
          // Fallback
          setCurrency(
            "INR"
          );
        }
      };

    detectCurrency();
  }, []);

  useEffect(() => {
    if (
      budgetOptions.length >
      0
    ) {
      setBudget(
        budgetOptions[0]
      );
    }
  }, [
    budgetOptions,
  ]);

  /* =====================================================
     SUBMIT
     -----------------------------------------------------
     Opens the visitor's default mail client
     with all enquiry details pre-filled.
  
     After submission:
     ✓ Modal closes
     ✓ Form resets
     ===================================================== */

  const handleSubmit =
    () => {
      const trimmedName =
        name.trim();

      const trimmedEmail =
        email.trim();

      const trimmedPhone =
        phone.trim();

      const trimmedMessage =
        message.trim();

      if (
        trimmedName.length <
        2
      ) {
        alert(
          "Please enter your name."
        );
        return;
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          trimmedEmail
        )
      ) {
        alert(
          "Please enter a valid email address."
        );
        return;
      }

      const phoneDigits =
        trimmedPhone.replace(
          /\D/g,
          ""
        );

      if (
        phoneDigits.length <
        10 ||
        phoneDigits.length >
        15
      ) {
        alert(
          "Please enter a valid phone number."
        );
        return;
      }

      if (
        trimmedMessage.length <
        10
      ) {
        alert(
          "Please describe your project."
        );
        return;
      }

      const whatsappMessage =
        encodeURIComponent(`
*New Project Enquiry*

*Name:* ${trimmedName}

*Email:* ${trimmedEmail}

*Phone:* ${trimmedPhone}

*Project Type:* ${projectType}

*Budget:* ${budget}

*Message:*
${trimmedMessage}
`);

      window.open(
        `https://wa.me/917014210085?text=${whatsappMessage}`,
        "_blank"
      );

      closeLeadForm();

      setName("");
      setEmail("");
      setPhone("");
      setProjectType(
        "App Development"
      );
      setBudget(
        budgetOptions[0] ??
        ""
      );
      setMessage("");
    };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <>
      {/* ================================================
        FLOATING CTA BUTTON
        ================================================ */}

      <button
        type="button"
        onClick={openLeadForm}
        className="ui-btn"
        style={{
          cursor: "pointer",
        }}
      >
        Get Free Quote
      </button>

      {/* ================================================
        LEAD FORM MODAL
        ================================================ */}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            overflowY: "auto",

            padding: "40px",

            background: "transparent",

            backdropFilter: "none",
            WebkitBackdropFilter: "none",

            zIndex: 99999,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",

              minHeight: "760px",

              borderRadius: "24px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "linear-gradient(180deg,#0d1425 0%,#08111f 100%)",

              boxShadow:
                "0 40px 120px rgba(0,0,0,0.55)",

              padding: "40px",
            }}
          >
            {/* =====================================================
    HEADER
    ===================================================== */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                gap: "20px",
                marginBottom:
                  "28px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color:
                      "#ffffff",
                    fontSize:
                      "30px",
                    fontWeight: 700,
                  }}
                >
                  Get Free Quote
                </h2>

                <p
                  style={{
                    margin:
                      "10px 0 0",
                    color:
                      "#94a3b8",
                    lineHeight: 1.6,
                    fontSize:
                      "15px",
                  }}
                >
                  Tell us about your
                  project and receive
                  a free consultation
                  with our experts.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeLeadForm
                }
                aria-label="Close"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border:
                    "1px solid rgba(255,255,255,0.10)",
                  background:
                    "rgba(255,255,255,0.05)",
                  color:
                    "#ffffff",
                  cursor:
                    "pointer",
                  fontSize:
                    "22px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  transition:
                    "all 0.25s ease",
                }}
              >
                ×
              </button>

            </div>

            {/* =====================================================
    FORM
    ===================================================== */}

            <div
              style={{
                display:
                  "flex",
                flexDirection:
                  "column",
                gap: "18px",
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <select
                value={
                  projectType
                }
                onChange={(e) =>
                  setProjectType(
                    e.target.value
                  )
                }
                style={{
                  ...inputStyle,

                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E\")",

                  backgroundRepeat:
                    "no-repeat",

                  backgroundPosition:
                    "right 16px center",

                  backgroundSize:
                    "18px",

                  paddingRight:
                    "48px",
                }}
              >
                <option>
                  App Development
                </option>

                <option>
                  Website Development
                </option>

                <option>
                  AI Solutions
                </option>

                <option>
                  SEO Solutions
                </option>

                <option>
                  OTT Development
                </option>

                <option>
                  Other
                </option>
              </select>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(
                    e.target.value
                  )
                }
                style={{
                  ...inputStyle,

                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E\")",

                  backgroundRepeat:
                    "no-repeat",

                  backgroundPosition:
                    "right 16px center",

                  backgroundSize:
                    "18px",

                  paddingRight:
                    "48px",
                }}
              >
                {budgetOptions.map(
                  (
                    option
                  ) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                style={{
                  ...inputStyle,
                  resize:
                    "vertical",
                  minHeight:
                    "140px",
                }}
              />

              <button
                type="button"
                onClick={
                  handleSubmit
                }
                className="ui-btn"
                style={{
                  cursor:
                    "pointer",
                  marginTop:
                    "6px",
                }}
              >
                Send Enquiry
              </button>
            </div>

            {/* =====================================================
            FOOTER
            ===================================================== */}

                    <p
                      style={{
                        marginTop: "22px",
                        marginBottom: 0,
                        textAlign:
                          "center",
                        color:
                          "#64748b",
                        fontSize:
                          "13px",
                        lineHeight: 1.6,
                      }}
                    >
                      By submitting this
                      enquiry you agree to
                      be contacted by
                      RISNAR Technologies
                      regarding your
                      project requirements.
                    </p>
                  </div>
                </div>
              )}

              <style jsx>{`
              /* Styles */
            `}</style>
            </>
          );
        }
        /* =========================================================
          INPUT STYLE
          ---------------------------------------------------------
          Shared style used by:

          ✓ Input
          ✓ Select
          ✓ Textarea

          Designed for a premium dark UI.
          ========================================================= */

        const inputStyle = {
          width: "100%",

          padding: "14px 16px",

          borderRadius: "12px",

          border:
            "1px solid rgba(255,255,255,0.12)",

          background:
            "rgba(255,255,255,0.05)",

          color: "#ffffff",

          fontSize: "16px",

          fontWeight: 400,

          lineHeight: 1.5,

          outline: "none",

          transition:
            "all 0.25s ease",

          appearance: "none",

          WebkitAppearance:
            "none",

          MozAppearance:
            "none",

          boxSizing:
            "border-box",
        } as const;