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

      <section
        style={{
          textAlign: "center",
        }}
      >
        <LeadFormModal />
      </section>
    </main>
  );
}