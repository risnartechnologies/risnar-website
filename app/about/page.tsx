import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title:
    "About RISNAR Technologies",
  description:
    "Learn about RISNAR Technologies, a Jaipur-based software company specializing in app development, website development, AI solutions and SEO services.",
};

/* =========================
   ABOUT PAGE
   - Company overview
   - Services showcase
   - Mission & values
   - Industries served
   - Lead generation CTA
   ========================= */

export default function AboutPage() {
  const services = [
    {
      icon: "📱",
      title: "App Development",
      description:
        "Custom Android and Flutter applications built for startups, businesses and entrepreneurs.",
    },
    {
      icon: "🌐",
      title: "Website Development",
      description:
        "Modern, responsive websites and web applications designed for growth.",
    },
    {
      icon: "🤖",
      title: "AI Solutions",
      description:
        "AI-powered tools, chatbots and automation systems that improve productivity.",
    },
    {
      icon: "📈",
      title: "SEO Solutions",
      description:
        "Data-driven SEO strategies that help businesses increase visibility and generate leads.",
    },
  ];

  const values = [
    "Quality First",
    "Modern Technologies",
    "Transparent Communication",
    "Business-Focused Solutions",
    "Long-Term Support",
    "Affordable Development",
  ];

  const technologies = [
    "Flutter",
    "Dart",
    "Firebase",
    "Supabase",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "AI APIs",
    "SEO Tools",
  ];

  const industries = [
    "Real Estate",
    "Education",
    "Healthcare",
    "E-Commerce",
    "Startups",
    "Local Businesses",
  ];

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* =========================
          HERO
         ========================= */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          About RISNAR Technologies
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            maxWidth: "850px",
            margin: "0 auto",
            lineHeight: "1.9",
          }}
        >
          RISNAR Technologies is a Jaipur-based software
          development company focused on building modern
          digital solutions for startups, entrepreneurs
          and businesses. We help organizations transform
          ideas into successful products through app
          development, website development, AI solutions
          and SEO services.
        </p>
      </section>

      {/* =========================
          WHO WE ARE
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Who We Are
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          We specialize in developing high-quality
          software products that help businesses grow,
          automate operations and improve customer
          experiences. From mobile applications and
          websites to AI-powered tools and SEO
          strategies, we focus on delivering practical
          solutions that create measurable business
          value.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Our goal is not just to build software, but
          to become a long-term technology partner for
          our clients. We work closely with businesses
          to understand their challenges and create
          solutions that support sustainable growth.
        </p>
      </section>

      {/* =========================
          SERVICES
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          What We Do
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "16px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.8",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          MISSION
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          marginBottom: "60px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Our Mission
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          To help businesses and entrepreneurs leverage
          technology to grow faster, automate operations
          and create exceptional digital experiences that
          drive long-term success.
        </p>
      </section>

      {/* =========================
          WHY CHOOSE US
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Why Choose RISNAR Technologies
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {values.map((value) => (
            <div
              key={value}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                padding: "24px",
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          TECHNOLOGIES
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Technologies We Use
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.10)",
                color: "#ffffff",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* =========================
          INDUSTRIES
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Industries We Serve
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {industries.map((industry) => (
            <div
              key={industry}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                padding: "24px",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          CTA
         ========================= */}
      <section
        style={{
          textAlign: "center",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Ready to Build Your Next Project?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto 24px",
            lineHeight: "1.8",
          }}
        >
          Whether you need a mobile app, website,
          AI-powered solution or SEO strategy,
          RISNAR Technologies is ready to help.
        </p>

        <LeadFormModal />
      </section>
    </main>
  );
}