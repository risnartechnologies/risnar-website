import "./globals.css";
import AnimatedBackground from "./components/Animated_Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeadFormModal from "@/app/components/LeadFormModal";

export const metadata = {
  title: "Risnar Technologies",
  description: "Portfolio of apps by Risnar Technologies",
};

/* =========================
   ROOT LAYOUT (SERVER COMPONENT)
   - Global layout wrapper
   - Loads globals.css
   - Navbar + Footer persistent
   - Responsive-safe styles
   - Allows global background from CSS
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
          background: "transparent",
        }}
      >
        {/* =========================
            GLOBAL BUTTON STYLES
           ========================= */}
        <style>{`
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

          @media (max-width: 600px) {
            .ui-btn {
              padding: 6px 12px;
              font-size: 13px;
            }
          }
        `}</style>

      <AnimatedBackground />

      {/* NAVBAR */}
      <Navbar />

      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "90px",
          zIndex: 999,
        }}
      >
        <LeadFormModal />
      </div>

      {children}

      <Footer />
      </body>
    </html>
  );
}