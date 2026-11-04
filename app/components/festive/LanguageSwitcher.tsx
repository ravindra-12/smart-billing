import Link from "next/link";
import { Check, ChevronDown, Languages } from "lucide-react";
import { LOCALES, festivePath, localeInfo, type FestiveLocale } from "./i18n/locales";

/**
 * Language menu for the festival page: a native <details> dropdown (works without JavaScript), listing each
 * language in its own script with the English name beside it. Each entry is a real link to that language's URL.
 */
export default function LanguageSwitcher({ locale, label }: { locale: FestiveLocale; label: string }) {
  return (
    <details className="group relative">
      <summary
        aria-label={`${label}: ${localeInfo(locale).name}`}
        className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 sm:px-4 text-sm font-bold text-white transition-colors hover:border-festive-gold hover:text-festive-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-festive-gold group-open:border-festive-gold [&::-webkit-details-marker]:hidden"
      >
        <Languages size={16} aria-hidden />
        {localeInfo(locale).name}
        <ChevronDown size={15} aria-hidden className="max-[380px]:hidden transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <ul className="absolute top-full right-0 z-30 mt-2 w-52 overflow-hidden rounded-2xl border border-festive-gold/40 bg-white p-1.5 text-left text-festive-navy shadow-2xl shadow-black/40">
        {LOCALES.map((l) => {
          const current = l.code === locale;
          return (
            <li key={l.code}>
              <Link
                href={festivePath(l.code)}
                hrefLang={l.code}
                lang={l.code}
                aria-current={current ? "page" : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[15px] transition-colors ${
                  current ? "bg-festive-gold/20 font-extrabold" : "font-semibold hover:bg-festive-bg"
                }`}
              >
                <span>{l.name}</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-festive-navy/50" lang="en">
                  {l.english}
                  {current && <Check size={14} strokeWidth={3} className="text-festive-success" aria-hidden />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
