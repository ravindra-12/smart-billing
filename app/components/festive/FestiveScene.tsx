"use client";

// Festival hero 3D scene (React Three Fiber): three phones showing the Smart Billing Lite app (Home, Bill History,
// Inventory, as in public/hero-bg.png), the bundle's 58mm thermal printer printing a receipt, gold ₹ coins orbiting, six lit diyas around a turning rangoli platform, and
// golden sparks rising. Loaded on demand by FestiveSceneLoader, never on the server. Built only from primitives
// and canvas textures: no model, HDRI or font downloads.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#f4b942";

type Props = { active: boolean; reduced: boolean; onReady?: () => void };

function bodyFont(): string {
  return getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
}

// three.js objects are mutated in place; these helpers keep that mutation out of React-managed values.
function paintTexture(
  tex: { t: THREE.CanvasTexture; ctx: CanvasRenderingContext2D },
  width: number,
  height: number,
  scale: number,
  draw: (ctx: CanvasRenderingContext2D, font: string) => void,
) {
  tex.ctx.setTransform(scale, 0, 0, scale, 0, 0);
  tex.ctx.clearRect(0, 0, width, height);
  draw(tex.ctx, bodyFont());
  tex.t.needsUpdate = true;
}

/**
 * A canvas texture drawn in `width`×`height` units at `scale`× resolution, redrawn once web fonts have loaded
 * so text never renders in a fallback font.
 */
function useCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, font: string) => void,
  scale = 1,
  mipmaps = true,
) {
  const invalidate = useThree((s) => s.invalidate);
  const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy());
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext("2d")!;
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAnisotropy;
    if (!mipmaps) {
      // Sampled close to 1:1 (see Phone), so plain bilinear filtering is sharp; mipmaps would blend in a
      // downscaled copy and blur small text.
      t.generateMipmaps = false;
      t.minFilter = THREE.LinearFilter;
    }
    return { t, ctx };
  }, [width, height, scale, maxAnisotropy, mipmaps]);
  useEffect(() => {
    const paint = () => {
      paintTexture(tex, width, height, scale, draw);
      invalidate();
    };
    paint();
    let live = true;
    document.fonts?.ready.then(() => live && paint());
    return () => {
      live = false;
      tex.t.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex, invalidate]);
  return tex.t;
}

/** Soft radial glow sprite (white core fading to warm gold), shared by sparks and diya halos. */
function useGlowTexture() {
  const t = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,226,150,0.75)");
    grad.addColorStop(1, "rgba(255,190,70,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => t.dispose(), [t]);
  return t;
}

// ---------- Camera ----------

const CAMERA_FOV = 38;
/** Framed so the whole rangoli platform, the three phones and the coins fit inside the square canvas. */
const CAMERA_POS: [number, number, number] = [0, 2.55, 7.9];
const LOOK_AT_Y = 1.15;

// ---------- Smartphones (three app screens, as in public/hero-bg.png) ----------

// Screen: 1.08 × 2.33 world units → drawn at 500 × 1078 canvas units (same aspect).
const SCREEN_W = 1.08;
const SCREEN_H = 2.33;
const SW = 500;
const SH = 1078;

// App palette (the Smart Billing Lite app UI, as in public/hero-bg.png)
const APP_BG = "#f3f4fb";
const APP_INK = "#1f2140";
const APP_MUTED = "#8a8fa8";
const APP_PURPLE = "#5b3df5";
const APP_GREEN = "#16a34a";
const APP_RED = "#e5383b";

type Ctx = CanvasRenderingContext2D;

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill?: string | CanvasGradient, stroke?: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

/** White card with a soft shadow. */
function card(ctx: Ctx, x: number, y: number, w: number, h: number, r = 22) {
  ctx.save();
  ctx.shadowColor = "rgba(40,30,120,0.10)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  roundRect(ctx, x, y, w, h, r, "#fff");
  ctx.restore();
}

function text(ctx: Ctx, value: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = "left") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(value, x, y);
  ctx.textAlign = "left";
}

function vGrad(ctx: Ctx, y0: number, y1: number, top: string, bottom: string) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  return g;
}

// ---------- Vector icons (flat illustrations in the reference's colours) ----------

type IconName =
  | "cart" | "boxes" | "tools" | "cloche" | "people" | "card" | "bars" | "dues" | "tag" | "sparkle"
  | "cube" | "bellRed" | "notebook" | "box";

