export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "transparent",
        color: "#ffffff",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* =========================
          TOP SECTION (RESPONSIVE)
         ========================= */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "30px 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: "1 1 220px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "6px",
              color: "#ffffff",
            }}
          >
            RISNAR Technologies
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.70)",
            }}
          >
            Building high-quality mobile & web products.
          </div>
        </div>

        {/* CENTER */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            flex: "1 1 220px",
          }}
        >
          {[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy", href: "/privacy" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="ui-btn"
              style={{
                fontSize: "13px",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <div
          style={{
            flex: "1 1 220px",
          }}
        >
          <a
            href="mailto:contact@risnar.com"
            style={{
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              wordBreak: "break-word",
            }}
          >
            contact@risnar.com
          </a>
        </div>
      </div>

      {/* =========================
          BOTTOM SECTION
         ========================= */}
      <div
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          padding: "12px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.60)",
        }}
      >
        © 2026 RISNAR Technologies. All rights reserved.
      </div>
    </footer>
  );
}