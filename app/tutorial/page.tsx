import type { Metadata } from "next";
import FeaturesHeroSection from "@/app/components/features/FeaturesHeroSection";
import VideoDemosSection from "@/app/components/home/VideoDemosSection";
import JsonLd from "../components/JsonLd";
import { getPageMeta } from "@/lib/strapi";

const TUTORIAL_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[videos][populate][videos][populate]=*&populate[workspace][populate][cards][populate][features]=*";

export async function generateMetadata(): Promise<Metadata> {
  const tutorialMeta = await getPageMeta("tutorial", TUTORIAL_PAGE_POPULATE);

  if (!tutorialMeta?.seo) {
    return {
      title: "Tutorials | Smart Billing Lite",
      description:
        "Watch step-by-step video tutorials for billing, payments, reports, and business growth with Smart Billing Lite.",
    };
  }

  return {
    title: tutorialMeta.seo.metaTitle,
    description: tutorialMeta.seo.metaDescription,
    openGraph: {
      title: tutorialMeta.seo.metaTitle,
      description: tutorialMeta.seo.metaDescription,
      url: tutorialMeta.seo.canonicalUrl,
      images: tutorialMeta.seo.shareImage?.url ? [tutorialMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function TutorialPage() {
  const tutorialMeta = await getPageMeta("tutorial", TUTORIAL_PAGE_POPULATE);

  return (
    <main className="flex-1 bg-paper">
      <JsonLd data={tutorialMeta} />
      <FeaturesHeroSection />
      <VideoDemosSection />
    </main>
  );
}
