import "./globals.css";

export const metadata = {
  title: "Risnar Technologies",
  description:
    "Portfolio, app development, website development, AI solutions and SEO services by Risnar Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}