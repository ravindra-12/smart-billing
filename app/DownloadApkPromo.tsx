import {
  ArrowUpRight,
  BarChart3,
  Check,
  Monitor,
  Package,
  Play,
  Smartphone,
  Zap,
} from "lucide-react";
import Container from "./components/ui/Container";
import SectionHeading from "./components/ui/SectionHeading";
import IconTile from "./components/ui/IconTile";
import Button from "./components/ui/Button";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN";

const mobileBenefits = ["Fast billing on the go", "UPI and QR payments", "Receipts and daily reports"];
const desktopBenefits = ["Powerful desktop workspace", "Clear business insights", "Built for growing teams"];

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
            <Check size={12} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function DownloadApkPromo() {
  return (
    <section id="download-apk" className="scroll-mt-24 bg-paper-dim px-5 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Choose your workspace"
          title="Smart billing, wherever business happens."
          description="Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro."
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-4xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-soft transition-transform duration-500 ease-out group-hover:scale-125" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <IconTile
                  icon={Smartphone}
                  tone="accent"
                  size="lg"
                  className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                />
                <span className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs font-black uppercase tracking-wide text-accent-dark">
                  Android app
                </span>
              </div>
              <h3 className="font-display mt-7 text-2xl font-semibold text-ink md:text-3xl">
                Smart Billing Lite
              </h3>
              <p className="mt-3 max-w-md leading-7 text-ink-soft">
                Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.
              </p>
              <BenefitList items={mobileBenefits} />
              <Button
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                <Play size={17} fill="currentColor" />
                Download on Google Play
                <ArrowUpRight size={17} />
              </Button>
              <p className="mt-3 text-xs font-semibold text-ink-faint">Free 30-day trial · No credit card needed</p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-4xl bg-surface-dark p-7 text-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 md:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:bg-accent/30" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <IconTile
                  icon={Monitor}
                  tone="inverse"
                  size="lg"
                  className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                />
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-paper/80">
                  Laptop & desktop
                </span>
              </div>
              <h3 className="font-display mt-7 text-2xl font-semibold md:text-3xl">SmartBill Pro</h3>
              <p className="mt-3 max-w-md leading-7 text-paper/70">
                A complete web workspace for teams that want more control over billing, inventory, and business performance.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {desktopBenefits.map((item, index) => {
                  const Icon = [Package, BarChart3, Zap][index];
                  return (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold text-paper/80">
                      <Icon size={18} className="text-accent" />
                      {item}
                    </div>
                  );
                })}
              </div>
              <Button
                href="https://www.smartbillpro.com/"
                target="_blank"
                rel="noreferrer"
                variant="inverse"
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                Open SmartBill Pro
                <ArrowUpRight size={17} />
              </Button>
              <p className="mt-3 text-xs font-semibold text-paper/50">Open the web app from any laptop or desktop browser</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
