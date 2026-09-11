"use client";

import { Bot, Check } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { FeatureHighlightsSectionData, TextCard } from "./types";

const aiItems: TextCard[] = [
  "Daily sales insights",
  "Best-selling products",
  "Top customer analysis",
  "Income growth tracking",
  "Smart business suggestions",
].map((title) => ({ title }));

const businessItems = [
  "Easy setup in minutes",
  "No training required",
  "Works for low-tech users",
  "Supports daily shop operations",
  "Affordable for small vendors",
  "Secure and reliable records",
].map((text) => ({ text }));

export default function HighlightsSection() {
  const { data } = useStrapiSection<FeatureHighlightsSectionData>("/api/feature-highlights-section?populate=*");

  const content = {
    aiHeading: data?.aiHeading ?? "AI-powered insights",
    aiItems: data?.aiItems?.length ? data.aiItems : aiItems,
    businessHeading: data?.businessHeading ?? "Built for Indian small businesses",
    businessItems: data?.businessItems?.length ? data.businessItems : businessItems,
    buttonText: data?.buttonText ?? "View pricing & start trial",
  };

  return (
    <section className="py-8 pb-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-line bg-white p-7 md:p-9">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-accent-soft px-5 py-2.5 text-sm font-black text-accent-dark">
              <Bot size={16} />
              {content.aiHeading}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {content.aiItems.map((item) => (
                <div key={item.title} className="rounded-2xl bg-paper-dim p-4">
                  <div className="text-sm font-black text-ink">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-line bg-white p-7 md:p-9">
            <div className="inline-flex rounded-2xl bg-ink px-5 py-2.5 text-sm font-black text-paper">
              {content.businessHeading}
            </div>
            <div className="mt-6 flex flex-col gap-2.5">
              {content.businessItems.map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-paper-dim px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-ink-soft">{item.text}</span>
                </div>
              ))}
            </div>
            <Button href="#download-apk" className="mt-6 w-full">
              {content.buttonText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
