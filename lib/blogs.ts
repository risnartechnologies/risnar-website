export interface Blog {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  featured: boolean;
}

export const blogs: Blog[] = [
  {
    slug:
      "app-development-cost-2026",

    title:
      "How Much Does App Development Cost in 2026? Complete Pricing Guide for Android, iOS & Flutter Apps",

    description:
      "Discover the complete cost of Android, iPhone and Flutter app development in 2026. Learn about pricing, timelines, factors affecting cost and how to choose the right development partner.",

    image:
      "/blogs/app-development-cost-2026.webp",

    category:
      "App Development",

    author:
      "RISNAR Technologies",

    publishedAt:
      "2026-07-15",

    updatedAt:
      "2026-07-15",

    readingTime:
      "8 min read",

    featured:
      true,
  },
];