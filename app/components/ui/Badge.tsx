import type { ReactNode } from "react";

type Tone = "accent" | "ink" | "inverse";

const tones: Record<Tone, string> = {
  accent: "border-accent/25 bg-accent-soft text-accent-dark",
  ink: "border-line bg-paper-dim text-ink-soft",
  inverse: "border-white/15 bg-white/10 text-paper",
};

export default function Badge({
  children,
  tone = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
