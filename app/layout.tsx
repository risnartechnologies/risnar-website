import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Risnar Technologies",
  description: "Portfolio of apps by Risnar Technologies",
};

/* =========================
   ROOT LAYOUT (SERVER COMPONENT)
   - Responsive-safe styles
   - Mobile-friendly button sizing
   ========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* NAVBAR STYLES (GLOBAL, RESPONSIVE) */}
        <style>{`
          /* =========================
            SHARED BUTTON STYLE
            Used by Navbar + Footer
            ========================= */
          .ui-btn {
            padding: 8px 16px;
            border-radius: 8px;
            background: #f5f5f5;
            color: #333;
            display: inline-block;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            text-decoration: none;
            border: 1px solid #ddd;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .ui-btn:hover {
            background: #000;
            color: #fff;
            border-color: #000;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          }

          .ui-btn:active {
            transform: scale(0.97);
          }

          /* Mobile */
          @media (max-width: 600px) {
            .ui-btn {
              padding: 6px 12px;
              font-size: 13px;
            }
          }
        `}</style>

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main style={{ minHeight: "100vh" }}>
          {children}
          {/* FOOTER */}
          <Footer />
        </main>
      </body>
    </html>
  );
}