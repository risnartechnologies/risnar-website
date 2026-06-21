import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title:
    "Website Development Services | Custom Website Development Company - RISNAR Technologies",

  description:
    "Professional Website Development Services by RISNAR Technologies. We build business websites, custom web applications, eCommerce platforms, portals, SaaS products and scalable web solutions.",

  keywords: [
    "Website Development",
    "Website Development Company",
    "Custom Website Development",
    "Business Website Development",
    "Web Application Development",
    "eCommerce Website Development",
    "Website Development Jaipur",
    "Responsive Website Design",
    "Next.js Development",
    "RISNAR Technologies",
  ],

  openGraph: {
    title:
      "Website Development Services | RISNAR Technologies",
    description:
      "Custom website development services for startups, businesses and enterprises.",
    url:
      "https://risnar.com/services/website-development",
    siteName:
      "RISNAR Technologies",
    type: "website",
  },

  alternates: {
    canonical:
      "https://risnar.com/services/website-development",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What website development services do you provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "RISNAR Technologies provides business website development, custom web applications, eCommerce websites, SaaS platforms, landing pages, portals, dashboards and enterprise website development services.",
      },
    },
    {
      "@type": "Question",
      name: "How much does website development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Website development costs depend on project complexity, required features, integrations, design requirements and business objectives. We provide customized quotes based on individual project needs.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to develop a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Development timelines vary depending on project scope and functionality. Simple business websites may take a few weeks, while custom web applications and enterprise platforms typically require longer development cycles.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build custom websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We develop fully customized websites tailored to specific business requirements, workflows, branding guidelines and customer expectations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you develop eCommerce websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We build eCommerce websites with product catalogs, shopping carts, payment gateway integrations, inventory management and customer management features.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website be mobile-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. All websites developed by RISNAR Technologies are fully responsive and optimized for desktops, tablets and mobile devices.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO-friendly website development?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We follow SEO best practices including clean code structure, responsive design, fast loading speeds, metadata optimization and search-engine-friendly architecture.",
      },
    },
    {
      "@type": "Question",
      name: "Can you redesign an existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We can redesign existing websites to improve design, user experience, performance, functionality and overall business effectiveness.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you use for website development?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We work with technologies such as Next.js, React, TypeScript, Node.js, Supabase, Firebase, PostgreSQL and modern cloud infrastructure platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide website maintenance and support?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We offer ongoing maintenance, updates, performance monitoring, security improvements and technical support after website launch.",
      },
    },
    {
      "@type": "Question",
      name: "Can you integrate third-party services into a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We integrate payment gateways, CRMs, analytics tools, marketing platforms, APIs and various third-party business systems.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose RISNAR Technologies for website development?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "RISNAR Technologies focuses on building scalable, secure and business-focused websites that help organizations improve visibility, generate leads and support long-term growth.",
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
      name: "Website Development",
      item:
        "https://risnar.com/services/website-development",
    },
  ],
};

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema
          ),
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

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 20px",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        {/* BREADCRUMB */}
        <div
          style={{
            marginBottom: "24px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#94a3b8",
              textDecoration:
                "none",
            }}
          >
            Home
          </Link>

          {" > "}

          <Link
            href="/services"
            style={{
              color: "#94a3b8",
              textDecoration:
                "none",
            }}
          >
            Services
          </Link>

          {" > "}

          <span>
            Website Development
          </span>
        </div>

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
    Website Development Services
  </h1>

  <p
    style={{
      color: "#cbd5e1",
      fontSize: "18px",
      maxWidth: "900px",
      margin: "0 auto",
      lineHeight: "1.8",
    }}
  >
    A professional website is one of the most
    valuable digital assets a business can
    have. It serves as your online presence,
    marketing platform, lead generation tool
    and customer engagement channel. Whether
    you are a startup launching a new brand, a
    growing company expanding your reach or an
    established organization modernizing your
    digital presence, a well-designed website
    can help attract customers, build
    credibility and support long-term business
    growth. Modern websites must be fast,
    responsive, secure and optimized for both
    users and search engines to remain
    competitive in today's digital landscape.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      fontSize: "18px",
      maxWidth: "900px",
      margin: "20px auto 0",
      lineHeight: "1.8",
    }}
  >
    RISNAR Technologies provides professional
    Website Development Services tailored to
    the unique needs of businesses across
    industries. We build business websites,
    custom web applications, eCommerce
    platforms, customer portals, SaaS
    products, landing pages and enterprise web
    solutions designed to deliver measurable
    results. Our focus is not only on creating
    visually appealing websites but also on
    developing scalable, high-performance
    digital platforms that improve user
    experiences, support business operations
    and help organizations achieve their
    growth objectives.
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
    Website Development Services
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    A website is often the first point of
    interaction between a business and its
    potential customers. It plays a critical
    role in building trust, communicating
    value and generating new business
    opportunities. In today's digital-first
    environment, customers expect websites to
    load quickly, function smoothly across all
    devices and provide an intuitive user
    experience. Businesses that invest in
    professional website development are
    better positioned to attract customers,
    improve engagement and establish a strong
    online presence.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    RISNAR Technologies provides end-to-end
    Website Development Services for startups,
    small businesses, enterprises and growing
    organizations. We develop websites that
    combine modern design, robust technology
    and business-focused functionality. From
    simple informational websites to complex
    web applications and enterprise portals,
    our team creates solutions tailored to
    specific business goals and operational
    requirements.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our website development services include
    business websites, corporate websites,
    eCommerce platforms, customer portals,
    booking systems, membership websites,
    SaaS products, landing pages and custom
    web applications. Every project is planned
    with scalability, security and performance
    in mind to ensure long-term reliability
    and growth. We focus on creating websites
    that not only look professional but also
    support lead generation, customer
    acquisition and business operations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Modern website development involves much
    more than visual design. It requires
    thoughtful architecture, responsive user
    interfaces, secure backend systems,
    database management, API integrations and
    search engine optimization. Our team works
    with modern technologies and development
    practices to create websites that deliver
    exceptional user experiences while
    remaining easy to manage and maintain.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    At RISNAR Technologies, our objective is
    to create websites that generate real
    business value. Whether you need a new
    website, a complete redesign, an online
    store, a customer portal or a custom web
    platform, we provide comprehensive website
    development services designed to improve
    visibility, increase conversions and
    support sustainable business growth in an
    increasingly competitive digital
    marketplace.
  </p>
