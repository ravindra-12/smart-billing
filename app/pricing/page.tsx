import type { Metadata } from "next";
import DownloadApkPromo from "../DownloadApkPromo";
import { PricingPage } from "../LandingPages";
import JsonLd from "../components/JsonLd";
import { getPageMeta } from "@/lib/strapi";

const PRICING_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[plans][populate][plans][populate][features]=*&populate[plans][populate][trustItems]=*&populate[steps][populate][steps]=*&populate[bottom][populate]=*&populate[workspace][populate][cards][populate][features]=*";

export async function generateMetadata(): Promise<Metadata> {
  const pricingMeta = await getPageMeta("pricing-page", PRICING_PAGE_POPULATE);

  if (!pricingMeta?.seo) {
    return {
      title: "Pricing | Smart Billing Lite",
      description: "Compare Smart Billing Lite plans and choose the best pricing for your business.",
    };
  }

  return {
    title: pricingMeta.seo.metaTitle,
    description: pricingMeta.seo.metaDescription,
    openGraph: {
      title: pricingMeta.seo.metaTitle,
      description: pricingMeta.seo.metaDescription,
      url: pricingMeta.seo.canonicalUrl,
      images: pricingMeta.seo.shareImage?.url ? [pricingMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function PricingRoute() {
  const pricingMeta = await getPageMeta("pricing-page", PRICING_PAGE_POPULATE);

  return (
    <>
      <JsonLd data={pricingMeta} />
      <PricingPage />
      <DownloadApkPromo />
    </>
  );
}
