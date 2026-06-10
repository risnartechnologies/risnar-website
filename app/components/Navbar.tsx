"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================
   NAVBAR (DARK THEME)
   - Homepage logo hidden
   - Mobile responsive
   - Glassmorphism dark navbar
   - Active page highlighting
   - Transparent background support
   - Existing functionality preserved
   ========================= */

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  const menu = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ];

  return (
    <nav
      style={{
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
        background: "transparent",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* =========================
            LOGO (HIDDEN ON HOME)
           ========================= */}
        {!isHome && (
          <div
            className="navbar-logo"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              width: "100%",
              color: "#ffffff",
            }}
          >
            RISNAR Technologies
          </div>
        )}

        {/* =========================
            MENU
           ========================= */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {menu.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  textDecoration: "none",
                }}
              >
                <span
                  className="ui-btn"
                  style={{
                    background: isActive
                      ? "rgba(59,130,246,0.18)"
                      : "rgba(255,255,255,0.04)",

                    color: "#ffffff",

                    border: isActive
                      ? "1px solid #3b82f6"
                      : "1px solid rgba(255,255,255,0.10)",

                    boxShadow: isActive
                      ? "0 0 20px rgba(59,130,246,0.18)"
                      : "none",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* =========================
          RESPONSIVE OVERRIDE
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