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
import Skeleton from "@/app/components/ui/Skeleton";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { BusinessTypeData } from "./types";

const BUSINESS_ICON_MAP: Record<string, LucideIcon> = {
  "Kirana Store": ShoppingCart,
  "Grocery Store": Carrot,
  Pharmacy: Pill,
  "Salon & Spa": Scissors,
  "Food Stall": UtensilsCrossed,
  "Repair Shop": Wrench,
  "Small Vendors": Store,
};

export default function BusinessTypeSection() {
  const { data, loading } = useStrapiSection<BusinessTypeData>(
    "/api/business-type?populate[features][populate]=*"
  );

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Built for you"
          title={data?.heading ?? "Perfect for every small business"}
          description={
            data?.subheading ??
            "Built for daily billing, payment collection, receipt printing, and business tracking."
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-28" />)
            : (data?.features ?? []).map((item) => {
                const iconUrl = item.icon?.url
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.icon.url}`
                  : null;
                const Icon = BUSINESS_ICON_MAP[item.title] ?? Store;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center transition-transform duration-200 hover:-translate-y-1"
                  >
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
                );
              })}
        </div>
      </Container>
    </section>
  );
}
