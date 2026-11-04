import { ArrowUpRight, BadgeCheck, CalendarCheck, Check, ChevronDown, Printer, Sparkles } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { PRO_URL, btn } from "./campaign";
import RazorpayPaymentButton from "./RazorpayPaymentButton";
import { Burst, Laurel, Toran } from "./Decorations";
import type { FestiveDict } from "./i18n";

/** Icons for the four "included" items, in dictionary order. */
const includedIcons = [CalendarCheck, Printer, Sparkles, BadgeCheck];

export default function FestiveOffer({ t }: { t: FestiveDict["offer"] }) {
  return (
    <section id="offer" className="relative isolate scroll-mt-24 overflow-clip bg-festive-bg py-16 md:py-24">
      <Burst className="absolute top-20 left-[8%] -z-10 hidden size-24 xl:block" color="#f4b942" />
      <Burst className="absolute top-40 right-[10%] -z-10 hidden size-16 xl:block" color="#f57c00" delay={1.6} />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold-dark">✦ {t.eyebrow} ✦</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-festive-navy md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">{t.description}</p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
          {/* Primary: Smart Billing Lite bundle */}
          <article className="relative rounded-4xl border-2 border-festive-gold bg-white p-6 pt-12 shadow-2xl shadow-festive-gold/20 md:p-10 md:pt-14">
            <div aria-hidden className="absolute inset-x-0 top-0 overflow-hidden rounded-t-[30px]">
              <Toran count={12} />
            </div>
            <span
              className="absolute -top-4 left-6 z-10 px-6 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white italic shadow-[0_8px_18px_-8px_rgb(0_0_0/0.6)] [clip-path:polygon(0_0,100%_0,94%_50%,100%_100%,0_100%,6%_50%)] md:left-10"
              style={{ background: "linear-gradient(180deg, #e3262f, #9b0f19)" }}
            >
              {t.badge}
            </span>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-festive-navy">Smart Billing Lite</h3>
                <p className="mt-1 font-medium text-festive-navy/65">{t.appDescription}</p>

                <div className="relative mt-7 flex items-center justify-center gap-2 overflow-hidden rounded-3xl border-2 border-[#ffe9a8] bg-[linear-gradient(180deg,#fff6d8_0%,#f9d67e_45%,#e3a52e_100%)] px-3 py-5 text-center shadow-[0_18px_36px_-18px_rgb(242_184_75/0.8),inset_0_2px_0_rgb(255_255_255/0.75)]">
                  <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-[18px] border border-[#b8801a]/40" />
                  {/* Laurels are flex items beside the price, so the price can never run under them. */}
                  <Laurel className="h-16 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-festive-navy/50">
                      <span className="sr-only">{t.regularBundlePrice} </span>
                      <s>₹12,000</s>
                    </p>
                    <p className="text-5xl font-black leading-none tracking-tight whitespace-nowrap text-festive-navy [text-shadow:0_2px_0_rgb(255_255_255/0.55)] sm:text-6xl md:text-5xl xl:text-6xl">
                      ₹6,500
                    </p>
                  </div>
                  <Laurel flip className="h-16 shrink-0" />
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-gleam bg-linear-to-r from-transparent via-white/60 to-transparent" />
                </div>
                <p className="mt-3 text-sm font-semibold text-festive-navy/70">{t.bundleDetails}</p>

                <RazorpayPaymentButton className="mt-7" />

                <p className="mt-4 text-sm text-festive-navy/60">{t.monthly}</p>
              </div>

              <ul className="grid content-start gap-3 rounded-3xl border border-festive-gold/30 bg-[linear-gradient(180deg,#fffaf0,#f7f9fd)] p-5">
                {t.included.map(({ title, text }, i) => {
                  const Icon = includedIcons[i];
                  return (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffe08a,#f2b84b_55%,#d9921f)] text-festive-navy shadow-sm">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block font-bold text-festive-navy">{title}</span>
                      <span className="block text-sm text-festive-navy/60">{text}</span>
                    </span>
                  </li>
                  );
                })}
              </ul>
            </div>

            <details className="group mt-8 rounded-2xl border border-festive-navy/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-festive-navy [&::-webkit-details-marker]:hidden">
                {t.termsLabel}
                <ChevronDown size={18} className="transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <ul className="grid gap-2 px-5 pb-5 text-sm leading-6 text-festive-navy/70">
                {t.terms.map((term) => (
                  <li key={term} className="flex gap-2">
                    <Check size={15} strokeWidth={3} className="mt-1 shrink-0 text-festive-success" />
                    {term}
                  </li>
                ))}
              </ul>
            </details>
          </article>

          {/* Secondary: Smart Billing Pro */}
          <article className="relative overflow-hidden rounded-3xl border border-festive-navy/10 bg-white p-6 shadow-lg shadow-festive-navy/5 md:p-7">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-festive-marigold via-festive-gold to-festive-red" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-festive-navy/50">{t.proEyebrow}</p>
            <h3 className="mt-2 text-xl font-extrabold text-festive-navy">Smart Billing Pro</h3>
            <p className="mt-1 text-sm text-festive-navy/65">{t.proDescription}</p>
            <p className="mt-5">
              <span className="text-3xl font-extrabold text-festive-navy">₹14,000</span>
              <span className="text-sm font-semibold text-festive-navy/60"> {t.perYear}</span>
            </p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold text-festive-navy/80">
              {t.proFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check size={15} strokeWidth={3} className="text-festive-success" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-medium text-festive-navy/55">{t.proFootnote}</p>
            <TrackedLink href={PRO_URL} event="offer_clicked" interest="pro" className={`${btn.base} ${btn.outline} mt-5 w-full`}>
              {t.explorePro}
              <ArrowUpRight size={17} />
            </TrackedLink>
            <TrackedLink
              href="#claim"
              event="offer_clicked"
              interest="pro"
              className="mt-3 block text-center text-sm font-bold text-festive-blue hover:text-festive-navy"
            >
              {t.askPro}
            </TrackedLink>
          </article>
        </div>
      </Container>
    </section>
  );
}
