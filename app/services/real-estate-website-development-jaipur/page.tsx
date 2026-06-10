export const metadata = {
  title:
    "Real Estate Website Development Jaipur | Real Estate Web Design Jaipur - RISNAR Technologies",
  description:
    "Professional Real Estate Website Development Services in Jaipur. Property listing websites, real estate portals, builder websites and lead generation platforms by RISNAR Technologies.",
};

import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

/* =========================
   REAL ESTATE WEBSITE
   DEVELOPMENT JAIPUR
   - Local SEO Landing Page
   - Real Estate Industry Focus
   - High Value Lead Generation
   - Consistent Site Styling
   ========================= */

export default function RealEstateWebsiteDevelopmentJaipurPage() {
  const services = [
    {
      title: "Property Listing Websites",
      description:
        "Showcase residential, commercial and rental properties with advanced search and filtering features.",
    },
    {
      title: "Builder & Developer Websites",
      description:
        "Professional websites for builders, developers and real estate companies to generate quality leads.",
    },
    {
      title: "Real Estate Portals",
      description:
        "Large-scale property portals with user accounts, listings and enquiry management systems.",
    },
    {
      title: "Broker Websites",
      description:
        "Lead generation websites designed specifically for real estate agents and property consultants.",
    },
    {
      title: "Project Landing Pages",
      description:
        "High-converting landing pages for new residential and commercial projects.",
    },
    {
      title: "CRM Integration",
      description:
        "Integrate enquiries directly into CRM systems for efficient lead management.",
    },
    {
      title: "SEO Optimization",
      description:
        "Built-in SEO structure to improve Google rankings and generate organic property leads.",
    },
    {
      title: "Google Maps Integration",
      description:
        "Display project locations, nearby amenities and location-based search functionality.",
    },
  ];

  const features = [
    "Property Listings",
    "Advanced Search Filters",
    "Google Maps Integration",
    "Property Enquiry Forms",
    "Lead Management",
    "Project Galleries",
    "WhatsApp Integration",
    "Mobile Responsive Design",
    "SEO Optimization",
    "Blog System",
    "Admin Dashboard",
    "Property Comparison",
  ];

const process = [
  {
    title: "Business Discovery",
    description:
      "Understand your real estate business model, target audience and lead generation goals.",
  },
  {
    title: "Website Planning",
    description:
      "Define website structure, property categories and conversion strategy.",
  },
  {
    title: "Design & Branding",
    description:
      "Create a premium design that builds trust and credibility with buyers.",
  },
  {
    title: "Development",
    description:
      "Build the website using modern technologies focused on speed and scalability.",
  },
  {
    title: "SEO Setup",
    description:
      "Implement technical SEO foundations for better search engine visibility.",
  },
  {
    title: "Launch",
    description:
      "Deploy the website and configure analytics, forms and lead tracking.",
  },
  {
    title: "Growth Support",
    description:
      "Continuous updates, SEO improvements and feature enhancements.",
  },
];

const faqs = [
  {
    question:
      "Why does a real estate business need a website?",
    answer:
      "A professional website helps real estate businesses generate leads, showcase properties, build credibility and attract buyers through Google search.",
  },
  {
    question:
      "Can you create property listing websites?",
    answer:
      "Yes. We build property listing websites with search filters, property details, enquiry forms and lead management features.",
  },
  {
    question:
      "Do you provide SEO for real estate websites?",
    answer:
      "Yes. Every website is built with SEO best practices to improve visibility and generate organic traffic.",
  },
  {
    question:
      "Can brokers and property consultants use these websites?",
    answer:
      "Yes. Our solutions are suitable for brokers, agents, developers, builders and real estate agencies.",
  },
  {
    question:
      "Do you integrate WhatsApp and CRM systems?",
    answer:
      "Yes. We can integrate WhatsApp, CRM systems and lead tracking tools to improve enquiry management.",
  },
  {
    question:
      "How much does a real estate website cost in Jaipur?",
    answer:
      "Pricing depends on features, property management requirements and integrations. We provide customized quotations based on project scope.",
  },
];

 return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context":
            "https://schema.org",
          "@type":
            "BreadcrumbList",
          itemListElement: [
            {
              "@type":
                "ListItem",
              position: 1,
              name: "Home",
              item:
                "https://risnar.com",
            },
            {
              "@type":
                "ListItem",
              position: 2,
              name: "Services",
              item:
                "https://risnar.com/services",
            },
            {
              "@type":
                "ListItem",
              position: 3,
              name:
                "Real Estate Website Development Jaipur",
              item:
                "https://risnar.com/services/real-estate-website-development-jaipur",
            },
          ],
        }),
      }}
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context":
            "https://schema.org",
          "@type":
            "FAQPage",
          mainEntity:
            faqs.map((faq) => ({
              "@type":
                "Question",
              name:
                faq.question,
              acceptedAnswer:
                {
                  "@type":
                    "Answer",
                  text:
                    faq.answer,
                },
            })),
        }),
      }}
    />

    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
{/* BREADCRUMB */}
<div
  style={{
    marginBottom: "24px",
    color: "#94a3b8",
    fontSize: "14px",
  }}
