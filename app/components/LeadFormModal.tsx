"use client";

import { useState } from "react";

/* =========================
   LEAD FORM MODAL
   - Reusable popup form
   - Mailto submission
   - No backend required
   - Responsive design
   ========================= */

export default function LeadFormModal() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [
    projectType,
    setProjectType,
  ] = useState(
    "App Development"
  );

  const [budget, setBudget] =
    useState("< ₹50k");

  const [message, setMessage] =
    useState("");

  const [
  isSubmitting,
  setIsSubmitting,
] = useState(false);

const [
  isSuccess,
  setIsSuccess,
] = useState(false);
const handleSubmit =
  async () => {
    try {
      setIsSubmitting(
        true
      );

      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                name,
                email,
                phone,
                projectType,
                budget,
                message,
              }
            ),
          }
        );

      if (
        !response.ok
      ) {
        throw new Error(
          "Failed"
        );
      }

      setIsSuccess(
        true
      );

      setName("");
      setEmail("");
      setPhone("");
      setProjectType(
        "App Development"
      );
      setBudget(
        "< ₹50k"
      );
      setMessage("");
    } catch (
      error
    ) {
      alert(
        "Unable to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  };

  return (
    <>
      {/* =========================
          OPEN BUTTON
         ========================= */}
      <button
        onClick={() =>
          setIsOpen(true)
        }
        className="ui-btn"
        style={{
          cursor: "pointer",
        }}
      >
        Get Free Quote
      </button>

      {/* =========================
          MODAL
         ========================= */}
      {isOpen && (
        <div
          style={{
            position: "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.65)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            padding: "20px",

            overflowY: "auto",

            zIndex: 99999,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",

              overflowY: "auto",

              border:
                "1px solid rgba(255,255,255,0.15)",

              borderRadius:
                "20px",

              background:
                "rgba(5,8,22,0.96)",

              backdropFilter:
                "blur(16px)",

              padding: "30px",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "20px",
              }}
            >
              <h2
                style={{
                  color:
                    "#ffffff",
                  margin: 0,
                }}
              >
                Get Free Quote
              </h2>

              <button
                onClick={() =>
                  setIsOpen(
                    false
                  )
                }
                style={{
                  background:
                    "transparent",
                  border: "none",
                  color:
                    "#ffffff",
                  fontSize:
                    "24px",
                  cursor:
                    "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            {isSuccess ? (
              <div
                style={{
                  textAlign:
                    "center",
                  padding:
                    "20px 0",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "54px",
                    marginBottom:
                      "16px",
                  }}
                >
                  ✅
                </div>

                <h3
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  Thank You!
                </h3>

                <p
                  style={{
                    color:
                      "#cbd5e1",
                    lineHeight:
                      "1.8",
                  }}
                >
                  We have received
                  your enquiry and
                  will contact you
                  shortly.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  gap: "14px",
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
                  style={
                    inputStyle
                  }
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
                  style={
                    inputStyle
                  }
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
                  style={
                    inputStyle
                  }
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
                  style={
                    inputStyle
                  }
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
                    Other
                  </option>
                </select>

                <select
                  value={
                    budget
                  }
                  onChange={(e) =>
                    setBudget(
                      e.target.value
                    )
                  }
                  style={
                    inputStyle
                  }
                >
                  <option>
                    {"< ₹50k"}
                  </option>

                  <option>
                    ₹50k – ₹1L
                  </option>

                  <option>
                    ₹1L – ₹5L
                  </option>

                  <option>
                    ₹5L+
                  </option>
                </select>

                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={
                    message
                  }
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  style={{
                    ...inputStyle,
                    resize:
                      "vertical",
                  }}
                />

                <button
                  onClick={
                    handleSubmit
                  }
                  disabled={
                    isSubmitting
                  }
                  className="ui-btn"
                  style={{
                    cursor:
                      "pointer",
                    marginTop:
                      "8px",
                    opacity:
                      isSubmitting
                        ? 0.6
                        : 1,
                  }}
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Enquiry"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border:
    "1px solid rgba(255,255,255,0.15)",
  background:
    "rgba(255,255,255,0.04)",
  color: "#ffffff",
  outline: "none",
} as const;