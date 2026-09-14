/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Reveal from "@/app/components/ui/Reveal";
import { text } from "./helpers";

export default function DynamicFaqBlock({ block }: { block: any }) {
  const items = block.items || [];

  return (
    <section className="bg-paper-dim py-16">
      <Container className="max-w-4xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {block.title}
          </h2>
          <p className="mt-3 text-ink-soft">{text(block.description)}</p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {items.map((item: any, index: number) => (
            <Reveal key={item.id || item.question} delay={(index % 6) * 70}>
              <details className="group rounded-2xl border border-line bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-ink">
                  {item.question}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 leading-7 text-ink-soft">{text(item.answer)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
