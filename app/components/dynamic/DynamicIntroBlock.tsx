/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/app/components/ui/Container";
import Reveal from "@/app/components/ui/Reveal";
import { text } from "./helpers";

export default function DynamicIntroBlock({ block }: { block: any }) {
  return (
    <section className="py-14 text-center">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {block.badgeText}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-9 text-ink-soft">
            {text(block.description)}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
