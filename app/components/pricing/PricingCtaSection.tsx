"use client";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { PricingBottomSectionData } from "./types";

export default function PricingCtaSection() {
  const { data } = useStrapiSection<PricingBottomSectionData>("/api/pricing-bottom-section?populate=*");

  const heading = data?.ctaHeading ?? "Ready to make your billing smarter?";
  const description =
    data?.ctaDescription ??
    "Join thousands of small businesses using Smart Billing Lite for faster billing, secure payments, receipts, and daily business growth.";
  const primaryText = data?.ctaPrimaryButtonText ?? "Start 30-Day Free Trial";
  const secondaryText = data?.ctaSecondaryButtonText ?? "Request Demo";

  return (
    <section className="pb-20">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-[2.5rem] bg-surface-dark p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="font-display max-w-lg text-3xl font-semibold leading-tight text-paper md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-md leading-7 text-paper/70">{description}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="#download-apk" variant="inverse" size="lg" className="whitespace-nowrap">
              {primaryText}
            </Button>
            <Button href="#download-apk" variant="ghost" size="lg" className="whitespace-nowrap border border-white/20 text-paper hover:bg-white/10">
              {secondaryText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
