import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The AI Assistant That Already Knows You | Second",
  description: "Automate your calendar, DMs, ordering, and mental load — all from Slack. An intelligent executive assistant that learns how you work.",
  keywords: ["AI assistant", "Slack bot", "executive assistant", "calendar automation", "productivity"],
  authors: [{ name: "Second" }],
  creator: "Second",
  openGraph: {
    title: "The AI Assistant That Already Knows You",
    description: "Automate your calendar, DMs, ordering, and mental load — all from Slack.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Assistant That Already Knows You",
    description: "Automate your calendar, DMs, ordering, and mental load — all from Slack.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-body antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
