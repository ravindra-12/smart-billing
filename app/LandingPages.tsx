"use client";
import type { MouseEvent } from "react";
import DownloadApkPromo from "./DownloadApkPromo";
import JsonLd from "../app/components/JsonLd";
import { useHomeData } from "./hooks/useHomeData";
import { useLocale } from "./context/LocaleContext";
import HeroSection from "./components/home/HeroSection";
import VideoDemosSection from "./components/home/VideoDemosSection";
import BusinessTypeSection from "./components/home/BusinessTypeSection";
import WhyChooseSection from "./components/home/WhyChooseSection";
import ApkDownloadSection from "./components/home/ApkDownloadSection";
import StatsSection from "./components/home/StatsSection";
import PricingHeroSection from "./components/pricing/PricingHeroSection";
import PricingPlansSection from "./components/pricing/PricingPlansSection";
import PricingStepsSection from "./components/pricing/PricingStepsSection";
import PricingBottomSection from "./components/pricing/PricingBottomSection";
import PricingCtaSection from "./components/pricing/PricingCtaSection";
import FeaturesHeroSection from "./components/features/FeaturesHeroSection";
import FeaturesListSection from "./components/features/FeaturesListSection";
import HardwareSection from "./components/features/HardwareSection";
import HighlightsSection from "./components/features/HighlightsSection";

// Smooth-scroll helper for hash links (works in SPA)
const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    const el = document.getElementById("download-apk");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // update URL hash without reloading
      history.replaceState(null, "", "#download-apk");
    }
  } catch {
    // no-op
  }
};
// ─── Header ───────────────────────────────────────────────────────────────────

export function LegacyHeader({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Features", key: "features" },
    { label: "Pricing", key: "pricing" },
  ];

  return (
     <header style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid #e2e8f0",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
      }}>
        <button onClick={() => setPage("home")} style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: "#2563eb", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20, color: "#fff",
          }}>🧾</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, color: "#0f172a" }}>
              Smart Billing <span style={{ color: "#2563eb" }}>Lite</span>
            </div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>AI Powered Billing App</div>
          </div>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map(link => (
            <button key={link.key} onClick={() => setPage(link.key)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600,
              color: page === link.key ? "#2563eb" : "#334155",
              padding: "4px 0",
              borderBottom: page === link.key ? "2px solid #2563eb" : "2px solid transparent",
            }}>{link.label}</button>
          ))}
          <a href="#download-apk" onClick={scrollToDownload} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#334155",
            textDecoration: "none",
          }}>Login</a>
        </nav>

        <a href="#download-apk" onClick={scrollToDownload} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 12, padding: "10px 20px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          textDecoration: "none",
        }}>Start Free Trial</a>
      </div>
    </header>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export function HomePage({ homeMeta }: { homeMeta: Record<string, unknown> | null }) {
  const { locale } = useLocale();
  const { data } = useHomeData(locale);

  return (
    <main className="bg-paper">
      <JsonLd data={homeMeta} />
      <HeroSection hero={data?.hero} />
      <DownloadApkPromo />
      <VideoDemosSection videos={data?.videos} />
      <BusinessTypeSection businessTypes={data?.businessTypes} />
      <WhyChooseSection whyChoose={data?.whyChoose} />
      <ApkDownloadSection appDownload={data?.appDownload} />
      <StatsSection stats={data?.stats} />
    </main>
  );
}

// ─── Pricing Page ─────────────────────────────────────────────────────────────

export function PricingPage() {
  return (
    <main className="bg-paper">
      <PricingHeroSection />
      <PricingPlansSection />
      <PricingStepsSection />
      <PricingBottomSection />
      <PricingCtaSection />
    </main>
  );
}

// ─── Features Page ────────────────────────────────────────────────────────────

export function FeaturesPage() {
  return (
    <main className="bg-paper">
      <FeaturesHeroSection />
      <FeaturesListSection />
      <HardwareSection />
      <HighlightsSection />
    </main>
  );
}


// ─── Root ─────────────────────────────────────────────────────────────────────

interface LandingPagesProps {
  homeMeta: Record<string, unknown> | null;
}

export default function LandingPages({
  homeMeta,
}: LandingPagesProps) {
  return (
    <>
      <HomePage homeMeta={homeMeta} />
      
    </>
  );
}
