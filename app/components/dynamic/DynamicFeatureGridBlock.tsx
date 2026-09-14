/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/app/components/ui/Container";
import Reveal from "@/app/components/ui/Reveal";
import { text } from "./helpers";

export default function DynamicFeatureGridBlock({ block }: { block: any }) {
  const features = block.features || [];

  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {block.badgeText}
          </p>
          <h2 className="font-display mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {block.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: any, index: number) => (
            <Reveal key={feature.id || feature.title} delay={(index % 6) * 80}>
              <article className="h-full rounded-3xl border border-line bg-paper-dim p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-ink/5">
                <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{text(feature.description)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
