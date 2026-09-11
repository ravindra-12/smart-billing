import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import ConditionalFooter from "./ConditionalFooter";
import Navbar from "./Navbar";
import { getDynamicPages } from "../lib/dynamicPages";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Smart Billing Lite",
  description: "AI powered billing app for small businesses.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dynamicPages = await getDynamicPages();

  return (
    <html lang="en" className={`h-full antialiased ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        <Navbar dynamicPages={dynamicPages} />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
