"use client";

import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import { useMountedIn } from "@/app/hooks/useMountedIn";
import type { PricingHeroData } from "./types";

export default function PricingHeroSection({ data = {} }: { data?: PricingHeroData }) {
  const mounted = useMountedIn();
  return <section className="py-16 text-center md:py-24"><Container><div className={`transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}><Badge className="mx-auto">{data.badgeText}</Badge><h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">{data.title}</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-soft">{data.description}</p></div></Container></section>;
}
