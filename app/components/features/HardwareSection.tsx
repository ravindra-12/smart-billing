"use client";

import { Printer, Receipt, FileText, CreditCard, Volume2, type LucideIcon } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { HardwareSectionData, TextCard } from "./types";

const HARDWARE_ICONS: LucideIcon[] = [Printer, Receipt, FileText, CreditCard, Volume2];

const hardware: TextCard[] = [
  { title: "Bluetooth Thermal Printer", description: "Print receipts wirelessly from your mobile device." },
  { title: "USB Thermal Printer", description: "Connect compatible USB printers for fast counter billing." },
  { title: "58mm / 80mm Printer", description: "Supports common portable receipt printer sizes." },
  { title: "Pine Labs POS Device", description: "Useful for card payment and professional billing counters." },
  { title: "Payment QR Sound Box", description: "Hear payment confirmation instantly after QR payment." },
];

export default function HardwareSection() {
  const { data } = useStrapiSection<HardwareSectionData>("/api/hardware-section?populate[items]=*");

  const items = data?.items?.length ? data.items : hardware;

  return (
    <section className="py-8">
      <Container>
        <div className="rounded-[2.5rem] bg-surface-dark p-8 text-paper md:p-12">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            {data?.heading ?? "Hardware & device integration"}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-paper/60">
            {data?.subheading ??
              "Connect your billing app with thermal printers, POS devices, and payment confirmation sound boxes."}
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item, i) => {
              const Icon = HARDWARE_ICONS[i] ?? Printer;

              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-3 text-xs font-black">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-paper/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