</section>

{/* TYPES OF SOLUTIONS */}
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
    Types Of Websites We Build
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Every business has unique goals,
    customers, workflows and operational
    requirements. As a result, there is no
    single website solution that fits every
    organization. RISNAR Technologies develops
    a wide range of websites and web-based
    platforms designed to support different
    industries, business models and growth
    objectives. Our approach focuses on
    creating websites that not only look
    professional but also serve as valuable
    business assets capable of generating
    leads, improving customer engagement and
    supporting daily operations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Business websites are among the most
    common solutions we build. These websites
    help organizations establish credibility,
    showcase products or services, communicate
    their brand message and attract potential
    customers. A professionally developed
    business website serves as a central hub
    for marketing activities while providing
    visitors with the information they need to
    engage with a company.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Corporate websites are designed for larger
    organizations that require advanced
    content management, multiple service
    sections, investor information, company
    profiles, career pages and enterprise
    communication features. These websites are
    built with scalability, security and brand
    consistency in mind to support long-term
    organizational growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    eCommerce websites enable businesses to
    sell products and services online through
    secure and user-friendly shopping
    experiences. We develop online stores with
    product catalogs, inventory management,
    payment gateway integration, customer
    accounts, order tracking and promotional
    features designed to improve conversions
    and maximize revenue opportunities.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also build custom web applications for
    businesses that require specialized
    functionality beyond traditional websites.
    These applications may include customer
    portals, booking systems, workflow
    management platforms, CRM solutions,
    internal business tools and operational
    dashboards. Custom web applications help
    organizations automate processes, improve
    efficiency and provide better user
    experiences.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    SaaS platforms are another category of web
    solutions we develop. These subscription-
    based software products often require user
    authentication, payment systems,
    dashboards, analytics, reporting tools and
    complex backend infrastructure. Our team
    develops scalable SaaS platforms that can
    support growing user bases while
    maintaining security, performance and
    reliability.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Landing pages are designed for marketing
    campaigns, product launches and lead
    generation initiatives. These focused
    websites are optimized to encourage
    specific user actions such as submitting a
    contact form, requesting a quote,
    registering for an event or purchasing a
    product. Effective landing pages can
    significantly improve marketing
    performance and conversion rates.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    In addition to these solutions, RISNAR
    Technologies develops portfolio websites,
    educational platforms, membership
    websites, directory websites, real estate
    portals, news portals, booking systems,
    marketplace platforms and industry-
    specific web applications. Every website
    is tailored to business objectives and
    built using modern development practices
    to ensure long-term value, scalability and
    measurable business results.
  </p>
