import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/blog";
import { getDynamicPages } from "@/lib/dynamicPages";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://smartbillinglite.in").replace(/\/$/, "");

const STATIC_ROUTES = [
  "/",
  "/smart-billing-lite",
  "/smart-billing-lite/features",
  "/smart-billing-lite/pricing",
  "/features",
  "/pricing",
  "/tutorial",
  "/about-us",
  "/contact-us",
  "/download",
  "/blog",
  "/dynamic-pages",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-cancellation-policy",
  "/shipping-delivery-policy",
  "/smart-billing-lite-affiliate-program",
] as const;

function lastmodToIso(value?: string | null) {
  if (!value) return undefined;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;

  return parsed.toISOString();
}

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, dynamicPages] = await Promise.all([getPosts(), getDynamicPages()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post?.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: lastmodToIso((post as any).updatedAt || (post as any).publishedAt || undefined),
    }));

  const dynamicEntries: MetadataRoute.Sitemap = dynamicPages
    .filter((page) => page?.slug)
    .map((page) => ({
      url: `${SITE_URL}/dynamic-pages/${page.slug}`,
      lastModified: lastmodToIso((page as any).updatedAt || (page as any).publishedAt || undefined),
    }));

  return [...staticEntries, ...blogEntries, ...dynamicEntries];
}
