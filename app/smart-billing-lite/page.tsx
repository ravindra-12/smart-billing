import type { Metadata } from "next";
import LandingPages from "../LandingPages";
import { getHomeMeta } from "../../lib/strapi";

export const metadata: Metadata = {
  title: "Smart Billing Lite",
  description: "AI-powered billing app for small business vendors and stores.",
};

export default async function SmartBillingLiteRoute() {
  const homeMeta = await getHomeMeta();
  return <LandingPages homeMeta={homeMeta} />;
}
