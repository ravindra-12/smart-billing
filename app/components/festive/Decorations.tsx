// Festive SVG decorations for the festival campaign page: string lights, sky lanterns, fireworks, rangoli,
// diyas, a marigold toran and gold-edged section waves. Pure CSS animation (globals.css), all stopped by the
// `.festive` prefers-reduced-motion rule. Decorative only: hidden from assistive technology.
// Every computed coordinate is rounded so the server and browser render identical attributes.

import type { CSSProperties } from "react";

const GOLD = "#f6c453";
const round = (v: number) => Math.round(v * 100) / 100;

export function StringLights({ className = "" }: { className?: string }) {
  const bulbs = Array.from({ length: 18 }, (_, i) => i);
  return (
    <svg aria-hidden viewBox="0 0 1200 90" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
      <path d="M0 10 Q 300 80 600 30 T 1200 20" fill="none" stroke="#f6c45366" strokeWidth="2" />
      {bulbs.map((i) => (
        <circle
          key={i}
          cx={round((i + 0.5) * (1200 / bulbs.length))}
          cy={round(22 + Math.sin((i / bulbs.length) * Math.PI * 1.6) * 30)}
          r="5"
          fill={i % 3 === 0 ? "#ffd27a" : i % 3 === 1 ? "#ffb347" : "#fff1c1"}
          className="animate-twinkle"
          style={{ animationDelay: `${(i % 6) * 0.35}s`, filter: "drop-shadow(0 0 6px #ffcf5a)" }}
        />
      ))}
    </svg>
  );
}

function Lantern({ x, length, scale = 1, delay = 0 }: { x: number; length: number; scale?: number; delay?: number }) {
  return (
    <g className="animate-sway" style={{ transformOrigin: `${x}px 0px`, transformBox: "view-box", animationDelay: `${delay}s` }}>
      <line x1={x} y1="0" x2={x} y2={length} stroke={GOLD} strokeWidth="1.5" />
      <g transform={`translate(${x} ${length}) scale(${scale})`}>
        <rect x="-9" y="0" width="18" height="6" rx="2" fill={GOLD} />
        <path d="M-20 8 Q 0 -2 20 8 L 24 46 Q 0 58 -24 46 Z" fill="url(#sbl-lantern)" />
        <path d="M-20 8 L -24 46 M 0 4 L 0 54 M 20 8 L 24 46" stroke="#ffd98a" strokeWidth="1.2" opacity="0.7" fill="none" />
        <ellipse cx="0" cy="28" rx="12" ry="16" fill="#fff3b0" opacity="0.55" style={{ filter: "blur(4px)" }} />
        <rect x="-11" y="50" width="22" height="6" rx="2" fill={GOLD} />
        <path d="M-6 56 L -7 78 M -2 56 L -2 82 M 2 56 L 2 82 M 6 56 L 7 78" stroke={GOLD} strokeWidth="1.6" />
      </g>
    </g>
  );
}

export function Lanterns({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 260" className={`pointer-events-none ${className}`}>
      <defs>
        <radialGradient id="sbl-lantern" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="55%" stopColor="#e2381f" />
          <stop offset="100%" stopColor="#8b0d16" />
        </radialGradient>
      </defs>
      <Lantern x={40} length={70} scale={1.1} />
      <Lantern x={100} length={130} scale={0.9} delay={0.8} />
    </svg>
  );
}

