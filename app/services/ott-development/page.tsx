import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title:
    "OTT Development - RISNAR Technologies",
  description:
    "Build Netflix-style OTT platforms with video streaming, subscriptions, content management and mobile applications.",
};

export default function OTTDevelopmentPage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
          OTT Development
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
          Launch your own Netflix-style OTT platform
          with video streaming, subscriptions,
          content management and mobile apps.
        </p>
      </section>

      {/* LIVE DEMO */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Live OTT Platform Demo
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.8",
            marginBottom: "24px",
          }}
        >
          Explore our live OTT platform demo
          featuring video streaming, content
          management, subscriptions and user
          authentication.
        </p>

        <a
          href="https://ott.risnar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ui-btn"
          style={{
            textDecoration: "none",
          }}
        >
          View Live Demo
        </a>
      </section>

<>
  {/* =========================
      OTT DEVELOPMENT SERVICES
     ========================= */}
  <section
    style={{
      marginBottom: "40px",
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
        marginTop: 0,
        marginBottom: "20px",
      }}
    >
      OTT Platform Development Services
    </h2>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      RISNAR Technologies provides
      end-to-end OTT development services
      for startups, media companies,
      educators, religious organizations
      and content creators. We build
      Netflix-style OTT platforms,
      video-on-demand applications,
      subscription-based streaming
      services, educational video
      platforms and custom OTT solutions
      that work across web, mobile and
      smart TV devices.
    </p>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      Our OTT solutions include video
      streaming, user authentication,
      subscription management, payment
      gateway integration, content
      management systems, analytics
      dashboards and scalable cloud
      infrastructure capable of handling
      growing audiences.
    </p>
  </section>

  {/* =========================
      FEATURES
     ========================= */}
  <section
    style={{
      marginBottom: "40px",
    }}
  >
    <h2
      style={{
        color: "#ffffff",
        marginBottom: "24px",
      }}
    >
      Features We Build
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {[
        "Video Streaming",
        "User Authentication",
        "Subscription Plans",
        "Content Management",
        "Payment Gateway",
        "Analytics Dashboard",
        "Mobile Apps",
        "Smart TV Support",
      ].map((item) => (
        <div
          key={item}
          style={{
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "20px",
            background:
              "rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* =========================
      OTT TYPES
     ========================= */}
  <section
    style={{
      marginBottom: "40px",
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
        marginTop: 0,
      }}
    >
      OTT Platforms We Can Build
    </h2>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      Netflix-style streaming platforms,
      Disney+ inspired OTT solutions,
      educational video platforms,
      religious OTT apps, movie streaming
      platforms, fitness video platforms,
      online course portals, training
      portals and enterprise video
      libraries.
    </p>
  </section>

  {/* =========================
      PROCESS
     ========================= */}
  <section
    style={{
      marginBottom: "40px",
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
        marginTop: 0,
      }}
    >
      OTT Development Process
    </h2>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.9",
      }}
    >
      Discovery → UI/UX Design →
      Platform Development →
      Video Integration →
      Testing →
      Deployment →
      Ongoing Support
    </p>
  </section>

  {/* =========================
      FAQ
     ========================= */}
  <section
    style={{
      marginBottom: "40px",
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
        marginTop: 0,
      }}
    >
      Frequently Asked Questions
    </h2>

    <h3 style={{ color: "#ffffff" }}>
      What is OTT platform development?
    </h3>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.8",
      }}
    >
      OTT platform development is the
      process of building video streaming
      platforms that deliver content
      directly to users over the internet.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      Can you build Netflix-like apps?
    </h3>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.8",
      }}
    >
      Yes. We build custom OTT platforms
      with subscriptions, user profiles,
      content management and video
      streaming features.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      Do you provide Android TV support?
    </h3>

    <p
      style={{
        color: "#cbd5e1",
        lineHeight: "1.8",
      }}
    >
      Yes. Our OTT solutions can be
      extended to Android TV, web and
      mobile devices.
    </p>
  </section>

  <section
    style={{
      textAlign: "center",
    }}
  >
    <LeadFormModal />
  </section>
</>
    </main>
  );
}