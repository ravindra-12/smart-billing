import { Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Gujarati, Noto_Sans_Kannada, Noto_Sans_Tamil, Noto_Sans_Telugu } from "next/font/google";
import type { FestiveLocale } from "./locales";

// Script fonts for the Indian languages. Inter (the site font) only covers Latin, so each language page sets
// --font-script to its Noto Sans; `.festive` lists it right after Inter, so Latin text, digits and ₹ keep Inter
// and the script falls through to Noto. preload: false, plus the per-script unicode-range, means a visitor only
// downloads the font for the language they are reading. (next/font needs each call's options as a literal object.)
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-script", display: "swap", preload: false });
const bengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-script", display: "swap", preload: false });
const gujarati = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--font-script", display: "swap", preload: false });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-script", display: "swap", preload: false });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-script", display: "swap", preload: false });
const kannada = Noto_Sans_Kannada({ subsets: ["kannada"], variable: "--font-script", display: "swap", preload: false });

export const scriptFontClass: Record<FestiveLocale, string> = {
  en: "",
  hi: devanagari.variable,
  mr: devanagari.variable,
  bn: bengali.variable,
  gu: gujarati.variable,
  ta: tamil.variable,
  te: telugu.variable,
  kn: kannada.variable,
};
