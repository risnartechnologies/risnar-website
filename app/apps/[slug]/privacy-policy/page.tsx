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
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    return {
      title: "Privacy Policy - Risnar Technologies",
      description: "Privacy policy",
    };
  }

  return {
    title: `${app.name} Privacy Policy - Risnar Technologies`,
    description: `Privacy policy for ${app.name}`,
  };
}

/* =========================
   PAGE
   ========================= */
export default async function PrivacyPolicy({ params }: any) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>Privacy Policy not found</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        {app.name} Privacy Policy
      </h1>

      <p>
        Welcome to <strong>{app.name}</strong>, a mobile application developed
        and published by <strong>Risnar Technologies</strong>. This Privacy
        Policy explains how we handle your information when you use our app
        available on the Google Play Store.
      </p>

      <p style={{ marginTop: "10px" }}>
        By installing or using {app.name}, you agree to the terms of this Privacy
        Policy.
      </p>

      <h2 style={{ marginTop: "30px" }}>1. Information We Collect</h2>
      <p>
        We do not collect personally identifiable information. The app does not
        require login, signup, or personal data entry.
      </p>

      <p>However, limited technical data may be collected automatically:</p>
      <ul>
        <li>Device model and OS version</li>
        <li>App usage statistics</li>
        <li>Crash analytics (Google Play Services / Firebase)</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>2. How We Use Information</h2>
      <ul>
        <li>Improve app performance</li>
        <li>Fix bugs and crashes</li>
        <li>Enhance user experience</li>
      </ul>

      <p>
        We do not sell, rent, or share your data with third parties.
      </p>

      <h2 style={{ marginTop: "30px" }}>3. Third-Party Services</h2>
      <ul>
        <li>Google Play Services</li>
        <li>Firebase Crashlytics / Analytics</li>
      </ul>

      <p>
        Privacy policy:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy
        </a>
      </p>

      <h2 style={{ marginTop: "30px" }}>4. Children’s Privacy</h2>
      <p>
        This app is safe for all ages. We do not knowingly collect personal
        information from children under 13.
      </p>

      <h2 style={{ marginTop: "30px" }}>5. Contact</h2>
      <p>Email: risnartechnologies@gmail.com</p>
    </main>
  );
}