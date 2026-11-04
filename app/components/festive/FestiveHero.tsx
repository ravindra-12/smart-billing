import Link from "next/link";
import { ArrowUpRight, Check, FileDown, Sparkles } from "lucide-react";
import Container from "@/app/components/ui/Container";
import BrandLogo from "@/app/components/BrandLogo";
import TrackedLink from "./TrackedLink";
import { BROCHURE_URL, WHATSAPP_URL, btn, goldText, nightBg } from "./campaign";
import RazorpayPaymentButton from "./RazorpayPaymentButton";
import FestiveSceneLoader from "./FestiveSceneLoader";
import { Burst, Lanterns, Laurel, RangoliDiya, StringLights, Toran } from "./Decorations";
import LanguageSwitcher from "./LanguageSwitcher";
import type { FestiveDict, FestiveLocale } from "./i18n";

export default function FestiveHero({ t, locale, languageLabel }: { t: FestiveDict["hero"]; locale: FestiveLocale; languageLabel: string }) {
  return (
    <section className="relative isolate overflow-clip text-white">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: nightBg }} />
      {/* Decorations start below the top bar (~4rem tall) and the toran hanging from it. Lanterns hang over the
          3D scene's column, never over the text; the left pair only appears on very wide screens, where the page
          margin beside the content can hold it. */}
      <StringLights className="absolute inset-x-0 top-28 -z-10 h-14 w-full sm:top-32 sm:h-20" />
      <Lanterns className="absolute top-16 right-[2%] -z-10 hidden h-48 w-32 -scale-x-100 lg:block xl:h-56 xl:w-36" />
      <Lanterns className="absolute top-16 left-0 -z-10 hidden h-64 w-40 min-[1700px]:block" />
      <Burst className="absolute top-36 right-4 -z-10 size-20 sm:right-10 sm:size-28 lg:right-[24%] lg:size-32" />
      <Burst className="absolute top-56 right-[38%] -z-10 hidden size-14 lg:block" color="#ff7ac6" delay={1.3} />
      <Burst className="absolute top-44 left-4 -z-10 size-14 sm:left-10 lg:hidden" color="#7dd3fc" delay={2.2} />
      <RangoliDiya className="absolute -bottom-20 -left-20 size-72 sm:-bottom-28 sm:-left-28 sm:size-96" />
      <RangoliDiya className="absolute -right-28 -bottom-28 hidden size-96 md:block" />

      {/* Campaign top bar: logo left; brochure download and language menu right. The toran hangs from its edge. */}
      <div className="relative z-20 border-b border-festive-gold/40 bg-[#050f29]/75 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md">
        <Container className="flex items-center justify-between gap-3 py-3">
          <Link href="/" aria-label="Smart Billing Lite home" className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-festive-gold">
            <BrandLogo size={34} showText={false} className="sm:hidden" />
            <BrandLogo
              size={38}
              className="max-sm:hidden"
              textClassName="text-white"
              subtitleClassName="text-white/55"
            />
          </Link>
          <div className="flex items-center gap-2">
            <TrackedLink
              href={BROCHURE_URL}
              download="Smart-Billing-Lite-Brochure.pdf"
              event="brochure_downloaded"
              label={t.brochureLabel}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffe08a_0%,#f2b84b_55%,#d9921f_100%)] px-3 sm:px-4 text-sm font-extrabold text-festive-navy shadow-[0_6px_16px_-8px_rgb(242_184_75/0.9),inset_0_1px_0_rgb(255_255_255/0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-festive-gold"
            >
              <FileDown size={17} aria-hidden />
              <span className="sm:hidden">{t.brochureShort}</span>
              <span className="max-sm:hidden">{t.brochure}</span>
            </TrackedLink>
            <LanguageSwitcher locale={locale} label={languageLabel} />
          </div>
        </Container>
        <Toran className="absolute inset-x-0 top-full" count={30} />
      </div>

      <Container className="relative grid items-center gap-x-10 gap-y-10 pt-20 pb-24 sm:pt-24 md:pb-28 lg:grid-cols-[1.05fr_1fr] xl:gap-x-14">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-festive-gold/50 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-festive-gold">
            <Sparkles size={13} />
            {t.eyebrow}
          </p>

          {/* Indian scripts need more line height for vowel signs above and below the line. */}
          <h1
            className={`mt-6 text-[2.25rem] font-extrabold tracking-tight text-balance min-[400px]:text-4xl sm:text-5xl lg:text-[3.1rem] xl:text-6xl ${
              locale === "en" ? "leading-[1.08]" : "leading-[1.3]"
            }`}
          >
            {t.title}
            <br />
            <span className={goldText}>{t.titleAccent}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:mx-0">{t.description}</p>

          {/* Gold festival price plaque */}
          <div className="relative mx-auto mt-12 max-w-md lg:mx-0">
            <p
              className="absolute -top-5 left-1/2 z-10 max-w-[92%] -translate-x-1/2 truncate px-8 py-2 text-sm font-extrabold text-white italic shadow-[0_8px_18px_-8px_rgb(0_0_0/0.6)] [clip-path:polygon(0_0,100%_0,95%_50%,100%_100%,0_100%,5%_50%)]"
              style={{ background: "linear-gradient(180deg, #e3262f, #9b0f19)" }}
            >
              {t.discount}
            </p>
            <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-[26px] border-2 border-[#ffe9a8] bg-[linear-gradient(180deg,#fff6d8_0%,#f9d67e_45%,#e3a52e_100%)] px-3 pt-8 pb-5 text-center text-festive-navy shadow-[0_22px_44px_-18px_rgb(242_184_75/0.75),inset_0_2px_0_rgb(255_255_255/0.75)]">
              <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-[20px] border border-[#b8801a]/40" />
              {/* Laurels are flex items beside the price, so the price can never run under them. */}
              <Laurel className="h-20 shrink-0" />
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline justify-center gap-x-3 leading-none">
                  <span className="text-5xl font-black tracking-tight whitespace-nowrap [text-shadow:0_2px_0_rgb(255_255_255/0.55)] sm:text-6xl">₹6,500</span>
                  <s className="text-lg font-bold text-festive-navy/50">
                    <span className="sr-only">{t.regularPrice} </span>₹12,000
                  </s>
                </p>
                <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#5a2a00] sm:text-xs">{t.bundleDetails}</p>
              </div>
              <Laurel flip className="h-20 shrink-0" />
              <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-gleam bg-linear-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {t.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/90"
              >
                <Check size={14} strokeWidth={3} className="text-festive-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <TrackedLink href={WHATSAPP_URL} event="offer_clicked" interest="lite" className={`${btn.base} ${btn.green}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.whatsapp}
              <ArrowUpRight size={18} />
            </TrackedLink>
            <RazorpayPaymentButton />
          </div>

          <p className="mt-5 text-sm font-medium text-white/60">{t.footnote}</p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <FestiveSceneLoader imageAlt={t.imageAlt} />
        </div>
      </Container>

      {/* Gold edge into the white section below */}
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14">
        <path d="M0 40 Q 360 6 720 30 T 1440 22 V 60 H 0 Z" fill="#fff" />
        <path d="M0 40 Q 360 6 720 30 T 1440 22" fill="none" stroke="#f2b84b" strokeWidth="3" />
      </svg>
    </section>
  );
}
