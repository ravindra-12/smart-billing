"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

export default function SpotlightSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`group relative isolate ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
