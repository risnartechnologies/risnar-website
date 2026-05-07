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
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    return {
      title: "App - Risnar Technologies",
      description: "App details",
    };
  }

  return {
    title: `${app.name} - Risnar Technologies`,
    description: app.description,
  };
}

/* =========================
   PAGE
   ========================= */
export default async function AppDetail({ params }: any) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>App not found</h1>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HERO */}
      <section
        style={{
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "800px",
          margin: "0 auto",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Image
          src={app.logo}
          alt={app.name}
          width={100}
          height={100}
          style={{ marginBottom: "6px" }}
        />

        <h1 style={{ fontSize: "36px", margin: 0 }}>{app.name}</h1>

        <p style={{ fontSize: "18px", color: "#555" }}>
          {app.description}
        </p>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Play Store */}
          <a href={app.playStore} target="_blank" rel="noopener noreferrer">
            <button
              style={{
                padding: "12px 20px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Download
            </button>
          </a>

          {/* Privacy */}
          <Link href={`/apps/${slug}/privacy-policy`}>
            <button
              style={{
                padding: "12px 20px",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Privacy Policy
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "60px 20px",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Why users love this app
          </h2>

          <ul
            style={{
              color: "#555",
              lineHeight: "1.8",
              listStyle: "none",
              padding: 0,
              marginTop: "20px",
              display: "inline-block",   // ✅ key fix
              textAlign: "left",         // keeps text clean
            }}
          >
            <li style={{ marginBottom: "8px" }}>✔ Simple and easy to use</li>
            <li style={{ marginBottom: "8px" }}>✔ Lightweight and fast performance</li>
            <li>✔ Designed for real users</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2>Get started today</h2>

        <a href={app.playStore} target="_blank" rel="noopener noreferrer">
          <button
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Download Now
          </button>
        </a>
      </section>
    </main>
  );
}