"use client";

import { useState } from "react";

/* =========================
   CONTACT PAGE (CLIENT COMPONENT)
   ========================= */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /* =========================
     HANDLE SEND (MAILTO)
     ========================= */
  const handleSend = () => {
    const subject = encodeURIComponent("Contact from Risnar Website");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open default email client with prefilled data
    window.location.href = `mailto:contact@risnar.com?subject=${subject}&body=${body}`;

    // Reset form fields after click
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HERO */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Contact Us
        </h1>

        <p style={{ color: "#555" }}>
          Have a question or idea? Send us a message.
        </p>
      </section>

      {/* FORM */}
      <section style={{ padding: "40px 20px 80px" }}>
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          {/* Message */}
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />

          {/* Submit */}
          <button
            onClick={handleSend}
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Send Message
          </button>
        </div>
      </section>
    </main>
  );
}