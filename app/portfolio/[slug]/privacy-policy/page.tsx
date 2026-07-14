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

/* =========================
   XO ARENA POLICY
========================= */

if (slug === "xo-arena") {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#e5e7eb",
        lineHeight: 1.9,
      }}
    >
      <h1 style={{ color: "#ffffff" }}>
        XO Arena Privacy Policy
      </h1>

      <p>
        <strong>Last Updated:</strong> July 8, 2026
      </p>
<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  1. Information We Collect
</h2>

<p>
  XO Arena does not collect personally
  identifiable information directly.
  However, depending on the features you
  choose to use, Google services may
  process certain information.
</p>

<p>The App may access:</p>

<ul>
  <li>
    Google Play Games profile
    information (when you sign in)
  </li>
  <li>Player nickname</li>
  <li>Player ID</li>
  <li>Achievements progress</li>
  <li>Leaderboard scores</li>
  <li>Game statistics</li>
  <li>Daily streak information</li>
</ul>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  2. Google Sign-In
</h2>

<p>
  XO Arena supports optional Google
  Sign-In.
</p>

<p>
  When you choose to sign in, Google may
  provide your display name and unique
  player ID. RISNAR Technologies never
  receives or stores your Google account
  password.
</p>

<p>
  Google Sign-In is optional. You may
  continue playing without signing in,
  although achievements, leaderboards and
  other online features may not be
  available.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  3. Google Play Games Services
</h2>

<p>
  XO Arena integrates Google Play Games
  Services to provide:
</p>

<ul>
  <li>Player authentication</li>
  <li>Achievements</li>
  <li>Global leaderboards</li>
  <li>Player profile</li>
  <li>Statistics tracking</li>
  <li>Daily streak synchronization</li>
</ul>

<p>
  Information processed through Google
  Play Games Services is governed by
  Google's own Privacy Policy.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  4. How We Use Information
</h2>

<p>Information is used only to:</p>

<ul>
  <li>Authenticate players</li>
  <li>Unlock achievements</li>
  <li>Submit leaderboard scores</li>
  <li>Maintain daily streaks</li>
  <li>Track gameplay statistics</li>
  <li>Improve gameplay experience</li>
  <li>Maintain app stability</li>
</ul>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  5. Third-Party Services
</h2>

<p>XO Arena may use:</p>

<ul>
  <li>Google Play Games Services</li>
  <li>Google Play Services</li>
  <li>Google Sign-In</li>
</ul>

<p>
  These services may collect information
  according to their own privacy
  policies.
</p>

<a
  href="https://policies.google.com/privacy"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    color: "#60a5fa",
    wordBreak: "break-word",
  }}
>
  https://policies.google.com/privacy
</a>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  6. Data Sharing
</h2>

<p>
  RISNAR Technologies does not sell,
  rent or trade your personal
  information.
</p>

<p>
  Information required for Google Play
  Games functionality is processed only
  through Google's services.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  7. Children's Privacy
</h2>

<p>
  XO Arena does not knowingly collect
  personal information from children.
  Parents or guardians who believe a
  child has provided personal
  information may contact us.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  8. Data Security
</h2>

<p>
  We take reasonable measures to protect
  information used by the App. However,
  no method of electronic transmission or
  storage is completely secure.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  9. Your Choices
</h2>

<ul>
  <li>Play without Google Sign-In.</li>
  <li>Sign out of Google Play Games.</li>
  <li>Delete the App at any time.</li>
</ul>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  10. Changes to This Privacy Policy
</h2>

<p>
  This Privacy Policy may be updated
  periodically. Any changes will be
  posted on this page together with the
  updated revision date.
</p>

<h2
  style={{
    color: "#ffffff",
    marginTop: "40px",
  }}
>
  11. Contact Us
</h2>

<p>
  <strong>RISNAR Technologies</strong>
  <br />
  Email: contact@risnar.com
  <br />
  Website: https://risnar.com
  <br />
  Last Updated: 8th Jul 2026
</p>


    </main>
  );
}
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