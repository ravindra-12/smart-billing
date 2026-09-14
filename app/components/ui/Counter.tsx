"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/app/hooks/useInView";

function parseValue(value: string) {
  // Leading run of digits, commas, and at most one decimal point — e.g.
  // "10,000" from "10,000+", "99.9" from "99.9%", "24" from "24x7".
  const match = value.match(/^(\d[\d,]*(?:\.\d+)?)/);
  if (!match) return null;

  const raw = match[1];
  const numeric = parseFloat(raw.replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;

  return {
    numeric,
    suffix: value.slice(raw.length),
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    useGrouping: raw.includes(","),
  };
}

function formatNumber(n: number, decimals: number, useGrouping: boolean) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });
}

export default function Counter({ value, durationMs = 1400 }: { value: string; durationMs?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(
    parsed ? formatNumber(0, parsed.decimals, parsed.useGrouping) : value
  );

  useEffect(() => {
    if (!inView || !parsed) return;

    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatNumber(parsed.numeric * eased, parsed.decimals, parsed.useGrouping));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- parsed is stable per value via useMemo
  }, [inView, value, durationMs]);

  if (!parsed) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {display}
      {parsed.suffix}
    </span>
  );
}
