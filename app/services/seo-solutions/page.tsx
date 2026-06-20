import LeadFormModal from "@/app/components/LeadFormModal";
import Link from "next/link";
export const metadata = {
  title: "SEO Solutions - RISNAR Technologies",
  description:
    "Professional SEO services to improve rankings, traffic, leads and online visibility.",

  alternates: {
    canonical:
      "https://risnar.com/services/seo-solutions",
  },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are SEO services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO services help improve search engine visibility through technical optimization, content improvements and keyword targeting.",
      },
    },
    {
      "@type": "Question",
      name: "How long does SEO take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO is a long-term strategy. Initial improvements may appear within a few months while larger gains typically require ongoing optimization.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide local SEO services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We help businesses improve visibility in local search results and Google Maps.",
      },
    },
    {
      "@type": "Question",
      name: "Can SEO generate more leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SEO attracts visitors actively searching for products and services, increasing lead generation opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you perform keyword research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Keyword research is a core part of our SEO strategy and planning process.",
      },
    },
    {
      "@type": "Question",
      name: "What is technical SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technical SEO focuses on website performance, indexing, crawlability, structured data and mobile usability.",
      },
    },
    {
      "@type": "Question",
      name: "Can you optimize existing websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with both new and existing websites to improve rankings and visibility.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide content optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We optimize existing content and help create SEO-focused content strategies.",
      },
    },
    {
      "@type": "Question",
      name: "Is SEO better than paid ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO provides sustainable long-term traffic while paid advertising offers immediate visibility.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide e-commerce SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We optimize product pages, category pages and online stores.",
      },
    },
    {
      "@type": "Question",
      name: "Do you use Google Search Console?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Search Console is used for monitoring performance, indexing and keyword opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO reports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We track rankings, traffic and visibility metrics through regular reporting.",
      },
    },
    {
      "@type": "Question",
      name: "Can startups benefit from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SEO helps startups build visibility and attract customers without relying entirely on paid marketing.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer SEO services in Jaipur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide SEO services for businesses throughout Jaipur and Rajasthan.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose RISNAR Technologies for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We focus on technical excellence, transparency, long-term growth and measurable business outcomes.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://risnar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://risnar.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "SEO Solutions",
      item:
        "https://risnar.com/services/seo-solutions",
    },
  ],
};

export default function SEOSolutionsPage() {
  const faqs = [
  {
    question: "What are SEO services?",
    answer:
      "SEO services help improve search engine visibility through technical optimization, content improvements and keyword targeting.",
  },
  {
    question: "How long does SEO take?",
    answer:
      "SEO is a long-term strategy. Initial improvements may appear within a few months while larger gains typically require ongoing optimization.",
  },
  {
    question: "Do you provide local SEO services?",
    answer:
      "Yes. We help businesses improve visibility in local search results and Google Maps.",
  },
  {
    question: "Can SEO generate more leads?",
    answer:
      "Yes. SEO attracts visitors actively searching for products and services, increasing lead generation opportunities.",
  },
  {
    question: "Do you perform keyword research?",
    answer:
      "Yes. Keyword research is a core part of our SEO strategy and planning process.",
  },
  {
    question: "What is technical SEO?",
    answer:
      "Technical SEO focuses on website performance, indexing, crawlability, structured data and mobile usability.",
  },
  {
    question: "Can you optimize existing websites?",
    answer:
      "Yes. We work with both new and existing websites to improve rankings and visibility.",
  },
  {
    question: "Do you provide content optimization?",
    answer:
      "Yes. We optimize existing content and help create SEO-focused content strategies.",
  },
  {
    question: "Is SEO better than paid ads?",
    answer:
      "SEO provides sustainable long-term traffic while paid advertising offers immediate visibility.",
  },
  {
    question: "Do you provide e-commerce SEO?",
    answer:
      "Yes. We optimize product pages, category pages and online stores.",
  },
  {
    question: "Do you use Google Search Console?",
    answer:
      "Yes. Search Console is used for monitoring performance, indexing and keyword opportunities.",
  },
  {
    question: "Do you provide SEO reports?",
    answer:
      "Yes. We track rankings, traffic and visibility metrics through regular reporting.",
  },
  {
    question: "Can startups benefit from SEO?",
    answer:
      "Yes. SEO helps startups build visibility and attract customers without relying entirely on paid marketing.",
  },
  {
    question: "Do you offer SEO services in Jaipur?",
    answer:
      "Yes. We provide SEO services for businesses throughout Jaipur and Rajasthan.",
  },
  {
    question: "Why choose RISNAR Technologies for SEO?",
    answer:
      "We focus on technical excellence, transparency, long-term growth and measurable business outcomes.",
  },
];
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

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
      breadcrumbSchema
    ),
  }}
