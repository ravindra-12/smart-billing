"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, QrCode, Sparkles, Zap } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { DEMO_VIDEOS, btn, track } from "./campaign";
import { Diya } from "./Decorations";
import type { FestiveDict } from "./i18n";

/** Icons for the three captions, in dictionary order. */
const captionIcons = [Zap, QrCode, Sparkles];

const embedUrl = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
const thumb = (id: string, size: "maxresdefault" | "mqdefault") => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

/**
 * Demo video player with a row of more videos below it. Clicking a video in the row plays it in the main player,
 * and the video that was there takes its place in the row.
 */
export default function FestiveVideo({ t }: { t: FestiveDict["video"] }) {
  // order[0] is in the main player; order[1..] is the row below, as indexes into DEMO_VIDEOS / t.videoTitles.
  const [order, setOrder] = useState(() => DEMO_VIDEOS.map((_, i) => i));
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLDivElement>(null);

  const current = order[0];
  const currentId = DEMO_VIDEOS[current];
  const title = (i: number) => t.videoTitles[i] ?? t.frameTitle;

  const play = () => {
    if (!playing) track("demo_played", { video: currentId });
    setPlaying(true);
  };

  /** Swaps the video in row slot `slot` with the one in the player, and plays it. */
  const choose = (slot: number) => {
    const next = [...order];
    [next[0], next[slot]] = [next[slot], next[0]];
    setOrder(next);
    setPlaying(true);
    track("demo_played", { video: DEMO_VIDEOS[next[0]] });
    // On phones the player can be off screen above the row: bring it into view.
    const el = player.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };

  return (
    <section id="demo" className="scroll-mt-24 overflow-x-clip bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold-dark">✦ {t.eyebrow} ✦</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-festive-navy md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">{t.description}</p>
        </div>

        <div
          ref={player}
          className="relative mx-auto mt-12 max-w-4xl scroll-mt-24 rounded-4xl bg-[linear-gradient(135deg,#ffe9a3,#e09b1c_40%,#fff1c1_60%,#c98a10)] p-1.5 shadow-2xl shadow-festive-gold/25 md:p-2"
        >
          <Diya className="absolute -bottom-6 -left-6 z-10 w-16 md:-left-10 md:w-24" />
          <Diya className="absolute -right-6 -bottom-6 z-10 w-16 md:-right-10 md:w-24" />
          {/* Keyed by video, so a swapped-in video fades in and its iframe starts fresh. */}
          <div key={currentId} className="relative aspect-video animate-pop-in overflow-hidden rounded-3xl bg-festive-navy">
            {playing ? (
              <iframe
                src={embedUrl(currentId)}
                title={title(current)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={play}
                aria-label={`${t.playLabel}: ${title(current)}`}
                className="group absolute inset-0 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-festive-gold"
              >
                <Image src={thumb(currentId, "maxresdefault")} alt="" fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
                <span className="absolute inset-0 bg-festive-navy/25 transition-colors duration-200 group-hover:bg-festive-navy/10" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-festive-gold text-festive-navy shadow-xl transition-transform duration-200 group-hover:scale-110 md:h-20 md:w-20">
                  <Play size={30} fill="currentColor" className="ml-1" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Now playing */}
        <p aria-live="polite" className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-2.5 text-center text-sm font-bold text-festive-navy md:mt-12">
          <span aria-hidden className="flex h-3.5 items-end gap-0.5">
            {[0, 0.3, 0.15].map((d) => (
              <span key={d} className="w-0.75 animate-twinkle rounded-full bg-festive-gold-dark" style={{ height: `${60 + d * 120}%`, animationDelay: `${d}s` }} />
            ))}
          </span>
          <span className="text-festive-gold-dark">{t.nowPlaying}:</span>
          <span className="min-w-0 truncate">{title(current)}</span>
        </p>

        {/* More videos: one row (scrolls sideways on phones) */}
        <div className="mx-auto mt-8 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-festive-navy/50 max-sm:text-center">{t.moreVideos}</p>
          <ul className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {order.slice(1).map((videoIndex, i) => {
              const id = DEMO_VIDEOS[videoIndex];
              return (
                <li key={id} className="w-[46%] shrink-0 animate-pop-in snap-start sm:w-auto">
                  <button
                    type="button"
                    onClick={() => choose(i + 1)}
                    aria-label={`${t.playLabel}: ${title(videoIndex)}`}
                    className="group block w-full text-left focus-visible:outline-none"
                  >
                    <span className="relative block aspect-video overflow-hidden rounded-2xl bg-festive-navy ring-2 ring-festive-navy/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:ring-festive-gold group-hover:shadow-lg group-hover:shadow-festive-gold/25 group-focus-visible:ring-4 group-focus-visible:ring-festive-gold">
                      <Image src={thumb(id, "mqdefault")} alt="" fill sizes="(min-width: 640px) 14rem, 46vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute inset-0 bg-festive-navy/20 transition-colors group-hover:bg-transparent" />
                      <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-festive-gold/95 text-festive-navy shadow-lg transition-transform duration-200 group-hover:scale-110">
                        <Play size={17} fill="currentColor" className="ml-0.5" />
                      </span>
                    </span>
                    <span className="mt-2 line-clamp-2 text-[13px] leading-snug font-semibold text-festive-navy/80 group-hover:text-festive-navy">
                      {title(videoIndex)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {t.captions.map((label, i) => {
            const Icon = captionIcons[i];
            return (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-festive-navy/75">
                <Icon size={16} className="text-festive-blue" />
                {label}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedLink href="#claim" event="demo_requested" interest="demo" className={`${btn.base} ${btn.outline}`}>
            {t.request}
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
