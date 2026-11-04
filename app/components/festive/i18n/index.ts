import type { Metadata } from "next";
import { en, type FestiveDict } from "./en";
import { hi } from "./hi";
import { bn } from "./bn";
import { mr } from "./mr";
import { gu } from "./gu";
import { ta } from "./ta";
import { te } from "./te";
import { kn } from "./kn";
import { LOCALES, SITE_URL, festivePath, type FestiveLocale } from "./locales";

// Imported only by the (server) page components, so all eight dictionaries stay on the server; client
// components receive just their own section of the current language as props.
const dictionaries: Record<FestiveLocale, FestiveDict> = { en, hi, bn, mr, gu, ta, te, kn };

export function getDictionary(locale: FestiveLocale): FestiveDict {
  return dictionaries[locale];
}

/** Page metadata for one language, with hreflang alternates for every language (x-default → English). */
export function festiveMetadata(locale: FestiveLocale): Metadata {
  const { title, description } = dictionaries[locale].meta;
  const url = `${SITE_URL}${festivePath(locale)}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l.code, `${SITE_URL}${festivePath(l.code)}`])),
        "x-default": `${SITE_URL}${festivePath("en")}`,
      },
    },
    openGraph: { title, description, url, locale: locale === "en" ? "en_IN" : `${locale}_IN`, images: ["/hero-bg.png"] },
  };
}

export type { FestiveDict } from "./en";
export * from "./locales";
