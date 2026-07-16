import Link from "next/link";
import Image from "next/image";

import type { Metadata } from "next";

import {
  getAllBlogSlugs,
} from "@/content/blogs";

export const metadata: Metadata = {
  title:
    "Blog - RISNAR Technologies",
};

export const dynamic =
  "force-static";

export const revalidate =
  86400;

/* =========================
   BLOG PAGE
   ========================= */

export default async function BlogPage() {
  const slugs =
    getAllBlogSlugs();

  const publishedBlogs = [];

  for (const slug of slugs) {
    try {
      const module =
        await import(
          `@/content/blogs/${slug}/page`
        );

      const meta =
        module.blogMetadata ??
        module.metadata;

      if (!meta) {
        continue;
      }

      publishedBlogs.push({
        slug,

        title:
          meta.title ??
          "Untitled Article",

        category:
          meta.category ??
          "Blog",

        readingTime:
          meta.readTime ??
          meta.readingTime ??
          "",

        publishedAt:
          meta.publishedAt ??
          "",

        published:
          meta.published ??
          true,
      });
    } catch {
      // Ignore invalid folders
    }
  }

  publishedBlogs.sort(
    (a, b) =>
      new Date(
        b.publishedAt
      ).getTime() -
      new Date(
        a.publishedAt
      ).getTime()
  );

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding:
          "60px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* HERO */}

      <section
        style={{
          textAlign:
            "center",
          marginBottom:
            "60px",
        }}
      >
        <h1
          style={{
            fontSize:
              "48px",
            color:
              "#ffffff",
            marginBottom:
              "20px",
          }}
        >
          RISNAR Blog
        </h1>

        <p
          style={{
            color:
              "#cbd5e1",
            fontSize:
              "18px",
            lineHeight:
              "1.8",
            maxWidth:
              "850px",
            margin:
              "0 auto",
          }}
        >
          Explore expert
          articles,
          practical
          guides,
          comparisons,
          pricing,
          industry
          insights and
          best practices
          on App
          Development,
          Website
          Development,
          AI Solutions,
          SEO Solutions
          and OTT
          Development.
        </p>
      </section>

      {/* BLOG GRID */}

      {publishedBlogs.length ===
      0 ? (
        <div
          style={{
            textAlign:
              "center",
            color:
              "#cbd5e1",
            padding:
              "80px 0",
          }}
        >
          No blogs
          published yet.
        </div>
      ) : (
        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "24px",
          }}
        >
          {publishedBlogs.map(
            (blog) => (
              <Link
                key={
                  blog.slug
                }
                href={`/blog/${blog.slug}`}
                style={{
                  textDecoration:
                    "none",
                }}
              >
                <article
                  style={{
                    border:
                      "1px solid rgba(255,255,255,0.15)",
                    borderRadius:
                      "18px",
                    overflow:
                      "hidden",
                    background:
                      "rgba(255,255,255,0.03)",
                    backdropFilter:
                      "blur(12px)",
                    boxShadow:
                      "0 10px 35px rgba(0,0,0,0.35)",
                    transition:
                      "0.25s",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    height:
                      "100%",
                  }}
                >
                  <Image
                    src={`/images/${blog.slug}.webp`}
                    alt={
                      blog.title
                    }
                    width={600}
                    height={340}
                    style={{
                      width:
                        "100%",
                      height:
                        "180px",
                      objectFit:
                        "cover",
                    }}
                  />

                  <div
                    style={{
                      padding:
                        "18px",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#60a5fa",
                        fontSize:
                          "13px",
                        marginBottom:
                          "10px",
                      }}
                    >
                      {
                        blog.category
                      }
                      {" • "}
                      {
                        blog.readingTime
                      }
                    </div>

                    <h2
                      style={{
                        color:
                          "#ffffff",
                        fontSize:
                          "20px",
                        lineHeight:
                          "1.5",
                        margin: 0,
                      }}
                    >
                      {
                        blog.title
                      }
                    </h2>
                  </div>
                </article>
              </Link>
            )
          )}
        </section>
      )}
    </main>
  );
}