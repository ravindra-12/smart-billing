"use client";

import { Check, Gift, TrendingUp, Trophy } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import type { PricingPlansSectionData } from "./types";

const PLAN_ICON = { green: Gift, blue: TrendingUp, orange: Trophy };

export default function PricingPlansSection({ data }: { data?: PricingPlansSectionData }) {
  const pricingPlans = data?.plans ?? [];
  const trustItems = data?.trustItems ?? [];
  return <section className="pb-16"><Container><div className="grid gap-6 lg:grid-cols-3 lg:items-end">{pricingPlans.map((plan, index) => { const featured = plan.color === "blue"; const Icon = PLAN_ICON[plan.color ?? "blue"] ?? Gift; return <Reveal key={plan.id ?? plan.name} delay={index * 120} className="h-full"><div className={`relative h-full rounded-4xl border p-8 transition-transform duration-300 hover:-translate-y-1.5 ${featured ? "border-ink bg-surface-dark text-paper lg:-translate-y-4 lg:hover:-translate-y-5.5" : "border-line bg-white"}`}>{plan.tag && <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wide ${featured ? "bg-accent text-paper" : "bg-paper-dim text-ink-soft"}`}>{plan.tag}</div>}<div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${featured ? "bg-white/10 text-accent" : "bg-accent-soft text-accent-dark"}`}><Icon size={26} /></div><h2 className="font-display mt-5 text-center text-xl font-semibold">{plan.name}</h2><div className="mt-5 text-center"><span className="font-display text-5xl font-semibold">{plan.price}</span><span className={`ml-1 font-semibold ${featured ? "text-paper/60" : "text-ink-faint"}`}>{plan.duration}</span></div><ul className="mt-7 flex flex-col gap-3">{plan.features.map((feature) => <li key={feature.id ?? feature.text} className="flex items-center gap-2.5 text-sm font-semibold"><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${featured ? "bg-accent text-paper" : "bg-accent-soft text-accent-dark"}`}><Check size={12} strokeWidth={3} /></span><span className={featured ? "text-paper/90" : "text-ink-soft"}>{feature.text}</span></li>)}</ul><Button href="#download-apk" variant={featured ? "inverse" : "primary"} className="mt-8 w-full">{plan.button}</Button></div></Reveal>; })}</div><div className="mt-8 grid grid-cols-2 gap-3 rounded-3xl border border-line bg-white p-5 sm:grid-cols-4">{trustItems.map((item) => <div key={item.id ?? item.text} className="flex items-center justify-center gap-2 text-center text-xs font-bold text-ink-soft"><Check size={14} className="text-accent" />{item.text}</div>)}</div></Container></section>;
}
