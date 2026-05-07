export default function WebsitesPage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HERO */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Websites
        </h1>

        <p style={{ color: "#555", fontSize: "18px" }}>
          Explore our web platforms designed to solve real-world problems.
        </p>
      </section>

      {/* PLATFORM CARD */}
      <section
        style={{
          padding: "40px 20px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Adcampin Card */}
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "24px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "0.2s",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Adcampin</h2>

            <p style={{ color: "#555", marginBottom: "20px" }}>
              Adcampin is a powerful web platform designed to help marketers, 
              founders, and businesses create high-converting ad copies effortlessly. 
              It combines proven marketing frameworks with smart templates to generate 
              compelling ads for platforms like Facebook, Google, and more—saving time 
              while improving performance.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://adcampin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "#000",
                    color: "#fff",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  Visit Website
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#f5f5f5",
        }}
      >
        <h2>More websites coming soon</h2>
        <p style={{ color: "#555", marginTop: "10px" }}>
          We are building tools to simplify digital growth and automation.
        </p>
      </section>

    </main>
  );
}