"use client";

import { Check } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import type { PricingBottomSectionData } from "./types";

export default function PricingBottomSection({ data }: { data?: PricingBottomSectionData }) {
  if (!data) return null;
  return <section className="py-16"><Container><div className="grid gap-6 lg:grid-cols-2"><Reveal><Card className="h-full p-8"><h2 className="font-display text-2xl font-semibold text-ink">{data.loginHeading}</h2><p className="mt-2 text-sm text-ink-soft">{data.loginDescription}</p><label className="mt-6 block text-xs font-black uppercase tracking-wide text-ink-soft">{data.phoneLabel}</label><div className="mt-2 flex overflow-hidden rounded-2xl border border-line bg-paper-dim"><div className="flex items-center border-r border-line px-4 text-sm font-bold text-ink-soft">{data.countryCode}</div><input type="text" placeholder={data.phonePlaceholder} className="flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-ink-faint" /></div><Button className="mt-4 w-full" size="lg">{data.otpButtonText}</Button><p className="mt-4 text-center text-sm text-ink-soft">{data.registerPrompt} <span className="cursor-pointer font-bold text-accent">{data.registerText}</span></p></Card></Reveal><Reveal delay={120}><Card className="h-full p-8"><h2 className="font-display text-xl font-semibold text-ink">{data.testimonialHeading}</h2><div className="mt-5 rounded-3xl bg-paper-dim p-6"><p className="text-sm font-medium leading-7 text-ink-soft">{data.testimonialQuote}</p><div className="mt-5 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-base font-black text-paper">{data.testimonialInitial}</div><div><div className="text-sm font-black text-ink">{data.testimonialName}</div><div className="text-xs text-ink-faint">{data.testimonialMeta}</div></div></div></div><div className="mt-5 grid grid-cols-2 gap-2.5">{data.testimonialBenefits.map((item) => <div key={item.id ?? item.text} className="flex items-center gap-1.5 rounded-2xl bg-paper-dim px-3 py-2.5 text-xs font-bold text-ink-soft"><Check size={13} className="shrink-0 text-accent" />{item.text}</div>)}</div></Card></Reveal></div></Container></section>;
}
