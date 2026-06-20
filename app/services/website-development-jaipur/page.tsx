import Link from "next/link";
import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title:
    "Website Development Company Jaipur | Custom Website Development Services - RISNAR Technologies",
  description:
    "Professional Website Development Services in Jaipur. Custom business websites, e-commerce stores, web portals and SEO-friendly web applications by RISNAR Technologies.",
};

export default function WebsiteDevelopmentJaipurPage() {
const faqs = [
  {
    question:
      "How much does website development cost in Jaipur?",
    answer:
      "Website development costs vary depending on design requirements, features, integrations and project complexity. We provide customized quotations based on business requirements.",
  },
  {
    question:
      "How long does it take to develop a website?",
    answer:
      "Simple business websites can be completed within a few weeks, while larger custom platforms, portals and e-commerce projects may require additional development time.",
  },
  {
    question:
      "Do you build custom business websites?",
    answer:
      "Yes. We create custom websites tailored to specific business goals, branding requirements and customer expectations.",
  },
  {
    question:
      "Will my website be mobile responsive?",
    answer:
      "Yes. Every website we develop is optimized for mobile phones, tablets, laptops and desktop devices.",
  },
  {
    question:
      "Do you develop e-commerce websites?",
    answer:
      "Yes. We build online stores, marketplaces and e-commerce platforms with payment gateway integration and inventory management functionality.",
  },
  {
    question:
      "Can you redesign my existing website?",
    answer:
      "Yes. We can modernize outdated websites, improve performance, enhance user experience and implement modern design standards.",
  },
  {
    question:
      "Do you provide SEO-friendly website development?",
    answer:
      "Yes. We follow technical SEO best practices including optimized page structure, clean URLs, fast loading speeds and mobile responsiveness.",
  },
  {
    question:
      "Can you integrate payment gateways?",
    answer:
      "Yes. We integrate payment gateways, subscription systems and online payment solutions based on project requirements.",
  },
  {
    question:
      "Do you provide website maintenance services?",
    answer:
      "Yes. We offer ongoing maintenance, updates, security monitoring, backups and technical support after launch.",
  },
  {
    question:
      "Can you develop custom web applications?",
    answer:
      "Yes. We build custom portals, dashboards, business systems, SaaS platforms and web applications tailored to specific business needs.",
  },
  {
    question:
      "Do you create websites for startups?",
    answer:
      "Yes. We help startups build scalable websites, MVP platforms and digital products designed for growth and future expansion.",
  },
  {
    question:
      "Can you develop real estate websites?",
    answer:
      "Yes. We build property listing websites, builder portals and real estate platforms with advanced search and lead management functionality.",
  },
  {
    question:
      "Will my website load quickly?",
    answer:
      "Performance optimization is an important part of our development process. We focus on fast loading speeds and efficient website architecture.",
  },
  {
    question:
      "Can you integrate CRM and third-party tools?",
    answer:
      "Yes. We can integrate CRM systems, analytics platforms, marketing tools, APIs and business software solutions.",
  },
  {
    question:
      "Why choose RISNAR Technologies for website development in Jaipur?",
    answer:
      "RISNAR Technologies focuses on modern design, scalable architecture, SEO-friendly development and business-driven solutions that help organizations grow online.",
  },
];

  return (
    <>
      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",
            "@type":
              "BreadcrumbList",
            itemListElement: [
              {
                "@type":
                  "ListItem",
                position: 1,
                name: "Home",
                item:
                  "https://risnar.com",
              },
              {
                "@type":
                  "ListItem",
                position: 2,
                name: "Services",
                item:
                  "https://risnar.com/services",
              },
              {
                "@type":
                  "ListItem",
                position: 3,
                name:
                  "Website Development Jaipur",
                item:
                  "https://risnar.com/services/website-development-jaipur",
              },
            ],
          }),
        }}
      />

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",
            "@type":
              "FAQPage",
            mainEntity:
              faqs.map((faq) => ({
                "@type":
                  "Question",
                name:
                  faq.question,
                acceptedAnswer:
                  {
                    "@type":
                      "Answer",
                    text:
                      faq.answer,
                  },
              })),
          }),
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
            Website Development Jaipur
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
            Website Development Jaipur
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
            Looking for professional Website Development
            Services in Jaipur? RISNAR Technologies helps
            startups, businesses, professionals and
            growing organizations build modern,
            high-performance websites designed to attract
            customers, generate leads and support
            long-term business growth. In today's digital
            marketplace, a website is often the first
            interaction potential customers have with
            your business, making professional website
            development one of the most important
            investments for any organization.

            Our team develops business websites,
            corporate portals, e-commerce stores,
            real estate websites, educational platforms,
            service booking portals and custom web
            applications tailored to specific business
            requirements. Every website is designed with
            user experience, mobile responsiveness,
            performance and search engine visibility in
            mind. Whether you need a simple business
            website or a large-scale custom web platform,
            we focus on creating solutions that help
            businesses establish credibility, improve
            customer engagement and generate measurable
            results.

            If you are searching for a Website
            Development Company in Jaipur that combines
            modern design, technical expertise and
            business-focused development, RISNAR
            Technologies can help transform your vision
            into a professional online presence.
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
            Website Development Services In Jaipur
          </h2>
  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    A professional website is no longer just an
    online brochure. It has become one of the
    most important business assets for customer
    acquisition, lead generation, brand
    positioning and long-term business growth.
    Whether you operate a startup, local
    business, service company, educational
    institution, real estate firm or
    e-commerce brand, a professionally
    developed website can significantly improve
    visibility, credibility and customer
    engagement. Businesses that invest in
    modern websites often experience higher
    conversion rates, stronger customer trust
    and better online performance compared to
    competitors with outdated websites.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    At RISNAR Technologies, we provide complete
    website development services in Jaipur,
    helping businesses create websites that are
    visually attractive, technically robust and
    optimized for long-term success. Our
    development process focuses on responsive
    design, user experience, performance,
    security and search engine optimization.
    Every project is carefully planned to
    ensure that the final website aligns with
    business objectives while delivering a
    seamless experience across desktop,
    tablet and mobile devices.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We develop a wide range of digital
    solutions including business websites,
    corporate portals, e-commerce platforms,
    service booking systems, educational
    websites, real estate portals, membership
    websites and custom web applications.
    Depending on project requirements, we can
    integrate payment gateways, CRM systems,
    lead management tools, analytics platforms,
    marketing automation solutions and other
    third-party services. This enables
    businesses to streamline operations,
    improve customer communication and create
    efficient digital workflows.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Modern website development requires more
    than attractive design. Performance,
    accessibility, scalability and SEO
    readiness play a critical role in long-term
    success. Our team follows modern
    development practices and uses proven
    technologies to ensure websites load
    quickly, rank well in search engines and
    provide excellent user experiences.
    Whether your goal is lead generation,
    online sales, customer engagement or brand
    awareness, we create websites designed to
    support measurable business outcomes.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Businesses across Jaipur are increasingly
    investing in professional website
    development to strengthen their digital
    presence and compete effectively in modern
    markets. RISNAR Technologies helps
    organizations transform ideas into powerful
    digital platforms that support growth,
    improve customer engagement and create
    long-term value. Our goal is to deliver
    websites that not only look professional
    but also function as effective business
    tools capable of generating real results.
  </p>
  </section>

