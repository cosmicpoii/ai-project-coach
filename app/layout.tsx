import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Project Coach",
  description: "Turn any job description into a portfolio-ready project plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
