"use client";

import { Printer, Receipt, FileText, CreditCard, Volume2, type LucideIcon } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightSurface from "@/app/components/ui/SpotlightSurface";
import type { HardwareSectionData } from "./types";

const HARDWARE_ICONS: LucideIcon[] = [Printer, Receipt, FileText, CreditCard, Volume2];

export default function HardwareSection({ data }: { data?: HardwareSectionData }) {
  const items = data?.items ?? [];

  return (
    <section className="py-8">
      <Container>
        <Reveal>
          <SpotlightSurface className="rounded-[2.5rem] bg-surface-dark p-8 text-paper md:p-12">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              {data?.heading}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-paper/60">
              {data?.subheading}
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {items.map((item, i) => {
                const Icon = HARDWARE_ICONS[i] ?? Printer;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-3 text-xs font-black">{item.title}</h3>
                    <p className="mt-2 text-[11px] leading-5 text-paper/60">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </SpotlightSurface>
        </Reveal>
      </Container>
    </section>
  );
}
