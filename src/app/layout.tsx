import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Saumok Kundu — The Architect of Intelligence",
  description:
    "AI/ML Architect · IoT Developer · Full-Stack Engineer. A cinematic interactive portfolio — 7 shipped projects, international experience, and gamified exploration.",
  keywords: [
    "Saumok Kundu",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "IoT Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Saumok Kundu — The Architect of Intelligence",
    description:
      "A cinematic interactive portfolio. Enter the system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