/>

{/* HERO */}
<section
  style={{
    textAlign: "center",
    marginBottom: "60px",
  }}
>
  <h1
    style={{
      fontSize: "48px",
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    SEO Solutions
  </h1>

  <p
    style={{
      color: "#cbd5e1",
      fontSize: "18px",
      maxWidth: "850px",
      margin: "0 auto",
      lineHeight: "1.8",
    }}
  >
    Looking for professional SEO services to
    improve your Google rankings, increase
    organic traffic and generate more leads?
    RISNAR Technologies provides comprehensive
    SEO solutions designed to help businesses
    achieve sustainable long-term growth
    through search engine visibility. In
    today's competitive digital marketplace,
    customers actively search online before
    making purchasing decisions. If your
    website is not appearing in search results,
    potential customers are finding your
    competitors instead.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      fontSize: "18px",
      maxWidth: "850px",
      margin: "20px auto 0",
      lineHeight: "1.8",
    }}
  >
    Our SEO services cover technical SEO,
    on-page optimization, keyword research,
    content strategy, local SEO, website
    performance improvements, internal linking
    and ongoing optimization. Whether you are
    a startup, local business, e-commerce
    store, real estate company, educational
    institution or established enterprise, we
    develop customized SEO strategies aligned
    with your business objectives. Our goal is
    not just to improve rankings but to help
    businesses attract qualified visitors,
    increase conversions and build stronger
    online authority over time.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      fontSize: "18px",
      maxWidth: "850px",
      margin: "20px auto 0",
      lineHeight: "1.8",
    }}
  >
    If you are searching for an SEO company
    that focuses on measurable results,
    data-driven strategies and long-term
    business growth, RISNAR Technologies can
    help create an SEO roadmap that delivers
    sustainable traffic, stronger visibility
    and a competitive advantage in search
    engines.
  </p>

  <div
    style={{
      marginTop: "30px",
    }}
  >
    <LeadFormModal />
  </div>
</section>