/** Draws icon `name` centred on (cx, cy), `s` pixels across. */
function icon(ctx: Ctx, name: IconName, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s); // draw in a −0.5…0.5 box
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  switch (name) {
    case "cart": {
      ctx.fillStyle = vGrad(ctx, -0.3, 0.2, "#8b5cf6", "#6d28d9");
      ctx.beginPath();
      ctx.moveTo(-0.3, -0.26);
      ctx.lineTo(0.48, -0.26);
      ctx.lineTo(0.36, 0.14);
      ctx.lineTo(-0.2, 0.14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#6d28d9";
      ctx.lineWidth = 0.09;
      ctx.beginPath();
      ctx.moveTo(-0.5, -0.4);
      ctx.lineTo(-0.36, -0.4);
      ctx.lineTo(-0.2, 0.14);
      ctx.lineTo(0.36, 0.14);
      ctx.stroke();
      ctx.fillStyle = "#4c1d95";
      [-0.12, 0.3].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 0.34, 0.09, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }
    case "boxes": {
      const box = (x: number, y: number) => {
        roundRect(ctx, x - 0.19, y - 0.19, 0.38, 0.38, 0.05, vGrad(ctx, y - 0.19, y + 0.19, "#fbbf24", "#f59e0b"));
        ctx.fillStyle = "#fde68a";
        ctx.fillRect(x - 0.05, y - 0.19, 0.1, 0.16);
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 0.025;
        ctx.strokeRect(x - 0.19, y - 0.19, 0.38, 0.38);
      };
      box(-0.2, 0.21);
      box(0.2, 0.21);
      box(0, -0.2);
      break;
    }
    case "tools": {
      // Screwdriver (top-left → bottom-right)
      ctx.save();
      ctx.rotate(Math.PI / 4);
      roundRect(ctx, -0.035, -0.48, 0.07, 0.5, 0.03, "#1e3a8a");
      roundRect(ctx, -0.11, 0.02, 0.22, 0.44, 0.1, vGrad(ctx, 0, 0.46, "#60a5fa", "#2563eb"));
      ctx.restore();
      // Wrench (top-right → bottom-left)
      ctx.save();
      ctx.rotate(-Math.PI / 4);
      roundRect(ctx, -0.075, -0.3, 0.15, 0.74, 0.07, vGrad(ctx, -0.3, 0.44, "#3b82f6", "#1d4ed8"));
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(0, -0.34, 0.17, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillRect(-0.06, -0.54, 0.12, 0.2);
      ctx.restore();
      break;
    }
    case "cloche": {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 0.05;
      [-0.16, 0, 0.16].forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x, -0.28);
        ctx.quadraticCurveTo(x + 0.07, -0.36, x, -0.42);
        ctx.quadraticCurveTo(x - 0.07, -0.48, x, -0.54);
        ctx.stroke();
      });
      ctx.fillStyle = vGrad(ctx, -0.2, 0.2, "#fdba74", "#f97316");
      ctx.beginPath();
      ctx.arc(0, 0.2, 0.38, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff7ed";
      ctx.beginPath();
      ctx.ellipse(-0.14, -0.02, 0.06, 0.12, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ea580c";
      ctx.beginPath();
      ctx.arc(0, -0.2, 0.06, 0, Math.PI * 2);
      ctx.fill();
      roundRect(ctx, -0.5, 0.2, 1, 0.1, 0.05, "#ea580c");
      break;
    }
    case "people": {
      const person = (x: number, y: number, r: number, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y - r * 1.25, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y + r * 1.5, r * 1.8, r * 1.5, 0, Math.PI, 0);
        ctx.fill();
      };
      person(-0.28, 0.02, 0.11, "#a78bfa");
      person(0.28, 0.02, 0.11, "#a78bfa");
      person(0, 0.0, 0.15, "#6d28d9");
      break;
    }
    case "card": {
      roundRect(ctx, -0.42, -0.36, 0.84, 0.56, 0.08, "#86efac");
      roundRect(ctx, -0.48, -0.24, 0.96, 0.6, 0.08, vGrad(ctx, -0.24, 0.36, "#4ade80", "#16a34a"));
      ctx.fillStyle = "#166534";
      ctx.fillRect(-0.48, -0.12, 0.96, 0.12);
      roundRect(ctx, 0.08, 0.12, 0.28, 0.12, 0.03, "rgba(255,255,255,0.75)");
      break;
    }
    case "bars": {
      [
        [-0.3, 0.38, "#a78bfa"],
        [0, 0.72, "#6d28d9"],
        [0.3, 0.54, "#7c3aed"],
      ].forEach(([x, h, c]) => roundRect(ctx, (x as number) - 0.1, 0.38 - (h as number), 0.2, h as number, 0.06, c as string));
      break;
    }
    case "dues": {
      // Coin
      ctx.fillStyle = vGrad(ctx, -0.45, 0.05, "#fde047", "#f59e0b");
      ctx.beginPath();
      ctx.arc(0.04, -0.2, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 0.035;
      ctx.stroke();
      ctx.fillStyle = "#b45309";
      ctx.font = "900 0.32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("₹", 0.04, -0.18);
      // Open hand underneath
      ctx.fillStyle = vGrad(ctx, 0.08, 0.42, "#fdba74", "#f97316");
      ctx.beginPath();
      ctx.moveTo(-0.5, 0.18);
      ctx.quadraticCurveTo(-0.3, 0.06, -0.08, 0.14);
      ctx.lineTo(0.28, 0.14);
      ctx.quadraticCurveTo(0.38, 0.17, 0.28, 0.22);
      ctx.lineTo(0.0, 0.24);
      ctx.lineTo(0.42, 0.08);
      ctx.quadraticCurveTo(0.52, 0.1, 0.46, 0.2);
      ctx.lineTo(0.1, 0.4);
      ctx.lineTo(-0.5, 0.4);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "tag": {
      ctx.rotate(-Math.PI / 5);
      ctx.fillStyle = vGrad(ctx, -0.3, 0.3, "#fb7185", "#e11d48");
      ctx.beginPath();
      ctx.moveTo(-0.48, 0);
      ctx.lineTo(-0.24, -0.26);
      ctx.lineTo(0.42, -0.26);
      ctx.quadraticCurveTo(0.48, -0.26, 0.48, -0.2);
      ctx.lineTo(0.48, 0.2);
      ctx.quadraticCurveTo(0.48, 0.26, 0.42, 0.26);
      ctx.lineTo(-0.24, 0.26);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(-0.24, 0, 0.055, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "900 0.34px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("%", 0.13, 0.02);
      break;
    }
    case "sparkle": {
      const star = (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y - r);
        ctx.quadraticCurveTo(x + r * 0.16, y - r * 0.16, x + r, y);
        ctx.quadraticCurveTo(x + r * 0.16, y + r * 0.16, x, y + r);
        ctx.quadraticCurveTo(x - r * 0.16, y + r * 0.16, x - r, y);
        ctx.quadraticCurveTo(x - r * 0.16, y - r * 0.16, x, y - r);
        ctx.fill();
      };
      ctx.fillStyle = vGrad(ctx, -0.45, 0.45, "#60a5fa", "#2563eb");
      star(-0.06, 0.06, 0.42);
      ctx.fillStyle = "#93c5fd";
      star(0.32, -0.32, 0.15);
      break;
    }
    case "cube":
    case "box": {
      const [top, left, right] = name === "cube" ? ["#86efac", "#22c55e", "#16a34a"] : ["#fde68a", "#fbbf24", "#f59e0b"];
      const face = (pts: number[][], c: string) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
      };
      face([[0, -0.46], [0.42, -0.24], [0, -0.02], [-0.42, -0.24]], top);
      face([[-0.42, -0.24], [0, -0.02], [0, 0.46], [-0.42, 0.24]], left);
      face([[0.42, -0.24], [0, -0.02], [0, 0.46], [0.42, 0.24]], right);
      if (name === "box") {
        face([[-0.12, -0.4], [0.3, -0.18], [0.3, 0.02], [0.2, -0.03], [0.2, -0.13], [-0.22, -0.35]], "#fef3c7");
      }
      break;
    }
    case "bellRed": {
      ctx.fillStyle = vGrad(ctx, -0.4, 0.3, "#f87171", "#dc2626");
      ctx.beginPath();
      ctx.moveTo(-0.34, 0.24);
      ctx.quadraticCurveTo(-0.26, 0.12, -0.26, -0.06);
      ctx.quadraticCurveTo(-0.26, -0.38, 0, -0.38);
      ctx.quadraticCurveTo(0.26, -0.38, 0.26, -0.06);
      ctx.quadraticCurveTo(0.26, 0.12, 0.34, 0.24);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0.33, 0.09, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -0.42, 0.05, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "notebook": {
      roundRect(ctx, -0.32, -0.42, 0.64, 0.84, 0.06, vGrad(ctx, -0.42, 0.42, "#4f6bed", "#3341b8"));
      ctx.fillStyle = "#1e2a78";
      ctx.fillRect(-0.32, -0.42, 0.1, 0.84);
      roundRect(ctx, -0.08, -0.22, 0.3, 0.12, 0.03, "rgba(255,255,255,0.85)");
      break;
    }
  }
  ctx.restore();
}

/** Thin outline glyphs (white or grey) used in headers, search and chips. */
function bellOutline(ctx: Ctx, cx: number, cy: number, s: number, color: string) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.09;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-0.36, 0.24);
  ctx.quadraticCurveTo(-0.26, 0.12, -0.26, -0.06);
  ctx.quadraticCurveTo(-0.26, -0.38, 0, -0.38);
  ctx.quadraticCurveTo(0.26, -0.38, 0.26, -0.06);
  ctx.quadraticCurveTo(0.26, 0.12, 0.36, 0.24);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0.36, 0.08, 0, Math.PI);
  ctx.stroke();
  ctx.restore();
}

