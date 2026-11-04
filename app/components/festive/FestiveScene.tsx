"use client";

// Festival hero 3D scene (React Three Fiber): a smartphone showing the festival bill, a 58mm mobile thermal
// printer printing the receipt, gold ₹ coins orbiting, six lit diyas around a turning rangoli platform, and
// golden sparks rising. Loaded on demand by FestiveSceneLoader, never on the server. Built only from primitives
// and canvas textures: no model, HDRI or font downloads.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#f4b942";
const NAVY = "#102b60";

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
function useCanvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D, font: string) => void, scale = 1) {
  const invalidate = useThree((s) => s.invalidate);
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext("2d")!;
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { t, ctx };
  }, [width, height, scale]);
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

// ---------- Smartphone ----------

// Screen: 1.08 × 2.33 world units → drawn at 500 × 1078 canvas units (same aspect).
const SCREEN_W = 1.08;
const SCREEN_H = 2.33;
const SW = 500;
const SH = 1078;

/** A marigold toran (swags of orange/yellow flowers with hanging bells) across the top of the screen. */
function drawToran(ctx: CanvasRenderingContext2D, y: number) {
  const swag = 100;
  for (let x0 = 0; x0 < SW; x0 += swag) {
    // Mango leaves where each swag is tied
    ctx.fillStyle = "#2f7d4a";
    ctx.beginPath();
    ctx.ellipse(x0, y - 2, 12, 5, -0.5, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const fx = x0 + t * swag;
      const fy = y + Math.sin(t * Math.PI) * 26;
      ctx.fillStyle = i % 2 ? "#ffb300" : "#f57c00";
      ctx.beginPath();
      ctx.arc(fx, fy, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c25e00";
      ctx.beginPath();
      ctx.arc(fx, fy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    // Bell tassel from the lowest point
    const bx = x0 + swag / 2;
    ctx.strokeStyle = "#e0a92e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, y + 30);
    ctx.lineTo(bx, y + 50);
    ctx.stroke();
    ctx.fillStyle = "#f4b942";
    ctx.beginPath();
    ctx.moveTo(bx - 7, y + 60);
    ctx.quadraticCurveTo(bx, y + 44, bx + 7, y + 60);
    ctx.closePath();
    ctx.fill();
  }
}

/** Faint gold rangoli watermark. */
function drawMandala(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, alpha: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  [r, r * 0.82, r * 0.34].forEach((rr) => {
    ctx.beginPath();
    ctx.arc(0, 0, rr, 0, Math.PI * 2);
    ctx.stroke();
  });
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.rotate((i / 12) * Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.34);
    ctx.bezierCurveTo(r * 0.18, -r * 0.5, r * 0.18, -r * 0.7, 0, -r * 0.82);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.7, -r * 0.18, -r * 0.5, 0, -r * 0.34);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function goldGradient(ctx: CanvasRenderingContext2D, y0: number, y1: number) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, "#ffe9a3");
  g.addColorStop(0.5, "#f4b942");
  g.addColorStop(1, "#d9921f");
  return g;
}

function drawPhone(ctx: CanvasRenderingContext2D, font: string) {
  ctx.save();
  // Rounded screen corners (transparent outside), matching the glass.
  ctx.beginPath();
  ctx.roundRect(0, 0, SW, SH, 58);
  ctx.clip();

  // Festive night background, matching the hero sky
  const bg = ctx.createLinearGradient(0, 0, 0, SH);
  bg.addColorStop(0, "#14306b");
  bg.addColorStop(0.45, "#0b1c46");
  bg.addColorStop(1, "#06112e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SW, SH);
  const glow = ctx.createRadialGradient(SW / 2, 250, 0, SW / 2, 250, 320);
  glow.addColorStop(0, "rgba(37,99,235,0.55)");
  glow.addColorStop(1, "rgba(37,99,235,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SW, SH);
  drawMandala(ctx, SW / 2, 1010, 230, 0.16);
  // Scattered stars
  ctx.fillStyle = "#ffe7a8";
  for (let i = 0; i < 26; i++) {
    const x = (i * 137) % SW;
    const y = 110 + ((i * 89) % 140);
    ctx.globalAlpha = 0.25 + (i % 4) * 0.15;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Status bar
  ctx.fillStyle = "#fff";
  ctx.font = `700 22px ${font}`;
  ctx.fillText("9:41", 44, 48);
  [8, 12, 16, 20].forEach((h, i) => ctx.fillRect(372 + i * 8, 48 - h, 5, h));
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(412, 30, 38, 19, 5);
  ctx.stroke();
  ctx.fillRect(415, 33, 28, 13);
  ctx.fillRect(451, 36, 3, 7);

  drawToran(ctx, 72);

  // Title
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = `800 40px ${font}`;
  ctx.fillText("Smart Billing Lite", SW / 2, 186);
  ctx.fillStyle = goldGradient(ctx, 204, 248);
  ctx.beginPath();
  ctx.roundRect(SW / 2 - 150, 204, 300, 44, 22);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = `800 21px ${font}`;
  ctx.fillText("✦ FESTIVAL BUMPER OFFER ✦", SW / 2, 233);
  ctx.textAlign = "left";

  // Bill card: cream with a gold border
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "#fffaf0";
  ctx.beginPath();
  ctx.roundRect(26, 276, SW - 52, 446, 30);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgba(201,138,16,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(36, 286, SW - 72, 426, 22);
  ctx.stroke();

  ctx.fillStyle = "#9a6408";
  ctx.font = `700 19px ${font}`;
  ctx.fillText("FESTIVAL BUNDLE BILL", 58, 326);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(16,43,96,0.45)";
  ctx.font = `600 19px ${font}`;
  ctx.fillText("#2026", SW - 58, 326);
  ctx.textAlign = "left";
  const rows: [string, string, string][] = [
    ["App access · 12 months", "✓", NAVY],
    ["Festival bonus · 30 days", "FREE", "#13a58c"],
    ["Mobile thermal printer", "Included", "#13a58c"],
  ];
  rows.forEach(([label, value, color], i) => {
    const y = 380 + i * 54;
    ctx.fillStyle = NAVY;
    ctx.font = `600 22px ${font}`;
    ctx.fillText(label, 58, y);
    ctx.fillStyle = color;
    ctx.font = `800 22px ${font}`;
    ctx.textAlign = "right";
    ctx.fillText(value, SW - 58, y);
    ctx.textAlign = "left";
  });
  ctx.strokeStyle = "rgba(154,100,8,0.35)";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(58, 528);
  ctx.lineTo(SW - 58, 528);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(16,43,96,0.5)";
  ctx.font = `600 22px ${font}`;
  ctx.fillText("Regular price", 58, 574);
  ctx.textAlign = "right";
  ctx.fillText("₹12,000", SW - 58, 574);
  const w = ctx.measureText("₹12,000").width;
  ctx.fillRect(SW - 58 - w, 566, w, 2.5);
  ctx.textAlign = "left";
  // Festival price on a gold strip
  ctx.fillStyle = goldGradient(ctx, 604, 694);
  ctx.beginPath();
  ctx.roundRect(46, 604, SW - 92, 90, 20);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = `800 24px ${font}`;
  ctx.fillText("Festival price", 70, 658);
  ctx.font = `900 50px ${font}`;
  ctx.textAlign = "right";
  ctx.fillText("₹6,500", SW - 70, 668);
  ctx.textAlign = "left";

  // Paid banner
  ctx.fillStyle = "rgba(19,165,140,0.18)";
  ctx.strokeStyle = "rgba(52,211,153,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(26, 750, SW - 52, 92, 26);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#13a58c";
  ctx.beginPath();
  ctx.arc(82, 796, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(70, 797);
  ctx.lineTo(79, 806);
  ctx.lineTo(95, 787);
  ctx.stroke();
  ctx.fillStyle = "#6ee7b7";
  ctx.font = `800 26px ${font}`;
  ctx.fillText("Paid via UPI", 130, 792);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `600 18px ${font}`;
  ctx.fillText("Printing receipt…", 130, 820);

  // Gold action button
  ctx.shadowColor = "rgba(244,185,66,0.55)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = goldGradient(ctx, 884, 976);
  ctx.beginPath();
  ctx.roundRect(26, 884, SW - 52, 92, 46);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = NAVY;
  ctx.font = `800 28px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText("Share & Print Bill", SW / 2, 940);
  ctx.textAlign = "left";

  // Home indicator
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.beginPath();
  ctx.roundRect(SW / 2 - 70, SH - 22, 140, 7, 4);
  ctx.fill();
  ctx.restore();
}

function Phone({ glow }: { glow: THREE.Texture }) {
  const screen = useCanvasTexture(SW, SH, drawPhone, 2);
  // Polished gold edge band; a little emissive so it reads gold, not brown, against the dark sky.
  const gold = { color: "#f2c66d", metalness: 0.9, roughness: 0.18, emissive: "#8a5a05", emissiveIntensity: 0.35 };
  return (
    <group>
      {/* Gold-blue aura behind the phone */}
      <sprite position={[0, 0, -0.35]} scale={[3.2, 3.9, 1]}>
        <spriteMaterial map={glow} color="#ffcc66" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>
      <sprite position={[0, 0.2, -0.4]} scale={[2.2, 2.8, 1]}>
        <spriteMaterial map={glow} color="#5b8def" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>

      {/* Gold edge band (only its rim shows: the glass body is thicker) */}
      <RoundedBox args={[1.2, 2.45, 0.075]} radius={0.13} smoothness={8}>
        <meshStandardMaterial {...gold} />
      </RoundedBox>
      {/* Deep navy glass body, front and back */}
      <RoundedBox args={[1.165, 2.415, 0.1]} radius={0.12} smoothness={8}>
        <meshPhysicalMaterial color="#0a1430" roughness={0.12} metalness={0.3} clearcoat={1} clearcoatRoughness={0.04} />
      </RoundedBox>
      {/* Display */}
      <mesh position={[0, 0, 0.0515]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={screen} transparent toneMapped={false} />
      </mesh>
      {/* Dynamic Island */}
      <RoundedBox args={[0.3, 0.075, 0.004]} radius={0.0375} smoothness={4} position={[0, SCREEN_H / 2 - 0.075, 0.054]}>
        <meshStandardMaterial color="#000" roughness={0.3} />
      </RoundedBox>
      {/* Glass reflection: a faint mirror layer that catches the studio lights */}
      <mesh position={[0, 0, 0.0575]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.06} transparent opacity={0.06} depthWrite={false} />
      </mesh>
      {/* Side buttons */}
      <RoundedBox args={[0.025, 0.3, 0.045]} radius={0.01} smoothness={3} position={[0.605, 0.45, 0]}>
        <meshStandardMaterial {...gold} />
      </RoundedBox>
      {[0.62, 0.32].map((y) => (
        <RoundedBox key={y} args={[0.025, 0.2, 0.045]} radius={0.01} smoothness={3} position={[-0.605, y, 0]}>
          <meshStandardMaterial {...gold} />
        </RoundedBox>
      ))}
      {/* Rear camera module with gold-ringed lenses */}
      <group position={[-0.3, 0.86, -0.058]}>
        <RoundedBox args={[0.42, 0.42, 0.03]} radius={0.09} smoothness={4}>
          <meshPhysicalMaterial color="#14214a" roughness={0.2} clearcoat={1} />
        </RoundedBox>
        {[[-0.09, 0.09], [0.09, -0.09], [-0.09, -0.09]].map(([x, y], i) => (
          <group key={i} position={[x, y, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.072, 0.03, 32]} />
              <meshStandardMaterial {...gold} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.032, 32]} />
              <meshStandardMaterial color="#05070d" metalness={0.6} roughness={0.1} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Screen light spilling onto the platform below */}
      <pointLight position={[0, -0.6, 0.5]} color="#9ec5ff" intensity={1.6} distance={2.5} decay={2} />
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
  ctx.fillStyle = NAVY;
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
      {/* Lid hinge line and release grip */}
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

  const ring = useRef<THREE.Group>(null);
  const coins = useRef<(THREE.Group | null)[]>([]);
  const seeds = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ a: (i / 7) * Math.PI * 2, y: 0.9 + ((i * 5) % 7) * 0.28, s: 0.9 + (i % 3) * 0.4 })), []);
  useFrame((_, dt) => {
    if (reduced) return;
    if (ring.current) ring.current.rotation.y += dt * 0.22;
    coins.current.forEach((c, i) => {
      if (c) c.rotation.y += dt * seeds[i].s; // flips like a tossed coin
    });
  });
  return (
    <group ref={ring}>
      {seeds.map((s, i) => (
        <Float key={i} speed={reduced ? 0 : 1.6} floatIntensity={0.4} rotationIntensity={0}>
          <group position={[Math.sin(s.a) * 2.15, s.y, Math.cos(s.a) * 2.15]} rotation={[0, s.a, 0]}>
            <group
              ref={(el) => {
                coins.current[i] = el;
              }}
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
  useFrame(({ camera, pointer }, dt) => {
    if (reduced) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.9, 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 2.2 + pointer.y * 0.5, 2.5, dt);
    camera.lookAt(0, 1.15, 0);
  });
  return null;
}

function SceneContent({ reduced, small }: { reduced: boolean; small: boolean }) {
  const glow = useGlowTexture();
  return (
    <>
      <Rig reduced={reduced} />
      <Platform reduced={reduced} />
      <Float speed={reduced ? 0 : 1.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[-0.45, 1.78, 0]} rotation={[-0.06, 0.32, 0.02]}>
          <Phone glow={glow} />
        </group>
      </Float>
      <group position={[1.22, 0, 0.5]} rotation={[0, -0.5, 0]}>
        <Printer reduced={reduced} />
      </group>
      {/* Six diyas evenly spaced on the rangoli's outer ring, centred on the platform */}
      {DIYA_ANGLES.map((a, i) => (
        <Diya3D key={i} reduced={reduced} glow={glow} phase={i * 1.3} position={[Math.sin(a) * DIYA_RING, 0.07, Math.cos(a) * DIYA_RING]} />
      ))}
      <Coins reduced={reduced} />
      <RisingSparks reduced={reduced} glow={glow} />
      <Sparkles count={small ? 40 : 70} scale={[10, 6, 6]} position={[0, 2, -1]} size={3} speed={reduced ? 0 : 0.3} color="#ffd36b" opacity={0.85} />
      <ContactShadows position={[0, -0.185, 0]} opacity={0.5} scale={12} blur={2.6} far={4} color="#050c1f" />
    </>
  );
}

export default function FestiveScene({ active, reduced, onReady }: Props) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, small ? 1.5 : 2]}
      camera={{ position: [0, 2.2, 7.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      onCreated={({ camera }) => {
        camera.lookAt(0, 1.15, 0);
        onReady?.();
      }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 5]} intensity={1.5} color="#fff4e0" />
      {/* Rim light from behind-left to outline the phone frame and printer shell */}
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
