"use client";

import Container from "@/app/components/ui/Container";
import Counter from "@/app/components/ui/Counter";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightSurface from "@/app/components/ui/SpotlightSurface";
import { RangoliDiya, StringLights } from "@/app/components/festive/Decorations";
import type { StatsBlock } from "./types";

const fallbackStats = [
  { value: "10,000+", label: "Happy Users" },
  { value: "1L+", label: "Bills Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "24x7", label: "Support" },
];

export default function StatsSection({ stats }: { stats?: StatsBlock }) {
  const items = stats?.items?.length ? stats.items : fallbackStats;

  return (
    <section className="pb-20">
      <Container>
        <Reveal>
          <SpotlightSurface className="overflow-hidden rounded-[2.5rem] border border-[#f2b84b]/30 bg-surface-dark px-8 pt-20 pb-14 text-paper">
            {/* String of lights along the top and rangolis with lit diyas in the corners */}
            <StringLights className="absolute inset-x-0 top-0 -z-10 h-16 w-full" />
            <RangoliDiya className="absolute -bottom-24 -left-24 -z-10 hidden size-72 sm:block" rangoliClass="opacity-20" />
            <RangoliDiya className="absolute -right-24 -bottom-24 -z-10 hidden size-72 sm:block" rangoliClass="opacity-20" />
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {items.map((item, index) => (
                <Reveal key={item.label} delay={index * 100} className="text-center">
                  <div className="font-display bg-[linear-gradient(100deg,#ffe9a3_0%,#f6c453_35%,#ffdb7a_55%,#e09b1c_100%)] bg-clip-text text-4xl font-semibold text-transparent">
                    <Counter value={item.value} />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-paper/60">
                    {item.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </SpotlightSurface>
        </Reveal>
      </Container>
    </section>
  );
}
