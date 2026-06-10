import { apps } from "@/lib/apps";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 86400;

/* =========================
   STATIC PARAMS
   ========================= */
export async function generateStaticParams() {
  return apps.map((app) => ({
    slug: app.slug,
  }));
}

/* =========================
   METADATA
   ========================= */
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const app = apps.find(
    (a) => a.slug === slug
  );

  if (!app) {
    return {
      title:
        "Portfolio Item - RISNAR Technologies",
      description:
        "Portfolio details",
    };
  }

  return {
    title: `${app.name} - RISNAR Technologies`,
    description:
      app.description,
  };
}

/* =========================
   PAGE
   ========================= */
export default async function AppDetail({
  params,
}: any) {
  const { slug } = await params;

  const app = apps.find(
    (a) => a.slug === slug
  );

  if (!app) {
    return (
      <main
        style={{
          padding: "40px",
          fontFamily:
            "Arial, sans-serif",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <h1>
          Portfolio item not found
        </h1>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily:
          "Arial, sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
      }}
    >
      {/* =========================
          HERO CARD
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <Image
          src={app.logo}
          alt={app.name}
          width={100}
          height={100}
          style={{
            marginBottom: "20px",
          }}
        />

        {/* TITLE */}
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          {app.name}
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.8",
            color: "#cbd5e1",
            maxWidth: "800px",
            margin:
              "0 auto 30px auto",
          }}
        >
          {app.description}
        </p>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent:
              "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={app.playStore}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration:
                "none",
            }}
          >
            <span
              className="portfolio-btn"
            >
              Download App
            </span>
          </a>

          <Link
            href={`/portfolio/${slug}/privacy-policy`}
            style={{
              textDecoration:
                "none",
            }}
          >
            <span
              className="portfolio-btn-secondary"
            >
              Privacy Policy
            </span>
          </Link>
        </div>
      </section>

      {/* =========================
          FEATURES
         ========================= */}
      <section
        style={{
          marginTop: "40px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#ffffff",
          }}
        >
          Why Users Love {app.name}
        </h2>

        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
              marginBottom: "18px",
            }}
          >
            ✔ Simple and easy to use
          </div>

          <div
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
              marginBottom: "18px",
            }}
          >
            ✔ Lightweight and fast
            performance
          </div>

          <div
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
            }}
          >
            ✔ Designed for real users
          </div>
        </div>
      </section>

      {/* =========================
          CTA
         ========================= */}
      <section
        style={{
          marginTop: "40px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Get Started Today
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "24px",
          }}
        >
          Download {app.name} and
          start using it today.
        </p>

        <a
          href={app.playStore}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration:
              "none",
          }}
        >
          <span
            className="portfolio-btn"
          >
            Download Now
          </span>
        </a>
      </section>

      {/* =========================
          BUTTON STYLES
         ========================= */}
      <style>{`
        .portfolio-btn {
          padding: 12px 24px;
          border-radius: 10px;
          background: #000;
          color: #fff;
          display: inline-block;
          border: 1px solid #000;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .portfolio-btn:hover {
          background: #fff;
          color: #000;
        }

        .portfolio-btn-secondary {
          padding: 12px 24px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .portfolio-btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </main>
  );
}