import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://risnar.com";

  return [
    {
      url: `${baseUrl}`,
      lastModified:
        new Date(),
      changeFrequency:
        "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/portfolio`,
      lastModified:
        new Date(),
      changeFrequency:
        "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services`,
      lastModified:
        new Date(),
      changeFrequency:
        "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/privacy`,
      lastModified:
        new Date(),
      changeFrequency:
        "yearly",
      priority: 0.5,
    },

    /* =========================
       MAIN SERVICES
       ========================= */

    {
      url: `${baseUrl}/services/app-development`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/website-development`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/ai-solutions`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/seo-solutions`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    /* =========================
       JAIPUR SEO PAGES
       ========================= */

    {
      url: `${baseUrl}/services/flutter-developer-jaipur`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/services/app-development-jaipur`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/services/website-development-jaipur`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/services/real-estate-website-development-jaipur`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.8,
    },
  ];
}
