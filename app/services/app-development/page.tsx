import LeadFormModal from "@/app/components/LeadFormModal";
export const metadata = {
  title: "App Development Services - RISNAR Technologies",
  description:
    "Custom Android and Flutter app development services for startups, businesses and creators.",
};

/* =========================
   APP DEVELOPMENT PAGE
   - Expanded service coverage
   - Detailed development process
   - Glassmorphism sections
   - Responsive layout
   - Consistent site styling
   ========================= */
export default function AppDevelopmentPage() {
  const services = [
    {
      icon: "📱",
      title: "Flutter App Development",
      description:
        "Cross-platform mobile applications for Android and iOS using a single codebase for faster development and lower maintenance costs.",
    },
    {
      icon: "🤖",
      title: "Android App Development",
      description:
        "Custom Android applications designed for performance, scalability and long-term business growth.",
    },
    {
      icon: "🏢",
      title: "Business Applications",
      description:
        "Internal business systems, employee apps, customer portals and workflow automation solutions.",
    },
    {
      icon: "🚀",
      title: "Startup MVP Development",
      description:
        "Rapid MVP development that helps founders validate ideas, attract investors and launch faster.",
    },
    {
      icon: "🛒",
      title: "E-Commerce Apps",
      description:
        "Shopping applications with payment integration, inventory management and customer engagement features.",
    },
    {
      icon: "🔔",
      title: "Notification Systems",
      description:
        "Push notifications, reminders, engagement campaigns and customer retention solutions.",
    },
    {
      icon: "☁️",
      title: "Backend Integration",
      description:
        "Firebase, Supabase, REST APIs and cloud infrastructure integration for scalable applications.",
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description:
        "Data-driven dashboards, reporting systems and user analytics to help businesses make better decisions.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We understand your business goals, target audience, competitors and technical requirements before development begins.",
    },
    {
      step: "02",
      title: "Planning & Architecture",
      description:
        "We create the project roadmap, database structure, app architecture and development timeline.",
    },
    {
      step: "03",
      title: "UI/UX Design",
      description:
        "Clean, modern and user-friendly interfaces designed to maximize engagement and conversions.",
    },
    {
      step: "04",
      title: "Development",
      description:
        "Frontend, backend and API development using modern technologies and industry best practices.",
    },
    {
      step: "05",
      title: "Testing & Quality Assurance",
      description:
        "Comprehensive testing across devices to ensure reliability, performance and stability.",
    },
    {
      step: "06",
      title: "Launch & Deployment",
      description:
        "Publishing to Google Play Store, server deployment and production environment setup.",
    },
    {
      step: "07",
      title: "Maintenance & Support",
      description:
        "Ongoing updates, bug fixes, performance optimization and feature enhancements.",
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
          marginBottom: "70px",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          App Development Services
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.9",
          }}
        >
          We design, build and launch high-performance mobile
          applications that help startups, businesses and
          creators reach more customers, automate processes,
          improve engagement and generate revenue.
        </p>
      </section>

      {/* =========================
          OVERVIEW
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
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
            marginTop: 0,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          End-to-End Mobile App Development
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "2",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          From idea validation and UI/UX design to
          development, testing, deployment and ongoing
          maintenance, RISNAR Technologies provides complete
          mobile app development services tailored to your
          business objectives. Whether you need a startup MVP,
          customer-facing application or internal business
          solution, we help transform ideas into successful
          digital products.
        </p>
      </section>

      {/* =========================
          SERVICES GRID
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          What We Build
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
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "28px",
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
                  marginTop: 0,
                  marginBottom: "12px",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.9",
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          PROCESS
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Our Development Process
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {process.map((item) => (
            <div
              key={item.step}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "rgba(59,130,246,0.18)",
                  border:
                    "1px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginBottom: "18px",
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                  marginTop: 0,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.9",
                  marginBottom: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          TECHNOLOGIES
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
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
          {[
            "Flutter",
            "Dart",
            "Firebase",
            "Supabase",
            "Node.js",
            "Next.js",
            "REST APIs",
            "Google Play",
            "Cloud Functions",
            "Push Notifications",
            "Analytics",
            "Payment Gateways",
          ].map((tech) => (
            <span
              key={tech}
              style={{
                padding: "10px 18px",
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
          padding: "50px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "18px",
          }}
        >
          Ready to Build Your App?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "800px",
            margin: "0 auto 28px",
            lineHeight: "1.9",
          }}
        >
          Whether you're launching a startup, building a SaaS
          product, creating a customer-facing application or
          modernizing internal business processes, our team
          can help turn your idea into a successful mobile
          application.
        </p>

      <LeadFormModal />
      </section>
    </main>
  );
}