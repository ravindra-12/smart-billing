import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { Burst, Laurel, RangoliDiya, StringLights, Toran } from "@/app/components/festive/Decorations";

type PromoVariant = "home" | "features" | "pricing" | "tutorial";

const promoCopy: Record<PromoVariant, { label: string; title: string; description: string; button: string }> = {
  home: {
    label: "Festive season bumper offer",
    title: "Smart Billing + Thermal Printer — Just ₹6,500!",
    description: "Upgrade your business with 13 months of AI-powered Smart Billing Lite and a mobile thermal printer. Quick billing, Hindi + English, and a 5-day free trial!",
    button: "Grab Festive Offer",
  },
  features: {
    label: "Festive season mega deal",
    title: "Bill Faster. Grow Smarter. Save ₹5,500!",
    description: "Upgrade to AI-powered Smart Billing Lite with 13 months of access and a mobile thermal printer — just ₹6,500 instead of ₹12,000!",
    button: "Claim Your Offer",
  },
  pricing: {
    label: "Limited festive season offer",
    title: "Your Smart Billing Upgrade Starts at ₹6,500!",
    description: "Get 13 months of Smart Billing Lite, a mobile thermal printer, AI insights, quick billing and Hindi + English support in one affordable bundle.",
    button: "Grab This Deal",
  },
  tutorial: {
    label: "Festive season bumper offer",
    title: "Stop Manual Billing. Start Growing Smarter!",
    description: "Simplify bills, QR payments, customer records and udhaar with AI-powered Smart Billing Lite. Get 13 months + a thermal printer for ₹6,500!",
    button: "Upgrade My Business",
  },
};

/** Warm festive night: gold glow top right, ember glow bottom left, on the brand's dark ink. */
const festiveNight =
  "radial-gradient(ellipse 60% 70% at 90% 10%, rgb(244 185 66 / 0.28), transparent 60%), radial-gradient(ellipse 55% 60% at 0% 100%, rgb(194 65 12 / 0.4), transparent 62%), linear-gradient(135deg, #2b1709 0%, #1c1710 55%, #120d07 100%)";

/** Festive offer banner shared by the home, features, pricing and tutorial pages. */
export default function FestivePromoCta({ variant }: { variant: PromoVariant }) {
  const { label, title, description, button } = promoCopy[variant];

  return (
    <section className="bg-paper-dim px-5 py-16 md:py-20">
      <Container>
        <div
          className="relative isolate overflow-hidden rounded-[2.5rem] border border-[#f2b84b]/40 px-8 pt-20 pb-10 text-paper shadow-2xl shadow-[#c2410c]/15 md:px-12 md:pt-24 md:pb-12"
          style={{ background: festiveNight }}
        >
          <Toran className="absolute inset-x-0 top-0 -z-10" count={20} />
          <StringLights className="absolute inset-x-0 top-12 -z-10 h-12 w-full opacity-70 md:top-14" />
          <Burst className="absolute top-20 right-6 -z-10 size-20 md:right-[30%] md:size-24" />
          <Burst className="absolute right-[8%] bottom-10 -z-10 hidden size-14 md:block" color="#ff7ac6" delay={1.5} />
          <RangoliDiya className="absolute -right-24 -bottom-24 -z-10 size-72 md:-right-16 md:-bottom-20" rangoliClass="opacity-25" />

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f6c453]">
                <Gift size={16} /> {label}
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-paper/70">{description}</p>

              {/* Price plaque */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#ffe9a8]/70 bg-[linear-gradient(180deg,#fff6d8,#f9d67e_45%,#e3a52e)] py-2 pr-4 pl-2 text-[#1c1710] shadow-[0_12px_30px_-14px_rgb(242_184_75/0.9)]">
                <Laurel className="h-10 shrink-0" />
                <span className="text-3xl leading-none font-black tracking-tight">₹6,500</span>
                <s className="text-sm font-bold text-[#1c1710]/50">
                  <span className="sr-only">Regular price </span>₹12,000
                </s>
              </div>
            </div>

            <Link
              href="/festive-offer"
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[linear-gradient(180deg,#ffe08a_0%,#f2b84b_55%,#d9921f_100%)] py-2 pr-2 pl-7 text-base font-extrabold text-[#1c1710] shadow-[0_12px_30px_-10px_rgb(242_184_75/0.9),inset_0_1px_0_rgb(255_255_255/0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b84b] md:self-center"
            >
              {button}
              <span className="grid size-10 place-items-center rounded-full bg-[#1c1710] text-[#ffe08a] transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={18} aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
