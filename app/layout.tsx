import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import ConditionalFooter from "./ConditionalFooter";
import Navbar from "./Navbar";
import { LocaleProvider } from "./context/LocaleContext";
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
  icons: {
    icon: "/Smart_Billing_Lite_Logo.png",
    shortcut: "/Smart_Billing_Lite_Logo.png",
    apple: "/Smart_Billing_Lite_Logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <Navbar />
          {children}
          <ConditionalFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
