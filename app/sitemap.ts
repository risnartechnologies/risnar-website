import { MetadataRoute } from "next";

import {
  getAllBlogSlugs,
} from "@/content/blogs";

/* =========================================================
   SITEMAP
   - Automatically includes all published blog articles
   - Automatically updates when a new blog is added
   - Existing URLs preserved
   ========================================================= */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://risnar.com";

  const now =
    new Date();

  /* =========================================================
     STATIC PAGES
     ========================================================= */

  const staticPages: MetadataRoute.Sitemap =
    [
      {
        url: `${baseUrl}`,
        lastModified:
          now,
        changeFrequency:
          "weekly",
        priority: 1,
      },

      {
        url: `${baseUrl}/about`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${baseUrl}/blog`,
        lastModified:
          now,
        changeFrequency:
          "daily",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/portfolio`,
        lastModified:
          now,
        changeFrequency:
          "weekly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/services`,
        lastModified:
          now,
        changeFrequency:
          "weekly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/contact`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${baseUrl}/privacy`,
        lastModified:
          now,
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
          now,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/services/website-development`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/services/ai-solutions`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/services/seo-solutions`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${baseUrl}/services/ott-development`,
        lastModified:
          now,
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
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${baseUrl}/services/app-development-jaipur`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${baseUrl}/services/website-development-jaipur`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${baseUrl}/services/real-estate-website-development-jaipur`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },
    ];

  /* =========================================================
     BLOG ARTICLES
     Automatically generated from content/blogs
     ========================================================= */

  const blogPages: MetadataRoute.Sitemap =
    getAllBlogSlugs().map(
      (slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified:
          now,
        changeFrequency:
          "monthly",
        priority: 0.8,
      })
    );

  /* =========================================================
     RETURN SITEMAP
     ========================================================= */

  return [
    ...staticPages,
    ...blogPages,
  ];
}