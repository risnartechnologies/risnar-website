import Link from "next/link";
import Image from "next/image";
import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title:
    "RISNAR Technologies | App Development, Website Development, AI Solutions & SEO",

  description:
    "RISNAR Technologies provides mobile app development, website development, AI solutions and SEO services for startups, businesses and entrepreneurs.",

  keywords: [
    "App Development",
    "Website Development",
    "Flutter Development",
    "AI Solutions",
    "SEO Services",
    "Mobile App Development Jaipur",
    "Website Development Jaipur",
    "Flutter Developer Jaipur",
    "Real Estate Website Development Jaipur",
    "RISNAR Technologies",
  ],
};

export default function Home() {
  return (
      <main
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#ffffff",
        }}
      >
      
      {/* HERO */}
      <section
        style={{
          padding: "60px 20px 100px",
          textAlign: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  }}
>
  <Image
    src="/logo.png"
    alt="Risnar Technologies"
    width={320}
    height={88}
    priority
    sizes="220px"
    style={{
      display: "block",
    }}
  />

  <div
    style={{
      width: "320px",
      textAlign: "center",
      color: "#fafafa",
      fontSize: "30px",
      fontWeight: 500,
      letterSpacing: "3px",
      marginTop: "1px",
      textTransform: "uppercase",
    }}
  >
    Technologies
  </div>
</div>

      <h1
        style={{
          fontSize: "clamp(42px, 8vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.05,
          margin: "0 0 20px",
          letterSpacing: "-2px",
        }}
      >
        Apps & Websites
        <br />
        That Grow Businesses
      </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto 30px",
            lineHeight: 1.7,
          }}
        >
        RISNAR Technologies builds high-performance mobile apps,
        websites, SaaS platforms and digital products for startups,
        creators and businesses.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
