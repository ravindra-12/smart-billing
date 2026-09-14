/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useMountedIn } from "@/app/hooks/useMountedIn";
import { assetUrl, text } from "./helpers";

export default function DynamicHeroBlock({ block }: { block: any }) {
  const mounted = useMountedIn();
  const heroImage = assetUrl(block.image || block.heroImage);

  return (
    <section className="border-b border-line bg-surface-dark py-16 text-paper md:py-24">
      <Container>
        <div
          className={`grid items-center gap-12 transition-all duration-700 ease-out md:grid-cols-2 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
              {block.badgeText}
            </p>
            <h1 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
              {block.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-paper/70">{text(block.description)}</p>
            {block.primaryButton?.url && (
              <Button href={block.primaryButton.url} variant="inverse" size="lg" className="mt-8">
                {block.primaryButton.label}
              </Button>
            )}
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={block.title || "Smart Billing Lite"}
                className="h-full min-h-64 w-full object-cover"
              />
            ) : (
              <div className="flex min-h-64 items-center justify-center px-6 text-center text-sm font-semibold text-paper/60">
                Add a hero image in the Dynamic Page content to display it here.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
