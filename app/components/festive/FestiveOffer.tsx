import { ArrowUpRight, BadgeCheck, CalendarCheck, Check, ChevronDown, Printer, Sparkles } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { PRO_URL, btn } from "./campaign";
import RazorpayPaymentButton from "./RazorpayPaymentButton";

const included = [
  { icon: CalendarCheck, title: "13-month app access", text: "12-month plan + 30-day bonus" },
  { icon: Printer, title: "Mobile thermal printer", text: "Included in the bundle" },
  { icon: Sparkles, title: "AI mini insights", text: "Daily tips and reports" },
  { icon: BadgeCheck, title: "5-day free trial", text: "Try everything before you pay" },
];

const terms = [
  "The 13 months are a 12-month yearly plan plus a 30-day bonus, activated on yearly purchase.",
  "The mobile thermal printer comes with the ₹6,500 bundle only, not with the monthly plan or the free trial.",
  "AI Pro features such as voice billing are a separately chargeable add-on.",
  "Our team confirms GST, delivery, printer model and warranty with you before any payment.",
  "Valid for the Festival Bumper Offer campaign period only.",
];

const proFeatures = ["Advanced web POS", "Inventory management", "Thermal printer included"];

export default function FestiveOffer() {
  return (
    <section id="offer" className="scroll-mt-24 bg-festive-bg py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-blue">Festival Bumper Offer</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-festive-navy md:text-4xl">
            Go digital for ₹6,500 with Festival Bumper Offer
          </h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">
            Special festival pricing for businesses ready to start billing smarter: 13 months of Smart Billing Lite
            with a mobile thermal printer included.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
          {/* Primary: Smart Billing Lite bundle */}
          <article className="relative rounded-4xl border-2 border-festive-gold bg-white p-6 shadow-2xl shadow-festive-navy/10 md:p-10">
            <span className="absolute -top-3.5 left-6 rounded-full bg-festive-gold px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-festive-navy md:left-10">
              Limited Festival Offer
            </span>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-festive-navy">Smart Billing Lite</h3>
                <p className="mt-1 font-medium text-festive-navy/65">AI-Powered Mobile Billing App</p>

                <p className="mt-7 text-lg font-semibold text-festive-navy/45">
                  <span className="sr-only">Regular bundle price </span>
                  <s>₹12,000</s>
                </p>
                <p className="text-6xl font-extrabold leading-none tracking-tight text-festive-navy md:text-7xl">₹6,500</p>
                <p className="mt-3 text-sm font-semibold text-festive-navy/70">
                  Complete festival bundle · works out to ₹500/month, printer included
                </p>

                <RazorpayPaymentButton className="mt-7" />

                <p className="mt-4 text-sm text-festive-navy/60">
                  Monthly: ₹800 per Month/per user · Festival yearly app rate: ₹400/month per user
                </p>
              </div>

              <ul className="grid content-start gap-3 rounded-3xl bg-festive-bg p-5">
                {included.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-festive-blue shadow-sm">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block font-bold text-festive-navy">{title}</span>
                      <span className="block text-sm text-festive-navy/60">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <details className="group mt-8 rounded-2xl border border-festive-navy/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-festive-navy [&::-webkit-details-marker]:hidden">
                Offer terms
                <ChevronDown size={18} className="transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <ul className="grid gap-2 px-5 pb-5 text-sm leading-6 text-festive-navy/70">
                {terms.map((term) => (
                  <li key={term} className="flex gap-2">
                    <Check size={15} strokeWidth={3} className="mt-1 shrink-0 text-festive-success" />
                    {term}
                  </li>
                ))}
              </ul>
            </details>
          </article>

          {/* Secondary: Smart Billing Pro */}
          <article className="rounded-3xl border border-festive-navy/10 bg-white p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-festive-navy/50">Also on festival offer</p>
            <h3 className="mt-2 text-xl font-extrabold text-festive-navy">Smart Billing Pro</h3>
            <p className="mt-1 text-sm text-festive-navy/65">For growing retail businesses</p>
            <p className="mt-5">
              <span className="text-3xl font-extrabold text-festive-navy">₹14,000</span>
              <span className="text-sm font-semibold text-festive-navy/60"> / year</span>
            </p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold text-festive-navy/80">
              {proFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check size={15} strokeWidth={3} className="text-festive-success" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-medium text-festive-navy/55">Best for larger retail businesses.</p>
            <TrackedLink href={PRO_URL} event="offer_clicked" interest="pro" className={`${btn.base} ${btn.outline} mt-5 w-full`}>
              Explore Smart Billing Pro
              <ArrowUpRight size={17} />
            </TrackedLink>
            <TrackedLink
              href="#claim"
              event="offer_clicked"
              interest="pro"
              className="mt-3 block text-center text-sm font-bold text-festive-blue hover:text-festive-navy"
            >
              Ask about the Pro offer
            </TrackedLink>
          </article>
        </div>
      </Container>
    </section>
  );
}
