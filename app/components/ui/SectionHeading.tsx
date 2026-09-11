import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "ink",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "ink" | "inverse";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const titleColor = tone === "inverse" ? "text-paper" : "text-ink";
  const descColor = tone === "inverse" ? "text-paper/70" : "text-ink-soft";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            tone === "inverse" ? "text-paper/60" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description ? <p className={`text-base leading-7 ${descColor}`}>{description}</p> : null}
    </div>
  );
}
