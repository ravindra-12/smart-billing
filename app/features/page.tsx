import type { Metadata } from "next";
import DownloadApkPromo from "../DownloadApkPromo";
import { FeaturesPage } from "../LandingPages";

export const metadata: Metadata = {
  title: "Features | Smart Billing Lite",
  description: "Explore Smart Billing Lite features for billing, payments, reports, and business growth.",
};

export default function FeaturesRoute() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <FeaturesPage />
      <DownloadApkPromo />
    </div>
  );
}
