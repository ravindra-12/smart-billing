"use client";

import Image from "next/image";
import {
  Zap,
  Smartphone,
  Printer,
  NotebookText,
  BarChart3,
  Bot,
  type LucideIcon,
} from "lucide-react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import IconTile from "@/app/components/ui/IconTile";
import Card from "@/app/components/ui/Card";
import Reveal from "@/app/components/ui/Reveal";
import TiltCard from "@/app/components/ui/TiltCard";
import { assetUrl } from "@/app/components/dynamic/helpers";
import type { WhyChooseBlock } from "./types";

const BENEFIT_ICON_MAP: Record<string, LucideIcon> = {
  "Super Fast Billing": Zap,
  "QR & UPI Payments": Smartphone,
  "Thermal Receipt Printing": Printer,
  "Udhaar Management": NotebookText,
  "Daily Income Tracking": BarChart3,
  "AI Business Insights": Bot,
};

export default function WhyChooseSection({ whyChoose }: { whyChoose?: WhyChooseBlock }) {
  const features = whyChoose?.features ?? [];

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-[2.5rem] border border-line bg-paper-dim p-8 md:p-14">
          <SectionHeading
            eyebrow={whyChoose?.badgeText ?? "Why Smart Billing Lite"}
            title={whyChoose?.title ?? "Why choose Smart Billing Lite?"}
            description={
              whyChoose?.description ??
              "Everything a small business needs to bill faster, collect better, and grow smarter."
            }
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((item, index) => {
              const iconUrl = assetUrl(item.icon);
              const Icon = BENEFIT_ICON_MAP[item.title] ?? Zap;

              return (
                <Reveal key={item.id} delay={(index % 3) * 100}>
                  <TiltCard>
                    <Card className="bg-white">
                      {iconUrl ? (
                        <Image
                          unoptimized
                          src={iconUrl}
                          alt={item.title}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <IconTile icon={Icon} size="md" />
                      )}
                      <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                    </Card>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
