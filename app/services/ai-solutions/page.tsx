import LeadFormModal from "@/app/components/LeadFormModal";
export const metadata = {
  title: "AI Solutions - RISNAR Technologies",
  description:
    "Custom AI solutions, chatbots, automation systems and AI-powered applications by RISNAR Technologies.",
};

/* =========================
   AI SOLUTIONS PAGE
   - Expanded content
   - Detailed AI process
   - More service cards
   - More use cases
   - Technology stack section
   - Industry applications
   - Glassmorphism styling
   - Responsive layout
   ========================= */
export default function AISolutionsPage() {
  const services = [
    {
      icon: "🤖",
      title: "AI Chatbots",
      description:
        "Intelligent chatbots that provide instant customer support, answer questions and automate conversations.",
    },
    {
      icon: "⚡",
      title: "Business Automation",
      description:
        "Reduce repetitive work by automating business processes, workflows and operational tasks.",
    },
    {
      icon: "🧠",
      title: "Custom AI Assistants",
      description:
        "AI assistants trained on your business knowledge, documents and processes.",
    },
    {
      icon: "📚",
      title: "Knowledge Base AI",
      description:
        "AI-powered systems that instantly retrieve answers from company documents and databases.",
    },
    {
      icon: "✍️",
      title: "Content Generation",
      description:
        "Generate articles, social media posts, product descriptions and marketing content using AI.",
    },
    {
      icon: "📈",
      title: "AI Analytics",
      description:
        "Transform business data into actionable insights using AI-powered analysis and reporting.",
    },
    {
      icon: "🔗",
      title: "AI Integrations",
      description:
        "Integrate OpenAI, Gemini and other AI models into existing applications and workflows.",
    },
    {
      icon: "🚀",
      title: "AI-Powered Applications",
      description:
        "Build complete products that leverage artificial intelligence as a core feature.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Business Discovery",
      description:
        "We analyze your business, workflows, challenges and goals to identify where AI can create the biggest impact.",
    },
    {
      step: "02",
      title: "AI Opportunity Assessment",
      description:
        "We evaluate processes that can be automated, optimized or enhanced using modern AI technologies.",
    },
    {
      step: "03",
      title: "Solution Architecture",
      description:
        "We design a scalable AI architecture including models, integrations, databases and workflows.",
    },
    {
      step: "04",
      title: "Prototype Development",
      description:
        "A working prototype is built to validate ideas, gather feedback and reduce implementation risk.",
    },
    {
      step: "05",
      title: "AI Integration",
      description:
        "AI capabilities are integrated into websites, mobile apps, internal systems and business tools.",
    },
    {
      step: "06",
      title: "Testing & Optimization",
      description:
        "Responses, workflows, accuracy, performance and user experience are tested and optimized.",
    },
    {
      step: "07",
      title: "Deployment",
      description:
        "The AI solution is deployed securely with monitoring, analytics and performance tracking.",
    },
    {
      step: "08",
      title: "Continuous Improvement",
      description:
        "AI systems are continuously improved based on user feedback, usage data and business growth.",
    },
  ];

  const useCases = [
    "Customer Support Automation",
    "Lead Qualification Systems",
    "Appointment Booking Assistants",
    "Sales Automation",
    "Knowledge Base Assistants",
    "Document Search & Analysis",
    "Internal Team Assistants",
    "Content Generation Workflows",
    "Marketing Automation",
    "Email Automation",
    "Customer Onboarding",
    "Data Analysis & Reporting",
  ];

  const industries = [
    "Healthcare",
    "Education",
    "Real Estate",
    "E-Commerce",
    "Finance",
    "Hospitality",
    "Logistics",
    "Manufacturing",
    "Consulting",
    "Marketing Agencies",
    "SaaS Businesses",
    "Local Businesses",
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
          AI Solutions
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
          Artificial Intelligence is transforming how businesses
          operate, serve customers and scale operations. We help
          organizations leverage AI to automate repetitive tasks,
          improve decision-making, enhance customer experiences and
          unlock new growth opportunities through practical,
          business-focused AI solutions.
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
          Practical AI For Real Business Problems
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
          AI is not just about chatbots. Modern AI can automate
          customer support, streamline operations, assist employees,
          analyze large volumes of data, generate content and improve
          productivity across entire organizations. Our goal is to
          implement AI where it creates measurable business value and
          delivers a strong return on investment.
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
          AI Services We Offer
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
                  fontSize: "42px",
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
          USE CASES
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
          Popular AI Use Cases
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {useCases.map((item) => (
            <div
              key={item}
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
              ✓ {item}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          AI PROCESS
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
          Our AI Implementation Process
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
          Industries We Serve
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
          TECHNOLOGIES
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
          AI Technologies We Work With
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {[
            "OpenAI",
            "GPT Models",
            "Google Gemini",
            "LangChain",
            "Vector Databases",
            "RAG Systems",
            "AI Agents",
            "Workflow Automation",
            "API Integrations",
            "Custom AI Pipelines",
            "Knowledge Bases",
            "Business Automation",
          ].map((tech) => (
            <span
              key={tech}
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
              {tech}
            </span>
          ))}
        </div>
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
          Ready To Transform Your Business With AI?
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            maxWidth: "850px",
            margin: "0 auto 28px",
            lineHeight: "1.9",
          }}
        >
          Whether you need AI chatbots, workflow automation,
          intelligent assistants, AI-powered applications or
          custom business automation systems, RISNAR Technologies
          can help you implement practical AI solutions that save
          time, reduce costs and accelerate growth.
        </p>

      <LeadFormModal />
      </section>
    </main>
  );
}