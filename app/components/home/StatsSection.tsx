"use client";

import Container from "@/app/components/ui/Container";
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
        <div className="grid grid-cols-2 gap-8 rounded-[2.5rem] bg-surface-dark px-8 py-14 text-paper md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display text-4xl font-semibold text-accent">{item.value}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-paper/60">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
