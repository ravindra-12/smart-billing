"use client";

import type { ReactNode } from "react";
import { useInView } from "@/app/hooks/useInView";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <As
      ref={ref as never}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </As>
  );
}
