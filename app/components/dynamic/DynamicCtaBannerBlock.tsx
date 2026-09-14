/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightSurface from "@/app/components/ui/SpotlightSurface";
import { text } from "./helpers";

export default function DynamicCtaBannerBlock({ block }: { block: any }) {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SpotlightSurface className="flex flex-col gap-8 rounded-[2.5rem] bg-surface-dark px-7 py-12 text-paper md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <h2 className="font-display text-3xl font-semibold">{block.title}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-paper/70">{text(block.description)}</p>
            </div>
            {block.buttonUrl && (
              <Button href={block.buttonUrl} variant="inverse" size="lg" className="shrink-0">
                {block.buttonLabel}
              </Button>
            )}
          </SpotlightSurface>
        </Reveal>
      </Container>
    </section>
  );
}
