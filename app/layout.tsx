import type { Metadata } from "next";
import ConditionalFooter from "./ConditionalFooter";
import Navbar from "./Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Billing Lite",
  description: "AI powered billing app for small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