<Link href="/portfolio">
  <button
    style={{
      padding: "14px 28px",
      fontSize: "16px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Explore Portfolio
  </button>
</Link>

      <LeadFormModal />
      </div>
      </section>
      <style>{`
      .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 40px rgba(0,0,0,0.12);
      }
    `}</style>
      <section
          style={{
            padding: "20px",
            maxWidth: "1100px",
            margin: "0 auto 40px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Our Portfolio
          </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
        {[
          {
            name: "Lalify",
            desc: "Language learning app for French, German and Spanish learners.",
          },
          {
            name: "Mathuvo",
            desc: "Fun mathematics learning game designed for all age groups.",
          },
          {
            name: "GridZio",
            desc: "Memory and card matching puzzle game with engaging gameplay.",
          },
          {
            name: "XO Arena",
            desc: "Modern Tic Tac Toe game with AI and multiplayer modes.",
          },
          {
            name: "Adcampin",
            desc: "Advertising and digital marketing platform built for businesses.",
          },
        ].map((product) => (

<div
  key={product.name}
  className="product-card"
  style={{
    border: "1px solid rgba(255,255,255,0.65)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    background: "transparent",
    transition: "all 0.25s ease",
  }}
>
  <div
    style={{
      width: "72px",
      height: "72px",
      margin: "0 auto 20px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image
      src={
        product.name === "Lalify"
          ? "/lalify.svg"
          : product.name === "Mathuvo"
          ? "/mathuvo.svg"
          : product.name === "GridZio"
          ? "/gridzio.svg"
          : product.name === "XO Arena"
          ? "/tic-tac-toe.svg"
          : "/adcampin.png"
      }
      alt={product.name}
      width={56}
      height={56}
    />
  </div>

  <h3
    style={{
      color: "#ffffff",
      marginBottom: "12px",
      fontSize: "22px",
    }}
  >
    {product.name}
  </h3>

  <p
    style={{
      color: "#94a3b8",
      minHeight: "70px",
      lineHeight: 1.7,
    }}
  >
    {product.desc}
  </p>

<a
  href={
    product.name === "Lalify"
      ? "https://play.google.com/store/apps/details?id=com.adcampin.lalify"
      : product.name === "Mathuvo"
      ? "https://play.google.com/store/apps/details?id=com.adcampin.mathuvo"
      : product.name === "GridZio"
      ? "https://play.google.com/store/apps/details?id=com.risnar.gridzio"
      : product.name === "XO Arena"
      ? "https://play.google.com/store/apps/details?id=com.adcampin.tictactoe_new"
      : "https://adcampin.com"
  }
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    style={{
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#000",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    {product.name === "Adcampin"
      ? "Visit Website"
      : "Download App"}
  </button>
</a>
</div>
    ))}
  </div>
</section>
      <section
  style={{
    padding: "20px 20px 60px",
    maxWidth: "1100px",
    margin: "0 auto",
  }}
>
  <h2
    style={{
      fontSize: "36px",
      textAlign: "center",
      marginBottom: "40px",
    }}
  >
    What We Build
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "20px",
    }}
  >
    {[
      {
        icon: "📱",
        title: "Mobile Apps",
        desc: "Android and cross-platform mobile applications built for performance and growth.",
      },
      {
        icon: "🌐",
        title: "Websites",
        desc: "Modern business websites designed for speed, SEO and lead generation.",
      },
      {
        icon: "⚙️",
        title: "SaaS Platforms",
        desc: "Scalable web platforms and business tools tailored to your workflow.",
      },
      {
        icon: "🤖",
        title: "AI Solutions",
        desc: "AI-powered products and intelligent automation for modern businesses.",
      },
    ].map((item) => (
<div
  key={item.title}
  style={{
    border: "1px solid rgba(255,255,255,0.65)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    background: "transparent",
    transition: "all 0.25s ease",
  }}
>
  <div
    style={{
      fontSize: "42px",
      marginBottom: "16px",
    }}
  >
    {item.icon}
  </div>

  <h3
    style={{
      color: "#ffffff",
      marginBottom: "12px",
      fontSize: "22px",
    }}
  >
    {item.title}
  </h3>

  <p
    style={{
      color: "#94a3b8",
      lineHeight: 1.7,
    }}
  >
    {item.desc}
  </p>
</div>
    ))}
  </div>
</section>
      {/* FEATURES (RESPONSIVE GRID FIX APPLIED) */}
      <section
        style={{
          padding: "60px 20px",
          background: "transparent",
        }}
      >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "24px",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
              transition: "all 0.25s ease",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
        <div
          style={{
            background: "transparent",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "42px",
              margin: "0 0 8px",
              fontWeight: 800,
            }}
          >
            5+
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0 }}>
            Products Built
          </p>
        </div>

        <div
          style={{
            background: "transparent",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "42px",
              margin: "0 0 8px",
              fontWeight: 800,
            }}
          >
            4
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0 }}>
            Published Apps
          </p>
        </div>

        <div
          style={{
            background: "transparent",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "42px",
              margin: "0 0 8px",
              fontWeight: 800,
            }}
          >
            100%
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0 }}>
            In-House Development
          </p>
        </div>

        <div
          style={{
            background: "transparent",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "42px",
              margin: "0 0 8px",
              fontWeight: 800,
            }}
          >
            24×7
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0 }}>
            Continuous Product Support
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
      <h2
        style={{
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        Technologies We Use
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          maxWidth: "700px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}
      >
        We build scalable mobile apps, websites and SaaS products using
        modern technologies trusted by startups and businesses worldwide.
      </p>

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
                  color: "#111827",
                  fontSize: "14px",
                  fontWeight: "600",
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
      <section
  style={{
    padding: "80px 20px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
  <h2
    style={{
      fontSize: "clamp(32px, 5vw, 56px)",
      fontWeight: 800,
      marginBottom: "20px",
    }}
  >
    Let's Build Your Next Product
  </h2>

    <p
      style={{
        color: "#cbd5e1",
        fontSize: "18px",
        lineHeight: 1.8,
        maxWidth: "700px",
        margin: "0 auto 30px",
      }}
    >
    Whether you need a mobile app, business website,
    SaaS platform or AI-powered solution, RISNAR
    Technologies can help bring your idea to life.
  </p>

 <LeadFormModal />
</section>
    </main>
  );
}