import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Google-adstxt",
        disallow: "",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://risnar.com/sitemap.xml",
  };
}