import FestiveHero from "./FestiveHero";
import FestiveBenefits from "./FestiveBenefits";
import FestiveOffer from "./FestiveOffer";
import FestiveVideo from "./FestiveVideo";
import FestiveCta from "./FestiveCta";
import MobileCtaBar from "./MobileCtaBar";
import { SectionWave } from "./Decorations";
import { getDictionary, type FestiveLocale } from "./i18n";
import { scriptFontClass } from "./i18n/fonts";

/** The festival campaign page in one language (/festive-offer for English, /festive-offer/<code> otherwise). */
export default function FestivePage({ locale }: { locale: FestiveLocale }) {
  const t = getDictionary(locale);
  // `lang` on <main> (the root layout's <html> stays "en") so browsers, screen readers and search engines read
  // the page in its own language; `festive-script` turns off letter-spacing for Indian scripts.
  const script = locale === "en" ? "" : `festive-script ${scriptFontClass[locale]}`;

  return (
    <main lang={locale} className={`festive flex-1 bg-festive-bg ${script}`}>
      <FestiveHero t={t.hero} locale={locale} languageLabel={t.languageLabel} />
      <FestiveBenefits t={t.benefits} />
      <SectionWave color="#ffffff" diya="left" />
      <FestiveOffer t={t.offer} />
      <SectionWave color="#f7f9fd" diya="right" />
      <FestiveVideo t={t.video} />
      <SectionWave color="#ffffff" />
      <FestiveCta t={t.cta} locale={locale} />
      <MobileCtaBar t={t.mobile} />
    </main>
  );
}
