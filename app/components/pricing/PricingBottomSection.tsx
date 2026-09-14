"use client";

import { Check } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { PricingBottomSectionData, TextItem } from "./types";

const fallbackBenefits: TextItem[] = ["Fast & secure login", "Instant trial activation", "Works on all devices", "Lightning fast support"].map((text) => ({ text }));

export default function PricingBottomSection() {
  const { data } = useStrapiSection<PricingBottomSectionData>("/api/pricing-bottom-section?populate=*");

  const content = {
    loginHeading: data?.loginHeading ?? "Login to your account",
    loginDescription: data?.loginDescription ?? "Register or login using mobile number and OTP.",
    phoneLabel: data?.phoneLabel ?? "Mobile Number",
    countryCode: data?.countryCode ?? "+91",
    phonePlaceholder: data?.phonePlaceholder ?? "Enter 10 digit mobile number",
    otpButtonText: data?.otpButtonText ?? "Send OTP",
    registerPrompt: data?.registerPrompt ?? "New user?",
    registerText: data?.registerText ?? "Register Now",
    testimonialHeading: data?.testimonialHeading ?? "Why business owners love Smart Billing Lite",
    testimonialQuote:
      data?.testimonialQuote ??
      "\"Smart Billing Lite ने हमारे shop का काम बहुत आसान कर दिया है. Billing, udhaar और daily reporting अब एक ही app में मिल जाता है.\"",
    testimonialInitial: data?.testimonialInitial ?? "R",
    testimonialName: data?.testimonialName ?? "Rajesh Kumar",
    testimonialMeta: data?.testimonialMeta ?? "Kirana Store Owner, Patna",
    testimonialBenefits: data?.testimonialBenefits?.length ? data.testimonialBenefits : fallbackBenefits,
  };

  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">{content.loginHeading}</h2>
              <p className="mt-2 text-sm text-ink-soft">{content.loginDescription}</p>

              <label className="mt-6 block text-xs font-black uppercase tracking-wide text-ink-soft">
                {content.phoneLabel}
              </label>
              <div className="mt-2 flex overflow-hidden rounded-2xl border border-line bg-paper-dim">
                <div className="flex items-center border-r border-line px-4 text-sm font-bold text-ink-soft">
                  {content.countryCode}
                </div>
                <input
                  type="text"
                  placeholder={content.phonePlaceholder}
                  className="flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-ink-faint"
                />
              </div>

              <Button className="mt-4 w-full" size="lg">
                {content.otpButtonText}
              </Button>

              <p className="mt-4 text-center text-sm text-ink-soft">
                {content.registerPrompt}{" "}
                <span className="cursor-pointer font-bold text-accent">{content.registerText}</span>
              </p>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <Card className="h-full p-8">
              <h2 className="font-display text-xl font-semibold text-ink">{content.testimonialHeading}</h2>
              <div className="mt-5 rounded-3xl bg-paper-dim p-6">
                <p className="text-sm font-medium leading-7 text-ink-soft">{content.testimonialQuote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-base font-black text-paper">
                    {content.testimonialInitial}
                  </div>
                  <div>
                    <div className="text-sm font-black text-ink">{content.testimonialName}</div>
                    <div className="text-xs text-ink-faint">{content.testimonialMeta}</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {content.testimonialBenefits.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 rounded-2xl bg-paper-dim px-3 py-2.5 text-xs font-bold text-ink-soft"
                  >
                    <Check size={13} className="shrink-0 text-accent" />
                    {item.text}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
