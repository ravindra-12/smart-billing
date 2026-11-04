"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// three.js only loads in the browser, after the hero text and image have painted (the H1/image stay the LCP).
const FestiveScene = dynamic(() => import("./FestiveScene"), { ssr: false });

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Reserves the hero visual's space and shows the product photo until the 3D scene is ready, then cross-fades
 * to it. The scene stops rendering while off screen. Without WebGL the photo simply stays.
 */
export default function FestiveSceneLoader({ imageAlt }: { imageAlt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  useEffect(() => {
    const el = box.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    if (el) observer.observe(el);

    let handle = 0;
    if (webglAvailable()) {
      handle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setMount(true), { timeout: 1500 })
        : window.setTimeout(() => setMount(true), 600);
    }
    return () => {
      observer.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  return (
    <div ref={box} className="relative aspect-square w-full">
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(244_185_66/0.4),rgb(37_99_235/0.25)_45%,transparent_70%)] blur-2xl" />
      <div className={`absolute inset-[6%] overflow-hidden rounded-4xl border border-festive-gold/40 shadow-2xl shadow-black/40 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <Image
          src="/hero-bg.png"
          alt={imageAlt}
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 32rem, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      {mount && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <FestiveScene active={visible} reduced={reduced} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
