"use client";

import { Smartphone, Store, Receipt, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { PricingStepsSectionData, StepCard } from "./types";

const STEP_ICONS: LucideIcon[] = [Smartphone, Store, Receipt, TrendingUp];

const fallbackSteps: StepCard[] = [
  { title: "Register", description: "Enter your mobile number and verify with OTP." },
  { title: "Setup Shop", description: "Add shop name, business type, QR/UPI details." },
  { title: "Start Billing", description: "Create bills, collect payments, print receipts." },
  { title: "Track & Grow", description: "Track income, udhaar, profit, and business growth." },
];

export default function PricingStepsSection() {
  const { data } = useStrapiSection<PricingStepsSectionData>("/api/pricing-steps-section?populate[steps]=*");

  const steps = data?.steps?.length ? data.steps : fallbackSteps;

  return (
    <section className="py-16">
      <Container>
        <div className="rounded-[2.5rem] border border-line bg-white p-8 md:p-14">
          <SectionHeading
            eyebrow="Get started"
            title={data?.heading ?? "How to get started?"}
            description={data?.subheading ?? "Start billing in just a few simple steps."}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Store;

              return (
                <div key={step.title} className="relative rounded-3xl bg-paper-dim p-6 pt-9 text-center">
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-xs font-black text-paper">
                    {i + 1}
                  </div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display mt-4 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
