import Link from "next/link";
import Image from "next/image";

import {
  getAllBlogSlugs,
} from "@/content/blogs";

interface BlogMeta {
  slug: string;

  title: string;

  category: string;

  publishedAt: string;

  readTime: string;

  published: boolean;
}

interface Props {
  currentSlug: string;
}

export default async function RelatedArticles({
  currentSlug,
}: Props) {
  const slugs =
    getAllBlogSlugs();

  const blogs: BlogMeta[] =
    [];

  for (const slug of slugs) {
    if (
      slug === currentSlug
    ) {
      continue;
    }

    try {
      const module =
        await import(
          `@/content/blogs/${slug}/page`
        );

      const meta =
        module.blogMetadata ??
        module.metadata;

      if (
        !meta ||
        meta.published ===
          false
      ) {
        continue;
      }

      blogs.push({
        slug,

        title:
          meta.title ??
          "Untitled Article",

        category:
          meta.category ??
          "Blog",

        publishedAt:
          meta.publishedAt ??
          "",

        readTime:
          meta.readTime ??
          "",
        published:
          true,
      });
    } catch {
      // Ignore invalid folders
    }
  }

  blogs.sort(
    (a, b) =>
      new Date(
        b.publishedAt
      ).getTime() -
      new Date(
        a.publishedAt
      ).getTime()
  );

  const related =
    blogs.slice(0, 3);

  if (
    related.length ===
    0
  ) {
    return null;
  }

  return (
    <section
      id="related-articles"
      className="py-14 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">

        <h2 className="text-3xl font-bold text-white lg:text-4xl">
          Related Articles
        </h2>

        <p className="mt-4 text-lg text-slate-300">
          Continue exploring
          our latest guides
          and insights.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {related.map(
            (blog) => (
              <Link
                key={
                  blog.slug
                }
                href={`/blog/${blog.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1"
              >
                <Image
                  src={`/images/${blog.slug}.webp`}
                  alt={
                    blog.title
                  }
                  width={600}
                  height={340}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="p-5">

                  <div className="mb-3 text-sm text-blue-400">
                    {
                      blog.category
                    }
                    {" • "}
                    {
                      blog.readTime
                    }
                  </div>

                  <h3 className="text-lg font-bold leading-7 text-white">
                    {
                      blog.title
                    }
                  </h3>

                </div>

              </Link>
            )
          )}

        </div>

      </div>
    </section>
  );
}