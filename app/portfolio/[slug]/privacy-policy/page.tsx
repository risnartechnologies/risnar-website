import { apps } from "@/lib/apps";

export const dynamic = "force-static";
export const revalidate = 86400;

/* =========================
   STATIC PARAMS
   ========================= */
export async function generateStaticParams() {
  return apps.map((app) => ({
    slug: app.slug,
  }));
}

/* =========================
   METADATA
   ========================= */
export async function generateMetadata({
  params,
}: any) {
  const { slug } =
    await params;

  const app =
    apps.find(
      (a) => a.slug === slug
    );

  if (!app) {
    return {
      title:
        "Privacy Policy - RISNAR Technologies",
      description:
        "Privacy policy",
    };
  }

  return {
    title: `${app.name} Privacy Policy - RISNAR Technologies`,
    description: `Privacy policy for ${app.name}`,
  };
}

/* =========================
   PAGE
   ========================= */
export default async function PrivacyPolicy({
  params,
}: any) {
  const { slug } =
    await params;

  const app =
    apps.find(
      (a) => a.slug === slug
    );

  if (!app) {
    return (
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding:
            "60px 20px",
          fontFamily:
            "Arial, sans-serif",
          color: "#ffffff",
          textAlign:
            "center",
        }}
      >
        <h1>
          Privacy Policy Not Found
        </h1>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding:
          "60px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* =========================
          HERO
         ========================= */}
      <section
        style={{
          textAlign:
            "center",
          marginBottom:
            "40px",
        }}
      >
        <h1
          style={{
            fontSize:
              "48px",
            color:
              "#ffffff",
            marginBottom:
              "16px",
          }}
        >
          {app.name}
          {" "}
          Privacy Policy
        </h1>

        <p
          style={{
            color:
              "#cbd5e1",
            fontSize:
              "18px",
            maxWidth:
              "700px",
            margin:
              "0 auto",
            lineHeight:
              "1.8",
          }}
        >
          Transparency,
          privacy,
          and user trust
          are important
          to us.
        </p>
      </section>

      {/* =========================
          POLICY CARD
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius:
            "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding:
            "40px",
          color:
            "#e2e8f0",
          lineHeight:
            "1.9",
        }}
      >
        <p>
          Welcome to{" "}
          <strong>
            {app.name}
          </strong>
          , a mobile
          application
          developed and
          published by{" "}
          <strong>
            RISNAR
            Technologies
          </strong>
          . This Privacy
          Policy explains
          how we handle
          your information
          when you use our
          application.
        </p>

        <p>
          By installing
          or using{" "}
          {app.name},
          you agree to
          this Privacy
          Policy.
        </p>

        {/* =========================
            SECTION 1
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          1. Information
          We Collect
        </h2>

        <p>
          We do not
          collect
          personally
          identifiable
          information.
          The app does
          not require
          account
          creation,
          login, or
          personal data
          entry.
        </p>

        <p>
          Limited
          technical data
          may be
          collected
          automatically:
        </p>

        <ul>
          <li>
            Device model
            and OS version
          </li>
          <li>
            App usage
            statistics
          </li>
          <li>
            Crash reports
            and analytics
          </li>
        </ul>

        {/* =========================
            SECTION 2
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          2. How We Use
          Information
        </h2>

        <ul>
          <li>
            Improve app
            performance
          </li>
          <li>
            Fix bugs and
            crashes
          </li>
          <li>
            Enhance user
            experience
          </li>
          <li>
            Deliver
            reminders,
            alerts, and
            notifications
          </li>
        </ul>

        <p>
          We do not sell,
          rent, or share
          your personal
          information
          with third
          parties.
        </p>

        {/* =========================
            SECTION 3
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          3.
          Notifications
          and Device
          Scheduling
        </h2>

        <p>
          Some features
          may use local
          notifications,
          alarm services,
          scheduling,
          or exact alarm
          functionality
          to provide
          reminders and
          time-based
          alerts.
        </p>

        <p>
          These features
          may continue
          working even
          when the app
          is not actively
          open, subject
          to device
          settings and
          permissions.
        </p>

        <p>
          These
          permissions are
          used solely to
          provide app
          functionality
          and do not
          collect
          personal data.
        </p>

        {/* =========================
            SECTION 4
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          4. Third-Party
          Services
        </h2>

        <ul>
          <li>
            Google Play
            Services
          </li>
          <li>
            Firebase
            Analytics
          </li>
          <li>
            Firebase
            Crashlytics
          </li>
        </ul>

        <p>
          Google Privacy
          Policy:
        </p>

        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color:
              "#60a5fa",
            wordBreak:
              "break-word",
          }}
        >
          https://policies.google.com/privacy
        </a>

        {/* =========================
            SECTION 5
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          5.
          Children’s
          Privacy
        </h2>

        <p>
          This app is
          designed to be
          safe for all
          age groups. We
          do not knowingly
          collect personal
          information
          from children
          under 13 years
          of age.
        </p>

        {/* =========================
            SECTION 6
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          6. Changes to
          This Privacy
          Policy
        </h2>

        <p>
          We may update
          this Privacy
          Policy from
          time to time.
          Any updates
          will be posted
          on this page
          and become
          effective
          immediately.
        </p>

        {/* =========================
            SECTION 7
           ========================= */}
        <h2
          style={{
            marginTop:
              "40px",
            color:
              "#ffffff",
          }}
        >
          7. Contact Us
        </h2>

        <p>
          Email:
          {" "}
          contact@risnar.com
        </p>

        <p
          style={{
            marginTop:
              "40px",
            color:
              "#94a3b8",
          }}
        >
          <strong>
            Last Updated:
          </strong>
          {" "}
          30 May 2026
        </p>
      </section>
    </main>
  );
}