/** A firework burst: rays scaling out and fading, looping. */
export function Burst({ className = "", color = "#ffd36b", delay = 0 }: { className?: string; color?: string; delay?: number }) {
  const rays = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" className={`pointer-events-none ${className}`}>
      <g className="animate-burst" style={{ transformOrigin: "center", transformBox: "fill-box", animationDelay: `${delay}s` }}>
        {rays.map((deg, i) => (
          <line
            key={deg}
            x1="0"
            y1={i % 2 ? -14 : -10}
            x2="0"
            y2={i % 2 ? -44 : -36}
            stroke={color}
            strokeWidth={i % 2 ? 1.6 : 2.4}
            strokeLinecap="round"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="3" fill="#fff6d6" />
      </g>
    </svg>
  );
}

/** Gold rangoli / mandala, slowly turning. */
export function Rangoli({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg aria-hidden viewBox="-100 -100 200 200" className={`pointer-events-none ${className}`}>
      <g className="animate-spin-slow" style={{ transformOrigin: "center", transformBox: "fill-box" }} fill="none" stroke={GOLD} strokeWidth="1.2">
        <circle r="92" strokeDasharray="2 6" />
        <circle r="78" />
        <circle r="30" />
        <circle r="14" fill="#f6c45333" />
        {petals.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path d="M0 -30 C 14 -46 14 -64 0 -78 C -14 -64 -14 -46 0 -30 Z" fill="#f6c45314" />
            <path d="M0 -40 C 6 -50 6 -60 0 -68" />
            <circle cx="0" cy="-86" r="3" fill="#f6c45366" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * A rangoli with a lit diya sitting exactly on its centre. Position and size the wrapper with `className`
 * (it must include a size and absolute placement); `rangoliClass` sets the rangoli's opacity.
 */
export function RangoliDiya({ className = "", rangoliClass = "opacity-30", diyaClass = "w-[30%]" }: { className?: string; rangoliClass?: string; diyaClass?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <Rangoli className={`absolute inset-0 size-full ${rangoliClass}`} />
      {/* The flame (38% down the diya's 120×90 viewBox) sits in the rangoli's centre circle, the bowl just below.
          Width is relative to the rangoli, so the proportions hold at every size. */}
      <Diya className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[38%] ${diyaClass}`} />
    </div>
  );
}

export function Diya({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 120 90" className={`pointer-events-none ${className}`} style={style}>
      <defs>
        <linearGradient id="sbl-diya-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0a24b" />
          <stop offset="100%" stopColor="#8a3412" />
        </linearGradient>
        <radialGradient id="sbl-diya-glow">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="34" r="30" fill="url(#sbl-diya-glow)" className="animate-twinkle" />
      <g className="animate-flicker" style={{ transformOrigin: "60px 50px", transformBox: "view-box" }}>
        <path d="M60 14 C 70 30 68 44 60 50 C 52 44 50 30 60 14 Z" fill="#ffb02e" />
        <path d="M60 26 C 65 36 64 44 60 48 C 56 44 55 36 60 26 Z" fill="#fff4c2" />
      </g>
      <path d="M14 52 Q 60 50 106 52 Q 96 84 60 86 Q 24 84 14 52 Z" fill="url(#sbl-diya-bowl)" />
      <path d="M14 52 Q 60 60 106 52" fill="none" stroke="#ffd27a" strokeWidth="3" />
      <path d="M34 68 Q 60 76 86 68" fill="none" stroke="#ffd27a" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  );
}

/** Laurel branch for price plaques. `flip` mirrors it for the right-hand side. */
export function Laurel({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves = Array.from({ length: 6 }, (_, i) => i);
  return (
    <svg aria-hidden viewBox="0 0 40 90" className={`pointer-events-none ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M30 86 C 10 66 8 34 22 6" fill="none" stroke="#a8740f" strokeWidth="2" />
      {leaves.map((i) => {
        const y = 78 - i * 13;
        const x = round(26 - Math.sin((i / 6) * Math.PI) * 12);
        return (
          <g key={i}>
            <ellipse cx={x - 7} cy={y} rx="8" ry="3.4" transform={`rotate(-35 ${x - 7} ${y})`} fill="#c8901c" />
            <ellipse cx={x + 6} cy={y - 4} rx="7" ry="3" transform={`rotate(40 ${x + 6} ${y - 4})`} fill="#e0a92e" />
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Marigold toran (door garland) ----------

/** Marigolds along one swag's droop (quadratic curve from (0,6) via (60,46) to (120,6)). */
const FLOWERS = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  const m = 1 - t;
  return { x: round(2 * m * t * 60 + t * t * 120), y: round(m * m * 6 + 2 * m * t * 46 + t * t * 6), orange: i % 2 === 0 };
});

function Swag({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 120 78" className="h-auto w-20 shrink-0 sm:w-24" aria-hidden>
      <path d="M2 4 C8 -2 16 0 18 8 C10 10 4 8 2 4 Z" fill="#2f7d4a" />
      <path d="M118 4 C112 -2 104 0 102 8 C110 10 116 8 118 4 Z" fill="#2f7d4a" />
      <path d="M0 6 Q60 46 120 6" fill="none" stroke="#b9770e" strokeWidth="1.2" />
      {FLOWERS.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r="5.6" fill={f.orange ? "#f57c00" : "#ffb300"} />
          <circle cx={f.x} cy={f.y} r="3.4" fill={f.orange ? "#ff9800" : "#ffd54f"} />
          <circle cx={f.x} cy={f.y} r="1.3" fill="#c25e00" />
        </g>
      ))}
      <g className="animate-sway" style={{ transformOrigin: "60px 26px", transformBox: "view-box", animationDelay: `${delay}s` }}>
        <line x1="60" y1="26" x2="60" y2="64" stroke="#b9770e" strokeWidth="1" />
        <circle cx="60" cy="40" r="4.2" fill="#ffb300" />
        <circle cx="60" cy="40" r="1.6" fill="#c25e00" />
        <circle cx="60" cy="52" r="4.2" fill="#f57c00" />
        <circle cx="60" cy="52" r="1.6" fill="#c25e00" />
        <path d="M55 64 Q60 56 65 64 L66 69 H54 Z" fill="#e0a92e" />
        <circle cx="60" cy="71" r="1.6" fill="#b9770e" />
      </g>
    </svg>
  );
}

export function Toran({ className = "", count = 18 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none flex w-full min-w-0 justify-center overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <Swag key={i} delay={(i % 4) * 0.45} />
      ))}
    </div>
  );
}

// ---------- Section wave ----------

const WAVE = "M0 0 H1440 V34 C1180 74 960 10 720 34 C480 58 260 6 0 40 Z";
const WAVE_EDGE = "M1440 34 C1180 74 960 10 720 34 C480 58 260 6 0 40";
/** Evenly spaced points along WAVE_EDGE (two cubic segments, viewBox 1440×80). */
const BULBS = (() => {
  const segs = [
    [[1440, 34], [1180, 74], [960, 10], [720, 34]],
    [[720, 34], [480, 58], [260, 6], [0, 40]],
  ];
  return Array.from({ length: 30 }, (_, k) => {
    const u = ((k + 0.5) / 30) * 2;
    const [p0, p1, p2, p3] = segs[Math.min(1, Math.floor(u))];
    const t = u - Math.floor(u);
    const m = 1 - t;
    const at = (i: 0 | 1) => m * m * m * p0[i] + 3 * m * m * t * p1[i] + 3 * m * t * t * p2[i] + t * t * t * p3[i];
    return { x: round(at(0)), y: round(at(1)) };
  });
})();
const BULB_COLORS = ["#fff1c1", "#ffd27a", "#ffb347"];

/**
 * Curved boundary between two sections with a string of twinkling lights along a gold edge.
 * It is filled with `color` (the section it pours out of) and overlaps the next section's top padding.
 * `flip` makes it rise out of the section below instead.
 */
export function SectionWave({ color, flip = false, diya }: { color: string; flip?: boolean; diya?: "left" | "right" }) {
  return (
    <div aria-hidden className={`pointer-events-none relative z-10 h-10 overflow-x-clip sm:h-16 ${flip ? "-mt-10 sm:-mt-16" : "-mb-10 sm:-mb-16"}`}>
      <div className={`absolute inset-0 ${flip ? "-scale-y-100" : ""}`}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d={WAVE} fill={color} />
          <path d={WAVE_EDGE} fill="none" stroke="#f2b84b" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
        {BULBS.map((p, i) => (
          <span
            key={i}
            className={`absolute size-1.5 -translate-1/2 animate-twinkle rounded-full sm:size-2 ${i % 2 ? "max-sm:hidden" : ""}`}
            style={{
              left: `${(p.x / 1440) * 100}%`,
              top: `${(p.y / 80) * 100}%`,
              background: BULB_COLORS[i % 3],
              boxShadow: "0 0 6px 2px rgb(255 200 90 / 0.65)",
              animationDelay: `${(i % 7) * 0.32}s`,
            }}
          />
        ))}
      </div>
      {diya && (
        <Diya
          className={`absolute w-12 -translate-y-[70%] sm:w-16 ${diya === "left" ? "left-[6%]" : "right-[6%]"}`}
          style={{ top: flip ? "55%" : "50%" }}
        />
      )}
    </div>
  );
}

// ---------- Confetti (shown when the claim form is sent) ----------

const CONFETTI_COLORS = ["#f2b84b", "#ffd27a", "#f57c00", "#e3262f", "#2563eb", "#ffb300"];
const PIECES = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * Math.PI * 2;
  const dist = 90 + (i % 4) * 28;
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist * 0.7) - 40,
    r: (i % 2 ? 1 : -1) * (120 + i * 17),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    round: i % 3 === 0,
  };
});

export function Confetti() {
  return (
    <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-0">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className={`absolute block animate-confetti ${p.round ? "size-2 rounded-full" : "h-3 w-1.5 rounded-[2px]"}`}
          style={
            {
              background: p.color,
              animationDelay: `${(i % 5) * 0.03}s`,
              "--x": `${p.x}px`,
              "--y": `${p.y}px`,
              "--r": `${p.r}deg`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
