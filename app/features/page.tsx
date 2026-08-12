import type { Metadata } from "next";
import DownloadApkPromo from "../DownloadApkPromo";
import { FeaturesPage } from "../LandingPages";
import JsonLd from "../components/JsonLd";
import { getPageMeta } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const featureMeta = await getPageMeta("feature-meta");

  if (!featureMeta?.seo) {
    return {
      title: "Features | Smart Billing Lite",
      description: "Explore Smart Billing Lite features for billing, payments, reports, and business growth.",
    };
  }

  return {
    title: featureMeta.seo.metaTitle,
    description: featureMeta.seo.metaDescription,
    openGraph: {
      title: featureMeta.seo.metaTitle,
      description: featureMeta.seo.metaDescription,
      url: featureMeta.seo.canonicalUrl,
      images: featureMeta.seo.shareImage?.url ? [featureMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function FeaturesRoute() {
  const featureMeta = await getPageMeta("feature-meta");

  return (
    <>
      <JsonLd data={featureMeta} />
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <FeaturesPage />
        <DownloadApkPromo />
      </div>
    </>
  );
}
