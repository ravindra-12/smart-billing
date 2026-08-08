import type { Metadata } from "next";
import DownloadApkPromo from "../../DownloadApkPromo";
import { PricingPage } from "../../LandingPages";

export const metadata: Metadata = {
  title: "Smart Billing Lite Pricing",
  description: "Compare Smart Billing Lite plans and choose the right pricing for your business.",
};

export default function SmartBillingLitePricingRoute() {
  return (
    <>
      <PricingPage />
      <DownloadApkPromo />
    </>
  );
}
