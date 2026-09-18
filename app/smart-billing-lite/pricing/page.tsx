import type { Metadata } from "next";
import { PricingPage } from "../../LandingPages";
import JsonLd from "../../components/JsonLd";
import { getPageMeta } from "@/lib/strapi";

const PRICING_PAGE_POPULATE = "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[plans][populate][plans][populate][features]=*&populate[plans][populate][trustItems]=*&populate[steps][populate][steps]=*&populate[bottom][populate]=*&populate[workspace][populate][cards][populate][features]=*";

export const metadata: Metadata = {
  title: "Smart Billing Lite Pricing",
  description: "Compare Smart Billing Lite plans and choose the right pricing for your business.",
};

export default async function SmartBillingLitePricingRoute() {
  const pricingPage = await getPageMeta("pricing-page", PRICING_PAGE_POPULATE);
  return (
    <>
      <JsonLd data={pricingPage} />
      <PricingPage pricingPage={pricingPage} />
    </>
  );
}
