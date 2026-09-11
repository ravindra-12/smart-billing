"use client";

import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { PricingHeroData } from "./types";

export default function PricingHeroSection() {
  const { data } = useStrapiSection<PricingHeroData>("/api/pricing-hero");

  return (
    <section className="py-16 text-center md:py-24">
      <Container>
        <Badge className="mx-auto">
          {data?.badgeText ?? "Simple pricing for every business"}
        </Badge>
        <h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
          {data?.title ?? "Start free today. Upgrade anytime."}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-soft">
          {data?.description ??
            "Use Smart Billing Lite free for 30 days. Continue with an affordable monthly or yearly plan built for small businesses."}
        </p>
      </Container>
    </section>
  );
}
