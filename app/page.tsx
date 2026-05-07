import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HERO */}
      <section
        style={{
          padding: "20px 20px 40px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Image
          src="/logo.png"
          alt="Risnar Technologies"
          width={300}
          height={120}
          priority
          sizes="(max-width: 768px) 200px, 300px"
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            marginBottom: "6px",
          }}
        />

        <h1 style={{ fontSize: "42px", margin: 0 }}>
          Technologies
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "25px",
          }}
        >
          We build high-quality mobile apps & web tools used by thousands of users.
        </p>

        <Link href="/apps">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Explore Our Apps
          </button>
        </Link>
      </section>

      {/* FEATURES (RESPONSIVE GRID FIX APPLIED) */}
      <section
        style={{
          padding: "60px 20px",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "24px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            transition: "all 0.25s ease",
            cursor: "pointer",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <style>{`
            .feature-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 10px 25px rgba(0,0,0,0.08);
              border-color: #ddd;
            }
          `}</style>
          {/* Card 1 */}
          <div className="feature-card"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>📱 Mobile First</h3>
            <p style={{ color: "#555" }}>
              We build apps optimized for performance and usability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>⚡ Fast & Lightweight</h3>
            <p style={{ color: "#555" }}>
              Optimized for speed and low resource usage.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>🌍 Global Reach</h3>
            <p style={{ color: "#555" }}>
              Our apps are used by users across multiple countries.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "30px" }}>
          Our Tech Stack
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, max-content))",
            justifyContent: "center",
            gap: "12px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: "Flutter",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
              bg: "#E3F2FD",
            },
            {
              name: "Dart",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
              bg: "#E1F5FE",
            },
            {
              name: "Firebase",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
              bg: "#FFF3E0",
            },
            {
              name: "Next.js",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
              bg: "#F5F5F5",
            },
            {
              name: "React",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              bg: "#E0F7FA",
            },
            {
              name: "TypeScript",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
              bg: "#E3F2FD",
            },
            {
              name: "Node.js",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
              bg: "#E8F5E9",
            },
            {
              name: "HTML",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
              bg: "#FDECEA",
            },
          ].map((tech) => (
            <span
              key={tech.name}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                background: tech.bg,
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                style={{ width: "16px", height: "16px" }}
              />
              {tech.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}