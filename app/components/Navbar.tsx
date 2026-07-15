"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

/* =========================
   NAVBAR (DARK THEME)
   - Homepage logo hidden initially
   - Logo appears after scrolling
   - Auto scroll-to-top button
   - Mobile responsive
   - Glassmorphism navbar
   - Active page highlighting
   - Added About page link
   - Existing functionality preserved
   ========================= */

export default function Navbar() {
  const pathname =
    usePathname();

  const isHome =
    pathname === "/";

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  useEffect(() => {
    const handleScroll =
      () => {
        setIsScrolled(
          window.scrollY > 120
        );
      };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

const menu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
];

  return (
    <>
      {/* =========================
          NAVBAR
         ========================= */}
      <nav
        style={{
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          background:
            "transparent",

          backdropFilter:
            "blur(16px)",

          WebkitBackdropFilter:
            "blur(16px)",

          position:
            "sticky",

          top: 0,

          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth:
              "1100px",

            margin:
              "0 auto",

            padding:
              "12px 16px",

            display:
              "flex",

            flexDirection:
              "column",

            alignItems:
              "center",

            gap: "10px",
          }}
        >
          {/* =========================
              LOGO
             ========================= */}
          {(!isHome ||
            isScrolled) && (
            <div
              className="navbar-logo"
              style={{
                color:
                  "#ffffff",

                fontWeight:
                  "bold",

                lineHeight:
                  "1.2",

                textAlign:
                  "center",

                width:
                  "100%",
              }}
            >
              <div
                style={{
                  fontSize:
                    "16px",
                }}
              >
                RISNAR
              </div>

              <div
                style={{
                  fontSize:
                    "12px",
                }}
              >
                Technologies
              </div>
            </div>
          )}

          {/* =========================
              MENU
             ========================= */}
          <div
            style={{
              display:
                "flex",

              flexWrap:
                "wrap",

              gap: "8px",

              justifyContent:
                "center",

              width: "100%",
            }}
          >
            {menu.map(
              (item) => {
                const isActive =
                  pathname ===
                  item.href;

                return (
                  <Link
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                    style={{
                      textDecoration:
                        "none",
                    }}
                  >
                    <span
                      className="ui-btn"
                      style={{
                        background:
                          isActive
                            ? "rgba(59,130,246,0.18)"
                            : "rgba(255,255,255,0.04)",

                        color:
                          "#ffffff",

                        border:
                          isActive
                            ? "1px solid #3b82f6"
                            : "1px solid rgba(255,255,255,0.10)",

                        boxShadow:
                          isActive
                            ? "0 0 20px rgba(59,130,246,0.18)"
                            : "none",
                      }}
                    >
                      {
                        item.label
                      }
                    </span>
                  </Link>
                );
              }
            )}
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
              min-width: 160px;
            }

            nav > div > div:last-child {
              justify-content: flex-end !important;
            }
          }
        `}</style>
      </nav>

      {/* =========================
          SCROLL TO TOP BUTTON
         ========================= */}
      {isScrolled && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior:
                "smooth",
            })
          }
          style={{
            position:
              "fixed",

            right: "20px",

            bottom: "20px",

            width: "50px",

            height: "50px",

            borderRadius:
              "50%",

            border:
              "1px solid rgba(255,255,255,0.15)",

            background:
              "rgba(5,8,22,0.85)",

            backdropFilter:
              "blur(16px)",

            color:
              "#ffffff",

            cursor:
              "pointer",

            fontSize:
              "20px",

            zIndex: 999,

            boxShadow:
              "0 0 20px rgba(59,130,246,0.25)",
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}