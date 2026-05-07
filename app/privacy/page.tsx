export const metadata = {
  title: "Privacy Policy - Risnar Technologies",
  description: "Privacy policy for Risnar Technologies website",
};

/* =========================
   PRIVACY POLICY PAGE
   - Responsive spacing
   - Improved readability
   - Consistent typography
   ========================= */
export default function PrivacyPage() {
  return (
    <main
      style={{
        padding: "50px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.7",
        color: "#333",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Privacy Policy
      </h1>

      {/* INTRO */}
      <p>
        This Privacy Policy explains how <strong>Risnar Technologies</strong>{" "}
        collects, uses, and protects your information when you use our website.
      </p>

      {/* SECTION 1 */}
      <h2 style={{ marginTop: "30px" }}>1. Information We Collect</h2>
      <p>
        We do not collect personally identifiable information directly. However,
        limited technical information may be collected automatically, such as:
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li>Browser type and version</li>
        <li>Device information</li>
        <li>Pages visited</li>
      </ul>

      {/* SECTION 2 */}
      <h2 style={{ marginTop: "30px" }}>2. How We Use Information</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li>Improve website performance</li>
        <li>Enhance user experience</li>
        <li>Fix issues and bugs</li>
      </ul>

      {/* SECTION 3 */}
      <h2 style={{ marginTop: "30px" }}>3. Third-Party Services</h2>
      <p>
        We may use trusted third-party services such as hosting providers or
        analytics tools that may collect limited technical data.
      </p>

      {/* SECTION 4 */}
      <h2 style={{ marginTop: "30px" }}>4. Contact</h2>
      <p>
        Email:{" "}
        <a
          href="mailto:contact@risnar.com"
          style={{ color: "#000", textDecoration: "none", fontWeight: "500" }}
        >
          contact@risnar.com
        </a>
      </p>

      {/* FOOTNOTE */}
      <p
        style={{
          marginTop: "40px",
          color: "#777",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Last updated: 2026
      </p>
    </main>
  );
}