</section>

{/* TECHNOLOGIES */}
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
    Technologies We Use
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Building modern websites requires the
    right combination of frontend
    technologies, backend infrastructure,
    databases, cloud platforms and performance
    optimization tools. At RISNAR
    Technologies, we utilize modern web
    development technologies that allow us to
    create fast, secure, scalable and
    future-ready digital solutions. Technology
    selection depends on project requirements,
    expected traffic, feature complexity,
    integration needs and long-term business
    goals.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For frontend development, we primarily use
    Next.js, React and TypeScript to build
    responsive, high-performance user
    interfaces. These technologies enable us
    to create websites that load quickly,
    deliver excellent user experiences and
    support modern SEO requirements. Next.js
    also provides server-side rendering,
    static site generation and performance
    optimization features that help improve
    search visibility and website speed.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    On the backend, we develop scalable
    systems using Node.js and modern API
    architectures. These technologies allow us
    to build secure business logic,
    authentication systems, data processing
    workflows and integrations with third-
    party services. Whether a website requires
    customer accounts, admin dashboards,
    booking systems or complex workflows, our
    backend infrastructure is designed to
    support reliable and efficient operations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For data management, we work with
    PostgreSQL, Supabase and Firebase. These
    technologies provide secure and scalable
    database solutions capable of supporting
    business websites, SaaS products,
    eCommerce platforms and custom web
    applications. Proper database architecture
    ensures efficient data storage, fast
    retrieval and reliable performance as user
    demand grows.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also integrate websites with payment
    gateways, CRM platforms, marketing tools,
    analytics solutions, email systems,
    customer support software and various
    third-party APIs. These integrations help
    businesses automate operations, improve
    customer engagement and create seamless
    digital experiences across multiple
    platforms and services.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Performance and security are essential
    components of every website we develop. We
    implement responsive design principles,
    caching strategies, image optimization,
    secure authentication systems, SSL
    encryption and industry-standard security
    practices. These measures help improve
    website reliability, protect user data and
    ensure consistent performance across
    devices and browsers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    By combining modern technologies, scalable
    cloud infrastructure and proven
    development methodologies, RISNAR
    Technologies delivers websites that remain
    maintainable, adaptable and capable of
    supporting long-term business growth. Our
    technology decisions are always aligned
    with business objectives to ensure maximum
    value and future scalability.
  </p>
</section>

