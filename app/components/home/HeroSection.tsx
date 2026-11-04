"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import Container from "@/app/components/ui/Container";
import { useMountedIn } from "@/app/hooks/useMountedIn";
import { assetUrl } from "@/app/components/dynamic/helpers";
import { Burst, Lanterns, RangoliDiya, StringLights, Toran } from "@/app/components/festive/Decorations";
import type { HeroBlock } from "./types";

export default function HeroSection({ hero }: { hero?: HeroBlock }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const mounted = useMountedIn();
  const heroImage = assetUrl(hero?.heroImage) ?? "/hero-bg.png";

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
      className="relative isolate overflow-hidden bg-surface-dark text-paper"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20 scale-105 bg-cover bg-position-[center_right] transition-transform duration-300 ease-out"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />
      <div className="absolute inset-0 -z-20 bg-linear-to-r from-surface-dark via-surface-dark/85 to-surface-dark/20" />
      {/* Warm festive glow from the top left, behind the text */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 70% at 10% 0%, rgb(244 185 66 / 0.22), transparent 65%)" }}
      />

      {/* Festive decorations: kept to the edges and the open right side, never behind the headline */}
      <Toran className="absolute inset-x-0 top-0 -z-10" count={30} />
      <StringLights className="absolute inset-x-0 top-14 -z-10 h-14 w-full opacity-80 sm:top-16 sm:h-20" />
      <Lanterns className="absolute top-10 right-[3%] -z-10 hidden h-56 w-36 -scale-x-100 lg:block" />
      <Burst className="absolute top-24 right-6 -z-10 size-20 sm:size-28 lg:right-[22%]" />
      <Burst className="absolute top-52 right-[38%] -z-10 hidden size-14 lg:block" color="#ff7ac6" delay={1.4} />
      <Burst className="absolute bottom-24 right-[8%] -z-10 hidden size-16 md:block" color="#7dd3fc" delay={2.4} />
      <RangoliDiya className="absolute -bottom-24 -left-24 -z-10 size-72 sm:size-80" rangoliClass="opacity-20" />
      <RangoliDiya className="absolute -right-28 -bottom-28 -z-10 hidden size-96 md:block" rangoliClass="opacity-20" />

      <Container className="relative pt-24 pb-28 sm:pt-28 md:pb-32">
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Festive offer ribbon */}
          <Link
            href="/festive-offer"
            className="group relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(180deg,#ffe08a_0%,#f2b84b_55%,#d9921f_100%)] py-1.5 pr-2 pl-3.5 text-sm font-extrabold text-[#3a2300] shadow-[0_8px_22px_-10px_rgb(242_184_75/0.9),inset_0_1px_0_rgb(255_255_255/0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b84b]"
          >
            <Gift size={15} aria-hidden />
            Festival Bumper Offer · ₹6,500
            <span className="grid size-6 place-items-center rounded-full bg-[#3a2300] text-[#ffe08a] transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={13} aria-hidden />
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-gleam bg-linear-to-r from-transparent via-white/60 to-transparent" />
          </Link>

          <div>
            <Badge tone="inverse">
              <Sparkles size={13} />
              {hero?.badgeText ?? "AI-Powered Billing App"}
            </Badge>
          </div>

          <h1 className="font-display mt-7 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {hero?.titleLine1 ?? "Smart Billing"}
            <br />
            <span className="bg-[linear-gradient(100deg,#ffe9a3_0%,#f6c453_35%,#ffdb7a_55%,#e09b1c_100%)] bg-clip-text text-transparent">
              {hero?.titleLine2 ?? "Made Simple."}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-paper/70">
            {hero?.description ??
              "AI-powered mobile billing app with QR payments, thermal printing, POS device support, sound box integration, udhaar tracking, and daily business reports."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              href="/festive-offer"
              variant="inverse"
              size="lg"
            >
              {hero?.primaryButtonText ?? "Start 30-Day Free Trial"}
              <ArrowUpRight size={18} />
            </Button>
            <Button
              href="/festive-offer"
              variant="ghost"
              size="lg"
              className="text-paper/80 hover:text-paper"
            >
              {hero?.secondaryButtonText ?? "Watch demo"}
            </Button>
          </div>
        </div>
      </Container>

      {/* Gold-edged curve into the next section (paper-dim) */}
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14">
        <path d="M0 40 Q 360 6 720 30 T 1440 22 V 60 H 0 Z" fill="#f2ede1" />
        <path d="M0 40 Q 360 6 720 30 T 1440 22" fill="none" stroke="#f2b84b" strokeWidth="3" />
      </svg>
    </section>
  );
}
