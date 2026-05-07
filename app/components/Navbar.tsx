import Link from "next/link";

/* =========================
   NAVBAR (FULLY RESPONSIVE)
   - Works on all pages
   - Mobile-safe wrapping
   - Shared button style (ui-btn)
   ========================= */

export default function Navbar() {
  const menu = [
    { label: "Home", href: "/" },
    { label: "Apps", href: "/apps" },
    { label: "Websites", href: "/websites" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      style={{
        borderBottom: "1px solid #eee",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          flexWrap: "wrap", // ✅ KEY FIX
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            whiteSpace: "nowrap",
          }}
        >
          RISNAR Technologies
        </div>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // ✅ KEY FIX
            gap: "8px",
            justifyContent: "center",
            flex: "1 1 auto",
          }}
        >
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <span className="ui-btn">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}