{/* FEATURES */}
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
    Features We Can Build
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Every website serves a different purpose,
    which is why feature requirements vary
    significantly between businesses. At
    RISNAR Technologies, we develop websites
    with functionality tailored to specific
    business objectives, customer expectations
    and operational requirements. Whether you
    need a simple informational website, an
    eCommerce platform, a customer portal or a
    custom web application, we can implement
    features that improve usability, automate
    workflows and support long-term business
    growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We build responsive websites that provide
    consistent user experiences across mobile
    phones, tablets, laptops and desktop
    computers. Mobile-first design ensures
    that visitors can access content easily
    regardless of device size. Fast loading
    performance, optimized layouts and
    intuitive navigation help improve user
    engagement while reducing bounce rates and
    increasing conversions.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For lead generation and customer
    acquisition, we can implement contact
    forms, inquiry systems, quotation request
    forms, newsletter subscriptions, callback
    requests, WhatsApp integrations and
    appointment booking functionality. These
    features help businesses capture leads
    efficiently and maintain better
    communication with potential customers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    eCommerce websites can include product
    catalogs, advanced search capabilities,
    shopping carts, secure payment gateways,
    customer accounts, order tracking,
    inventory management and promotional
    tools. These features help create seamless
    online shopping experiences while enabling
    businesses to manage products, orders and
    customers more effectively.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For organizations requiring advanced
    functionality, we can build user
    authentication systems, role-based access
    controls, customer portals, membership
    platforms, dashboards, reporting tools and
    workflow automation capabilities. These
    features help streamline operations,
    improve collaboration and provide users
    with personalized experiences based on
    their roles and permissions.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Additional capabilities may include CRM
    integrations, analytics dashboards,
    content management systems, third-party
    API integrations, cloud synchronization,
    multilingual support, SEO optimization,
    security enhancements and performance
    monitoring. Every feature is selected
    based on business needs and implemented
    with scalability, usability and long-term
    maintainability in mind, ensuring that
    your website continues to support growth
    as your organization evolves.
  </p>
</section>

