import type { Metadata } from "next";
import { FeaturesPage } from "../../LandingPages";
import { getPageMeta } from "@/lib/strapi";

const FEATURE_PAGE_POPULATE = "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[featureGroups][populate][items][populate]=*&populate[hardware][populate][items][populate]=*&populate[highlights][populate][aiItems][populate]=*&populate[highlights][populate][businessItems]=*&populate[workspace][populate][cards][populate][features]=*";

export const metadata: Metadata = {
  title: "Smart Billing Lite Features",
  description: "Discover Smart Billing Lite features for fast billing, QR payments, udhaar tracking, and business reporting.",
};

export default async function SmartBillingLiteFeaturesRoute() {
  const featurePage = await getPageMeta("feature-page", FEATURE_PAGE_POPULATE);
  return (
    <>
      <FeaturesPage featurePage={featurePage} />
    </>
  );
}
