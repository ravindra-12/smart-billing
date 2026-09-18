"use client";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightSurface from "@/app/components/ui/SpotlightSurface";
import type { PricingBottomSectionData } from "./types";

export default function PricingCtaSection({ data }: { data?: PricingBottomSectionData }) {
  if (!data) return null;
  return <section className="pb-20"><Container><Reveal><SpotlightSurface className="flex flex-col items-start gap-8 rounded-[2.5rem] bg-surface-dark p-10 md:flex-row md:items-center md:justify-between md:p-14"><div><h2 className="font-display max-w-lg text-3xl font-semibold leading-tight text-paper md:text-4xl">{data.ctaHeading}</h2><p className="mt-4 max-w-md leading-7 text-paper/70">{data.ctaDescription}</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button href={data.ctaPrimaryButtonLink || "#download-apk"} variant="inverse" size="lg" className="whitespace-nowrap">{data.ctaPrimaryButtonText}</Button><Button href={data.ctaSecondaryButtonLink || "#download-apk"} variant="ghost" size="lg" className="whitespace-nowrap border border-white/20 text-paper hover:bg-white/10">{data.ctaSecondaryButtonText}</Button></div></SpotlightSurface></Reveal></Container></section>;
}
