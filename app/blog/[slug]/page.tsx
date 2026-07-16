import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getAllBlogSlugs,
} from "@/content/blogs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic =
  "force-static";

export const revalidate =
  86400;

/* =========================
   STATIC PARAMS
   ========================= */

export async function generateStaticParams() {
  return getAllBlogSlugs().map(
    (slug) => ({
      slug,
    })
  );
}

/* =========================
   METADATA
   ========================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } =
    await params;

  try {
    const module =
      await import(
        `@/content/blogs/${slug}/page`
      );

    return (
      module.metadata ??
      {
        title:
          "RISNAR Blog",
      }
    );
  } catch {
    return {
      title:
        "Article Not Found | RISNAR Technologies",
    };
  }
}

/* =========================
   PAGE
   ========================= */

export default async function BlogPage({
  params,
}: PageProps) {
  const { slug } =
    await params;

  if (
    !getAllBlogSlugs().includes(
      slug
    )
  ) {
    notFound();
  }

  try {
    const module =
      await import(
        `@/content/blogs/${slug}/page`
      );

    const Blog =
      module.default;

    return <Blog />;
  } catch {
    notFound();
  }
}