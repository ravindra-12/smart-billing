/** Languages of the festival campaign page. English is the default and lives at /festive-offer. */
export const LOCALES = [
  { code: "en", name: "English", english: "English" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "mr", name: "मराठी", english: "Marathi" },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada" },
] as const;

export type FestiveLocale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: FestiveLocale = "en";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://smartbillinglite.in").replace(/\/$/, "");

export function isFestiveLocale(value: string): value is FestiveLocale {
  return LOCALES.some((l) => l.code === value);
}

/** Path of the campaign page in a language: /festive-offer for English, /festive-offer/<code> otherwise. */
export function festivePath(locale: FestiveLocale) {
  return locale === DEFAULT_LOCALE ? "/festive-offer" : `/festive-offer/${locale}`;
}

export function localeInfo(locale: FestiveLocale) {
  return LOCALES.find((l) => l.code === locale)!;
}
