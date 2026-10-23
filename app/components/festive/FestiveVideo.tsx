"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, QrCode, Sparkles, Zap } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { DEMO_VIDEO_ID, btn, track } from "./campaign";

const captions = [
  { icon: Zap, label: "Quick Billing" },
  { icon: QrCode, label: "Payment Collection" },
  { icon: Sparkles, label: "AI Features" },
];

export default function FestiveVideo() {
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (!playing) track("demo_played");
    setPlaying(true);
  };

  return (
    <section id="demo" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-blue">Product demo</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-festive-navy md:text-4xl">
            Watch Smart Billing Lite in Action
          </h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">
            See how businesses bill quickly, collect payments, track customers and udhaar, and grow every day.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-4xl border border-festive-navy/10 bg-festive-bg p-2 shadow-2xl shadow-festive-navy/10 md:p-3">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-festive-navy">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
                title="Smart Billing Lite demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={play}
                aria-label="Play the Smart Billing Lite demo video"
                className="group absolute inset-0 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-festive-gold"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${DEMO_VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-festive-navy/25 transition-colors duration-200 group-hover:bg-festive-navy/10" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-festive-gold text-festive-navy shadow-xl transition-transform duration-200 group-hover:scale-110 md:h-20 md:w-20">
                  <Play size={30} fill="currentColor" className="ml-1" />
                </span>
              </button>
            )}
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {captions.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-semibold text-festive-navy/75">
              <Icon size={16} className="text-festive-blue" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedLink href="#claim" event="demo_requested" interest="demo" className={`${btn.base} ${btn.outline}`}>
            Request Live Demo
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
