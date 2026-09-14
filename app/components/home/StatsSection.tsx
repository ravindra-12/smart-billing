"use client";

import Container from "@/app/components/ui/Container";
import Counter from "@/app/components/ui/Counter";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightSurface from "@/app/components/ui/SpotlightSurface";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { StatsSectionData } from "./types";

const fallbackStats = [
  { value: "10,000+", label: "Happy Users" },
  { value: "1L+", label: "Bills Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "24x7", label: "Support" },
];

export default function StatsSection() {
  const { data } = useStrapiSection<StatsSectionData>("/api/stats-section?populate=*");
  const items = data?.stats?.length ? data.stats : fallbackStats;

  return (
    <section className="pb-20">
      <Container>
        <Reveal>
          <SpotlightSurface className="rounded-[2.5rem] bg-surface-dark px-8 py-14 text-paper">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {items.map((item, index) => (
                <Reveal key={item.label} delay={index * 100} className="text-center">
                  <div className="font-display text-4xl font-semibold text-accent">
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
