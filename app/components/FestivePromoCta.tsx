import { ArrowRight, Gift } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";

type PromoVariant = "home" | "features" | "pricing" | "login";

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
  login: {
    label: "Festive season bumper offer",
    title: "Stop Manual Billing. Start Growing Smarter!",
    description: "Simplify bills, QR payments, customer records and udhaar with AI-powered Smart Billing Lite. Get 13 months + a thermal printer for ₹6,500!",
    button: "Upgrade My Business",
  },
};

export default function FestivePromoCta({ variant }: { variant: PromoVariant }) {
  const { label, title, description, button } = promoCopy[variant];

  return (
    <section className="bg-paper-dim px-5 py-16 md:py-20">
      <Container>
        <div className="rounded-[2.5rem] bg-surface-dark p-8 text-paper md:p-12">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Gift size={16} /> {label}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-paper/70">{description}</p>
            <Button href="/festive-offer" variant="inverse" size="lg" className="mt-8">
              {button} <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