{/* SERVICE OVERVIEW */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Professional SEO Services
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Search Engine Optimization (SEO) is one of
    the most effective digital marketing
    strategies for businesses seeking
    sustainable long-term growth. Unlike paid
    advertising, which stops generating traffic
    when budgets are paused, SEO helps websites
    attract visitors organically through search
    engines such as Google. Businesses that
    invest in professional SEO often benefit
    from higher search visibility, increased
    website traffic, stronger brand authority
    and improved lead generation over time.
    Since customers actively search for
    products and services online, appearing in
    relevant search results can create a
    significant competitive advantage.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    At RISNAR Technologies, we provide
    comprehensive SEO services designed to help
    businesses improve rankings and attract
    qualified visitors. Our approach combines
    technical SEO, keyword research, content
    optimization, local SEO, performance
    improvements and strategic planning to
    create a strong foundation for long-term
    growth. Rather than focusing solely on
    rankings, we aim to improve the overall
    quality of website traffic and generate
    meaningful business outcomes.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Every business operates in a unique market
    with different competitors, customer
    behaviors and growth objectives. Because of
    this, effective SEO requires customized
    strategies rather than one-size-fits-all
    solutions. We begin by understanding your
    industry, target audience and business
    goals before developing an SEO roadmap
    tailored to your specific requirements.
    This allows us to identify opportunities,
    prioritize actions and focus on activities
    that deliver the highest potential return.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our SEO services include website audits,
    technical optimization, content strategy,
    internal linking, local SEO improvements,
    competitor analysis and ongoing performance
    monitoring. We also help businesses improve
    website speed, mobile usability and search
    engine accessibility, all of which are
    important ranking factors in modern search
    algorithms. These improvements not only
    support better rankings but also enhance
    user experience and conversion potential.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Whether you operate a local business,
    startup, e-commerce store, real estate
    company, educational institution or
    service-based organization, professional
    SEO can help strengthen your online
    presence and generate long-term business
    value. RISNAR Technologies focuses on
    building sustainable SEO strategies that
    improve visibility, increase qualified
    traffic and support measurable business
    growth.
  </p>
</section>

{/* TYPES OF SEO SERVICES */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Types Of SEO Services We Offer
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Successful SEO campaigns require a
    combination of multiple optimization
    strategies working together. At RISNAR
    Technologies, we provide comprehensive SEO
    services designed to improve visibility,
    increase traffic and support long-term
    business growth. Every business has
    different goals and challenges, which is
    why we tailor our SEO strategies based on
    industry requirements, competition levels
    and customer behavior.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Technical SEO forms the foundation of a
    successful search strategy. Search engines
    must be able to crawl, understand and
    index your website efficiently before
    rankings can improve. Our technical SEO
    services include website audits, crawl
    analysis, indexing improvements, Core Web
    Vitals optimization, schema implementation,
    URL structure improvements, XML sitemap
    optimization and performance enhancements.
    By improving technical health, businesses
    create a stronger foundation for future
    growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    On-page SEO focuses on optimizing website
    content and page structure to improve
    search visibility. This includes keyword
    research, title optimization, meta
    descriptions, heading structures, content
    formatting, internal linking and search
    intent alignment. Effective on-page SEO
    helps search engines understand the topic
    and relevance of each page while improving
    the overall user experience.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Local SEO is particularly important for
    businesses that serve customers within a
    specific city or region. Local SEO
    strategies help businesses appear in
    Google Maps, local search results and
    location-based searches. We optimize
    Google Business Profiles, local citations,
    location pages and locally targeted
    content to improve visibility among nearby
    customers actively searching for services.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Content SEO focuses on creating and
    optimizing content that attracts visitors
    throughout the customer journey. High-
    quality content helps businesses establish
    authority, answer customer questions and
    rank for valuable keywords. Our content
    strategies include blog planning, service
    page optimization, informational content,
    programmatic SEO opportunities and content
    expansion initiatives designed to improve
    organic reach.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    E-commerce SEO requires specialized
    strategies to optimize product pages,
    category pages, site architecture and
    conversion-focused content. Online stores
    face unique challenges related to large
    inventories, duplicate content, filtering
    systems and transactional search intent.
    We help e-commerce businesses improve
    product visibility and attract customers
    actively searching for products online.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Enterprise SEO is designed for larger
    websites with significant content volumes,
    multiple business units or complex
    structures. These projects often require
    advanced technical optimization, scalable
    content strategies and extensive reporting
    capabilities. We help organizations
    develop SEO frameworks that support growth
    while maintaining technical consistency
    across large websites.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    By combining technical SEO, on-page SEO,
    local SEO, content optimization,
    e-commerce SEO and strategic consulting,
    RISNAR Technologies helps businesses build
    sustainable search visibility. Our goal is
    not simply to increase rankings but to
    create long-term growth opportunities that
    generate qualified traffic, stronger brand
    authority and measurable business results.
  </p>
</section>

{/* SEO TOOLS & TECHNOLOGIES */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    SEO Tools & Technologies We Use
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Effective SEO requires more than experience
    and strategy. It also depends on reliable
    tools, accurate data and modern
    technologies that help identify
    opportunities, monitor performance and
    measure results. At RISNAR Technologies,
    we utilize a combination of industry-
    standard SEO platforms, analytics tools
    and technical optimization technologies to
    develop data-driven SEO strategies that
    support long-term business growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Google Search Console is one of the most
    important tools in our SEO workflow. It
    provides valuable insights into keyword
    rankings, search impressions, click-through
    rates, indexing status and technical
    issues. By analyzing Search Console data,
    we can identify pages that require
    optimization, discover new keyword
    opportunities and monitor overall search
    performance. Google Analytics complements
    this data by helping us understand user
    behavior, traffic sources, conversions and
    customer engagement metrics.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For keyword research and competitor
    analysis, we use professional SEO research
    platforms that help identify high-value
    keywords, ranking opportunities and search
    trends. Understanding how customers search
    online allows us to create content
    strategies aligned with search intent and
    business objectives. Competitor analysis
    also helps uncover gaps and opportunities
    that can be leveraged to improve search
    visibility.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Technical SEO requires tools capable of
    analyzing website structure, crawlability,
    indexing and performance. We use website
    auditing platforms to identify broken
    links, duplicate content, crawl errors,
    redirect issues and page performance
    problems. These insights help improve
    website health and ensure search engines
    can efficiently discover and understand
    website content.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Website performance plays a significant
    role in both rankings and user experience.
    We utilize technologies and testing tools
    that help measure Core Web Vitals, page
    speed, mobile responsiveness and overall
    website performance. Fast-loading websites
    improve user satisfaction, reduce bounce
    rates and support better search engine
    visibility.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Modern SEO also benefits from technologies
    such as schema markup, structured data,
    content management systems, cloud hosting
    platforms and analytics integrations.
    Combining reliable tools with proven SEO
    methodologies allows RISNAR Technologies
    to make informed decisions, track
    performance accurately and continuously
    improve search visibility. Our objective
    is to use technology not only to improve
    rankings but also to generate meaningful
    business outcomes through sustainable
    organic growth.
  </p>
</section>

{/* FEATURES & DELIVERABLES */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Features Included In Our SEO Services
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Professional SEO involves much more than
    adding keywords to a website. Effective
    search engine optimization requires a
    combination of technical improvements,
    content enhancements, strategic planning,
    performance monitoring and continuous
    optimization. At RISNAR Technologies, our
    SEO services include a comprehensive set
    of features designed to improve search
    visibility, attract qualified traffic and
    support long-term business growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Every SEO project begins with a detailed
    website audit. This audit evaluates
    technical health, indexing status, crawl
    efficiency, content quality, keyword
    targeting and user experience factors. The
    audit helps identify opportunities and
    prioritize actions that can generate the
    greatest impact. Businesses receive a
    clear understanding of existing issues and
    a roadmap for improvement.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Keyword research and search intent
    analysis are core components of our SEO
    services. We identify keywords that align
    with customer needs, business objectives
    and market demand. Rather than focusing
    only on high-volume keywords, we also
    target long-tail and conversion-focused
    search terms capable of generating
    qualified leads and customers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    On-page optimization includes title tag
    improvements, meta description
    optimization, heading structure
    enhancements, internal linking strategies,
    image optimization and content refinement.
    These improvements help search engines
    better understand website content while
    improving user experience and engagement.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Technical SEO deliverables include sitemap
    optimization, schema implementation,
    crawlability improvements, indexing fixes,
    Core Web Vitals enhancements, mobile
    usability improvements and page speed
    optimization. These elements contribute to
    stronger website performance and better
    search engine accessibility.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Local businesses benefit from specialized
    local SEO features including Google
    Business Profile optimization, location
    page development, local keyword targeting,
    citation improvements and map visibility
    enhancements. These strategies help
    businesses attract customers actively
    searching within their service areas.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Ongoing reporting and performance tracking
    are included to measure keyword rankings,
    search visibility, organic traffic growth,
    user engagement and lead generation.
    Regular analysis allows strategies to be
    refined continuously, ensuring that SEO
    efforts remain aligned with business goals
    while delivering measurable and sustainable
    results over time.
  </p>
</section>

{/* SEO PROCESS */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Our SEO Process
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Successful SEO campaigns are built through
    a structured and data-driven process
    rather than isolated optimization tasks.
    At RISNAR Technologies, we follow a proven
    SEO methodology designed to improve search
    visibility, attract qualified traffic and
    generate long-term business growth. Every
    stage of our process focuses on identifying
    opportunities, implementing improvements
    and measuring results to ensure continuous
    progress.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    The process begins with a comprehensive SEO
    audit. During this stage, we analyze
    website structure, technical health,
    indexing status, page speed, mobile
    usability, content quality and current
    search visibility. The audit helps identify
    weaknesses that may be limiting rankings
    and uncovers opportunities for improvement.
    Understanding the current state of the
    website allows us to create a clear SEO
    roadmap aligned with business objectives.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Once the audit is complete, we conduct
    detailed keyword research and competitor
    analysis. This stage focuses on identifying
    high-value search terms, understanding user
    intent and evaluating competitive
    landscapes. By studying competitors and
    search behavior, we can prioritize keywords
    that offer the greatest potential for
    attracting qualified visitors and
    generating leads.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Technical optimization follows the research
    phase. We address crawlability issues,
    indexing problems, website architecture,
    internal linking, schema markup, page
    speed and mobile responsiveness. These
    improvements help search engines discover,
    understand and rank website content more
    effectively while also improving user
    experience.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Content optimization is another critical
    stage of the process. Existing pages are
    refined to better align with search intent,
    while new content opportunities are
    identified based on keyword research.
    Titles, meta descriptions, headings,
    internal links and content structure are
    optimized to improve relevance and search
    visibility. High-quality content helps
    establish authority and provides value to
    both users and search engines.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For businesses targeting local customers,
    we implement local SEO strategies
    including Google Business Profile
    optimization, local keyword targeting,
    location pages and citation management.
    These improvements help businesses appear
    in local search results and Google Maps,
    increasing visibility among nearby
    customers actively searching for services.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    SEO is an ongoing process rather than a
    one-time project. After implementation, we
    continuously monitor rankings, organic
    traffic, user engagement and conversion
    metrics. Regular reporting and performance
    analysis allow us to refine strategies,
    respond to algorithm updates and identify
    new opportunities. This continuous
    improvement approach helps businesses
    maintain momentum, strengthen online
    visibility and achieve sustainable
    long-term growth through search engines.
  </p>
</section>

{/* WHY RISNAR */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Why Choose RISNAR Technologies
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Choosing the right SEO partner can have a
    significant impact on the success of your
    digital marketing efforts. Search engine
    optimization is a long-term investment,
    and the strategies implemented today can
    influence website visibility, traffic and
    lead generation for years to come. At
    RISNAR Technologies, we focus on creating
    sustainable SEO strategies designed to
    deliver measurable business outcomes
    rather than temporary ranking improvements.
    Our goal is to help businesses build a
    strong online presence that continues to
    generate value over time.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We believe that successful SEO begins with
    understanding business objectives rather
    than simply targeting keywords. Every
    organization operates in a unique market,
    serves different customers and faces
    distinct competitive challenges. Before
    implementing optimization strategies, we
    take the time to understand your industry,
    target audience and growth goals. This
    allows us to create customized SEO plans
    aligned with real business priorities
    rather than generic optimization tactics.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our approach combines technical expertise,
    content strategy and data-driven decision
    making. We analyze website performance,
    search trends, competitor activity and
    user behavior to identify opportunities
    that can generate meaningful results.
    Rather than relying on assumptions, we use
    measurable data to guide optimization
    efforts and prioritize activities with the
    highest potential impact.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Transparency is another important part of
    our SEO process. Businesses should clearly
    understand what work is being performed,
    why it matters and how it contributes to
    overall performance. We provide reporting,
    performance tracking and strategic
    recommendations that help clients stay
    informed while monitoring progress toward
    their goals. This creates stronger
    collaboration and helps ensure SEO efforts
    remain aligned with business objectives.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also recognize that SEO is constantly
    evolving. Search engines regularly update
    algorithms, user behavior changes over
    time and new competitors enter the market.
    Our continuous optimization approach helps
    businesses adapt to these changes while
    maintaining long-term search visibility.
    Rather than treating SEO as a one-time
    project, we focus on continuous
    improvement and sustainable growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Whether you are a local business, startup,
    e-commerce company, real estate firm,
    educational institution or established
    enterprise, RISNAR Technologies can help
    develop an SEO strategy tailored to your
    goals. Our focus on quality, transparency,
    technical excellence and long-term results
    enables businesses to improve rankings,
    attract qualified traffic and generate
    sustainable growth through search engine
    optimization.
  </p>
</section>

{/* INDUSTRIES */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Industries We Serve
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Search engine optimization can benefit
    businesses across virtually every industry.
    Regardless of the products or services
    offered, customers increasingly use search
    engines to research solutions, compare
    providers and make purchasing decisions.
    At RISNAR Technologies, we develop SEO
    strategies tailored to the unique needs,
    competition levels and customer behavior
    of different industries. This enables us
    to create optimization plans that attract
    qualified traffic and support measurable
    business growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Local businesses are among the biggest
    beneficiaries of SEO. Customers frequently
    search for nearby services using location-
    based queries, making local visibility
    essential. Through local SEO, Google
    Business Profile optimization, location
    pages and targeted content, we help local
    businesses improve visibility in Google
    Search and Google Maps, increasing their
    chances of attracting nearby customers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Real estate companies operate in highly
    competitive markets where online visibility
    plays a critical role in lead generation.
    We help real estate agencies, builders and
    property consultants improve rankings for
    property-related searches, locality pages,
    investment opportunities and real estate
    services. SEO can significantly increase
    qualified inquiries and improve brand
    visibility within target markets.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    E-commerce businesses require specialized
    SEO strategies focused on product pages,
    category pages, transactional keywords and
    conversion optimization. Our SEO services
    help online stores attract customers who
    are actively searching for products,
    resulting in increased traffic, improved
    sales opportunities and stronger organic
    growth. Effective e-commerce SEO can also
    reduce dependence on paid advertising over
    time.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Educational institutions, coaching
    centers, online learning platforms and
    training organizations rely heavily on
    digital visibility to attract students and
    generate inquiries. We help educational
    organizations optimize course pages,
    informational content and local search
    visibility to improve enrollment
    opportunities and strengthen online
    presence.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Healthcare providers, clinics, hospitals
    and wellness businesses also benefit from
    SEO by improving visibility for medical
    services, treatments and healthcare
    information. Professional service firms
    including consultants, accountants,
    financial advisors and legal professionals
    can use SEO to establish authority, build
    trust and attract clients searching for
    expertise online.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Startups, SaaS companies, hospitality
    businesses, travel companies, agencies and
    technology firms all face unique SEO
    challenges and opportunities. Our approach
    focuses on understanding industry-specific
    customer behavior and creating strategies
    that align with business goals. By
    combining technical SEO, content strategy,
    local optimization and performance
    improvements, RISNAR Technologies helps
    organizations across multiple industries
    improve search visibility, generate leads
    and achieve sustainable long-term growth.
  </p>
</section>

{/* JAIPUR SEO */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    SEO Company In Jaipur
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Jaipur has rapidly emerged as one of
    India's fastest-growing business and
    startup ecosystems. Thousands of local
    businesses, service providers, real estate
    companies, educational institutions,
    healthcare organizations and e-commerce
    brands compete for customer attention every
    day. As more customers search online before
    making purchasing decisions, search engine
    optimization has become one of the most
    valuable investments businesses can make
    to improve visibility and attract qualified
    leads. Companies that rank higher in search
    results often gain a significant advantage
    over competitors by capturing customers at
    the exact moment they are looking for
    products or services.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    As an SEO Company in Jaipur, RISNAR
    Technologies helps businesses improve
    rankings, increase organic traffic and
    generate sustainable growth through
    strategic search engine optimization.
    Rather than relying solely on paid
    advertising, SEO allows businesses to
    build long-term visibility that continues
    generating traffic and leads over time.
    Whether you operate a local service
    business, startup, e-commerce store,
    consulting firm or enterprise organization,
    our SEO solutions are designed to improve
    discoverability and strengthen online
    presence.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Local SEO is particularly important for
    businesses serving customers in Jaipur and
    surrounding areas. Many customers search
    using location-based keywords such as
    "SEO Company Jaipur", "Digital Marketing
    Jaipur", "Website Development Jaipur" or
    other service-specific searches. Appearing
    in local search results and Google Maps
    can significantly increase visibility and
    customer inquiries. Our local SEO
    strategies focus on optimizing Google
    Business Profiles, location pages, local
    citations and geographically targeted
    content to improve search performance.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Jaipur's startup ecosystem has also grown
    substantially in recent years. Startups
    often face limited marketing budgets and
    need cost-effective strategies to attract
    customers. SEO provides an opportunity to
    compete with larger organizations by
    creating valuable content, targeting
    specific keywords and improving technical
    website performance. A well-executed SEO
    strategy can help startups build authority,
    generate leads and increase brand
    awareness without relying entirely on paid
    advertising channels.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Real estate companies, educational
    institutions, healthcare providers,
    consultants and local service businesses
    can also benefit significantly from SEO.
    Customers frequently search online for
    property opportunities, educational
    programs, medical services and professional
    expertise. By optimizing websites for
    relevant search terms and improving search
    visibility, businesses can attract highly
    qualified visitors who are actively looking
    for their services.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Technical SEO is another critical factor
    for businesses operating in competitive
    markets. Search engines prioritize websites
    that load quickly, provide excellent user
    experiences and follow technical best
    practices. Our optimization process
    includes improving website performance,
    mobile responsiveness, indexing,
    crawlability, schema implementation and
    overall website health. These improvements
    support stronger rankings while creating
    better experiences for visitors.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Content marketing and SEO work together to
    establish authority and attract potential
    customers. Businesses that consistently
    publish valuable content often rank for a
    larger number of keywords and generate more
    organic traffic. We help organizations
    develop content strategies focused on
    customer questions, industry topics,
    service pages and informational resources
    that support both rankings and conversions.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    If you are searching for an SEO Company in
    Jaipur, Local SEO Services Jaipur, SEO
    Consultant Jaipur or Search Engine
    Optimization Services Rajasthan, RISNAR
    Technologies can help create a customized
    strategy tailored to your business goals.
    Our objective is to improve search
    visibility, attract qualified visitors,
    generate more leads and help businesses
    achieve sustainable long-term growth
    through professional SEO services.
  </p>
</section>

{/* RELATED SERVICES */}
<section
  style={{
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    Related Services
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
    }}
  >
    <Link
      href="/services/website-development"
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          color: "#ffffff",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
          }}
        >
          Website Development
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: 0,
            lineHeight: "1.8",
          }}
        >
          Custom business websites,
          corporate portals, e-commerce
          platforms and scalable web
          applications.
        </p>
      </div>
    </Link>

    <Link
      href="/services/app-development"
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          color: "#ffffff",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
          }}
        >
          App Development
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: 0,
            lineHeight: "1.8",
          }}
        >
          Android, iOS and Flutter app
          development solutions for startups
          and growing businesses.
        </p>
      </div>
    </Link>

    <Link
      href="/services/ai-solutions"
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          color: "#ffffff",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
          }}
        >
          AI Solutions
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: 0,
            lineHeight: "1.8",
          }}
        >
          AI chatbots, automation systems,
          intelligent workflows and custom
          AI-powered business tools.
        </p>
      </div>
    </Link>

    <Link
      href="/services/ott-development"
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          color: "#ffffff",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
          }}
        >
          OTT Development
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: 0,
            lineHeight: "1.8",
          }}
        >
          Netflix-style OTT platforms with
          video streaming, subscriptions,
          content management and mobile apps.
        </p>
      </div>
    </Link>
  </div>