{/* DEVELOPMENT PROCESS */}
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
    Our Website Development Process
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Successful website development requires a
    structured process that balances business
    objectives, user experience, technical
    requirements and long-term scalability. At
    RISNAR Technologies, we follow a proven
    development methodology designed to reduce
    risks, improve project transparency and
    ensure successful outcomes. Every project
    begins with a detailed understanding of
    business goals, target audiences and
    operational requirements before any design
    or development work begins.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    The first phase focuses on discovery and
    planning. During this stage, we analyze
    business requirements, identify project
    objectives, understand customer journeys
    and define key website functionalities. We
    also review competitors, industry trends
    and user expectations to create a clear
    roadmap that aligns technology decisions
    with business goals. This planning phase
    helps establish project scope, priorities
    and timelines while minimizing future
    development challenges.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Once requirements are finalized, we move
    into design and architecture planning.
    This stage includes user experience
    planning, interface design, navigation
    structure and content organization. The
    objective is to create an intuitive and
    visually appealing website that makes it
    easy for visitors to find information,
    engage with content and complete desired
    actions. A strong foundation during this
    phase improves usability and overall
    customer satisfaction.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Development begins after design approval.
    Our team builds responsive frontend
    interfaces, secure backend systems,
    databases, integrations and custom
    functionalities required by the project.
    Throughout development, we focus on clean
    code, performance optimization,
    maintainability and scalability. Features
    are implemented according to business
    requirements while ensuring compatibility
    across modern browsers and devices.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Before launch, extensive testing is
    performed to verify functionality,
    responsiveness, security and performance.
    We evaluate user flows, validate forms,
    test integrations, optimize loading speeds
    and identify potential issues before the
    website goes live. This quality assurance
    process helps deliver a stable and
    reliable user experience from day one.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    After successful testing, the website is
    deployed to production environments and
    made available to users. Our involvement
    does not end at launch. We provide ongoing
    support, maintenance, performance
    monitoring and future enhancements to
    ensure the website continues to meet
    evolving business needs. This long-term
    approach allows organizations to maximize
    the value of their digital investment
    while supporting continuous growth and
    improvement.
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
    Choosing the right website development
    partner can have a significant impact on
    the success of your digital presence.
    Beyond design and development, businesses
    need a technology partner that understands
    their objectives, provides strategic
    guidance and delivers solutions capable of
    supporting long-term growth. At RISNAR
    Technologies, we focus on building
    websites that combine modern technology,
    business functionality and exceptional
    user experiences to help organizations
    achieve measurable results.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our approach begins with understanding
    your business rather than simply building
    a website. We take time to learn about
    your goals, target audience, industry and
    operational requirements before making
    technology recommendations. This allows us
    to create solutions that align with real
    business needs and provide meaningful
    value beyond visual design alone.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We utilize modern development frameworks,
    scalable architectures and industry best
    practices to ensure every website is fast,
    secure and future-ready. Whether we are
    building a business website, eCommerce
    platform, SaaS product or custom web
    application, our focus remains on
    performance, reliability and long-term
    maintainability. This helps businesses
    avoid costly redevelopment efforts as
    their requirements evolve.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    User experience is another key priority in
    every project. We design websites that are
    intuitive, responsive and optimized for
    engagement across all devices. A positive
    user experience can improve customer
    satisfaction, increase conversions and
    strengthen brand perception. By combining
    usability principles with modern design
    standards, we create digital experiences
    that support both customer needs and
    business objectives.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Search engine visibility is also an
    important consideration during website
    development. We follow SEO-friendly
    development practices including clean code
    structures, responsive layouts,
    performance optimization and proper
    technical implementation. These practices
    help improve discoverability and create a
    strong foundation for long-term digital
    marketing success.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    RISNAR Technologies works with startups,
    small businesses, growing companies and
    enterprises across multiple industries. We
    are committed to delivering high-quality
    website development services backed by
    transparency, collaboration and ongoing
    support. Our objective is to help clients
    build digital platforms that generate
    leads, improve customer engagement,
    streamline operations and contribute to
    sustainable business growth for years to
    come.
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
    A professionally developed website can
    benefit organizations across virtually
    every industry. Regardless of business
    size or sector, customers increasingly
    rely on digital channels to research
    products, evaluate services and make
    purchasing decisions. At RISNAR
    Technologies, we build websites tailored
    to the unique requirements of different
    industries, ensuring that each solution
    aligns with specific business goals,
    customer expectations and operational
    workflows.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We work with startups and technology
    companies looking to establish strong
    digital foundations for growth. Whether
    launching a new SaaS platform, promoting a
    technology product or building a customer
    acquisition website, modern web solutions
    help technology businesses improve
    visibility, communicate value and support
    rapid scaling. Startups often require
    flexible platforms that can evolve as
    products and customer needs change over
    time.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Real estate businesses benefit from
    websites that showcase property listings,
    generate leads, manage inquiries and
    improve customer engagement. We develop
    websites for developers, builders, real
    estate consultants and property management
    companies that help attract buyers,
    investors and tenants while streamlining
    communication and lead management
    processes.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Retail and eCommerce businesses rely on
    websites to sell products, manage
    inventory, process payments and support
    customer relationships. We create online
    stores and digital commerce platforms that
    provide secure shopping experiences,
    efficient product management and scalable
    infrastructure capable of supporting
    growing transaction volumes.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Healthcare organizations, educational
    institutions and professional service
    providers require websites that deliver
    information efficiently while supporting
    communication, appointment management and
    customer interactions. We develop
    solutions that help these organizations
    improve accessibility, enhance user
    experiences and streamline administrative
    processes through modern digital tools.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Manufacturing companies, logistics
    providers and industrial organizations use
    websites to present capabilities, generate
    business inquiries, share documentation
    and strengthen their market presence.
    Custom portals, reporting systems and
    business applications can further improve
    operational efficiency and collaboration
    across teams and stakeholders.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    We also serve hospitality businesses,
    financial institutions, consulting firms,
    marketing agencies, media companies,
    nonprofits and local businesses. Every
    industry faces unique challenges and
    opportunities, which is why we focus on
    developing customized website solutions
    rather than one-size-fits-all products.
    Our goal is to create digital platforms
    that improve visibility, strengthen brand
    credibility, generate leads and support
    sustainable long-term growth regardless of
    industry or business model.
  </p>
</section>

