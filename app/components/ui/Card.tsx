import type { ReactNode } from "react";

type Tone = "paper" | "dim" | "dark";

const tones: Record<Tone, string> = {
  paper: "border-line bg-white",
  dim: "border-line bg-paper-dim",
  dark: "border-white/10 bg-surface-dark text-paper",
};

export default function Card({
  children,
  tone = "paper",
  hover = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  hover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 ${tones[tone]} ${
        hover ? "transition-transform duration-200 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
