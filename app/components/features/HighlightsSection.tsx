"use client";

import { Bot, Check } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import type { FeatureHighlightsSectionData } from "./types";

export default function HighlightsSection({ data }: { data?: FeatureHighlightsSectionData }) {
  const content = {
    aiHeading: data?.aiHeading,
    aiItems: data?.aiItems ?? [],
    businessHeading: data?.businessHeading,
    businessItems: data?.businessItems ?? [],
    buttonText: data?.buttonText,
    buttonLink: data?.buttonLink,
  };

  return (
    <section className="py-8 pb-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2.5rem] border border-line bg-white p-7 md:p-9">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-accent-soft px-5 py-2.5 text-sm font-black text-accent-dark">
                <Bot size={16} />
                {content.aiHeading}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {content.aiItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-paper-dim p-4 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="text-sm font-black text-ink">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-[2.5rem] border border-line bg-white p-7 md:p-9">
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
              <Button href={content.buttonLink || "#download-apk"} className="mt-6 w-full">
              {content.buttonText}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