{/* WEBSITE DEVELOPMENT IN JAIPUR */}
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
    Website Development Company In Jaipur
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Jaipur has emerged as one of India's
    fastest-growing business and technology
    hubs, attracting startups, established
    companies, real estate developers,
    educational institutions, healthcare
    providers and service-based businesses.
    As competition continues to increase,
    having a professional website is no longer
    optional. Businesses need a strong digital
    presence that helps them attract
    customers, generate leads and build
    credibility in an increasingly online
    marketplace. A well-designed website often
    becomes the first impression potential
    customers have of a business and can play
    a major role in influencing purchasing
    decisions.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    RISNAR Technologies provides professional
    Website Development Services in Jaipur for
    startups, small businesses, enterprises
    and growing organizations. We work closely
    with local businesses to understand their
    objectives, target audience and market
    challenges before designing and developing
    customized website solutions. Our goal is
    to create websites that not only look
    professional but also support marketing,
    sales and customer engagement efforts.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Jaipur's business ecosystem includes
    industries such as real estate,
    hospitality, tourism, healthcare,
    education, retail, manufacturing,
    consulting and information technology.
    Each industry has different website
    requirements. A real estate company may
    require property listing management and
    lead generation tools, while a healthcare
    provider may need appointment booking
    systems and patient information portals.
    Educational institutions often require
    admission inquiry systems, course
    information pages and student engagement
    tools. We develop websites tailored to the
    specific needs of each business sector.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Local businesses in Jaipur increasingly
    compete not only with nearby companies but
    also with regional and national brands.
    This makes website quality, performance
    and search visibility more important than
    ever. Our development approach focuses on
    responsive design, fast loading speeds,
    SEO-friendly architecture and intuitive
    user experiences that help businesses
    stand out online. By combining modern
    design principles with business-focused
    functionality, we create websites that
    help organizations attract more visitors
    and convert them into customers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also help Jaipur-based businesses
    integrate websites with CRM systems,
    marketing platforms, payment gateways,
    analytics tools and third-party services.
    These integrations improve operational
    efficiency while creating seamless digital
    experiences for customers. Whether the
    goal is lead generation, online sales,
    customer support or operational
    automation, modern websites can become a
    powerful business asset when developed
    correctly.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    As a Website Development Company in
    Jaipur, RISNAR Technologies focuses on
    delivering scalable, secure and
    performance-driven digital solutions that
    support long-term business growth. Whether
    you need a business website, eCommerce
    platform, customer portal, SaaS product or
    custom web application, our team can help
    transform your ideas into a modern digital
    platform designed to generate measurable
    business results and strengthen your
    competitive position in the market.
  </p>
</section>

{/* RELATED SERVICES */}
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
    Related Services
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: "30px",
    }}
  >
    Website development often works best when
    combined with complementary digital
    services that improve visibility, customer
    engagement and business growth. RISNAR
    Technologies provides a range of related
    services that help organizations build a
    complete digital ecosystem. Whether you
    need mobile applications, search engine
    optimization, local business solutions or
    custom software development, our team can
    deliver integrated solutions tailored to
    your business objectives.
  </p>

  <div
    style={{
      display: "grid",
      gap: "16px",
    }}
  >
    <Link href="/services/app-development">
      App Development Services
    </Link>

    <Link href="/services/app-development-jaipur">
      App Development Company In Jaipur
    </Link>

    <Link href="/services/website-development-jaipur">
      Website Development Company In Jaipur
    </Link>

    <Link href="/services/flutter-developer-jaipur">
      Flutter App Development Services
    </Link>

    <Link href="/services/seo-solutions">
      SEO Solutions
    </Link>

    <Link href="/services/ai-solutions">
      AI Solutions
    </Link>

    <Link href="/services/ott-development">
      OTT Platform Development
    </Link>

    <Link href="/services/real-estate-website-development-jaipur">
      Real Estate Website Development Jaipur
    </Link>
  </div>
</section>

