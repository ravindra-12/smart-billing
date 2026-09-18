"use client";

import { Check } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import type { WorkspaceSectionData } from "./types";

export default function WorkspaceSection({ data }: { data?: WorkspaceSectionData }) {
  if (!data?.cards?.length) return null;
  return <section className="py-8 pb-20"><Container><div className="mb-8 text-center"><div className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-black uppercase tracking-wider text-accent-dark">{data.badgeText}</div><h2 className="font-display mt-4 text-3xl font-semibold text-ink md:text-4xl">{data.title}</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink-soft">{data.description}</p></div><div className="grid gap-6 lg:grid-cols-2">{data.cards.map((card) => <div key={card.id ?? card.title} className={`rounded-[2.5rem] p-7 md:p-9 ${card.theme === "dark" ? "bg-surface-dark text-paper" : "border border-line bg-white text-ink"}`}><div className="text-xs font-black uppercase tracking-wider opacity-60">{card.eyebrow}</div><h3 className="font-display mt-3 text-2xl font-semibold">{card.title}</h3><p className="mt-3 text-sm leading-6 opacity-75">{card.description}</p><div className="mt-6 space-y-3">{card.features?.map((feature) => <div key={feature.id ?? feature.text} className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark"><Check size={14} strokeWidth={3} /></span>{feature.text}</div>)}</div><Button href={card.buttonLink || "#download-apk"} variant={card.theme === "dark" ? "inverse" : "primary"} className="mt-7">{card.buttonText}</Button><div className="mt-4 text-xs opacity-60">{card.note}</div></div>)}</div></Container></section>;
}
