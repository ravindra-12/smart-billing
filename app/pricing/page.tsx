import type { Metadata } from "next";
import DownloadApkPromo from "../DownloadApkPromo";
import { PricingPage } from "../LandingPages";

export const metadata: Metadata = {
  title: "Pricing | Smart Billing Lite",
  description: "Compare Smart Billing Lite plans and choose the best pricing for your business.",
};

export default function PricingRoute() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <PricingPage />
      <DownloadApkPromo />
    </div>
  );
}
