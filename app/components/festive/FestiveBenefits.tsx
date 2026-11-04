import { NotebookPen, QrCode, Sparkles, TicketPercent, Users, Zap } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { Rangoli } from "./Decorations";
import type { FestiveDict } from "./i18n";

/** Icons for the six benefit cards, in dictionary order. */
const icons = [Zap, QrCode, NotebookPen, Users, TicketPercent, Sparkles];

export default function FestiveBenefits({ t }: { t: FestiveDict["benefits"] }) {
  return (
    <section id="features" className="relative isolate scroll-mt-24 overflow-clip bg-white py-16 md:py-24">
      <Rangoli className="absolute -top-24 -right-24 -z-10 size-80 opacity-30" />
      <Rangoli className="absolute -bottom-32 -left-32 -z-10 hidden size-96 opacity-25 md:block" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold-dark">✦ {t.eyebrow} ✦</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-festive-navy md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">{t.description}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {t.items.map(({ title, text }, i) => {
            const Icon = icons[i];
            return (
              <li
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-festive-navy/10 bg-linear-to-b from-white to-festive-bg p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-festive-gold hover:shadow-xl hover:shadow-festive-gold/20 md:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-festive-marigold via-festive-gold to-festive-red opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffe08a,#f2b84b_55%,#d9921f)] text-festive-navy shadow-[0_6px_16px_-6px_rgb(242_184_75/0.9),inset_0_1px_0_rgb(255_255_255/0.7)] ring-4 ring-festive-gold/15">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-festive-navy md:text-lg">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-festive-navy/65">{text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
