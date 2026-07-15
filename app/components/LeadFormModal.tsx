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

const handleSubmit =
  () => {
    const subject =
      encodeURIComponent(
        "New Project Enquiry - RISNAR Technologies"
      );

    const body =
      encodeURIComponent(`
Name: ${name}

Email: ${email}

Phone: ${phone}

Project Type: ${projectType}

Budget: ${budget}

Message:
${message}
`);

    window.location.href =
      `mailto:contact@risnar.com?subject=${subject}&body=${body}`;

    setIsOpen(false);

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

          overflowY: "auto",

          padding: "40px 20px",

          zIndex: 99999,

          display: "flex",

          justifyContent:
            "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",

            border:
              "1px solid rgba(255,255,255,0.15)",

            borderRadius:
              "20px",

            background:
              "rgba(5,8,22,0.96)",

            backdropFilter:
              "blur(16px)",

            padding: "30px",

            marginTop: "40px",
            marginBottom: "40px",
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
      OTT Development
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
    className="ui-btn"
    style={{
      cursor:
        "pointer",
      marginTop:
        "8px",
    }}
  >
    Send Enquiry
  </button>
</div>
          </div>
        </div>
      )}

      <style jsx>{`
        select option {
          background: #0b1220;
          color: #ffffff;
        }

        input::placeholder,
        textarea::placeholder {
          color: #94a3b8;
        }

        select {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border:
    "1px solid rgba(255,255,255,0.15)",
  background:
    "rgba(255,255,255,0.04)",
  color: "#ffffff",
  outline: "none",
  fontSize: "16px",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='white' viewBox='0 0 20 20'%3E%3Cpath d='M5.25 7.5L10 12.25 14.75 7.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E\")",
  backgroundRepeat:
    "no-repeat",
  backgroundPosition:
    "right 14px center",
  backgroundSize:
    "18px",
  paddingRight: "42px",
} as const;