export const metadata = {
  title:
    "Flutter Developer Jaipur | Flutter App Development Services - RISNAR Technologies",
  description:
    "Hire a Flutter Developer in Jaipur for Android and cross-platform app development. RISNAR Technologies builds scalable Flutter applications for startups and businesses.",
};

import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

/* =========================
   FLUTTER DEVELOPER JAIPUR
   - Local SEO Landing Page
   - High Intent Keyword Target
   - Lead Generation Focused
   - Consistent Site Design
   ========================= */

export default function FlutterDeveloperJaipurPage() {
  const services = [
    {
      title: "Custom Flutter Apps",
      description:
        "Build modern Flutter applications tailored to your business requirements and growth goals.",
    },
    {
      title: "Android App Development",
      description:
        "Launch high-performance Android apps with beautiful interfaces and smooth user experiences.",
    },
    {
      title: "Cross-Platform Development",
      description:
        "Develop Android and iOS applications from a single Flutter codebase.",
    },
    {
      title: "Startup MVP Development",
      description:
        "Validate your startup idea quickly with a scalable MVP built using Flutter.",
    },
    {
      title: "Firebase Integration",
      description:
        "Authentication, databases, notifications and analytics powered by Firebase.",
    },
    {
      title: "App Maintenance",
      description:
        "Continuous updates, performance improvements and feature enhancements.",
    },
    {
      title: "API Integration",
      description:
        "Connect Flutter applications with third-party services, payment gateways and custom backends.",
    },
    {
      title: "Play Store Publishing",
      description:
        "Complete deployment support including Play Store setup and app release management.",
    },
  ];

  const process = [
    {
      title: "Discovery",
      description:
        "Understand business goals, user requirements and project scope.",
    },
    {
      title: "Planning",
      description:
        "Prepare architecture, user flows and development roadmap.",
    },
    {
      title: "UI/UX Design",
      description:
        "Design intuitive user interfaces optimized for engagement.",
    },
    {
      title: "Flutter Development",
      description:
        "Develop scalable and maintainable Flutter applications.",
    },
    {
      title: "Testing",
      description:
        "Perform extensive testing across devices and screen sizes.",
    },
    {
      title: "Launch",
      description:
        "Deploy applications to the Play Store and production environments.",
    },
    {
      title: "Growth",
      description:
        "Provide long-term support, maintenance and feature upgrades.",
    },
  ];

  const technologies = [
    "Flutter",
    "Dart",
    "Firebase",
    "Supabase",
    "REST APIs",
    "Node.js",
    "Next.js",
    "Google Play",
    "Push Notifications",
    "Cloud Functions",
    "SQLite",
    "GitHub",
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
      {/* HERO */}
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
          Flutter Developer Jaipur
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            maxWidth: "850px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Looking to hire a Flutter Developer in Jaipur? RISNAR Technologies
          helps startups, businesses and entrepreneurs build modern mobile
          applications using Flutter. We create scalable, fast and visually
          impressive applications that deliver excellent user experiences
          while reducing development costs through cross-platform
          development.
        </p>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <LeadFormModal />
        </div>
      </section>

      {/* SERVICES */}
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
          Flutter Development Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
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
              <h3
                style={{
                  color: "#ffffff",
                  marginTop: 0,
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

      {/* WHY FLUTTER */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
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
          Why Choose Flutter?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Flutter is one of the fastest-growing mobile development
          frameworks. It enables businesses to build Android and iOS
          applications using a single codebase, reducing development time,
          maintenance effort and overall project costs.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          With Flutter, businesses benefit from faster development cycles,
          beautiful interfaces, smooth animations and near-native
          performance. Whether you need a startup MVP, customer-facing app,
          booking platform, educational application or business management
          system, Flutter offers an excellent foundation.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          RISNAR Technologies specializes in Flutter development and has
          experience building mobile products across multiple industries
          including education, business productivity, gaming, utilities,
          real estate and digital services.
        </p>
      </section>

      {/* PROCESS */}
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
          Our Flutter Development Process
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {process.map((step, index) => (
            <div
              key={step.title}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                padding: "24px",
              }}
            >
              <div
                style={{
                  color: "#60a5fa",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Step {index + 1}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                  marginTop: 0,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.8",
                  marginBottom: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL SEO CONTENT */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
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
          Flutter App Development Company In Jaipur
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Jaipur is rapidly emerging as a technology and startup hub.
          Businesses throughout Jaipur are investing in mobile applications
          to improve customer engagement, automate operations and create
          new revenue opportunities.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          As a Flutter Developer in Jaipur, RISNAR Technologies helps
          businesses launch mobile products faster while maintaining high
          quality standards. Our development approach focuses on
          performance, scalability and long-term maintainability.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Whether you need a booking platform, marketplace application,
          educational app, internal business tool, customer engagement app
          or startup MVP, we can help transform your idea into a successful
          digital product.
        </p>
      </section>

      {/* TECHNOLOGIES */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
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
            marginBottom: "24px",
          }}
        >
          Technologies We Use
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
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
                  "rgba(255,255,255,0.05)",
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
          RELATED JAIPUR SERVICES
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
          Related Jaipur Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <Link
            href="/services/flutter-developer-jaipur"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "24px",
                color: "#ffffff",
              }}
            >
              Flutter Developer Jaipur
            </div>
          </Link>

          <Link
            href="/services/website-development-jaipur"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "24px",
                color: "#ffffff",
              }}
            >
              Website Development Jaipur
            </div>
          </Link>

          <Link
            href="/services/real-estate-website-development-jaipur"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "24px",
                color: "#ffffff",
              }}
            >
              Real Estate Website Development Jaipur
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
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
          Need A Flutter Developer In Jaipur?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto 24px",
            lineHeight: "1.8",
          }}
        >
          Let's discuss your mobile app idea and create a roadmap for
          development. Whether you need a startup MVP or a complete
          business application, RISNAR Technologies can help.
        </p>

        <LeadFormModal />
      </section>
    </main>
  );
}