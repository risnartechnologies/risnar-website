import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";

export const metadata = {
  title: "Our Apps - Risnar Technologies",
  description: "Explore apps built by Risnar Technologies",
};

/* =========================
   PAGE
   ========================= */
export default function AppsPage() {
  return (
    <main
      style={{
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Our Apps
      </h1>

      {/* GRID (RESPONSIVE) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {apps.map((app) => (
          <div
            key={app.slug}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // center content
              textAlign: "center",  // center text
            }}
          >
            {/* APP ICON */}
            <Image
              src={app.logo}
              alt={app.name}
              width={50}
              height={50}
              style={{
                marginBottom: "10px",
              }}
            />

            {/* TITLE */}
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
              {app.name}
            </h2>

            {/* DESCRIPTION */}
            <p style={{ color: "#555", marginBottom: "15px" }}>
              {app.description}
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* View */}
              <Link href={`/apps/${app.slug}`} style={{ textDecoration: "none" }}>
                <span className="btn">View</span>
              </Link>

              {/* Play Store */}
              <a
                href={app.playStore}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <span className="btn">Play Store</span>
              </a>

              {/* Privacy */}
              <Link
                href={`/apps/${app.slug}/privacy-policy`}
                style={{ textDecoration: "none" }}
              >
                <span className="btn">Privacy</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON STYLES (SCOPED) */}
      <style>{`
        .btn {
          padding: 8px 18px;
          border-radius: 8px;
          background: #000;
          color: #fff;
          display: inline-block;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
          border: 1px solid #000;
        }

        .btn:hover {
          background: #fff;
          color: #000;
          border: 1px solid #000;
        }
      `}</style>
    </main>
  );
}