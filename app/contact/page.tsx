"use client";

import { useState } from "react";

/* =========================
   CONTACT PAGE
   - Matches portfolio styling
   - Glassmorphism cards
   - Dark theme support
   - Existing mailto functionality preserved
   ========================= */
export default function ContactPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =========================
     HANDLE SEND (MAILTO)
     ========================= */
  const handleSend = () => {
    const subject =
      encodeURIComponent(
        "Contact from RISNAR Website"
      );

    const body =
      encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

    window.location.href = `mailto:contact@risnar.com?subject=${subject}&body=${body}`;

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* =========================
          HERO
         ========================= */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          Contact Us
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Have a project idea,
          app requirement,
          website requirement,
          partnership proposal,
          or business inquiry?
          We'd love to hear from you.
        </p>
      </section>

      {/* =========================
          CONTACT CARD
         ========================= */}
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* NAME */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={{
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.05)",
              color: "#ffffff",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.05)",
              color: "#ffffff",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* MESSAGE */}
          <textarea
            placeholder="Tell us about your project..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            rows={6}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.05)",
              color: "#ffffff",
              fontSize: "15px",
              resize: "vertical",
              outline: "none",
            }}
          />

          {/* SEND BUTTON */}
          <button
            onClick={handleSend}
            style={{
              padding:
                "14px 24px",
              borderRadius:
                "10px",
              border:
                "1px solid #000",
              background:
                "#000",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition:
                "all 0.2s ease",
            }}
          >
            Send Message
          </button>
        </div>
      </section>

      {/* =========================
          CONTACT INFO
         ========================= */}
      <section
        style={{
          marginTop: "40px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Direct Contact
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "8px",
          }}
        >
          Email:
          contact@risnar.com
        </p>

        <p
          style={{
            color: "#cbd5e1",
          }}
        >
          We usually respond
          within 24–48 hours.
        </p>
      </section>
    </main>
  );
}