import type { Metadata } from "next";
import DownloadApkPromo from "../../DownloadApkPromo";
import { FeaturesPage } from "../../LandingPages";

export const metadata: Metadata = {
  title: "Smart Billing Lite Features",
  description: "Discover Smart Billing Lite features for fast billing, QR payments, udhaar tracking, and business reporting.",
};

export default function SmartBillingLiteFeaturesRoute() {
  return (
    <>
      <FeaturesPage />
      <DownloadApkPromo />
    </>
  );
}
