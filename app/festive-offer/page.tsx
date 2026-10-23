import type { Metadata } from "next";
import FestiveHero from "@/app/components/festive/FestiveHero";
import FestiveBenefits from "@/app/components/festive/FestiveBenefits";
import FestiveOffer from "@/app/components/festive/FestiveOffer";
import FestiveVideo from "@/app/components/festive/FestiveVideo";
import FestiveCta from "@/app/components/festive/FestiveCta";
import MobileCtaBar from "@/app/components/festive/MobileCtaBar";

const title = "Festival Offer | Smart Billing Lite";
const description =
  "Festival yearly pricing for Smart Billing Lite: ₹400/month per user, compared with the ₹800 monthly plan.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/hero-bg.png"] },
};

export default function FestiveOfferPage() {
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