{/* TYPES OF WEBSITES */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
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
    customers and operational requirements.
    That is why we develop a wide variety of
    websites tailored to different industries,
    business models and growth objectives.
    Whether you need a simple informational
    website or a complex custom platform,
    our team focuses on creating solutions
    that deliver measurable business value.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Business websites remain one of the most
    common and important digital assets for
    organizations. These websites establish
    credibility, showcase services, generate
    leads and provide customers with essential
    information. We design professional
    business websites that help companies
    create a strong online presence while
    maintaining a clean, modern and
    user-friendly experience.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also build e-commerce websites that
    enable businesses to sell products online,
    manage inventory, process secure payments
    and track customer activity. From small
    online stores to large-scale e-commerce
    platforms, our solutions are designed to
    provide seamless shopping experiences and
    support long-term business growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Service-based businesses often require
    booking systems, appointment management,
    inquiry forms and customer portals. We
    develop websites that simplify customer
    interactions while automating repetitive
    business processes. Educational
    institutions can benefit from learning
    platforms, course portals and student
    management systems, while healthcare
    organizations may require appointment
    scheduling, patient information systems
    and secure communication features.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Real estate companies require specialized
    property portals that allow visitors to
    browse listings, search properties and
    submit inquiries. We develop modern real
    estate websites with advanced search
    capabilities, lead capture forms and
    property management functionality.
    Similarly, media businesses and content
    creators can benefit from news portals,
    blog platforms, membership websites and
    subscription-based content systems.
  </p>

<p
  style={{
    color: "#cbd5e1",
    lineHeight: "1.9",
  }}
>
  In addition to standard websites, we build
  custom web applications, customer portals,
  enterprise dashboards, marketplace
  platforms, SaaS products and business
  automation systems. These solutions help
  businesses automate workflows, improve
  operational efficiency and create new
  revenue opportunities through digital
  channels. Custom platforms are particularly
  useful for organizations that require
  specialized functionality that cannot be
  achieved through traditional website
  solutions.
</p>

<p
  style={{
    color: "#cbd5e1",
    lineHeight: "1.9",
  }}
>
  Marketplace websites have become
  increasingly popular among startups and
  entrepreneurs. These platforms connect
  buyers and sellers, service providers and
  customers or businesses and vendors within
  a single ecosystem. Depending on business
  requirements, we can develop listing
  systems, commission models, user accounts,
  payment processing, reviews, ratings and
  advanced search capabilities. Such
  platforms can support scalable business
  models while creating long-term growth
  opportunities.
</p>

<p
  style={{
    color: "#cbd5e1",
    lineHeight: "1.9",
  }}
>
  Membership websites and subscription-based
  platforms are also increasingly valuable
  for businesses looking to generate recurring
  revenue. These websites can include user
  registration, protected content, payment
  subscriptions, member dashboards, learning
  resources and community features. Such
  systems help organizations build stronger
  customer relationships while creating
  sustainable revenue streams.
</p>

<p
  style={{
    color: "#cbd5e1",
    lineHeight: "1.9",
    marginBottom: 0,
  }}
>
  Regardless of the type of website being
  developed, our focus remains on creating
  solutions that are user-friendly, secure,
  scalable and aligned with business goals.
  Every project is designed to provide long-
  term value while helping businesses improve
  visibility, increase engagement and achieve
  measurable results through their digital
  presence.
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
    backdropFilter: "blur(12px)",
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
    Modern website development requires a
    combination of frontend technologies,
    backend systems, databases, cloud
    infrastructure and performance
    optimization tools. At RISNAR
    Technologies, we select technologies
    based on project requirements, scalability
    needs and long-term business goals rather
    than forcing every project into a single
    technology stack.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For modern business websites and web
    applications, we frequently use Next.js,
    React and TypeScript. These technologies
    enable fast-loading websites, improved
    user experiences and better search engine
    visibility. Next.js is particularly useful
    for SEO-focused websites because it
    supports server-side rendering, static
    generation and modern performance
    optimization techniques.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For backend development and business
    logic, we utilize technologies such as
    Node.js, REST APIs and secure cloud-based
    architectures. Depending on the project,
    we integrate databases including
    PostgreSQL, Supabase and Firebase. These
    technologies provide reliable data
    management, authentication systems,
    reporting capabilities and scalable
    application infrastructure.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    E-commerce websites often require payment
    gateway integrations, inventory systems,
    customer management tools and order
    processing workflows. We integrate
    third-party services and APIs to ensure
    seamless operations while maintaining
    security and performance. Businesses can
    also benefit from CRM integrations,
    marketing automation platforms, analytics
    solutions and customer support systems.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Performance and reliability are critical
    for modern websites. We deploy projects
    using platforms such as Vercel,
    Cloudflare and AWS, depending on business
    requirements. These platforms provide
    fast global content delivery, security
    enhancements, scalability and uptime
    reliability for websites of all sizes.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    By combining modern development
    frameworks, secure backend systems,
    optimized hosting environments and SEO
    best practices, we create websites that
    are fast, scalable, secure and capable of
    supporting long-term business growth.
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
    backdropFilter: "blur(12px)",
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
    Modern websites must do much more than
    display information. Businesses today
    require websites that generate leads,
    automate processes, improve customer
    engagement and support long-term growth.
    At RISNAR Technologies, we develop
    feature-rich websites tailored to the
    unique requirements of each business and
    industry.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We can build advanced lead generation
    systems including inquiry forms, callback
    requests, quote request forms, WhatsApp
    integration, contact management tools and
    customer onboarding workflows. These
    features help businesses capture more
    opportunities and improve conversion
    rates.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    E-commerce websites can include product
    catalogs, shopping carts, secure payment
    gateways, inventory management, order
    tracking, discount systems and customer
    account functionality. These features
    create seamless online shopping
    experiences while supporting efficient
    business operations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    For service-based businesses, we can
    implement appointment booking systems,
    scheduling tools, customer portals,
    automated notifications, online forms and
    service management dashboards. Educational
    institutions may benefit from course
    management systems, student portals,
    resource libraries and online learning
    functionality.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We also build content management systems,
    blog platforms, membership portals,
    subscription systems, user registration,
    authentication modules, analytics
    dashboards, CRM integrations and custom
    administrative panels. These features
    provide businesses with greater control
    over content, users and day-to-day
    operations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Every feature is designed with
    performance, security, scalability and
    usability in mind. Our goal is to create
    websites that not only look professional
    but also function as powerful business
    tools capable of generating measurable
    results and supporting long-term growth.
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
    backdropFilter: "blur(12px)",
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
    Successful websites are built through a
    structured development process that
    combines business strategy, user
    experience, technical implementation and
    continuous improvement. At RISNAR
    Technologies, we follow a proven workflow
    that helps businesses launch professional
    websites while minimizing risks and
    ensuring long-term scalability.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    The first stage is Requirement Analysis.
    During this phase, we understand your
    business objectives, target audience,
    competitors, content requirements and
    growth goals. This allows us to define
    project scope, identify opportunities and
    create a practical roadmap for development.
    Clear planning at the beginning helps
    prevent unnecessary delays and ensures the
    final website aligns with business
    expectations.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Once planning is complete, we move into
    UI/UX Design and Information Architecture.
    This stage focuses on page structure,
    navigation, user journeys and visual
    presentation. A well-designed interface
    improves engagement, increases trust and
    makes it easier for visitors to find the
    information they need. Mobile responsiveness
    and accessibility are considered from the
    beginning to ensure an optimal experience
    across all devices.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    The Development phase transforms approved
    designs into a fully functional website.
    Our developers build responsive layouts,
    integrate required features, connect
    databases and implement third-party
    services where necessary. Throughout the
    process we focus on performance, security,
    maintainability and SEO best practices.
    Every website is developed with scalability
    in mind so it can grow alongside the
    business.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Before launch, every project undergoes
    Testing and Quality Assurance. We verify
    functionality, responsiveness, page speed,
    browser compatibility, security and user
    experience across multiple devices.
    Thorough testing helps identify issues
    before they impact customers and ensures a
    smooth launch experience.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    After deployment, we continue supporting
    clients through maintenance, updates,
    performance monitoring and feature
    enhancements. A website should evolve with
    the business, and our ongoing support helps
    organizations remain competitive while
    continuously improving their digital
    presence. This structured process enables
    us to deliver websites that are reliable,
    professional and capable of generating
    measurable business results.
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
    backdropFilter: "blur(12px)",
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
    company is one of the most important
    decisions for any business investing in
    its digital presence. A professionally
    developed website should do much more
    than look attractive. It should support
    business growth, improve customer trust,
    generate leads, strengthen brand
    positioning and provide a solid foundation
    for future expansion. At RISNAR
    Technologies, we focus on building
    websites that deliver measurable business
    value rather than simply creating pages
    on the internet.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our approach combines modern design,
    technical expertise and business-focused
    development strategies. Every project
    begins with understanding the client's
    objectives, target audience and growth
    plans. This allows us to create websites
    that align with real business goals while
    delivering exceptional user experiences.
    Instead of using generic templates for
    every project, we tailor solutions to
    individual business requirements and
    industry-specific needs.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We place strong emphasis on responsive
    design, performance optimization and SEO
    readiness. Modern customers expect fast,
    mobile-friendly websites that provide
    seamless experiences across all devices.
    Search engines also prioritize website
    performance and usability. By following
    modern development standards and SEO best
    practices, we help businesses establish a
    strong digital foundation capable of
    supporting long-term growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Transparency and communication are
    important parts of our development
    process. We work closely with clients
    throughout planning, design, development,
    testing and deployment. This collaborative
    approach helps ensure that projects remain
    aligned with expectations while reducing
    misunderstandings and costly revisions.
    Clients remain informed throughout every
    stage of the project lifecycle.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    Whether you need a business website,
    e-commerce platform, real estate portal,
    educational website or custom web
    application, RISNAR Technologies is
    committed to delivering quality,
    reliability and long-term value. Our goal
    is to create websites that help
    businesses attract customers, improve
    operations and achieve sustainable growth
    in an increasingly competitive digital
    environment.
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
    backdropFilter: "blur(12px)",
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
    Every industry has unique challenges,
    customer expectations and operational
    requirements. At RISNAR Technologies, we
    develop websites that are tailored to the
    specific needs of different industries
    rather than relying on generic solutions.
    Our goal is to create digital platforms
    that help businesses improve visibility,
    strengthen customer engagement and support
    long-term growth.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We work extensively with service-based
    businesses including consultants,
    agencies, healthcare providers, legal
    professionals, financial advisors and
    local service companies. These businesses
    require websites that establish trust,
    generate qualified leads and clearly
    communicate their expertise. Through
    effective design, strong calls-to-action
    and optimized user experiences, we help
    service businesses convert visitors into
    customers.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Retail and e-commerce businesses benefit
    from online stores, product catalogs,
    payment gateway integration and inventory
    management systems. We build websites that
    support online sales, improve customer
    experiences and help businesses compete in
    rapidly evolving digital markets. Whether
    selling physical products, digital goods
    or subscription services, we create
    platforms designed for scalability and
    performance.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Real estate companies require specialized
    websites that showcase properties,
    capture leads and simplify property
    discovery. We develop modern real estate
    portals with property listings, advanced
    search functionality, inquiry systems and
    lead management capabilities. These
    solutions help builders, brokers and real
    estate agencies improve marketing
    effectiveness and customer engagement.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Educational institutions and training
    organizations increasingly rely on digital
    platforms to attract students, deliver
    information and provide learning
    resources. We build websites for schools,
    colleges, coaching institutes and online
    learning providers that support admissions,
    course information, student engagement and
    digital learning initiatives.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Hospitality businesses, travel companies,
    healthcare organizations, media companies,
    startups and technology firms also benefit
    from professional website development.
    Each industry requires different
    functionality, branding strategies and
    customer engagement approaches. Our
    development process ensures that every
    website is aligned with industry-specific
    requirements while maintaining high
    standards of usability and performance.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    By combining industry knowledge with
    modern web technologies, RISNAR
    Technologies helps businesses create
    websites that support growth, improve
    customer relationships and establish a
    strong digital presence. Regardless of the
    industry, our focus remains on delivering
    websites that generate measurable business
    value and long-term competitive advantage.
  </p>
</section>

{/* LOCAL JAIPUR CONTENT */}
<section
  style={{
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
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
    Jaipur has rapidly emerged as one of
    India's growing business and technology
    destinations. Startups, local businesses,
    service providers, educational
    institutions, healthcare organizations,
    real estate companies and e-commerce
    brands across Jaipur are increasingly
    investing in digital transformation to
    reach customers online. A professional
    website has become one of the most
    important tools for building credibility,
    generating leads and establishing a strong
    online presence. Businesses that fail to
    invest in modern websites often struggle
    to compete effectively in today's digital
    marketplace.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    At RISNAR Technologies, we provide
    professional website development services
    in Jaipur designed to help businesses
    attract customers, strengthen brand
    visibility and improve online performance.
    Every website we develop is tailored to
    the specific goals of the business rather
    than relying on generic templates. We
    focus on creating digital experiences that
    are visually appealing, technically robust
    and optimized for conversions.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    We work with businesses throughout Jaipur,
    including Mansarovar, Vaishali Nagar,
    Malviya Nagar, Jagatpura, Tonk Road,
    Vidhyadhar Nagar, C-Scheme, Sodala,
    Jhotwara and other commercial and
    residential areas. Whether you are a local
    startup launching your first website or an
    established company looking to upgrade an
    outdated platform, our team can help build
    a website aligned with your growth
    objectives.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Businesses in Jaipur operate in highly
    competitive markets where customers often
    compare multiple providers before making a
    purchase decision. A professionally
    developed website helps create trust,
    showcase expertise and provide customers
    with the information they need to take
    action. From service websites and
    corporate portals to online stores and
    custom web applications, our solutions are
    designed to improve user engagement and
    generate qualified leads.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Search engine visibility is another major
    factor for businesses in Jaipur. Many
    customers search online before contacting
    a company or visiting a physical location.
    This makes SEO-friendly website
    development essential for long-term
    success. Our websites are built with clean
    architecture, fast loading speeds, mobile
    responsiveness and technical SEO best
    practices to improve visibility in search
    results and support future marketing
    efforts.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Jaipur's startup ecosystem is also growing
    rapidly, creating opportunities for new
    digital businesses and innovative service
    providers. Entrepreneurs require websites
    that can evolve as their businesses grow.
    We build scalable platforms that support
    future feature enhancements, integrations
    and business expansion without requiring
    complete redevelopment.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
    }}
  >
    Our website development services are used
    by consultants, agencies, healthcare
    providers, educational institutions,
    e-commerce businesses, real estate firms,
    hospitality companies and professional
    service organizations. Every project is
    approached with a focus on user
    experience, performance, security and
    long-term maintainability.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: "1.9",
      marginBottom: 0,
    }}
  >
    If you are searching for a Website
    Development Company in Jaipur, Web
    Development Services in Jaipur, Business
    Website Development Jaipur or Custom
    Website Design Services in Rajasthan,
    RISNAR Technologies can help transform
    your ideas into a professional digital
    platform. Our mission is to build websites
    that not only look impressive but also
    generate measurable business results and
    support sustainable long-term growth.
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
    Related Jaipur Services
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
      href="/services/flutter-developer-jaipur"
      style={{
        textDecoration:
          "none",
      }}
    >
      <div className="ui-btn">
        Flutter Developer Jaipur
      </div>
    </Link>

    <Link
      href="/services/app-development-jaipur"
      style={{
        textDecoration:
          "none",
      }}
    >
      <div className="ui-btn">
        App Development Jaipur
      </div>
    </Link>

    <Link
      href="/services/real-estate-website-development-jaipur"
      style={{
        textDecoration:
          "none",
      }}
    >
      <div className="ui-btn">
        Real Estate Website Development Jaipur
      </div>
    </Link>

    <Link
      href="/services/web-development"
      style={{
        textDecoration:
          "none",
      }}
    >
      <div className="ui-btn">
        Web Development
      </div>
    </Link>

    <Link
      href="/services/ott-development"
      style={{
        textDecoration:
          "none",
      }}
    >
      <div className="ui-btn">
        OTT Development
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
        question:
          "How much does website development cost in Jaipur?",
        answer:
          "Website development costs vary depending on design requirements, features, integrations and project complexity. We provide customized quotations based on business requirements.",
      },
      {
        question:
          "How long does it take to develop a website?",
        answer:
          "Simple business websites can be completed within a few weeks, while larger custom platforms, portals and e-commerce projects may require additional development time.",
      },
      {
        question:
          "Do you build custom business websites?",
        answer:
          "Yes. We create custom websites tailored to specific business goals, branding requirements and customer expectations.",
      },
      {
        question:
          "Will my website be mobile responsive?",
        answer:
          "Yes. Every website we develop is optimized for mobile phones, tablets, laptops and desktop devices.",
      },
      {
        question:
          "Do you develop e-commerce websites?",
        answer:
          "Yes. We build online stores, marketplaces and e-commerce platforms with payment gateway integration and inventory management functionality.",
      },
      {
        question:
          "Can you redesign my existing website?",
        answer:
          "Yes. We can modernize outdated websites, improve performance, enhance user experience and implement modern design standards.",
      },
      {
        question:
          "Do you provide SEO-friendly website development?",
        answer:
          "Yes. We follow technical SEO best practices including optimized page structure, clean URLs, fast loading speeds and mobile responsiveness.",
      },
      {
        question:
          "Can you integrate payment gateways?",
        answer:
          "Yes. We integrate payment gateways, subscription systems and online payment solutions based on project requirements.",
      },
      {
        question:
          "Do you provide website maintenance services?",
        answer:
          "Yes. We offer ongoing maintenance, updates, security monitoring, backups and technical support after launch.",
      },
      {
        question:
          "Can you develop custom web applications?",
        answer:
          "Yes. We build custom portals, dashboards, business systems, SaaS platforms and web applications tailored to specific business needs.",
      },
      {
        question:
          "Do you create websites for startups?",
        answer:
          "Yes. We help startups build scalable websites, MVP platforms and digital products designed for growth and future expansion.",
      },
      {
        question:
          "Can you develop real estate websites?",
        answer:
          "Yes. We build property listing websites, builder portals and real estate platforms with advanced search and lead management functionality.",
      },
      {
        question:
          "Will my website load quickly?",
        answer:
          "Performance optimization is an important part of our development process. We focus on fast loading speeds and efficient website architecture.",
      },
      {
        question:
          "Can you integrate CRM and third-party tools?",
        answer:
          "Yes. We can integrate CRM systems, analytics platforms, marketing tools, APIs and business software solutions.",
      },
      {
        question:
          "Why choose RISNAR Technologies for website development in Jaipur?",
        answer:
          "RISNAR Technologies focuses on modern design, scalable architecture, SEO-friendly development and business-driven solutions that help organizations grow online.",
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
    Need A Website Development Company In Jaipur?
  </h2>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "800px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    Whether you need a professional business
    website, corporate portal, e-commerce
    platform, real estate website, educational
    portal or custom web application, RISNAR
    Technologies can help transform your ideas
    into a modern digital platform. Our team
    focuses on creating websites that are
    visually impressive, technically robust,
    mobile responsive, SEO-friendly and
    designed to generate measurable business
    results.
  </p>

  <p
    style={{
      color: "#cbd5e1",
      maxWidth: "800px",
      margin: "0 auto 24px",
      lineHeight: "1.9",
    }}
  >
    We work with startups, entrepreneurs,
    agencies and established businesses across
    Jaipur and Rajasthan, delivering solutions
    that improve online visibility, strengthen
    customer engagement and support long-term
    growth. From planning and design to
    development, deployment and ongoing
    support, our goal is to provide reliable
    website development services that help
    businesses succeed in an increasingly
    competitive digital marketplace.
  </p>

  <p
    style={{
      color: "#60a5fa",
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "24px",
    }}
  >
    Let's discuss your project and create a
    website that helps your business attract
    more customers, generate more leads and
    grow faster.
  </p>

  <LeadFormModal />
</section>
      </main>
    </>
  );
}