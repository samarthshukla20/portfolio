import "./globals.css";

export const metadata = {
  title: "Samarth Shukla | Portfolio",
  description: "AI/ML Engineer & Full-Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We removed Next.js default font classes here to keep it pure brutalist */}
      <body>{children}</body>
    </html>
  );
}