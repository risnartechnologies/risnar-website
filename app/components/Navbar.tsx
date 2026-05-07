"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================
   NAVBAR (CLIENT COMPONENT)
   - Responsive fix applied
   - No absolute positioning (prevents overflow on mobile)
   - Center alignment maintained
   ========================= */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 20px", // reduced for mobile
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 1000,
        flexWrap: "wrap", // allows wrapping on small screens
        gap: "10px",
      }}
    >
      {/* LEFT: Show only if NOT homepage */}
      {pathname !== "/" && (
        <div
          style={{
            position: "absolute",
            left: "20px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          RISNAR Technologies
        </div>
      )}

      {/* NAV LINKS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap", // mobile-friendly
          justifyContent: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="ui-btn">Home</span>
        </Link>

        <Link href="/apps" style={{ textDecoration: "none" }}>
          <span className="ui-btn">Apps</span>
        </Link>

        <Link href="/websites" style={{ textDecoration: "none" }}>
          <span className="ui-btn">Websites</span>
        </Link>

        <Link href="/contact" style={{ textDecoration: "none" }}>
          <span className="ui-btn">Contact</span>
        </Link>
      </div>
    </nav>
  );
}