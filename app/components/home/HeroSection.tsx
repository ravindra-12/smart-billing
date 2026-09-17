"use client";

import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import Container from "@/app/components/ui/Container";
import { useMountedIn } from "@/app/hooks/useMountedIn";
import type { HeroBlock } from "./types";

const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const el = document.getElementById("download-apk");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#download-apk");
  }
};

export default function HeroSection({ hero }: { hero?: HeroBlock }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const mounted = useMountedIn();

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const node = bgRef.current;
    if (!node) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    node.style.transform = `scale(1.06) translate(${-x}px, ${-y}px)`;
  };

  const handleMouseLeave = () => {
    const node = bgRef.current;
    if (!node) return;
    node.style.transform = "scale(1.06) translate(0, 0)";
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-line bg-surface-dark text-paper"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 scale-105 bg-cover bg-position-[center_right] transition-transform duration-300 ease-out"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-surface-dark via-surface-dark/85 to-surface-dark/20" />

      <Container className="relative py-20">
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <Badge tone="inverse">
            <Sparkles size={13} />
            {hero?.badgeText ?? "AI-Powered Billing App"}
          </Badge>

          <h1 className="font-display mt-7 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {hero?.titleLine1 ?? "Smart Billing"}
            <br />
            <span className="text-accent">{hero?.titleLine2 ?? "Made Simple."}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-paper/70">
            {hero?.description ??
              "AI-powered mobile billing app with QR payments, thermal printing, POS device support, sound box integration, udhaar tracking, and daily business reports."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              href={hero?.primaryButtonLink ?? "#download-apk"}
              onClick={scrollToDownload}
              variant="inverse"
              size="lg"
            >
              {hero?.primaryButtonText ?? "Start 30-Day Free Trial"}
              <ArrowUpRight size={18} />
            </Button>
            <Button
              href={hero?.secondaryButtonLink ?? "#download-apk"}
              onClick={scrollToDownload}
              variant="ghost"
              size="lg"
              className="text-paper/80 hover:text-paper"
            >
              {hero?.secondaryButtonText ?? "Watch demo"}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
