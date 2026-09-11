"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import Container from "@/app/components/ui/Container";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { HeroSectionData } from "./types";

const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const el = document.getElementById("download-apk");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#download-apk");
  }
};

export default function HeroSection() {
  const { data: hero } = useStrapiSection<HeroSectionData>("/api/hero-section?populate=*");

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-dark text-paper">
      <div
        className="absolute inset-0 bg-cover bg-position-[center_right]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-surface-dark via-surface-dark/85 to-surface-dark/20" />

      <Container className="relative py-20">
        <div className="max-w-xl">
          <Badge tone="inverse">
            <Sparkles size={13} />
            AI-Powered Billing App
          </Badge>

          <h1 className="font-display mt-7 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {hero?.titleLine1 ?? "Smart Billing"}
            <br />
            <span className="text-accent">{hero?.titleLine2 ?? "Made Simple."}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-paper/70">
            AI-powered mobile billing app with QR payments, thermal printing, POS
            device support, sound box integration, udhaar tracking, and daily
            business reports.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#download-apk" onClick={scrollToDownload} variant="inverse" size="lg">
              Start 30-Day Free Trial
              <ArrowUpRight size={18} />
            </Button>
            <Button href="#download-apk" onClick={scrollToDownload} variant="ghost" size="lg" className="text-paper/80 hover:text-paper">
              Watch demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
