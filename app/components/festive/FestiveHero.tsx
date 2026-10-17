import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { PLAY_STORE_URL, btn } from "./campaign";

const highlights = ["5-Day Free Trial", "Hindi + English", "AI Billing Support", "QR / UPI Payments", "Thermal Printer Ready"];

export default function FestiveHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-festive-blue/10 via-festive-bg to-festive-bg">
      <Container className="relative grid items-center gap-12 pb-16 pt-10 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-festive-gold/60 bg-festive-gold/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-festive-navy">
            <Sparkles size={13} className="text-festive-gold-dark" />
            Dussehra Festival Bumper Offer
          </p>
          <div>
            <a
              href="/dussehra-offer-hindi"
              className="inline-flex items-center justify-center rounded-full border border-festive-navy/20 bg-white px-4 py-1.5 text-sm font-bold text-festive-navy transition-colors hover:border-festive-blue hover:text-festive-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-festive-blue"
            >
              See in Hindi
            </a>
          </div>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-festive-navy sm:text-5xl lg:text-6xl">
            Bill Faster. Sell Smarter.
            <br />
            <span className="text-festive-blue">Grow Your Business.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-festive-navy/70">
            AI-powered Smart Billing Lite helps shops and small businesses bill faster, collect payments
            easily, and grow smarter.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-festive-navy/10 bg-white px-3 py-1.5 text-sm font-semibold text-festive-navy"
              >
                <Check size={14} strokeWidth={3} className="text-festive-success" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={PLAY_STORE_URL} event="trial_started" className={`${btn.base} ${btn.blue}`}>
              Start 5-Day Free Trial
              <ArrowUpRight size={18} />
            </TrackedLink>
            <TrackedLink href="#offer" event="offer_clicked" interest="lite" className={`${btn.base} ${btn.gold}`}>
              Grab Festival Offer
            </TrackedLink>
          </div>

          <p className="mt-5 text-sm font-medium text-festive-navy/60">
            Built for local shops, service businesses, and growing retailers.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="overflow-hidden rounded-4xl border border-festive-navy/10 bg-white shadow-2xl shadow-festive-navy/10">
            <Image
              src="/hero-bg.png"
              alt="Smart Billing Lite dashboard on a phone with a mobile thermal printer, QR payment stand and printed receipt"
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 32rem, 100vw"
              className="h-auto w-full"
            />
          </div>

          <span className="absolute -top-3 right-4 rotate-3 rounded-full bg-festive-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-festive-navy shadow-lg md:right-8">
            Heavy Festival Discount
          </span>

          <div className="absolute -bottom-6 left-4 rounded-2xl bg-festive-navy p-4 text-white shadow-xl shadow-festive-navy/30 md:left-8 md:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-festive-gold">Festival bundle</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold md:text-4xl">₹6,500</span>
              <s className="text-sm text-white/50">
                <span className="sr-only">Regular price </span>₹12,000
              </s>
            </p>
            <p className="mt-0.5 text-sm text-white/75">13 Months + Thermal Printer</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
