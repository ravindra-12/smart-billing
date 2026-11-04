import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FestivePage from "@/app/components/festive/FestivePage";
import { DEFAULT_LOCALE, LOCALES, festiveMetadata, isFestiveLocale } from "@/app/components/festive/i18n";

type Params = { params: Promise<{ lang: string }> };

// Every translated language is prerendered; any other code (including "en", which lives at /festive-offer) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.filter((l) => l.code !== DEFAULT_LOCALE).map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  return isFestiveLocale(lang) ? festiveMetadata(lang) : {};
}

export default async function LocalizedFestiveOfferPage({ params }: Params) {
  const { lang } = await params;
  if (!isFestiveLocale(lang) || lang === DEFAULT_LOCALE) notFound();
  return <FestivePage locale={lang} />;
}
