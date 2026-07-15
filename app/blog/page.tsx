import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/lib/blogs";

export const metadata = {
  title:
    "Blog - RISNAR Technologies",
  description:
    "Expert articles on App Development, Website Development, AI Solutions, SEO Solutions and OTT Development.",
};

export const dynamic =
  "force-static";

export const revalidate =
  86400;

/* =========================
   BLOG PAGE
   ========================= */

export default function BlogPage() {
  const sortedBlogs = [
    ...blogs,
  ].sort(
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
      <section
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {sortedBlogs.map(
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
                  transition:
                    "0.25s",
                  height:
                    "100%",
                }}
              >
                <Image
                  src={
                    blog.image
                  }
                  alt={
                    blog.title
                  }
                  width={
                    600
                  }
                  height={
                    340
                  }
                  style={{
                    width:
                      "100%",
                    height:
                      "220px",
                    objectFit:
                      "cover",
                  }}
                />

                <div
                  style={{
                    padding:
                      "22px",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#60a5fa",
                      fontSize:
                        "14px",
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
                        "24px",
                      lineHeight:
                        "1.5",
                      margin:
                        "0 0 14px",
                    }}
                  >
                    {
                      blog.title
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#cbd5e1",
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
                </div>
              </article>
            </Link>
          )
        )}
      </section>
    </main>
  );
}