</section>

{/* FAQ */}
<section
  style={{
    marginBottom: "60px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    Frequently Asked Questions
  </h2>

  <div
    style={{
      display: "grid",
      gap: "20px",
    }}
  >
    {[
      {
        question: "What are SEO services?",
        answer:
          "SEO services help improve search engine visibility through technical optimization, content improvements and keyword targeting.",
      },
      {
        question: "How long does SEO take?",
        answer:
          "SEO is a long-term strategy. Initial improvements may appear within a few months while larger gains typically require ongoing optimization.",
      },
      {
        question: "Do you provide local SEO services?",
        answer:
          "Yes. We help businesses improve visibility in local search results and Google Maps.",
      },
      {
        question: "Can SEO generate more leads?",
        answer:
          "Yes. SEO attracts visitors actively searching for products and services, increasing lead generation opportunities.",
      },
      {
        question: "Do you perform keyword research?",
        answer:
          "Yes. Keyword research is a core part of our SEO strategy and planning process.",
      },
      {
        question: "What is technical SEO?",
        answer:
          "Technical SEO focuses on website performance, indexing, crawlability, structured data and mobile usability.",
      },
      {
        question: "Can you optimize existing websites?",
        answer:
          "Yes. We work with both new and existing websites to improve rankings and visibility.",
      },
      {
        question: "Do you provide content optimization?",
        answer:
          "Yes. We optimize existing content and help create SEO-focused content strategies.",
      },
      {
        question: "Is SEO better than paid ads?",
        answer:
          "SEO provides sustainable long-term traffic while paid advertising offers immediate visibility.",
      },
      {
        question: "Do you provide e-commerce SEO?",
        answer:
          "Yes. We optimize product pages, category pages and online stores.",
      },
      {
        question: "Do you use Google Search Console?",
        answer:
          "Yes. Search Console is used for monitoring performance, indexing and keyword opportunities.",
      },
      {
        question: "Do you provide SEO reports?",
        answer:
          "Yes. We track rankings, traffic and visibility metrics through regular reporting.",
      },
      {
        question: "Can startups benefit from SEO?",
        answer:
          "Yes. SEO helps startups build visibility and attract customers without relying entirely on paid marketing.",
      },
      {
        question: "Do you offer SEO services in Jaipur?",
        answer:
          "Yes. We provide SEO services for businesses throughout Jaipur and Rajasthan.",
      },
      {
        question: "Why choose RISNAR Technologies for SEO?",
        answer:
          "We focus on technical excellence, transparency, long-term growth and measurable business outcomes.",
      },
    ].map((faq) => (
      <div
        key={faq.question}
        style={{
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.03)",
          backdropFilter:
            "blur(12px)",
          padding: "24px",
        }}
      >
        <h3
          style={{
            color: "#ffffff",
            marginTop: 0,
          }}
        >
          {faq.question}
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "1.8",
            marginBottom: 0,
          }}
        >
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</section>

{/* CTA */}
<section
  style={{
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter:
      "blur(12px)",
    padding: "40px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "16px",
    }}
  >
    Need Professional SEO Services?
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "850px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    Whether you want to improve Google
    rankings, increase organic traffic,
    generate more leads, strengthen local
    visibility or build long-term search
    authority, RISNAR Technologies can help.
    Our SEO strategies are designed to improve
    search performance through technical SEO,
    keyword research, content optimization,
    local SEO and ongoing performance
    improvements. We focus on sustainable
    growth rather than short-term tactics,
    helping businesses create a stronger
    online presence that continues generating
    value over time.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "850px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    We work with startups, local businesses,
    e-commerce companies, real estate firms,
    educational institutions, healthcare
    organizations and service providers across
    multiple industries. Whether your website
    requires technical improvements, content
    expansion, local SEO optimization or a
    complete SEO growth strategy, our team can
    create a customized roadmap aligned with
    your business goals and competitive
    landscape.
  </p>

  <p
    style={{
      color: "#60a5fa",
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "24px",
    }}
  >
    Let's discuss your SEO goals and build a
    strategy that increases visibility,
    attracts qualified visitors and generates
    sustainable long-term business growth.
  </p>

  <LeadFormModal />
</section>

    </main>
  );
}