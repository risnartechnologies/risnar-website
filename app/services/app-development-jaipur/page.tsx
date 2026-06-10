export const metadata = {
  title: "App Development Jaipur | Mobile App Development Company Jaipur - RISNAR Technologies",
  description:
    "Professional App Development Services in Jaipur. Custom Android apps, Flutter apps, startup MVPs and business mobile applications by RISNAR Technologies.",
};

import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

/* =========================
   APP DEVELOPMENT JAIPUR
   - Local SEO Landing Page
   - Mobile App Development Focus
   - Lead Generation Optimized
   - Consistent Site Styling
   ========================= */

export default function AppDevelopmentJaipurPage() {
  const services = [
    {
      title: "Android App Development",
      description:
        "Custom Android applications built for performance, scalability and user engagement.",
    },
    {
      title: "Flutter App Development",
      description:
        "Cross-platform mobile applications for Android and iOS using a single Flutter codebase.",
    },
    {
      title: "Startup MVP Development",
      description:
        "Launch your startup idea quickly with a market-ready MVP application.",
    },
    {
      title: "Business Applications",
      description:
        "Mobile solutions designed to automate workflows and improve business productivity.",
    },
    {
      title: "E-Commerce Apps",
      description:
        "Online shopping and marketplace applications with secure payment integrations.",
    },
    {
      title: "App Maintenance & Support",
      description:
        "Ongoing updates, bug fixes and feature enhancements after launch.",
    },
  ];

  const process = [
    "Requirement Discovery",
    "Market Research",
    "UI / UX Design",
    "Development",
    "Testing & Quality Assurance",
    "Play Store Launch",
    "Growth & Maintenance",
  ];

  const benefits = [
    "Increase customer engagement",
    "Build brand loyalty",
    "Generate recurring revenue",
    "Improve customer support",
    "Automate business processes",
    "Reach mobile-first audiences",
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
          App Development Jaipur
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
          RISNAR Technologies provides professional App Development Services
          in Jaipur for startups, entrepreneurs and businesses looking to
          build powerful mobile applications. From Android apps and Flutter
          applications to complete business platforms, we help transform
          ideas into scalable digital products.
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
          App Development Services We Offer
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

      {/* WHY MOBILE APPS */}
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
          Why Your Business Needs A Mobile App
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Mobile applications have become one of the most effective ways
          for businesses to connect with customers. Whether you operate a
          startup, retail store, educational institution, healthcare
          service or real estate company, a mobile application can improve
          customer engagement and streamline operations.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Businesses in Jaipur are increasingly adopting mobile-first
          strategies to attract new customers and stay ahead of
          competitors. A well-designed mobile app provides direct access
          to your audience while improving brand visibility and customer
          retention.
        </p>
      </section>

      {/* BENEFITS */}
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
          Benefits Of Mobile App Development
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                padding: "20px",
                background:
                  "rgba(255,255,255,0.03)",
                color: "#cbd5e1",
              }}
            >
              ✓ {benefit}
            </div>
          ))}
        </div>
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
          Our App Development Process
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
              key={step}
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

              <div
                style={{
                  color: "#ffffff",
                }}
              >
                {step}
              </div>
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
          Mobile App Development Company In Jaipur
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Jaipur is emerging as one of Rajasthan's fastest-growing
          technology and startup ecosystems. Businesses across industries
          are investing in mobile applications to improve customer
          experiences, automate operations and expand their market reach.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          RISNAR Technologies helps Jaipur-based businesses build custom
          mobile applications tailored to their unique requirements. From
          idea validation and MVP development to enterprise-grade
          applications, we provide end-to-end app development services.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Whether you need a booking application, marketplace platform,
          educational app, healthcare solution, real estate application
          or internal business software, our team can design, develop and
          launch a reliable mobile product that supports your growth.
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
          {[
            "Flutter",
            "Dart",
            "Firebase",
            "Supabase",
            "REST APIs",
            "Google Play",
            "Next.js",
            "Node.js",
          ].map((tech) => (
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
          Ready To Build Your Mobile App?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto 24px",
            lineHeight: "1.8",
          }}
        >
          Let's discuss your project and create a roadmap for launching
          your next mobile application. Our team can help you turn your
          idea into a successful digital product.
        </p>

        <LeadFormModal />
      </section>
    </main>
  );
}