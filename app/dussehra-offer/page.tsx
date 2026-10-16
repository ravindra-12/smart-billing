import type { Metadata } from "next";
import FestiveHero from "@/app/components/festive/FestiveHero";
import FestiveBenefits from "@/app/components/festive/FestiveBenefits";
import FestiveOffer from "@/app/components/festive/FestiveOffer";
import FestiveVideo from "@/app/components/festive/FestiveVideo";
import FestiveCta from "@/app/components/festive/FestiveCta";
import MobileCtaBar from "@/app/components/festive/MobileCtaBar";

const title = "Dussehra Bumper Offer: Smart Billing Lite + Thermal Printer at ₹6,500";
const description =
  "AI-powered mobile billing for shops and small businesses. 13 months of Smart Billing Lite with a mobile thermal printer for ₹6,500, plus a 5-day free trial.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/hero-bg.png"] },
};

export default function DussehraOfferPage() {
  return (
    <main className="festive flex-1 bg-festive-bg">
      <FestiveHero />
      <FestiveBenefits />
      <FestiveOffer />
      <FestiveVideo />
      <FestiveCta />
      <MobileCtaBar />
    </main>
  );
}
