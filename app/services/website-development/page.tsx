import LeadFormModal from "@/app/components/LeadFormModal";
export const metadata = {
  title: "Website Development Services - RISNAR Technologies",
  description:
    "Professional website development services for businesses, startups and creators.",
};

/* =========================
   WEBSITE DEVELOPMENT PAGE
   - Expanded service coverage
   - Detailed development process
   - Glassmorphism sections
   - Responsive layout
   - Consistent site styling
   ========================= */
export default function WebsiteDevelopmentPage() {
  const services = [
    {
      icon: "🌐",
      title: "Business Websites",
      description:
        "Professional websites designed to establish credibility, generate leads and showcase your products or services.",
    },
    {
      icon: "🚀",
      title: "Landing Pages",
      description:
        "High-converting landing pages optimized for marketing campaigns, lead generation and product launches.",
    },
    {
      icon: "🖥️",
      title: "Custom Web Applications",
      description:
        "Powerful web-based software tailored to your business processes, workflows and operational requirements.",
    },
    {
      icon: "🛒",
      title: "E-Commerce Websites",
      description:
        "Online stores with product catalogs, payment gateways, inventory management and customer management systems.",
    },
    {
      icon: "📊",
      title: "Admin Dashboards",
      description:
        "Data-driven dashboards that provide insights, analytics and business intelligence in real time.",
    },
    {
      icon: "🎨",
      title: "Portfolio Websites",
      description:
        "Beautiful portfolio websites for creators, agencies, consultants and professionals to showcase their work.",
    },
    {
      icon: "🏢",
      title: "Corporate Websites",
      description:
        "Enterprise-grade websites that strengthen brand identity and support large-scale business operations.",
    },
    {
      icon: "⚙️",
      title: "SaaS Platforms",
      description:
        "Scalable software-as-a-service platforms with authentication, subscriptions, dashboards and automation.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description:
        "We understand your business goals, target audience, competitors and project requirements before development begins.",
    },
    {
      step: "02",
      title: "Planning & Strategy",
      description:
        "We create a project roadmap, sitemap, feature list and technical architecture to ensure a smooth development process.",
    },
    {
      step: "03",
      title: "UI/UX Design",
      description:
        "User-focused designs are created to improve engagement, usability and conversion rates across all devices.",
    },
    {
      step: "04",
      title: "Frontend Development",
      description:
        "Modern responsive interfaces are built using industry-standard technologies for speed and reliability.",
    },
    {
      step: "05",
      title: "Backend Development",
      description:
        "Secure APIs, databases, authentication systems and business logic are implemented to power the website.",
    },
    {
      step: "06",
      title: "Testing & Optimization",
      description:
        "Performance testing, browser compatibility checks, mobile responsiveness and security reviews are completed.",
    },
    {
      step: "07",
      title: "Deployment & Launch",
      description:
        "The website is deployed to production servers with monitoring, backups and deployment best practices.",
    },
    {
      step: "08",
      title: "Support & Growth",
      description:
        "Ongoing updates, maintenance, feature enhancements and optimization help your website continue to grow.",
    },
  ];

  const features = [
    "Mobile-First Responsive Design",
    "Fast Loading Performance",
    "SEO-Friendly Architecture",
    "Modern UI & UX Design",
    "Secure Development Practices",
    "Scalable Infrastructure",
    "Analytics Integration",
    "Lead Generation Optimization",
    "Content Management Systems",
    "Third-Party Integrations",
    "Cloud Deployment",
    "Long-Term Maintenance",
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
          Website Development Services
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
          We create modern, fast and scalable websites that
          help businesses build credibility, generate leads,
          improve customer engagement and drive long-term
          growth. From simple business websites to advanced
          SaaS platforms, we deliver solutions designed for
          performance and results.
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
            textAlign: "center",
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          End-to-End Website Development
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            textAlign: "center",
            lineHeight: "2",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          A website is often the first interaction customers
          have with your business. We focus on creating
          websites that not only look professional but also
          perform exceptionally well. Every project is built
          with scalability, security, speed and search engine
          visibility in mind, ensuring your online presence
          supports your business goals today and in the future.
        </p>
      </section>

      {/* =========================
          WHAT WE BUILD
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
          WHY CHOOSE US
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
          Why Businesses Choose RISNAR
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                color: "#cbd5e1",
              }}
            >
              ✓ {feature}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          DEVELOPMENT PROCESS
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
          Our Website Development Process
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
            "Next.js",
            "React",
            "TypeScript",
            "Node.js",
            "Firebase",
            "Supabase",
            "REST APIs",
            "PostgreSQL",
            "Cloud Hosting",
            "SEO Optimization",
            "Analytics",
            "Performance Monitoring",
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
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "18px",
          }}
        >
          Ready To Build Your Website?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "800px",
            margin: "0 auto 28px",
            lineHeight: "1.9",
          }}
        >
          Whether you need a business website, portfolio,
          landing page, SaaS platform, customer portal or
          custom web application, RISNAR Technologies can
          help you build a modern digital presence that
          attracts customers and drives business growth.
        </p>

      <LeadFormModal />
      </section>
    </main>
  );
}