import type { Metadata } from "next";
import FeaturesHeroSection from "@/app/components/features/FeaturesHeroSection";
import VideoDemosSection from "@/app/components/home/VideoDemosSection";

export const metadata: Metadata = {
  title: "Tutorials | Smart Billing Lite",
  description: "Watch step-by-step video tutorials for billing, payments, reports, and business growth with Smart Billing Lite.",
};

export default function TutorialPage() {
  return (
    <main className="flex-1 bg-paper">
      <FeaturesHeroSection />
      <VideoDemosSection />
    </main>
  );
}