function magnifier(ctx: Ctx, cx: number, cy: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx - 2, cy - 2, 8, 0, Math.PI * 2);
  ctx.moveTo(cx + 4, cy + 4);
  ctx.lineTo(cx + 10, cy + 10);
  ctx.stroke();
}

function personOutline(ctx: Ctx, cx: number, cy: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(cx, cy - 5, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy + 10, 9, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
}

// ---------- Shared screen chrome ----------

/** Clips to the rounded screen, fills the app background and the purple header of height `headerH`. */
function screenBase(ctx: Ctx, headerH: number) {
  ctx.beginPath();
  ctx.roundRect(0, 0, SW, SH, 58);
  ctx.clip();
  ctx.fillStyle = APP_BG;
  ctx.fillRect(0, 0, SW, SH);
  const head = ctx.createLinearGradient(0, 0, SW * 0.6, headerH);
  head.addColorStop(0, "#3d22d6");
  head.addColorStop(1, "#5b33ee");
  ctx.fillStyle = head;
  ctx.fillRect(0, 0, SW, headerH);
}

/** Time on the left; Wi-Fi, signal and battery on the right. */
function statusBar(ctx: Ctx, time: string, font: string) {
  text(ctx, time, 44, 48, `600 22px ${font}`, "#fff");
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  [7, 13, 19].forEach((r) => {
    ctx.beginPath();
    ctx.arc(356, 47, r, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.arc(356, 46, 2.5, 0, Math.PI * 2);
  ctx.fill();
  [6, 10, 14, 18].forEach((h, i) => roundRect(ctx, 380 + i * 7, 48 - h, 4.5, h, 1.5, "#fff"));
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(416, 31, 36, 18, 5);
  ctx.stroke();
  roundRect(ctx, 419, 34, 27, 12, 2.5, "#fff");
  roundRect(ctx, 453, 37, 3, 6, 1, "#fff");
}

/** Round translucent header button with a glyph (←, +). */
function headerButton(ctx: Ctx, x: number, glyph: string, font: string) {
  ctx.beginPath();
  ctx.arc(x, 128, 26, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fill();
  text(ctx, glyph, x, 138, `700 28px ${font}`, "#fff", "center");
}

function homeIndicator(ctx: Ctx) {
  roundRect(ctx, SW / 2 - 70, SH - 16, 140, 7, 4, "rgba(31,33,64,0.55)");
}

// ---------- The three screens ----------

/** Centre phone: the Home dashboard. */
function drawHomeScreen(ctx: Ctx, font: string) {
  ctx.save();
  // The purple header runs down to the middle of the "Create New Bill" button, as in the reference.
  screenBase(ctx, 448);
  statusBar(ctx, "10:41", font);

  // Logo: a receipt with a gold swoosh
  ctx.save();
  ctx.translate(52, 124);
  ctx.rotate(-0.12);
  roundRect(ctx, -18, -26, 36, 48, 6, "#fff");
  ctx.fillStyle = "#3d5afe";
  [-14, -4, 6].forEach((y) => ctx.fillRect(-11, y, 22, 4));
  ctx.restore();
  ctx.strokeStyle = "#ffc93c";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(28, 150);
  ctx.quadraticCurveTo(52, 166, 80, 112);
  ctx.stroke();
  ctx.font = `italic 800 31px ${font}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Smart Billing", 90, 137);
  const w = ctx.measureText("Smart Billing ").width;
  ctx.fillStyle = "#ffd84d";
  ctx.fillText("Lite", 90 + w, 137);

  // Bell and avatar
  ctx.beginPath();
  ctx.arc(378, 126, 27, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fill();
  bellOutline(ctx, 378, 126, 36, "#fff");
  ctx.beginPath();
  ctx.arc(390, 110, 6, 0, Math.PI * 2);
  ctx.fillStyle = APP_RED;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(446, 126, 28, 0, Math.PI * 2);
  ctx.fillStyle = "#7c5cff";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();
  text(ctx, "M", 446, 137, `800 28px ${font}`, "#fff", "center");

  text(ctx, "Good Morning,", 32, 206, `500 22px ${font}`, "rgba(255,255,255,0.9)");
  text(ctx, "MSI Store", 32, 248, `800 34px ${font}`, "#fff");

  // Today's numbers
  roundRect(ctx, 22, 272, 456, 108, 22, "rgba(255,255,255,0.13)", "rgba(255,255,255,0.3)");
  [
    ["Today's Sales", "₹8,450"],
    ["Bills", "24"],
    ["Outstanding", "₹3,200"],
  ].forEach(([label, value], i) => {
    const x = 98 + i * 152;
    text(ctx, label, x, 312, `500 18px ${font}`, "rgba(255,255,255,0.85)", "center");
    text(ctx, value, x, 357, `700 31px ${font}`, "#fff", "center");
  });
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillRect(174, 294, 2, 64);
  ctx.fillRect(326, 294, 2, 64);

  // Create New Bill + QR
  ctx.save();
  ctx.shadowColor = "rgba(91,61,245,0.5)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  const btn = ctx.createLinearGradient(22, 0, 386, 0);
  btn.addColorStop(0, "#4527e6");
  btn.addColorStop(1, "#6f45fb");
  roundRect(ctx, 22, 408, 366, 80, 28, btn);
  ctx.restore();
  roundRect(ctx, 22, 408, 366, 80, 28, undefined, "rgba(255,255,255,0.25)");
  text(ctx, "+  Create New Bill", 205, 459, `700 28px ${font}`, "#fff", "center");
  card(ctx, 400, 408, 78, 80, 24);
  ctx.strokeStyle = APP_PURPLE;
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  [
    [419, 427],
    [443, 427],
    [419, 451],
  ].forEach(([x, y]) => ctx.strokeRect(x, y, 16, 16));
  ctx.fillStyle = APP_PURPLE;
  [
    [445, 453],
    [453, 461],
    [445, 461],
  ].forEach(([x, y]) => ctx.fillRect(x, y, 6, 6));

  // Feature tiles
  const tiles: [IconName, string][] = [
    ["cart", "New Bill"],
    ["boxes", "Inventory"],
    ["tools", "Services"],
    ["cloche", "Restaurant"],
    ["people", "Customers"],
    ["card", "Payments"],
  ];
  tiles.forEach(([name, label], i) => {
    const x = 22 + (i % 3) * 157;
    const y = 514 + Math.floor(i / 3) * 146;
    card(ctx, x, y, 142, 130);
    icon(ctx, name, x + 71, y + 54, 58);
    text(ctx, label, x + 71, y + 112, `700 21px ${font}`, APP_INK, "center");
  });

  text(ctx, "More", 26, 836, `800 29px ${font}`, APP_INK);
  const more: [IconName, string][] = [
    ["bars", "Reports"],
    ["dues", "Dues"],
    ["tag", "Offers"],
    ["sparkle", "AI"],
  ];
  more.forEach(([name, label], i) => {
    const x = 22 + i * 117.3;
    card(ctx, x, 852, 104, 106, 20);
    icon(ctx, name, x + 52, 892, 46);
    text(ctx, label, x + 52, 942, `700 19px ${font}`, APP_INK, "center");
  });

  // Bottom navigation
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 974, SW, SH - 974);
  ctx.fillStyle = "rgba(31,33,64,0.07)";
  ctx.fillRect(0, 974, SW, 2);
  roundRect(ctx, 22, 984, 78, 74, 18, "#ebe6ff");
  ["Home", "Bills", "Inventory", "Customers", "More"].forEach((label, i) => {
    const x = 61 + i * 94.5;
    const color = i === 0 ? APP_PURPLE : "#4b5068";
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.6;
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (i === 0) {
      ctx.moveTo(x - 14, 1012);
      ctx.lineTo(x, 999);
      ctx.lineTo(x + 14, 1012);
      ctx.lineTo(x + 14, 1027);
      ctx.lineTo(x + 4, 1027);
      ctx.lineTo(x + 4, 1018);
      ctx.lineTo(x - 4, 1018);
      ctx.lineTo(x - 4, 1027);
      ctx.lineTo(x - 14, 1027);
      ctx.closePath();
      ctx.fill();
    } else if (i === 1) {
      ctx.roundRect(x - 11, 998, 22, 29, 3);
      ctx.stroke();
      [1006, 1012, 1018].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(x - 6, y);
        ctx.lineTo(x + 6, y);
        ctx.stroke();
      });
    } else if (i === 2) {
      ctx.moveTo(x, 998);
      ctx.lineTo(x + 13, 1005);
      ctx.lineTo(x + 13, 1020);
      ctx.lineTo(x, 1027);
      ctx.lineTo(x - 13, 1020);
      ctx.lineTo(x - 13, 1005);
      ctx.closePath();
      ctx.moveTo(x - 13, 1005);
      ctx.lineTo(x, 1012);
      ctx.lineTo(x + 13, 1005);
      ctx.moveTo(x, 1012);
      ctx.lineTo(x, 1027);
      ctx.stroke();
    } else if (i === 3) {
      ctx.arc(x - 5, 1005, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 9, 1007, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x - 5, 1027, 11, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 10, 1027, 8, Math.PI * 1.2, Math.PI * 1.95);
      ctx.stroke();
    } else {
      [
        [-7, -7],
        [7, -7],
        [-7, 7],
        [7, 7],
      ].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(x + dx, 1012 + dy, 5, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
    text(ctx, label, x, 1050, `${i === 0 ? 700 : 500} 16px ${font}`, color, "center");
  });
  homeIndicator(ctx);
  ctx.restore();
}

/** Left phone: Bill History. */
function drawBillsScreen(ctx: Ctx, font: string) {
  ctx.save();
  screenBase(ctx, 230);
  statusBar(ctx, "11:57", font);
  headerButton(ctx, 50, "←", font);
  text(ctx, "Bill History", SW / 2, 140, `700 31px ${font}`, "#fff", "center");
  roundRect(ctx, 0, 198, SW, SH, 30, APP_BG);

  // Search
  roundRect(ctx, 22, 224, 456, 62, 31, "#fff", "#e1e3ef");
  magnifier(ctx, 56, 255, "#7c819c");
  text(ctx, "Search bill, customer...", 84, 262, `500 20px ${font}`, "#8f94ad");

  // Summary
  const sum = ctx.createLinearGradient(22, 0, 478, 0);
  sum.addColorStop(0, "#4527e6");
  sum.addColorStop(1, "#6f45fb");
  roundRect(ctx, 22, 306, 456, 112, 22, sum);
  text(ctx, "209", 136, 358, `700 38px ${font}`, "#fff", "center");
  text(ctx, "Total Bills", 136, 392, `500 19px ${font}`, "rgba(255,255,255,0.9)", "center");
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillRect(249, 330, 2, 64);
  text(ctx, "₹48,250", 364, 358, `700 38px ${font}`, "#fff", "center");
  text(ctx, "This Month", 364, 392, `500 19px ${font}`, "rgba(255,255,255,0.9)", "center");

  const bills = [
    ["BILL-000530", "15 Oct 2026 · 01:26", "UPI", "₹450"],
    ["BILL-000529", "14 Oct 2026 · 17:09", "Cash", "₹1,280"],
    ["BILL-000528", "13 Oct 2026 · 20:24", "Cash", "₹760"],
  ];
  bills.forEach(([no, date, mode, amount], i) => {
    const y = 440 + i * 196;
    card(ctx, 22, y, 456, 178);
    text(ctx, no, 46, y + 48, `700 26px ${font}`, APP_INK);
    text(ctx, amount, 454, y + 48, `800 26px ${font}`, APP_GREEN, "right");
    text(ctx, date, 46, y + 82, `500 19px ${font}`, APP_MUTED);
    text(ctx, "Paid", 454, y + 82, `600 17px ${font}`, APP_GREEN, "right");
    personOutline(ctx, 56, y + 113, "#4b5068");
    text(ctx, "Walk-in Customer", 76, y + 121, `600 21px ${font}`, APP_INK);
    ctx.font = `700 18px ${font}`;
    const chipW = ctx.measureText(mode).width + 50;
    roundRect(ctx, 46, y + 136, chipW, 32, 16, "#ebe6ff");
    ctx.strokeStyle = APP_PURPLE;
    ctx.lineWidth = 2;
    if (mode === "UPI") {
      ctx.beginPath();
      ctx.arc(64, y + 152, 6, 0, Math.PI * 2);
      ctx.moveTo(60, y + 152);
      ctx.lineTo(68, y + 152);
      ctx.stroke();
    } else {
      ctx.strokeRect(57, y + 146, 15, 11);
    }
    text(ctx, mode, 80, y + 158, `700 18px ${font}`, APP_PURPLE);
  });
  homeIndicator(ctx);
  ctx.restore();
}

/** Right phone: Inventory. */
function drawInventoryScreen(ctx: Ctx, font: string) {
  ctx.save();
  screenBase(ctx, 230);
  statusBar(ctx, "11:58", font);
  headerButton(ctx, 50, "←", font);
  headerButton(ctx, 450, "+", font);
  text(ctx, "Inventory", SW / 2, 140, `700 31px ${font}`, "#fff", "center");
  roundRect(ctx, 0, 198, SW, SH, 30, APP_BG);

  // Summary tiles
  roundRect(ctx, 22, 226, 216, 170, 22, "#dcf5e3", "#bfe9cb");
  icon(ctx, "cube", 130, 268, 44);
  text(ctx, "326", 130, 340, `700 40px ${font}`, APP_INK, "center");
  text(ctx, "Products", 130, 374, `600 21px ${font}`, APP_INK, "center");
  roundRect(ctx, 262, 226, 216, 170, 22, "#fde4e4", "#f8caca");
  icon(ctx, "bellRed", 370, 268, 44);
  text(ctx, "8", 370, 340, `700 40px ${font}`, APP_INK, "center");
  text(ctx, "Low Stock", 370, 374, `600 21px ${font}`, APP_INK, "center");

  const items: [IconName, string, string, boolean][] = [
    ["box", "Shampoo 200 ml", "Stock: 45 pcs", false],
    ["notebook", "Notebook", "Stock: 6 pcs", true],
    ["box", "Mobile Charger", "Stock: 82 pcs", false],
  ];
  items.forEach(([name, label, stock, low], i) => {
    const y = 418 + i * 132;
    card(ctx, 22, y, 456, 116, 20);
    icon(ctx, name, 70, y + 58, 46);
    text(ctx, label, 112, y + 50, `700 23px ${font}`, APP_INK);
    text(ctx, stock, 112, y + 84, `600 21px ${font}`, low ? APP_RED : APP_GREEN);
    ctx.strokeStyle = "#8f94ad";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(446, y + 48);
    ctx.lineTo(456, y + 58);
    ctx.lineTo(446, y + 68);
    ctx.stroke();
  });
  homeIndicator(ctx);
  ctx.restore();
}

type ScreenDraw = (ctx: Ctx, font: string) => void;

/** A phone in a silver frame (as in the reference image) showing one app screen. */
/** Distance from the camera to the centre phone, used to size the screen textures. */
const PHONE_VIEW_DISTANCE = 7.7;

function Phone({ draw }: { draw: ScreenDraw }) {
  // Draw the screen at about 1.4× the pixels it covers on screen (recomputed on resize, in 0.25 steps), so it is
  // sampled near 1:1 without mipmaps: crisp text at any canvas size or pixel density.
  const resolution = useThree((s) => {
    const visibleH = 2 * PHONE_VIEW_DISTANCE * Math.tan((CAMERA_FOV * Math.PI) / 360);
    const screenPx = (SCREEN_W / visibleH) * s.size.height * s.viewport.dpr;
    return Math.min(2.5, Math.max(0.5, Math.round(((screenPx * 1.4) / SW) * 4) / 4));
  });
  const screen = useCanvasTexture(SW, SH, draw, resolution, false);
  const frame = { color: "#d9dbe8", metalness: 0.9, roughness: 0.22, emissive: "#3b3f63", emissiveIntensity: 0.15 };
  return (
    <group>
      {/* Silver frame (only its rim shows: the glass body is thicker) */}
      <RoundedBox args={[1.2, 2.45, 0.075]} radius={0.13} smoothness={8}>
        <meshStandardMaterial {...frame} />
      </RoundedBox>
      {/* Black glass front and back */}
      <RoundedBox args={[1.165, 2.415, 0.1]} radius={0.12} smoothness={8}>
        <meshPhysicalMaterial color="#07080f" roughness={0.12} metalness={0.3} clearcoat={1} clearcoatRoughness={0.04} />
      </RoundedBox>
      {/* Display */}
      <mesh position={[0, 0, 0.0515]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={screen} transparent toneMapped={false} />
      </mesh>
      {/* Punch-hole camera */}
      <mesh position={[0, SCREEN_H / 2 - 0.075, 0.054]}>
        <circleGeometry args={[0.028, 24]} />
        <meshStandardMaterial color="#000" roughness={0.2} />
      </mesh>
      {/* Glass reflection: a faint mirror layer that catches the studio lights */}
      <mesh position={[0, 0, 0.0575]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.06} transparent opacity={0.025} depthWrite={false} />
      </mesh>
      {/* Side buttons */}
      <RoundedBox args={[0.025, 0.3, 0.045]} radius={0.01} smoothness={3} position={[0.605, 0.45, 0]}>
        <meshStandardMaterial {...frame} />
      </RoundedBox>
      {[0.62, 0.32].map((y) => (
        <RoundedBox key={y} args={[0.025, 0.2, 0.045]} radius={0.01} smoothness={3} position={[-0.605, y, 0]}>
          <meshStandardMaterial {...frame} />
        </RoundedBox>
      ))}
    </group>
  );
}

/**
 * The three phones of the reference image: Home in front and centre, Bill History and Inventory slightly behind,
 * smaller and angled outwards, each floating on its own rhythm, with a soft purple-gold aura behind.
 */
function PhoneTrio({ reduced, glow }: { reduced: boolean; glow: THREE.Texture }) {
  const speed = reduced ? 0 : 1.2;
  return (
    <group>
      <sprite position={[0, 1.7, -0.9]} scale={[5.2, 4.2, 1]}>
        <spriteMaterial map={glow} color="#7b5cff" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>
      <sprite position={[0, 1.9, -0.7]} scale={[3, 3.6, 1]}>
        <spriteMaterial map={glow} color="#ffcc66" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>
      <Float speed={speed * 0.9} rotationIntensity={0.06} floatIntensity={0.25}>
        <group position={[-1.32, 1.62, -0.45]} rotation={[0, 0.42, -0.04]} scale={0.88}>
          <Phone draw={drawBillsScreen} />
        </group>
      </Float>
      <Float speed={speed * 0.8} rotationIntensity={0.06} floatIntensity={0.25}>
        <group position={[1.32, 1.62, -0.45]} rotation={[0, -0.42, 0.04]} scale={0.88}>
          <Phone draw={drawInventoryScreen} />
        </group>
      </Float>
      <Float speed={speed} rotationIntensity={0.05} floatIntensity={0.3}>
        <group position={[0, 1.78, 0.25]}>
          <Phone draw={drawHomeScreen} />
        </group>
      </Float>
      {/* Screen light spilling onto the platform below */}
      <pointLight position={[0, 0.4, 1]} color="#a99bff" intensity={2} distance={3} decay={2} />
    </group>
  );
}

// ---------- 58mm mobile thermal printer ----------

function drawReceipt(ctx: CanvasRenderingContext2D, font: string) {
  const W = 256;
  const H = 640;
  ctx.fillStyle = "#fffdf6";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#1c1710";
  ctx.textAlign = "center";
  ctx.font = `800 20px ${font}`;
  ctx.fillText("SMART BILLING LITE", W / 2, 46);
  ctx.font = `600 15px ${font}`;
  ctx.fillText("Festival Bumper Offer", W / 2, 70);
  const dash = (y: number) => {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#8a8271";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(18, y);
    ctx.lineTo(W - 18, y);
    ctx.stroke();
    ctx.setLineDash([]);
  };
  dash(90);
  const line = (y: number, a: string, b: string, bold = false) => {
    ctx.font = `${bold ? 800 : 500} ${bold ? 20 : 15}px ${font}`;
    ctx.textAlign = "left";
    ctx.fillText(a, 20, y);
    ctx.textAlign = "right";
    ctx.fillText(b, W - 20, y);
  };
  line(124, "Plan · 12 months", "✓");
  line(154, "Bonus · 30 days", "FREE");
  line(184, "Thermal printer", "Incl.");
  dash(208);
  line(246, "TOTAL", "₹6,500", true);
  line(276, "Paid", "UPI");
  dash(300);
  ctx.textAlign = "center";
  ctx.font = `700 17px ${font}`;
  ctx.fillText("Happy Festivals!", W / 2, 336);
  ctx.font = `500 13px ${font}`;
  ctx.fillText("Thank you for shopping", W / 2, 358);
  let x = 40;
  for (let i = 0; x < W - 40; i++) {
    const bw = 1 + ((i * 7) % 4);
    ctx.fillRect(x, 380, bw, 54);
    x += bw + 1 + ((i * 3) % 3);
  }
}

function drawPrinterLabel(ctx: CanvasRenderingContext2D, font: string) {
  ctx.fillStyle = "#102b60";
  ctx.font = `800 30px ${font}`;
  ctx.fillText("Smart Billing", 4, 40);
  ctx.fillStyle = "#c98a10";
  ctx.font = `700 20px ${font}`;
  ctx.fillText("58mm THERMAL · BT", 4, 72);
}

const PAPER_W = 0.5;
const PAPER_H = 1.25;
const PAPER_MAX = 0.74; // fraction of the receipt that ends up out of the printer
const PAPER_SEGMENTS = 30;

/** Shapes the receipt strip for print progress `p` (the fraction of the receipt out of the printer). */
function layoutReceipt(geo: THREE.PlaneGeometry, rows: number[], tex: THREE.Texture, p: number) {
  const len = PAPER_H * p;
  const pos = geo.attributes.position;
  rows.forEach((r, i) => {
    // Bend backwards, more towards the free end, like paper fresh off the roll: the point `s` along the paper
    // sits on the chord of an arc that has turned through `bend` radians.
    const s = r * len;
    const bend = (s / PAPER_H) ** 2 * 0.55;
    pos.setY(i, s * Math.cos(bend / 2));
    pos.setZ(i, -s * Math.sin(bend / 2));
  });
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  // Show the top `p` of the receipt: it is printed top first.
  tex.repeat.set(1, p);
  tex.offset.set(0, 1 - p);
}

/** The receipt strip: its bottom stays in the slot, it grows upward as it prints and curls back near the top. */
function Receipt({ reduced }: { reduced: boolean }) {
  const tex = useCanvasTexture(256, 640, drawReceipt, 2);
  const geo = useMemo(() => new THREE.PlaneGeometry(PAPER_W, PAPER_H, 1, PAPER_SEGMENTS), []);
  // Each row's position along the paper, 0 at the slot → 1 at the top edge.
  const rows = useMemo(() => {
    const pos = geo.attributes.position;
    return Array.from({ length: pos.count }, (_, i) => pos.getY(i) / PAPER_H + 0.5);
  }, [geo]);
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? PAPER_MAX : Math.min(PAPER_MAX, Math.max(0.03, ((t - 0.6) / 3.2) * PAPER_MAX));
    layoutReceipt(geo, rows, tex, p);
  });

  return (
    <mesh geometry={geo} frustumCulled={false}>
      <meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.35} roughness={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Printer({ reduced }: { reduced: boolean }) {
  const label = useCanvasTexture(256, 84, drawPrinterLabel, 2);
  const led = useRef<THREE.MeshBasicMaterial>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const printing = !reduced && t < 4;
    if (led.current) led.current.color.set(printing && Math.sin(t * 14) > 0 ? "#ffb020" : "#22c55e");
    if (ring.current) ring.current.opacity = printing ? 0.6 + Math.sin(t * 6) * 0.4 : 0.9;
  });

  const shell = { color: "#f4f6fa", roughness: 0.32, metalness: 0.02, clearcoat: 0.6, clearcoatRoughness: 0.3 };
  const teeth = Array.from({ length: 22 }, (_, i) => -0.33 + (i * 0.66) / 21);

  return (
    <group>
      {/* Rubber feet */}
      {[[-0.38, -0.32], [0.38, -0.32], [-0.38, 0.32], [0.38, 0.32]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.012, z]}>
          <cylinderGeometry args={[0.05, 0.05, 0.024, 16]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
      ))}
      {/* Navy base */}
      <RoundedBox args={[1.0, 0.18, 0.86]} radius={0.08} smoothness={4} position={[0, 0.11, 0]}>
        <meshPhysicalMaterial color="#14306b" roughness={0.35} metalness={0.15} clearcoat={0.5} />
      </RoundedBox>
      {/* Gold seam */}
      <RoundedBox args={[0.985, 0.018, 0.845]} radius={0.008} smoothness={2} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.25} emissive="#b77a06" emissiveIntensity={0.3} />
      </RoundedBox>
      {/* White shell */}
      <RoundedBox args={[0.98, 0.4, 0.84]} radius={0.14} smoothness={6} position={[0, 0.37, 0]}>
        <meshPhysicalMaterial {...shell} />
      </RoundedBox>
      {/* Charcoal clamshell lid */}
      <RoundedBox args={[0.86, 0.09, 0.54]} radius={0.04} smoothness={4} position={[0, 0.585, -0.09]}>
        <meshPhysicalMaterial color="#232838" roughness={0.28} metalness={0.25} clearcoat={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.632, -0.09]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.02]} />
        <meshStandardMaterial color="#3b4257" roughness={0.4} />
      </mesh>
      {/* Paper slot */}
      <mesh position={[0, 0.571, 0.215]}>
        <boxGeometry args={[0.6, 0.006, 0.035]} />
        <meshStandardMaterial color="#05060a" roughness={0.9} />
      </mesh>
      {/* Serrated metal tear bar */}
      <mesh position={[0, 0.58, 0.248]}>
        <boxGeometry args={[0.68, 0.018, 0.022]} />
        <meshStandardMaterial color="#c9ced8" metalness={1} roughness={0.25} />
      </mesh>
      {teeth.map((x) => (
        <mesh key={x} position={[x, 0.596, 0.252]}>
          <coneGeometry args={[0.008, 0.016, 4]} />
          <meshStandardMaterial color="#c9ced8" metalness={1} roughness={0.25} />
        </mesh>
      ))}
      {/* Front panel: label, status LED, power button with light ring */}
      <mesh position={[-0.13, 0.385, 0.4215]}>
        <planeGeometry args={[0.38, 0.125]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0.18, 0.385, 0.424]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial ref={led} color="#22c55e" toneMapped={false} />
      </mesh>
      <group position={[0.29, 0.385, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 32]} />
          <meshStandardMaterial color="#2a3042" roughness={0.35} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.011, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.05, 0.006, 8, 40]} />
          <meshBasicMaterial ref={ring} color="#60a5fa" transparent toneMapped={false} />
        </mesh>
      </group>
      {/* Receipt coming out of the slot, leaning back slightly */}
      <group position={[0, 0.574, 0.215]} rotation={[-0.1, 0, 0]}>
        <Receipt reduced={reduced} />
      </group>
    </group>
  );
}

// ---------- Coins ----------

function drawCoin(ctx: CanvasRenderingContext2D, font: string) {
  const g = ctx.createRadialGradient(54, 50, 6, 64, 64, 64);
  g.addColorStop(0, "#fff1b8");
  g.addColorStop(0.55, "#f4b942");
  g.addColorStop(1, "#b07510");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "#9a6408";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(64, 64, 50, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#7a4c05";
  ctx.font = `900 68px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("₹", 64, 68);
}

/** Where the coins float: beside and above the phones, so none ever passes in front of a screen. */
const COIN_SPOTS: [number, number, number][] = [
  [-1.95, 2.7, -0.7],
  [1.95, 2.85, -0.8],
  [-2.0, 1.2, 0.1],
  [1.98, 1.6, -0.3],
  [0, 3.15, -1.3],
  [-0.95, 3.0, -1.5],
];

function Coins({ reduced }: { reduced: boolean }) {
  const face = useCanvasTexture(128, 128, drawCoin, 2);
  // Rim from a cylinder; the two faces are flat circles, whose UVs map the ₹ upright (a cylinder's caps would
  // show it rotated 90° and mirrored on one side).
  const [rimMat, faceMat] = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#d99a22", metalness: 0.8, roughness: 0.3, emissive: "#8a5a05", emissiveIntensity: 0.3 }),
      new THREE.MeshStandardMaterial({ map: face, metalness: 0.5, roughness: 0.35, emissive: "#6b4500", emissiveIntensity: 0.25 }),
    ],
    [face],
  );
  useEffect(
    () => () => {
      rimMat.dispose();
      faceMat.dispose();
    },
    [rimMat, faceMat],
  );

  const coins = useRef<(THREE.Group | null)[]>([]);
  useFrame((_, dt) => {
    if (reduced) return;
    coins.current.forEach((c, i) => {
      if (c) c.rotation.y += dt * (0.9 + (i % 3) * 0.4); // flips like a tossed coin
    });
  });
  return (
    <group>
      {COIN_SPOTS.map((p, i) => (
        <Float key={i} speed={reduced ? 0 : 1.4 + (i % 3) * 0.3} floatIntensity={0.5} rotationIntensity={0}>
          <group position={p} scale={i >= 4 ? 0.8 : 1}>
            <group
              ref={(el) => {
                coins.current[i] = el;
              }}
              rotation={[0, i * 0.9, 0]}
            >
              <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
                <cylinderGeometry args={[0.21, 0.21, 0.05, 40, 1, true]} />
              </mesh>
              <mesh position={[0, 0, 0.026]} material={faceMat}>
                <circleGeometry args={[0.21, 40]} />
              </mesh>
              <mesh position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]} material={faceMat}>
                <circleGeometry args={[0.21, 40]} />
              </mesh>
            </group>
          </group>
        </Float>
      ))}
    </group>
  );
}

// ---------- Diyas ----------

function Diya3D({ reduced, phase = 0, glow, ...props }: { reduced: boolean; phase?: number; glow: THREE.Texture; position: [number, number, number] }) {
  const flame = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 7 + phase;
    const f = reduced ? 0 : Math.sin(t) * 0.5 + Math.sin(t * 2.3) * 0.3;
    if (flame.current) {
      flame.current.scale.set(1 - f * 0.08, 1 + f * 0.14, 1 - f * 0.08);
      flame.current.rotation.z = reduced ? 0 : Math.sin(t * 0.7) * 0.06;
    }
    if (light.current) light.current.intensity = 2.4 + f * 0.6;
  });
  return (
    <group {...props}>
      {/* Clay bowl: the lower half of a flattened sphere, with a pinched spout */}
      <mesh scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.26, 28, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#b4501d" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.022, 10, 40]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.3} emissive="#b77a06" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.24, 28]} />
        <meshStandardMaterial color="#e8a33a" roughness={0.4} />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.05, 8]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      <group ref={flame} position={[0, 0.045, 0]}>
        {/* Teardrop flame: a cone tip on a sphere base */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.042, 16, 16]} />
          <meshBasicMaterial color="#ff9d1c" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.115, 0]}>
          <coneGeometry args={[0.04, 0.12, 16]} />
          <meshBasicMaterial color="#ffb53a" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.06, 0.012]} scale={[1, 1.6, 1]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshBasicMaterial color="#fff6d0" toneMapped={false} />
        </mesh>
        {/* Soft glow halo, always facing the camera */}
        <sprite position={[0, 0.08, 0]} scale={[0.42, 0.5, 1]}>
          <spriteMaterial map={glow} color="#ffb347" transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      </group>
      <pointLight ref={light} position={[0, 0.3, 0]} color="#ffb347" intensity={2.4} distance={2.4} decay={2} />
    </group>
  );
}

