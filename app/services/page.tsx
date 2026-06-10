import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";
export const metadata = {
  title: "Services - RISNAR Technologies",
  description:
    "Mobile app development, website development, AI solutions and SEO services by RISNAR Technologies.",
};

/* =========================
   SERVICES PAGE
   - 2x2 service grid
   - Service icons
   - Glassmorphism cards
   - Responsive layout
   - Consistent site styling
   ========================= */
export default function ServicesPage() {
  const services = [
    {
      icon: "📱",
      title: "App Development",
      description:
        "Build Android and Flutter applications for startups, businesses and creators.",
      href: "/services/app-development",
      buttonText: "Learn More",
    },

    {
      icon: "🌐",
      title: "Website Development",
      description:
        "Modern websites, web applications and business platforms built for growth.",
      href: "/services/website-development",
      buttonText: "Learn More",
    },

    {
      icon: "🤖",
      title: "AI Solutions",
      description:
        "AI chatbots, automation systems and custom AI-powered business tools.",
      href: "/services/ai-solutions",
      buttonText: "Learn More",
    },

    {
      icon: "📈",
      title: "SEO Solutions",
      description:
        "Improve rankings, increase traffic and grow your online visibility.",
      href: "/services/seo-solutions",
      buttonText: "Learn More",
    },
  ];

const jaipurServices = [
  {
    title: "Flutter Developer Jaipur",
    description:
      "Hire experienced Flutter developers in Jaipur for cross-platform mobile apps.",
    href: "/services/flutter-developer-jaipur",
  },
  {
    title: "App Development Jaipur",
    description:
      "Custom Android and Flutter app development services for Jaipur businesses.",
    href: "/services/app-development-jaipur",
  },
  {
    title: "Website Development Jaipur",
    description:
      "Professional business websites, portals and web applications in Jaipur.",
    href: "/services/website-development-jaipur",
  },
  {
    title:
      "Real Estate Website Development Jaipur",
    description:
      "Property listing websites and real estate portals designed for growth.",
    href:
      "/services/real-estate-website-development-jaipur",
  },
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
            marginBottom: "16px",
          }}
        >
          Our Services
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          We help businesses, startups and creators
          build digital products, automate workflows
          and grow online through technology.
        </p>
      </section>

      {/* =========================
          SERVICES GRID (2x2)
         ========================= */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "24px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            style={{
              border:
                "1px solid rgba(255,255,255,0.15)",
              borderRadius: "20px",
              background:
                "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              padding: "32px",
              minHeight: "260px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "52px",
                  marginBottom: "18px",
                }}
              >
                {service.icon}
              </div>

              <h2
                style={{
                  color: "#ffffff",
                  marginTop: 0,
                  marginBottom: "16px",
                  fontSize: "28px",
                }}
              >
                {service.title}
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                  fontSize: "17px",
                }}
              >
                {service.description}
              </p>
            </div>

            <Link
              href={service.href}
              style={{
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              <span className="ui-btn">
                {service.buttonText}
              </span>
            </Link>
          </div>
        ))}
      </section>

{/* =========================
    POPULAR JAIPUR SERVICES
   ========================= */}
<section
  style={{
    marginTop: "80px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "36px",
    }}
  >
    Popular Jaipur Services
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(2, minmax(0, 1fr))",
      gap: "24px",
    }}
  >
    {jaipurServices.map(
      (service) => (
        <div
          key={`popular-${service.title}`}
          style={{
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            background:
              "rgba(255,255,255,0.03)",
            backdropFilter:
              "blur(12px)",
            padding: "24px",
          }}
        >
          <h3
            style={{
              color: "#ffffff",
              marginTop: 0,
              marginBottom: "12px",
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            {service.description}
          </p>

          <Link
            href={service.href}
            style={{
              textDecoration: "none",
            }}
          >
            <span className="ui-btn">
              Learn More
            </span>
          </Link>
        </div>
      )
    )}
  </div>
</section>

{/* =========================
    CTA
   ========================= */}
<section
        style={{
          textAlign: "center",
          marginTop: "80px",
          padding: "40px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Need a Custom Solution?
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
          AI-powered platform or SEO strategy,
          RISNAR Technologies can help bring
          your vision to life.
        </p>

      <LeadFormModal />
      </section>

    <style>{`
      @media (max-width: 768px) {
        section:nth-of-type(2) {
          grid-template-columns: 1fr !important;
        }

        section:nth-of-type(3) > div {
          grid-template-columns: 1fr !important;
        }

        section:nth-of-type(4) > div {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
    </main>
  );
}