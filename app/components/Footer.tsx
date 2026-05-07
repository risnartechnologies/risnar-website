export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        borderTop: "1px solid #eee",
        background: "#fafafa",
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
          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
            RISNAR Technologies
          </div>

          <div style={{ color: "#666" }}>
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
            { label: "Apps", href: "/apps" },
            { label: "Websites", href: "/websites" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy", href: "/privacy" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="ui-btn" // ✅ unified style (no inline override)
              style={{
                fontSize: "13px", // keep only size override
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ flex: "1 1 220px" }}>
          <a
            href="mailto:risnartechnologies@gmail.com"
            style={{
              color: "#333",
              textDecoration: "none",
              wordBreak: "break-word",
            }}
          >
            risnartechnologies@gmail.com
          </a>
        </div>
      </div>

      {/* =========================
          BOTTOM SECTION
         ========================= */}
      <div
        style={{
          borderTop: "1px solid #eee",
          textAlign: "center",
          padding: "12px",
          fontSize: "13px",
          color: "#777",
        }}
      >
        © 2026 RISNAR Technologies. All rights reserved.
      </div>
    </footer>
  );
}