>
  <Link
    href="/"
    style={{
      color: "#94a3b8",
      textDecoration: "none",
    }}
  >
    Home
  </Link>

  {" > "}

  <Link
    href="/services"
    style={{
      color: "#94a3b8",
      textDecoration: "none",
    }}
  >
    Services
  </Link>

  {" > "}

  <span>
    Real Estate Website Development Jaipur
  </span>
</div>

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
          Real Estate Website Development Jaipur
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          RISNAR Technologies helps real estate brokers,
          builders, developers and property consultants in Jaipur
          build professional websites that generate high-quality
          leads. From property listing platforms to complete
          real estate portals, we create websites designed to
          attract buyers, showcase projects and grow your business.
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
          Real Estate Website Services
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

      {/* WHY REAL ESTATE WEBSITE */}
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
          Why Every Real Estate Business Needs A Professional Website
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Most property buyers begin their search online. Whether
          someone is looking for apartments, villas, plots,
          commercial spaces or investment opportunities, the first
          interaction often happens through a website.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          A professional real estate website helps establish trust,
          showcase properties, generate enquiries and build a
          strong online presence. It works as a 24/7 sales channel
          that continuously attracts potential buyers and investors.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          For real estate brokers and developers in Jaipur,
          having a modern website can significantly increase
          visibility and improve lead generation compared to
          relying solely on property portals and social media.
        </p>
      </section>

      {/* FEATURES */}
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
          Features Included
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "14px",
                padding: "18px",
                background:
                  "rgba(255,255,255,0.03)",
                color: "#cbd5e1",
              }}
            >
              ✓ {feature}
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
          Our Development Process
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
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
          Real Estate Website Development Company In Jaipur
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Jaipur's real estate market continues to grow with new
          residential projects, commercial developments and
          investment opportunities emerging across the city.
          Builders, developers and brokers need professional
          digital platforms to reach modern buyers.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          RISNAR Technologies specializes in developing real estate
          websites that not only look professional but are also
          optimized for lead generation and search engine visibility.
          We help businesses showcase projects effectively and
          convert visitors into enquiries.
        </p>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.9",
          }}
        >
          Whether you are a real estate broker, builder,
          developer, property consultant or agency in Jaipur,
          we can create a custom website tailored to your
          business goals.
        </p>
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
  href="/services/app-development-jaipur"
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
    App Development Jaipur
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
          Need A Real Estate Website In Jaipur?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "700px",
            margin: "0 auto 24px",
            lineHeight: "1.8",
          }}
        >
          Let's discuss your real estate business and build a
          professional website that generates leads, showcases
          properties and helps grow your brand online.
        </p>

        <LeadFormModal />
      </section>
        </main>
  </>
  );
}