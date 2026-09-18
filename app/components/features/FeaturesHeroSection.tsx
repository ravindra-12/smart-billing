"use client";

import { TrendingUp } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { useMountedIn } from "@/app/hooks/useMountedIn";
import type { FeatureHeroData } from "./types";

export default function FeaturesHeroSection({ data = {} }: { data?: FeatureHeroData }) {
  const mounted = useMountedIn();
  const stats: [string, string][] = [
    ["Total Bills", data.totalBills ?? "68"],
    ["Customers", data.customers ?? "128"],
    ["Pending", data.pending ?? "₹2,350"],
    ["Profit", data.profit ?? "₹4,870"],
  ];
  const chartValues = (data.chartValues ?? "35,55,38,70,60,90,85").split(",").map(Number).filter(Number.isFinite);

  return (
    <section className="bg-surface-dark py-16 md:py-24">
      <Container>
        <div className={`grid items-center gap-12 transition-all duration-700 ease-out lg:grid-cols-2 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <div>
            <Badge tone="inverse">{data.badgeText}</Badge>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] text-paper md:text-5xl">{data.title}</h1>
            <p className="mt-6 max-w-md leading-7 text-paper/70">{data.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={data.primaryButtonLink || "#download-apk"} variant="inverse" size="lg">{data.primaryButtonText || "Start 30-Day Free Trial"}</Button>
              <Button href={data.secondaryButtonLink || "#download-apk"} variant="ghost" size="lg" className="border border-white/20 text-paper hover:bg-white/10">{data.secondaryButtonText || "Request Demo"}</Button>
            </div>
          </div>
          <div className="rounded-4xl border border-white/10 bg-white/5 p-4">
            <div className="mx-auto max-w-xs rounded-3xl bg-white p-4 text-ink">
              <div className="mb-4 flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">Dashboard</div><div className="font-display text-2xl font-semibold text-ink">{data.dashboardValue ?? "₹12,450"}</div></div><span className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent-dark"><TrendingUp size={11} />{data.dashboardGrowth ?? "+18%"}</span></div>
              <div className="mb-3 grid grid-cols-2 gap-2">{stats.map(([label, value]) => <div key={label} className="rounded-xl bg-paper-dim p-2.5"><div className="text-[9px] font-bold text-ink-faint">{label}</div><div className="text-base font-black text-ink">{value}</div></div>)}</div>
              <div className="mb-3 rounded-xl bg-paper-dim p-2.5"><div className="mb-1.5 text-[10px] font-black text-ink">{data.chartLabel ?? "Sales This Week"}</div><div className="flex h-12 items-end gap-1">{chartValues.map((height, index) => <div key={index} className="flex-1 rounded-t bg-accent" style={{ height: `${height}%` }} />)}</div></div>
              <Button href={data.primaryButtonLink || "#download-apk"} size="md" className="w-full text-xs">Create New Bill</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
