import "./globals.css";
import AnimatedBackground from "./components/Animated_Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeadFormModal from "@/app/components/LeadFormModal";
import OrganizationSchema from "@/app/components/OrganizationSchema";

export const metadata = {
  title: "Risnar Technologies",
  description:
    "Portfolio, app development, website development, AI solutions and SEO services by Risnar Technologies",
};

/* =========================
   ROOT LAYOUT (SERVER COMPONENT)
   - Global layout wrapper
   - Loads globals.css
   - Navbar + Footer persistent
   - Global floating CTA
   - LocalBusiness SEO schema
   - Organization SEO schema
   - Responsive-safe styles
   - Allows global background from CSS
   ========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "LocalBusiness",

    name:
      "RISNAR Technologies",

    url:
      "https://risnar.com",

    image:
      "https://risnar.com/logo.png",

    email:
      "contact@risnar.com",

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        "Jaipur",

      addressRegion:
        "Rajasthan",

      addressCountry:
        "IN",
    },

    areaServed:
      "India",

    serviceType: [
      "App Development",
      "Website Development",
      "AI Solutions",
      "SEO Solutions",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
        />

        {/* =========================
            LOCAL BUSINESS SCHEMA
           ========================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                localBusinessSchema
              ),
          }}
        />
      </head>

      <body
        style={{
          margin: 0,
          fontFamily:
            "Arial, sans-serif",
          background:
            "transparent",
        }}
      >
        {/* =========================
            ORGANIZATION SCHEMA
           ========================= */}
        <OrganizationSchema />

        {/* =========================
            GLOBAL BUTTON STYLES
           ========================= */}
        <style>{`
          .ui-btn {
            padding: 8px 16px;
            border-radius: 8px;
            background: #f5f5f5;
            color: #333;
            display: inline-block;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            text-decoration: none;
            border: 1px solid #ddd;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .ui-btn:hover {
            background: #000;
            color: #fff;
            border-color: #000;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          }

          .ui-btn:active {
            transform: scale(0.97);
          }

          @media (max-width: 600px) {
            .ui-btn {
              padding: 6px 12px;
              font-size: 13px;
            }
          }
        `}</style>

        {/* =========================
            ANIMATED BACKGROUND
           ========================= */}
        <AnimatedBackground />

        {/* =========================
            NAVBAR
           ========================= */}
        <Navbar />

        {/* =========================
            FLOATING CTA
           ========================= */}
        <div
          style={{
            position:
              "fixed",

            right: "20px",

            bottom: "90px",

            zIndex: 999,
          }}
        >
          <LeadFormModal />
        </div>

        {/* =========================
            PAGE CONTENT
           ========================= */}
        {children}

        {/* =========================
            FOOTER
           ========================= */}
        <Footer />
      </body>
    </html>
  );
}