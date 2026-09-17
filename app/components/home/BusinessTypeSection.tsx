"use client";

import Image from "next/image";
import {
  ShoppingCart,
  Carrot,
  Pill,
  Scissors,
  UtensilsCrossed,
  Wrench,
  Store,
  type LucideIcon,
} from "lucide-react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import IconTile from "@/app/components/ui/IconTile";
import Reveal from "@/app/components/ui/Reveal";
import { assetUrl } from "@/app/components/dynamic/helpers";
import type { BusinessTypesBlock } from "./types";

const BUSINESS_ICON_MAP: Record<string, LucideIcon> = {
  "Kirana Store": ShoppingCart,
  "Grocery Store": Carrot,
  Pharmacy: Pill,
  "Salon & Spa": Scissors,
  "Food Stall": UtensilsCrossed,
  "Repair Shop": Wrench,
  "Small Vendors": Store,
};

export default function BusinessTypeSection({ businessTypes }: { businessTypes?: BusinessTypesBlock }) {
  const items = businessTypes?.items ?? [];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={businessTypes?.badgeText ?? "Built for you"}
          title={businessTypes?.title ?? "Perfect for every small business"}
          description={
            businessTypes?.description ??
            "Built for daily billing, payment collection, receipt printing, and business tracking."
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {items.map((item, index) => {
            const iconUrl = assetUrl(item.icon);
            const Icon = BUSINESS_ICON_MAP[item.title] ?? Store;

            return (
              <Reveal key={item.id} delay={(index % 7) * 60}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center transition-transform duration-200 hover:-translate-y-1">
                  {iconUrl ? (
                    <Image
                      unoptimized
                      src={iconUrl}
                      alt={item.title}
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                  ) : (
                    <IconTile icon={Icon} tone="ink" size="sm" />
                  )}
                  <div className="text-xs font-semibold text-ink">{item.title}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
