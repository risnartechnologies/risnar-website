export const metadata = {
  title: "Privacy Policy - RISNAR Technologies",
  description:
    "Privacy policy for the RISNAR Technologies website",
};

/* =========================
   PRIVACY POLICY PAGE
   - Matches site design
   - Glassmorphism card
   - Responsive layout
   - Consistent styling
   - Existing functionality preserved
   ========================= */
export default function PrivacyPage() {
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
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Privacy Policy
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Your privacy matters to us. This policy explains how
          RISNAR Technologies handles information when you use
          our website and services.
        </p>
      </section>

      {/* =========================
          POLICY CARD
         ========================= */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          color: "#e2e8f0",
          lineHeight: "1.9",
        }}
      >
        {/* INTRO */}
        <p>
          This Privacy Policy explains how{" "}
          <strong>
            RISNAR Technologies
          </strong>{" "}
          collects, uses, and protects information when you
          visit or interact with our website.
        </p>

        <p>
          By using this website, you agree to the terms of
          this Privacy Policy.
        </p>

        {/* SECTION 1 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          1. Information We Collect
        </h2>

        <p>
          We do not intentionally collect personally
          identifiable information through this website.
          However, limited technical information may be
          collected automatically, including:
        </p>

        <ul>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Pages visited</li>
          <li>Referring website information</li>
          <li>Basic analytics and usage statistics</li>
        </ul>

        {/* SECTION 2 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          2. How We Use Information
        </h2>

        <p>
          Any information collected is used solely to:
        </p>

        <ul>
          <li>Improve website performance</li>
          <li>Enhance user experience</li>
          <li>Fix issues and bugs</li>
          <li>Monitor website reliability</li>
          <li>Maintain website security</li>
        </ul>

        {/* SECTION 3 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          3. Third-Party Services
        </h2>

        <p>
          We may use trusted third-party services such as
          hosting providers, analytics platforms, or
          infrastructure providers that may process limited
          technical information necessary for website
          operation.
        </p>

        <p>
          These providers operate under their own privacy
          policies and terms.
        </p>

        {/* SECTION 4 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          4. Data Security
        </h2>

        <p>
          We take reasonable measures to protect website
          data and maintain the security of our systems.
          However, no method of transmission or storage can
          be guaranteed to be completely secure.
        </p>

        {/* SECTION 5 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          5. External Links
        </h2>

        <p>
          Our website may contain links to external websites,
          products, or services. We are not responsible for
          the content, privacy practices, or policies of
          third-party websites.
        </p>

        {/* SECTION 6 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          6. Changes to This Privacy Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to
          time. Any changes will be posted on this page and
          become effective immediately upon publication.
        </p>

        {/* SECTION 7 */}
        <h2
          style={{
            marginTop: "40px",
            color: "#ffffff",
          }}
        >
          7. Contact Us
        </h2>

        <p>
          Email:{" "}
          <a
            href="mailto:contact@risnar.com"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
            }}
          >
            contact@risnar.com
          </a>
        </p>

        {/* FOOTNOTE */}
        <p
          style={{
            marginTop: "40px",
            color: "#94a3b8",
          }}
        >
          <strong>Last Updated:</strong> 10 June 2026
        </p>
      </section>
    </main>
  );
}