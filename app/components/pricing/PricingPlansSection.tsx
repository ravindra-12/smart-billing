"use client";

import { Check, Gift, TrendingUp, Trophy } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { PricingPlan, PricingPlansSectionData, TextItem } from "./types";

const plans: PricingPlan[] = [
  {
    name: "30-Day Free Trial",
    price: "₹0",
    duration: "/ 30 Days",
    tag: "Start Free",
    color: "green",
    button: "Start Free Trial",
    features: ["All features access", "Unlimited bills", "Thermal print", "QR payments", "Udhaar management", "AI insights"].map((text) => ({ text })),
  },
  {
    name: "Monthly Plan",
    price: "₹50",
    duration: "/ Month",
    tag: "Most Popular",
    color: "blue",
    button: "Choose Monthly",
    features: ["All trial features", "Daily reports", "WhatsApp reminders", "Data backup", "Regular updates", "Priority support"].map((text) => ({ text })),
  },
  {
    name: "Yearly Plan",
    price: "₹500",
    duration: "/ Year",
    tag: "Best Value",
    color: "orange",
    button: "Choose Yearly",
    features: ["All monthly features", "Save ₹100 yearly", "Yearly priority support", "Additional features access", "Early access to updates", "Business growth reports"].map((text) => ({ text })),
  },
];

const fallbackTrustItems: TextItem[] = ["No hidden charges", "Secure payment", "Cancel anytime", "100% safe records"].map((text) => ({ text }));

const PLAN_ICON: Record<string, typeof Gift> = { green: Gift, blue: TrendingUp, orange: Trophy };

export default function PricingPlansSection() {
  const { data } = useStrapiSection<PricingPlansSectionData>(
    "/api/pricing-plans-section?populate[plans][populate][features]=*&populate[trustItems]=*"
  );

  const pricingPlans = data?.plans?.length ? data.plans : plans;
  const trustItems = data?.trustItems?.length ? data.trustItems : fallbackTrustItems;

  return (
    <section className="pb-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
          {pricingPlans.map((plan) => {
            const featured = plan.color === "blue";
            const Icon = PLAN_ICON[plan.color ?? "blue"] ?? Gift;

            return (
              <div
                key={plan.name}
                className={`relative rounded-4xl border p-8 ${
                  featured
                    ? "border-ink bg-surface-dark text-paper lg:-translate-y-4"
                    : "border-line bg-white"
                }`}
              >
                {plan.tag && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wide ${
                      featured ? "bg-accent text-paper" : "bg-paper-dim text-ink-soft"
                    }`}
                  >
                    {plan.tag}
                  </div>
                )}

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
                    featured ? "bg-white/10 text-accent" : "bg-accent-soft text-accent-dark"
                  }`}
                >
                  <Icon size={26} />
                </div>

                <h2 className="font-display mt-5 text-center text-xl font-semibold">{plan.name}</h2>

                <div className="mt-5 text-center">
                  <span className="font-display text-5xl font-semibold">{plan.price}</span>
                  <span className={`ml-1 font-semibold ${featured ? "text-paper/60" : "text-ink-faint"}`}>
                    {plan.duration}
                  </span>
                </div>

                <ul className="mt-7 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2.5 text-sm font-semibold">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          featured ? "bg-accent text-paper" : "bg-accent-soft text-accent-dark"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className={featured ? "text-paper/90" : "text-ink-soft"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#download-apk"
                  variant={featured ? "inverse" : "primary"}
                  className="mt-8 w-full"
                >
                  {plan.button}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 rounded-3xl border border-line bg-white p-5 sm:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center justify-center gap-2 text-center text-xs font-bold text-ink-soft">
              <Check size={14} className="text-accent" />
              {item.text}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
