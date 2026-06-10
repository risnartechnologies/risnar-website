export default function OrganizationSchema() {
  const schema = {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    name:
      "RISNAR Technologies",

    url:
      "https://risnar.com",

    logo:
      "https://risnar.com/favicon.ico",

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

    areaServed: {
      "@type":
        "City",

      name:
        "Jaipur",
    },

    sameAs: [],

    description:
      "RISNAR Technologies is a software development company specializing in mobile app development, website development, AI solutions and SEO services.",

    knowsAbout: [
      "Flutter Development",
      "Android App Development",
      "Website Development",
      "AI Solutions",
      "SEO Services",
      "Real Estate Website Development",
    ],

    service: [
      {
        "@type":
          "Service",
        name:
          "App Development",
      },
      {
        "@type":
          "Service",
        name:
          "Website Development",
      },
      {
        "@type":
          "Service",
        name:
          "AI Solutions",
      },
      {
        "@type":
          "Service",
        name:
          "SEO Solutions",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            schema
          ),
      }}
    />
  );
}