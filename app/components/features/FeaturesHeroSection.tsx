"use client";

import { TrendingUp } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { FeatureHeroData } from "./types";

const stats: [string, string][] = [
  ["Total Bills", "68"],
  ["Customers", "128"],
  ["Pending", "₹2,350"],
  ["Profit", "₹4,870"],
];

export default function FeaturesHeroSection() {
  const { data } = useStrapiSection<FeatureHeroData>("/api/features-hero");

  const content = {
    badgeText: data?.badgeText ?? "Powerful features for everyday business",
    title: data?.title ?? "Everything you need to run your business smarter",
    description:
      data?.description ??
      "Manage billing, payments, customers, udhaar, receipts, reports, and hardware integrations from one simple mobile billing app.",
    primaryButtonText: data?.primaryButtonText ?? "Start 30-Day Free Trial",
    secondaryButtonText: data?.secondaryButtonText ?? "Request Demo",
  };

  return (
    <section className="bg-surface-dark py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge tone="inverse">{content.badgeText}</Badge>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] text-paper md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-md leading-7 text-paper/70">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#download-apk" variant="inverse" size="lg">
                {content.primaryButtonText}
              </Button>
              <Button href="#download-apk" variant="ghost" size="lg" className="border border-white/20 text-paper hover:bg-white/10">
                {content.secondaryButtonText}
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <div className="mx-auto max-w-xs rounded-3xl bg-white p-4 text-ink">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">Dashboard</div>
                  <div className="font-display text-2xl font-semibold text-ink">₹12,450</div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent-dark">
                  <TrendingUp size={11} />
                  +18%
                </span>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2">
                {stats.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-paper-dim p-2.5">
                    <div className="text-[9px] font-bold text-ink-faint">{label}</div>
                    <div className="text-base font-black text-ink">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-3 rounded-xl bg-paper-dim p-2.5">
                <div className="mb-1.5 text-[10px] font-black text-ink">Sales This Week</div>
                <div className="flex h-12 items-end gap-1">
                  {[35, 55, 38, 70, 60, 90, 85].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-accent" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <Button href="#download-apk" size="md" className="w-full text-xs">
                Create New Bill
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
