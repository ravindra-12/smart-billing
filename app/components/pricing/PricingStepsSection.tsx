"use client";

import { Smartphone, Store, Receipt, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Reveal from "@/app/components/ui/Reveal";
import type { PricingStepsSectionData } from "./types";

const STEP_ICONS: LucideIcon[] = [Smartphone, Store, Receipt, TrendingUp];

export default function PricingStepsSection({ data }: { data?: PricingStepsSectionData }) {
  const steps = data?.steps ?? [];

  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <div className="rounded-[2.5rem] border border-line bg-white p-8 md:p-14">
            <SectionHeading
              eyebrow={data?.badgeText}
              title={data?.heading}
              description={data?.subheading}
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? Store;

                return (
                  <Reveal key={step.title} delay={i * 100}>
                    <div className="relative rounded-3xl bg-paper-dim p-6 pt-9 text-center transition-transform duration-300 hover:-translate-y-1">
                      <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-xs font-black text-paper">
                        {i + 1}
                      </div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-display mt-4 text-base font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
