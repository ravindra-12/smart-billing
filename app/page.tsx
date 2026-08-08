import type { Metadata } from "next";
import LandingPages from "./LandingPages";
import { getHomeMeta } from "../lib/strapi";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const homeMeta = await getHomeMeta();

  if (!homeMeta?.seo) {
    return {
      title: "Smart Billing Lite",
      description: "AI-powered billing app for small business vendors.",
      openGraph: {
        title: "Smart Billing Lite",
        description: "AI-powered billing app for small business vendors.",
        url: "https://smartbillinglite.com",
        images: [],
      },
    };
  }

  return {
    title: homeMeta.seo.metaTitle,
    description: homeMeta.seo.metaDescription,
    openGraph: {
      title: homeMeta.seo.metaTitle,
      description: homeMeta.seo.metaDescription,
      url: homeMeta.seo.canonicalUrl,
      images: homeMeta.seo.shareImage?.url ? [homeMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function HomeRoute() {
  const homeMeta = await getHomeMeta();

  return <LandingPages homeMeta={homeMeta} />;
}
