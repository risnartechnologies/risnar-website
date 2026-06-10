import LeadFormModal from "@/app/components/LeadFormModal";
export const metadata = {
  title: "SEO Solutions - RISNAR Technologies",
  description:
    "Professional SEO services to improve rankings, traffic, leads and online visibility.",
};

/* =========================
   SEO SOLUTIONS PAGE
   - Expanded content
   - Detailed SEO process
   - More SEO service cards
   - Industry-focused SEO strategy
   - Performance & reporting section
   - Responsive glassmorphism layout
   - Consistent site styling
   ========================= */
export default function SEOSolutionsPage() {
  const services = [
    {
      icon: "🔍",
      title: "Technical SEO",
      description:
        "Improve website structure, crawlability, indexing, Core Web Vitals and overall search engine accessibility.",
    },
    {
      icon: "📝",
      title: "On-Page SEO",
      description:
        "Optimize titles, meta descriptions, content structure, keywords and internal linking strategies.",
    },
    {
      icon: "📍",
      title: "Local SEO",
      description:
        "Help local businesses appear in Google Maps, local search results and location-based searches.",
    },
    {
      icon: "🎯",
      title: "Keyword Research",
      description:
        "Identify high-value keywords that attract qualified visitors and potential customers.",
    },
    {
      icon: "📈",
      title: "Content Optimization",
      description:
        "Improve existing content and create SEO-focused content that ranks and converts.",
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description:
        "Enhance website speed, mobile usability and technical performance for better rankings.",
    },
    {
      icon: "🔗",
      title: "Internal Linking",
      description:
        "Build strong internal link structures that improve navigation and search engine understanding.",
    },
    {
      icon: "📊",
      title: "SEO Reporting",
      description:
        "Track rankings, traffic, conversions and SEO performance through detailed reporting.",
    },
  ];

  const benefits = [
    "Higher Google Rankings",
    "Increased Organic Traffic",
    "Better Lead Generation",
    "Improved Brand Visibility",
    "Higher Website Authority",
    "Long-Term Business Growth",
    "Lower Customer Acquisition Costs",
    "Better User Experience",
    "More Qualified Visitors",
    "Improved Conversion Rates",
    "Competitive Advantage",
    "Sustainable Marketing Results",
  ];

  const process = [
    {
      step: "01",
      title: "Comprehensive SEO Audit",
      description:
        "We perform a detailed audit of your website to identify technical issues, content gaps, indexing problems and ranking opportunities.",
    },
    {
      step: "02",
      title: "Competitor Analysis",
      description:
        "We study your competitors, identify their strengths and uncover opportunities to outperform them in search results.",
    },
    {
      step: "03",
      title: "Keyword Research",
      description:
        "We identify high-value keywords with strong search intent and business relevance to attract qualified traffic.",
    },
    {
      step: "04",
      title: "Technical Optimization",
      description:
        "Website architecture, speed, mobile responsiveness, structured data and indexing issues are optimized.",
    },
    {
      step: "05",
      title: "Content Strategy",
      description:
        "We create a content roadmap focused on attracting visitors throughout the customer journey.",
    },
    {
      step: "06",
      title: "On-Page SEO",
      description:
        "Titles, meta descriptions, headings, content structure and internal links are optimized for maximum visibility.",
    },
    {
      step: "07",
      title: "Performance Tracking",
      description:
        "Keyword rankings, traffic growth, user engagement and conversions are monitored continuously.",
    },
    {
      step: "08",
      title: "Continuous Improvement",
      description:
        "SEO is an ongoing process. We continually refine strategies based on data and algorithm updates.",
    },
  ];

  const rankingFactors = [
    "Website Speed",
    "Mobile Friendliness",
    "Content Quality",
    "Keyword Relevance",
    "User Experience",
    "Internal Linking",
    "Technical Health",
    "Schema Markup",
    "Search Intent Alignment",
    "Content Freshness",
    "Page Experience",
    "Site Architecture",
  ];

  const industries = [
    "Local Businesses",
    "Real Estate",
    "Healthcare",
    "Education",
    "E-Commerce",
    "Law Firms",
    "Consulting",
    "Finance",
    "Hospitality",
    "Travel",
    "SaaS Platforms",
    "Marketing Agencies",
  ];

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* =========================
          HERO
         ========================= */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          SEO Solutions
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.9",
          }}
        >
          Search Engine Optimization is one of the most powerful
          long-term growth strategies for businesses. Our SEO
          solutions help companies improve rankings, increase
          organic traffic, attract qualified leads and build a
          stronger online presence through data-driven strategies
          and continuous optimization.
        </p>
      </section>

      {/* =========================
          OVERVIEW
         ========================= */}
      <section
        style={{
          marginBottom: "60px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Why SEO Matters
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "2",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          Every day, potential customers search Google for products,
          services and solutions. If your business is not visible in
          search results, those opportunities go to competitors.
          Effective SEO helps your website appear where customers are
          already looking, generating consistent traffic and leads
          without relying entirely on paid advertising.
        </p>
      </section>

      {/* =========================
          SERVICES
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          SEO Services We Offer
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "16px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                  marginTop: 0,
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.9",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          BENEFITS
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Benefits Of Professional SEO
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "18px",
                color: "#cbd5e1",
              }}
            >
              ✓ {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          PROCESS
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Our SEO Process
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {process.map((item) => (
            <div
              key={item.step}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.15)",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "rgba(59,130,246,0.18)",
                  border:
                    "1px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginBottom: "18px",
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.9",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          RANKING FACTORS
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Areas We Optimize
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {rankingFactors.map((factor) => (
            <span
              key={factor}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.10)",
                color: "#ffffff",
              }}
            >
              {factor}
            </span>
          ))}
        </div>
      </section>

      {/* =========================
          INDUSTRIES
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Industries We Help Grow
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {industries.map((industry) => (
            <span
              key={industry}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.10)",
                color: "#ffffff",
              }}
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* =========================
          REPORTING
         ========================= */}
      <section
        style={{
          marginBottom: "70px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Transparent SEO Reporting
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "2",
            textAlign: "center",
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          We believe SEO should be measurable. Our reporting focuses
          on keyword rankings, organic traffic growth, lead generation,
          website performance, technical improvements and overall
          business impact so you can clearly see the value being created.
        </p>
      </section>

      {/* =========================
          CTA
         ========================= */}
      <section
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "18px",
          }}
        >
          Ready To Grow Your Organic Traffic?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "850px",
            margin: "0 auto 28px",
            lineHeight: "1.9",
          }}
        >
          Whether you're launching a new website, improving an
          existing business website or looking to dominate your
          local market, RISNAR Technologies can help you build a
          sustainable SEO strategy that drives traffic, leads and
          long-term growth.
        </p>

      <LeadFormModal />
      </section>
    </main>
  );
}