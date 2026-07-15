import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { blogs } from "@/lib/blogs";

export const dynamic = "force-static";
export const revalidate = 86400;

/* =========================
   STATIC PARAMS
   ========================= */
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/* =========================
   METADATA
   ========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } =
    await params;

  const blog =
    blogs.find(
      (b) =>
        b.slug === slug
    );

  if (!blog) {
    return {
      title:
        "Article Not Found | RISNAR Technologies",
      description:
        "The requested article could not be found.",
    };
  }

  return {
    title: blog.title,
    description:
      blog.description,
    openGraph: {
      title: blog.title,
      description:
        blog.description,
      images: [
        {
          url: blog.image,
        },
      ],
    },
    twitter: {
      card:
        "summary_large_image",
      title: blog.title,
      description:
        blog.description,
      images: [
        blog.image,
      ],
    },
  };
}

/* =========================
   PAGE
   ========================= */
export default async function BlogPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const blog =
    blogs.find(
      (b) =>
        b.slug === slug
    );

  if (!blog) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth:
          "1100px",
        margin:
          "0 auto",
        padding:
          "60px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* =========================
          HERO
         ========================= */}
      <section
        style={{
          marginBottom:
            "50px",
        }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={675}
          priority
          style={{
            width:
              "100%",
            height:
              "auto",
            borderRadius:
              "16px",
            marginBottom:
              "30px",
          }}
        />

        <p
          style={{
            color:
              "#94a3b8",
            marginBottom:
              "10px",
            fontSize:
              "15px",
          }}
        >
          {blog.category}
          {" • "}
          {
            blog.readingTime
          }
          {" • "}
          Published on{" "}
          {
            blog.publishedAt
          }
        </p>

        <h1
          style={{
            color:
              "#ffffff",
            fontSize:
              "48px",
            lineHeight:
              "1.25",
            marginBottom:
              "20px",
          }}
        >
          {blog.title}
        </h1>

        <p
          style={{
            color:
              "#cbd5e1",
            fontSize:
              "20px",
            lineHeight:
              "1.8",
            margin:
              0,
          }}
        >
          {
            blog.description
          }
        </p>
      </section>

      {/* =========================
          ARTICLE PLACEHOLDER
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius:
            "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding:
            "40px",
          color:
            "#cbd5e1",
          lineHeight:
            "1.9",
          fontSize:
            "18px",
        }}
      >
        <p>
          This article
          is currently
          being prepared
          and will be
          published
          soon.
        </p>
      </section>

      {/* =========================
          AUTHOR
         ========================= */}
      <section
        style={{
          marginTop:
            "80px",
          padding:
            "30px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius:
            "16px",
          background:
            "rgba(255,255,255,0.03)",
        }}
      >
        <h3
          style={{
            color:
              "#ffffff",
            marginBottom:
              "12px",
          }}
        >
          About RISNAR
          Technologies
        </h3>

        <p
          style={{
            color:
              "#cbd5e1",
            lineHeight:
              "1.9",
            margin:
              0,
          }}
        >
          RISNAR
          Technologies
          specializes in
          App
          Development,
          Website
          Development,
          AI Solutions,
          SEO Solutions,
          and OTT
          Development,
          helping
          businesses
          build modern
          digital
          products with
          scalable
          technology.
        </p>
      </section>
    </main>
  );
}