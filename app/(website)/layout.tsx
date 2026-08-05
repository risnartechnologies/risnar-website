import "../globals.css";

import AnimatedBackground from "@/app/components/Animated_Background";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormModal from "@/app/components/LeadFormModal";
import OrganizationSchema from "@/app/components/OrganizationSchema";
import { LeadFormProvider } from "@/app/context/LeadFormContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  export default async function RootLayout({
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
  <LeadFormProvider>

    <OrganizationSchema />

    {/* your style block */}

    <AnimatedBackground />

    <Navbar />

    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "90px",
        zIndex: 999,
      }}
    >
      <LeadFormModal />
    </div>

    {children}

    <Footer />

  </LeadFormProvider>
);
}