interface JsonLdProps {
  data: {
    seo?: { metaTitle?: string; metaDescription?: string; canonicalUrl?: string } | null;
    geo?: { aiSummary?: unknown; faqs?: { question: string; answer?: unknown }[] } | null;
    aeo?: { enableAEO?: boolean; schemaType?: string; headline?: string; description?: string; url?: string; image?: string | null; faqItems?: { question: string; answer?: string }[] } | null;
  } | null;
}

function richText(value: unknown): string | undefined {
  if (typeof value === "string") {
    try { return richText(JSON.parse(value)); } catch { return value; }
  }
  if (Array.isArray(value)) return value.map(richText).filter(Boolean).join(" ");
  if (value && typeof value === "object" && "children" in value) return richText((value as { children?: unknown }).children);
  if (value && typeof value === "object" && "text" in value) return String((value as { text?: unknown }).text ?? "");
  return undefined;
}

export default function JsonLd({ data }: JsonLdProps) {
  const seo = data?.seo;
  const geo = data?.geo;
  const aeo = data?.aeo;
  const description = richText(geo?.aiSummary) || aeo?.description || seo?.metaDescription;
  const faqItems = aeo?.faqItems?.length ? aeo.faqItems : geo?.faqs;
  const schemas: Record<string, unknown>[] = [
    { "@context": "https://schema.org", "@type": "WebSite", name: seo?.metaTitle, description: seo?.metaDescription, url: seo?.canonicalUrl },
    { "@context": "https://schema.org", "@type": "Organization", name: "Smart Billing Lite", url: seo?.canonicalUrl, description: seo?.metaDescription },
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Smart Billing Lite", applicationCategory: "BusinessApplication", operatingSystem: "Web", description, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems?.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : richText(faq.answer) || "" } })) || [] },
  ];
  if (aeo?.enableAEO) schemas.push({ "@context": "https://schema.org", "@type": aeo.schemaType || "SoftwareApplication", name: aeo.headline || seo?.metaTitle, headline: aeo.headline, description: aeo.description || description, url: aeo.url || seo?.canonicalUrl, image: aeo.image || undefined });
  return <>{schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}</>;
}
