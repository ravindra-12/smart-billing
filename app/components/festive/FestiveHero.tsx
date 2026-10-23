import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { WHATSAPP_URL, btn } from "./campaign";
import RazorpayPaymentButton from "./RazorpayPaymentButton";

const highlights = ["5-Day Free Trial", "Hindi + English", "AI Billing Support", "QR / UPI Payments", "Thermal Printer Ready"];

export default function FestiveHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-festive-blue/10 via-festive-bg to-festive-bg">
      <Container className="relative grid items-center gap-12 pb-16 pt-10 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-festive-gold/60 bg-festive-gold/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-festive-navy">
            <Sparkles size={13} className="text-festive-gold-dark" />
            Festival Bumper Offer
          </p>
          <div>
            <a
              href="/dussehra-offer-hindi"
              className="inline-flex items-center justify-center rounded-full border border-festive-navy/20 bg-white px-4 py-1.5 text-sm font-bold text-festive-navy transition-colors hover:border-festive-blue hover:text-festive-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-festive-blue"
            >
              हिन्दी मे देखें
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
            <TrackedLink href={WHATSAPP_URL} event="offer_clicked" interest="lite" className={`${btn.base} ${btn.green}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
              <ArrowUpRight size={18} />
            </TrackedLink>
            <RazorpayPaymentButton />
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
