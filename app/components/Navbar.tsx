"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================
   NAVBAR (FULLY RESPONSIVE - FIXED)
   - Logo hidden on homepage
   - Logo center aligned on mobile/tablet (non-home pages)
   - Desktop layout unchanged
   - Mobile-safe wrapping
   - Shared button style (ui-btn)
   ========================= */

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";

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
          flexDirection: "column", // ✅ enables stacking on mobile
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* LOGO (HIDDEN ON HOME) */}
        {!isHome && (
          <div
            className="navbar-logo"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              width: "100%",
            }}
          >
            RISNAR Technologies
          </div>
        )}

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            width: "100%",
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

      {/* =========================
          RESPONSIVE OVERRIDE
          Desktop restores row layout
         ========================= */}
      <style>{`
        @media (min-width: 768px) {
          nav > div {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }

          .navbar-logo {
            text-align: left !important;
            width: auto !important;
          }

          nav > div > div:last-child {
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </nav>
  );
}