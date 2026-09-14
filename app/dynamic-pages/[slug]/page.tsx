import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDynamicPage, getDynamicPages, type DynamicBlock } from "../../../lib/dynamicPages";
import DynamicHeroBlock from "@/app/components/dynamic/DynamicHeroBlock";
import DynamicVideoBlock from "@/app/components/dynamic/DynamicVideoBlock";
import DynamicIntroBlock from "@/app/components/dynamic/DynamicIntroBlock";
import DynamicFeatureGridBlock from "@/app/components/dynamic/DynamicFeatureGridBlock";
import DynamicCtaBannerBlock from "@/app/components/dynamic/DynamicCtaBannerBlock";
import DynamicFaqBlock from "@/app/components/dynamic/DynamicFaqBlock";

export const dynamic = "force-dynamic";

function Block({ block }: { block: DynamicBlock }) {
  switch (block.__component) {
    case "shared.dynamic-page-hero":
      return <DynamicHeroBlock block={block} />;
    case "shared.dynamic-page-video-section":
      return <DynamicVideoBlock block={block} />;
    case "shared.dynamic-page-intro":
      return <DynamicIntroBlock block={block} />;
    case "shared.dynamic-page-feature-grid":
      return <DynamicFeatureGridBlock block={block} />;
    case "shared.dynamic-page-cta-banner":
      return <DynamicCtaBannerBlock block={block} />;
    case "shared.dynamic-page-faq-section":
      return <DynamicFaqBlock block={block} />;
    default:
      return null;
  }
}

export async function generateStaticParams() {
  const pages = await getDynamicPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = await getDynamicPage((await params).slug);
  return { title: page?.seo?.metaTitle || page?.title || "Page | Smart Billing Lite", description: page?.seo?.metaDescription };
}

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = await getDynamicPage((await params).slug);
  if (!page) notFound();

  return (
    <main className="flex-1 bg-paper">
      {(page.blocks || []).map((block, index) => (
        // Strapi component ids are only unique within their own component type, so a
        // page mixing block types can repeat the same id — key on position plus type instead.
        <Block key={`${index}-${block.__component}`} block={block} />
      ))}
    </main>
  );
}
