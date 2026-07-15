import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";

export const metadata = {
  title: "Portfolio | RISNAR Technologies",
  description:
    "Explore mobile apps, websites, web platforms and digital products developed by RISNAR Technologies.",
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
        Our Portfolio
      </h1>

      {/* GRID (RESPONSIVE) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {/* =========================
            APPS
           ========================= */}
        {apps.map((app) => (
          <div
            key={app.slug}
            style={{
              border:
                "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "20px",
              background:
                "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
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
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                color: "#ffffff",
              }}
            >
              {app.name}
            </h2>

            {/* DESCRIPTION */}
            <p
              style={{
                color: "#cbd5e1",
                marginBottom: "15px",
              }}
            >
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
              <Link
                href={`/portfolio/${app.slug}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <span className="btn">
                  View
                </span>
              </Link>

              {/* Play Store */}
              <a
                href={app.playStore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <span className="btn">
                  Play Store
                </span>
              </a>

              {/* Privacy */}
              <Link
                href={`/portfolio/${app.slug}/privacy-policy`}
                style={{
                  textDecoration: "none",
                }}
              >
                <span className="btn">
                  Privacy
                </span>
              </Link>
            </div>
          </div>
        ))}

          {/* =========================
              WEBSITES
            ========================= */}

          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontSize: "28px",
                textAlign: "center",
                margin: 0,
              }}
            >
              Websites & Web Platforms
            </h2>
          </div>

          {/* =========================
              ADCAMPIN
            ========================= */}
        <div
          style={{
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            padding: "20px",
            background:
              "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* LOGO */}
          <Image
            src="/adcampin.png"
            alt="Adcampin"
            width={60}
            height={60}
            style={{
              marginBottom: "10px",
              objectFit: "contain",
            }}
          />

          {/* TITLE */}
          <h2
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              color: "#ffffff",
            }}
          >
            Adcampin
          </h2>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "15px",
            }}
          >
            Advertising and digital marketing
            platform built for businesses.
          </p>

          {/* BUTTON */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              href="https://adcampin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
              }}
            >
              <span className="btn">
                Visit Website
              </span>
            </a>
          </div>
        </div>
      </div>

            {/* =========================
          RSN ESTATES
        ========================= */}
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          padding: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <Image
          src="/rsnestates.svg"
          alt="RSN Estates"
          width={60}
          height={60}
          style={{
            marginBottom: "10px",
            objectFit: "contain",
          }}
        />

        {/* TITLE */}
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#ffffff",
          }}
        >
          RSN Estates
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "15px",
          }}
        >
          Modern real estate platform helping users
          buy, sell and invest in properties across
          Jaipur.
        </p>

        {/* BUTTON */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="https://www.rsnestates.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <span className="btn">
              Visit Website
            </span>
          </a>
        </div>
      </div>

      {/* =========================
          OTT DEMO PLATFORM
        ========================= */}
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          padding: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <Image
          src="/ott.svg"
          alt="OTT Demo Platform"
          width={60}
          height={60}
          style={{
            marginBottom: "10px",
            objectFit: "contain",
          }}
        />

        {/* TITLE */}
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#ffffff",
          }}
        >
          OTT Demo Platform
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "15px",
          }}
        >
          A modern OTT streaming platform showcasing
          movies, TV series, user authentication,
          subscriptions, watchlists and responsive
          streaming experience built by RISNAR
          Technologies.
        </p>

        {/* BUTTON */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://ott.risnar.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <span className="btn">
              Live Demo
            </span>
          </a>
        </div>
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