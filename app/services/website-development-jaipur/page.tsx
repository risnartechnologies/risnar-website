export const metadata = {
title: "Flutter Developer Jaipur | Flutter App Development Services - RISNAR Technologies",
description:
"Hire a Flutter Developer in Jaipur for high-performance Android and cross-platform mobile applications. RISNAR Technologies provides custom Flutter app development services.",
};

import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

/* =========================
FLUTTER DEVELOPER JAIPUR

* Local SEO Landing Page
* Jaipur Targeted Keywords
* Lead Generation Focused
* Consistent Site Styling
  ========================= */

export default function FlutterDeveloperJaipurPage() {
const services = [
{
title: "Custom Flutter Apps",
description:
"Build high-performance Flutter applications tailored to your business goals and customer requirements.",
},
{
title: "Android App Development",
description:
"Launch scalable Android applications using Flutter with modern UI and excellent performance.",
},
{
title: "Startup MVP Development",
description:
"Validate your startup idea quickly with a production-ready Flutter MVP.",
},
{
title: "App Modernization",
description:
"Upgrade existing mobile applications with Flutter for better maintainability and faster development.",
},
{
title: "Firebase Integration",
description:
"Authentication, databases, notifications and analytics powered by Firebase.",
},
{
title: "Play Store Publishing",
description:
"Complete deployment support including Play Store setup, releases and updates.",
},
];

const process = [
  "Requirement Analysis",
  "UI/UX Planning",
  "Flutter Development",
  "Testing & QA",
  "Play Store Deployment",
  "Support & Maintenance",
];

const faqs = [
  {
    question:
      "How much does website development cost in Jaipur?",
    answer:
      "Website development costs depend on project scope, design requirements, features and integrations. We provide customized quotations based on business needs.",
  },
  {
    question:
      "Do you build custom business websites?",
    answer:
      "Yes. We create custom business websites tailored to your industry, branding and business goals.",
  },
  {
    question:
      "Will my website be mobile responsive?",
    answer:
      "Yes. Every website we build is fully responsive and optimized for mobile, tablet and desktop devices.",
  },
  {
    question:
      "Do you provide website maintenance services?",
    answer:
      "Yes. We offer ongoing maintenance, updates, security monitoring and technical support.",
  },
  {
    question:
      "Can you develop e-commerce websites?",
    answer:
      "Yes. We build e-commerce platforms, online stores and custom shopping experiences for businesses.",
  },
  {
    question:
      "Do you optimize websites for SEO?",
    answer:
      "Yes. Our websites are developed with SEO best practices including performance optimization, clean structure and technical SEO foundations.",
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
                "Website Development Jaipur",
              item:
                "https://risnar.com/services/website-development-jaipur",
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
    Website Development Jaipur
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
Flutter Developer Jaipur </h1>

```
    <p
      style={{
        color: "#cbd5e1",
        fontSize: "18px",
        maxWidth: "850px",
        margin: "0 auto",
        lineHeight: "1.8",
      }}
    >
      Looking for a Flutter Developer in Jaipur? RISNAR Technologies
      helps startups, businesses and entrepreneurs build modern mobile
      applications using Flutter. We develop fast, scalable and visually
      appealing apps that deliver exceptional user experiences while
      reducing development costs through a single codebase approach.
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
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
      marginBottom: "60px",
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
      Why Choose Flutter For Your Mobile App?
    </h2>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      Flutter is one of the most popular frameworks for building modern
      mobile applications. It allows developers to create Android and
      iOS applications from a single codebase, reducing development
      time and maintenance costs. Businesses benefit from faster
      launches, consistent user experiences and excellent performance.
    </p>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      At RISNAR Technologies, we use Flutter, Firebase, APIs and
      modern development practices to create mobile applications that
      are scalable, secure and easy to maintain.
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
      Flutter App Development Company in Jaipur
    </h2>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      Jaipur is rapidly growing as a technology and startup hub.
      Businesses across Jaipur are investing in mobile applications to
      improve customer engagement, automate operations and generate
      new revenue streams. Whether you need a business application,
      booking platform, marketplace, educational app or startup MVP,
      our Flutter development services can help bring your vision to
      life.
    </p>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      We work with entrepreneurs, startups, agencies and established
      businesses throughout Jaipur and Rajasthan, delivering reliable
      mobile solutions designed for long-term growth.
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

{/* FAQ */}
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
    Frequently Asked Questions
  </h2>

  <div
    style={{
      display: "grid",
      gap: "20px",
    }}
  >
    {faqs.map((faq) => (
      <div
        key={faq.question}
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
          }}
        >
          {faq.question}
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.8",
            marginBottom: 0,
          }}
        >
          {faq.answer}
        </p>
      </div>
    ))}
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
      Let's discuss your app idea and create a roadmap for development.
      Whether you need a startup MVP or a full-scale business
      application, RISNAR Technologies can help.
    </p>

    <LeadFormModal />
  </section>
    </main>
  </>
  );
}