// ---------- Rangoli platform ----------

function drawRangoli(ctx: CanvasRenderingContext2D) {
  const c = 256;
  ctx.save();
  ctx.translate(c, c);
  const colors = ["#f57c00", "#e3262f", "#f4b942", "#2563eb"];
  [
    { r: 200, n: 16, len: 48, color: 0 },
    { r: 140, n: 12, len: 44, color: 1 },
    { r: 84, n: 8, len: 38, color: 2 },
  ].forEach(({ r, n, len, color }) => {
    for (let i = 0; i < n; i++) {
      ctx.save();
      ctx.rotate((i / n) * Math.PI * 2);
      ctx.fillStyle = colors[(color + (i % 2)) % colors.length];
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(0, -r + len);
      ctx.bezierCurveTo(len * 0.45, -r + len * 0.55, len * 0.45, -r + len * 0.2, 0, -r);
      ctx.bezierCurveTo(-len * 0.45, -r + len * 0.2, -len * 0.45, -r + len * 0.55, 0, -r + len);
      ctx.fill();
      ctx.restore();
    }
  });
  ctx.globalAlpha = 1;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  [236, 212, 160, 100, 40].forEach((r) => {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.fillStyle = GOLD;
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 224, Math.sin(a) * 224, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Diyas sit on the rangoli's outer ring (texture radius 212/256 of the 2.4 disc), evenly spaced. */
const DIYA_RING = 2.4 * (212 / 256);
const DIYA_ANGLES = Array.from({ length: 6 }, (_, i) => Math.PI / 6 + (i * Math.PI) / 3);

function Platform({ reduced }: { reduced: boolean }) {
  const rangoli = useCanvasTexture(512, 512, drawRangoli, 2);
  const disc = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!reduced && disc.current) disc.current.rotation.z += dt * 0.12;
  });
  return (
    <group>
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[2.45, 2.55, 0.18, 64]} />
        <meshStandardMaterial color="#0d2152" metalness={0.35} roughness={0.5} />
      </mesh>
      <mesh ref={disc} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[2.4, 64]} />
        <meshStandardMaterial map={rangoli} transparent roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <torusGeometry args={[2.45, 0.04, 12, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.25} emissive="#b77a06" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// ---------- Sparks ----------

/** Golden sparks rising around the phone. */
function RisingSparks({ reduced, glow }: { reduced: boolean; glow: THREE.Texture }) {
  const COUNT = 80;
  const points = useRef<THREE.Points>(null);
  const seeds = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => ({ a: (i * 2.399) % (Math.PI * 2), r: 0.4 + ((i * 37) % 100) / 80, s: 0.35 + ((i * 13) % 10) / 14, o: (i * 0.37) % 3 })),
    [],
  );
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  useFrame(({ clock }) => {
    const t = reduced ? 1.5 : clock.elapsedTime;
    seeds.forEach((p, i) => {
      const h = ((t * p.s + p.o) % 3) / 3;
      positions[i * 3] = Math.cos(p.a + h * 1.5) * p.r;
      positions[i * 3 + 1] = 0.2 + h * 3.4;
      positions[i * 3 + 2] = Math.sin(p.a + h * 1.5) * p.r;
    });
    if (points.current) points.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={glow} color={GOLD} size={0.1} sizeAttenuation transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/** Eases the camera towards the pointer for a gentle parallax. */
function Rig({ reduced }: { reduced: boolean }) {
  // Small sway only, so the platform edges never leave the frame.
  useFrame(({ camera, pointer }, dt) => {
    if (reduced) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, CAMERA_POS[0] + pointer.x * 0.35, 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, CAMERA_POS[1] + pointer.y * 0.2, 2.5, dt);
    // Distance too: the Canvas only applies its camera prop when first created, so without this a framing change
    // would not reach an already-open scene.
    camera.position.z = THREE.MathUtils.damp(camera.position.z, CAMERA_POS[2], 2.5, dt);
    camera.lookAt(0, LOOK_AT_Y, 0);
  });
  return null;
}

/** The floor (rangoli platform and diyas) is scaled to about the width of the three phones, so it fits the frame. */
const FLOOR_SCALE = 0.82;

function SceneContent({ reduced, small }: { reduced: boolean; small: boolean }) {
  const glow = useGlowTexture();
  return (
    <>
      <Rig reduced={reduced} />
      <group scale={FLOOR_SCALE}>
        <Platform reduced={reduced} />
        {/* Six diyas evenly spaced on the rangoli's outer ring, centred on the platform */}
        {DIYA_ANGLES.map((a, i) => (
          <Diya3D key={i} reduced={reduced} glow={glow} phase={i * 1.3} position={[Math.sin(a) * DIYA_RING, 0.07, Math.cos(a) * DIYA_RING]} />
        ))}
      </group>
      <PhoneTrio reduced={reduced} glow={glow} />
      {/* The bundle's thermal printer, on the rangoli in front of the right-hand phone (between two diyas) */}
      <group position={[1.1, 0, 0.85]} rotation={[0, -0.5, 0]} scale={0.7}>
        <Printer reduced={reduced} />
      </group>
      <Coins reduced={reduced} />
      <RisingSparks reduced={reduced} glow={glow} />
      <Sparkles count={small ? 40 : 70} scale={[8, 5, 5]} position={[0, 2, -1]} size={3} speed={reduced ? 0 : 0.3} color="#ffd36b" opacity={0.85} />
      <ContactShadows position={[0, -0.15, 0]} opacity={0.5} scale={10} blur={2.6} far={4} color="#050c1f" />
    </>
  );
}

export default function FestiveScene({ active, reduced, onReady }: Props) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: CAMERA_POS, fov: CAMERA_FOV }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      onCreated={({ camera }) => {
        camera.lookAt(0, LOOK_AT_Y, 0);
        onReady?.();
      }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 5]} intensity={1.5} color="#fff4e0" />
      {/* Rim light from behind-left to outline the phone frames and printer shell */}
      <directionalLight position={[-4, 3, -4]} intensity={1.2} color="#9ec5ff" />
      <pointLight position={[-4.5, 3, 3]} intensity={30} color="#5b8def" />
      <pointLight position={[4.5, 2.5, 3]} intensity={26} color="#ff9a3c" />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 4, 4]} scale={[8, 2, 1]} color="#fff2d6" />
        <Lightformer intensity={1.5} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} color="#5b8def" />
        <Lightformer intensity={1.2} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} color="#f4b942" />
        {/* Thin vertical strip: the crisp highlight running down the phone glass */}
        <Lightformer intensity={3} position={[2, 2, 5]} rotation-y={-0.3} scale={[0.4, 6, 1]} color="#ffffff" />
      </Environment>
      <SceneContent reduced={reduced} small={small} />
    </Canvas>
  );
}
