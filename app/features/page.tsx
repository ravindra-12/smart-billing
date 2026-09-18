import type { Metadata } from "next";
import { FeaturesPage } from "../LandingPages";
import JsonLd from "../components/JsonLd";
import { getPageMeta } from "@/lib/strapi";

const FEATURE_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[featureGroups][populate][items][populate]=*&populate[hardware][populate][items][populate]=*&populate[highlights][populate][aiItems][populate]=*&populate[highlights][populate][businessItems]=*&populate[workspace][populate][cards][populate][features]=*";

export async function generateMetadata(): Promise<Metadata> {
  const featureMeta = await getPageMeta("feature-page", FEATURE_PAGE_POPULATE);

  if (!featureMeta?.seo) {
    return {
      title: "Features | Smart Billing Lite",
      description: "Explore Smart Billing Lite features for billing, payments, reports, and business growth.",
    };
  }

  return {
    title: featureMeta.seo.metaTitle,
    description: featureMeta.seo.metaDescription,
    keywords: featureMeta.seo.keywords,
    alternates: featureMeta.seo.canonicalUrl
      ? { canonical: featureMeta.seo.canonicalUrl }
      : undefined,
    openGraph: {
      title: featureMeta.seo.metaTitle,
      description: featureMeta.seo.metaDescription,
      url: featureMeta.seo.canonicalUrl,
      images: featureMeta.seo.shareImage?.url ? [featureMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function FeaturesRoute() {
  const featureMeta = await getPageMeta("feature-page", FEATURE_PAGE_POPULATE);

  return (
    <>
      <JsonLd data={featureMeta} />
      <FeaturesPage featurePage={featureMeta} />
    </>
  );
}