{/* FAQ */}
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
      marginBottom: "24px",
    }}
  >
    Frequently Asked Questions
  </h2>

  <div
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    <h3 style={{ color: "#ffffff" }}>
      1. What website development services do
      you provide?
    </h3>
    <p>
      We provide business website development,
      custom web applications, eCommerce
      websites, SaaS platforms, landing pages,
      customer portals, corporate websites and
      enterprise web solutions tailored to
      specific business requirements.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      2. How much does website development
      cost?
    </h3>
    <p>
      Website development costs depend on
      project complexity, required features,
      integrations, design requirements and
      business objectives. We provide custom
      quotations based on the scope of each
      project.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      3. How long does it take to build a
      website?
    </h3>
    <p>
      Development timelines vary depending on
      project size and functionality. Simple
      business websites can often be completed
      within a few weeks, while custom web
      applications and SaaS platforms typically
      require longer development cycles.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      4. Do you build custom websites?
    </h3>
    <p>
      Yes. Every business has unique
      requirements, and we develop customized
      websites designed around specific goals,
      workflows, branding guidelines and user
      expectations.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      5. Do you develop eCommerce websites?
    </h3>
    <p>
      Yes. We build eCommerce platforms with
      product catalogs, shopping carts, secure
      payment gateways, customer accounts,
      inventory management and order tracking
      functionality.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      6. Will my website work on mobile
      devices?
    </h3>
    <p>
      Absolutely. All websites developed by
      RISNAR Technologies are fully responsive
      and optimized for mobile phones,
      tablets, laptops and desktop computers.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      7. Do you provide SEO-friendly website
      development?
    </h3>
    <p>
      Yes. We follow SEO best practices
      including responsive design, clean code,
      optimized metadata, fast loading speeds
      and search-engine-friendly website
      architecture.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      8. Can you redesign an existing website?
    </h3>
    <p>
      Yes. We can modernize existing websites
      by improving design, user experience,
      functionality, performance and overall
      business effectiveness.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      9. What technologies do you use for
      website development?
    </h3>
    <p>
      We work with technologies including
      Next.js, React, TypeScript, Node.js,
      Supabase, Firebase, PostgreSQL and
      modern cloud infrastructure platforms to
      build scalable and secure websites.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      10. Do you provide maintenance and
      support after launch?
    </h3>
    <p>
      Yes. We offer ongoing maintenance,
      performance monitoring, updates, bug
      fixes, security improvements and feature
      enhancements after deployment.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      11. Can you integrate third-party
      services into my website?
    </h3>
    <p>
      Yes. We integrate payment gateways,
      CRM systems, analytics tools, marketing
      platforms, booking systems, APIs and
      various third-party business solutions.
    </p>

    <h3 style={{ color: "#ffffff" }}>
      12. Why choose RISNAR Technologies for
      website development?
    </h3>
    <p>
      RISNAR Technologies focuses on creating
      scalable, secure and business-focused
      websites that help organizations improve
      visibility, generate leads, enhance user
      experiences and support long-term growth.
    </p>
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
    padding: "50px 40px",
    marginBottom: "40px",
  }}
>
  <h2
    style={{
      color: "#ffffff",
      marginBottom: "20px",
    }}
  >
    Ready To Build Your Website?
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "900px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    A professionally developed website can be
    one of the most valuable investments for
    your business. Whether your goal is to
    generate more leads, improve customer
    engagement, increase online sales,
    streamline business operations or
    strengthen your brand presence, the right
    website can create measurable long-term
    value. Modern websites are no longer just
    digital brochures. They serve as marketing
    platforms, customer acquisition channels,
    communication hubs and business growth
    engines that operate around the clock.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "900px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    RISNAR Technologies helps startups, small
    businesses, enterprises and growing
    organizations develop websites tailored to
    their specific objectives. From business
    websites and eCommerce stores to SaaS
    platforms, customer portals and custom web
    applications, our team focuses on creating
    scalable, secure and performance-driven
    solutions that support long-term success.
    Every project is designed with user
    experience, business functionality and
    future growth in mind.
  </p>

  <p
    style={{
      color: "#60a5fa",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "30px",
    }}
  >
    Let's discuss your website development
    requirements and explore how a modern
    digital platform can help your business
    attract customers, improve efficiency and
    accelerate growth.
  </p>

  <LeadFormModal />
</section>
      </main>
    </>
  );
}
