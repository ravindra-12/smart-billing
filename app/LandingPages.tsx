"use client";

import {
  BarChart3,
  BellRing,
  Check,
  ChevronRight,
  CreditCard,
  Printer,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Users,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import DownloadApkPromo from "./DownloadApkPromo";

const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
  const target = document.getElementById("download-apk");

  if (!target) {
    return;
  }

  event.preventDefault();
  window.history.replaceState(null, "", "#download-apk");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

type FeatureCard = {
  title: string;
  text: string;
  icon: ReactNode;
};

const businessTypes = [
  "Kirana stores",
  "Grocery shops",
  "Pharmacies",
  "Salons",
  "Food stalls",
  "Repair shops",
  "Small vendors",
];

const benefits: FeatureCard[] = [
  {
    title: "Fast billing",
    text: "Create item bills, calculator bills, and quick counter receipts in seconds.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "QR and UPI payments",
    text: "Collect digital payments and keep cash, UPI, and pending status clear.",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    title: "Thermal printing",
    text: "Print neat receipts with compatible Bluetooth and USB thermal printers.",
    icon: <Printer className="h-5 w-5" />,
  },
  {
    title: "Udhaar tracking",
    text: "Track customer credit, partial payments, reminders, and settlement history.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Daily reports",
    text: "See sales, profit, expenses, and pending collections from one dashboard.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "AI insights",
    text: "Find best-selling products and simple ideas to improve daily business.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const featureGroups = [
  {
    title: "Billing and business",
    tone: "emerald",
    items: [
      "Calculator billing",
      "Product and service bills",
      "Customer history",
      "Daily transactions",
      "Monthly reports",
      "Expense tracking",
    ],
  },
  {
    title: "Payments and collection",
    tone: "blue",
    items: [
      "QR collections",
      "UPI ID support",
      "Cash records",
      "Sound box ready",
      "WhatsApp bill sharing",
      "Paid and pending status",
    ],
  },
  {
    title: "Udhaar management",
    tone: "violet",
    items: [
      "Customer credit list",
      "Pending amount view",
      "Payment reminders",
      "Partial payments",
      "Clear settlements",
      "Credit history",
    ],
  },
];

const hardware: FeatureCard[] = [
  {
    title: "Bluetooth printer",
    text: "Wireless receipt printing from Android phones.",
    icon: <Printer className="h-5 w-5" />,
  },
  {
    title: "USB printer",
    text: "Reliable counter setup for busy shops.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "58mm and 80mm",
    text: "Supports common thermal receipt formats.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "POS devices",
    text: "Useful for card payments and counter billing.",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "QR sound box",
    text: "Hear payment confirmation instantly.",
    icon: <BellRing className="h-5 w-5" />,
  },
];

const plans = [
  {
    name: "30-Day Free Trial",
    price: "Rs 0",
    duration: "30 days",
    badge: "Start free",
    icon: <Sparkles className="h-5 w-5" />,
    accent: "emerald",
    features: ["All core features", "Unlimited bills", "Thermal print", "QR payments", "Udhaar management", "AI insights"],
  },
  {
    name: "Monthly Plan",
    price: "Rs 50",
    duration: "per month",
    badge: "Most popular",
    icon: <WalletCards className="h-5 w-5" />,
    accent: "blue",
    featured: true,
    features: ["Everything in trial", "Daily reports", "WhatsApp reminders", "Data backup", "Regular updates", "Priority support"],
  },
  {
    name: "Yearly Plan",
    price: "Rs 500",
    duration: "per year",
    badge: "Best value",
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: "amber",
    features: ["Everything monthly", "Save Rs 100 yearly", "Yearly priority support", "Early access", "Growth reports", "Secure records"],
  },
];

const steps = [
  ["Register", "Enter mobile number and verify with OTP."],
  ["Setup shop", "Add business name, type, QR, and UPI details."],
  ["Start billing", "Create bills, collect payments, and print receipts."],
  ["Track growth", "Review income, udhaar, expenses, and profit."],
];

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <Link
      href="#download-apk"
      onClick={scrollToDownload}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <Link
      href="#download-apk"
      onClick={scrollToDownload}
      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{text}</p>
    </div>
  );
}

function PhoneMockup() {
  const actions = ["Bill", "Items", "UPI", "Udhaar", "Reports", "More"];

  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
      <div className="rounded-[1.75rem] bg-slate-950 p-3">
        <div className="rounded-[1.35rem] bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">Today&apos;s sales</p>
              <p className="mt-1 text-3xl font-black text-slate-950">Rs 8,450</p>
              <p className="text-xs font-bold text-emerald-600">12 orders completed</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Live
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {actions.map((action) => (
              <div key={action} className="rounded-2xl bg-blue-50 p-3 text-center">
                <ReceiptText className="mx-auto h-5 w-5 text-blue-600" />
                <p className="mt-2 text-[11px] font-black text-slate-700">{action}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-black">Recent payments</p>
              <p className="text-xs font-black text-blue-600">View</p>
            </div>
            {[
              ["UPI payment", "Rs 890"],
              ["Cash sale", "Rs 450"],
              ["Udhaar", "Rs 1,250"],
            ].map(([label, value]) => (
              <div key={label} className="mb-2 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm shadow-sm last:mb-0">
                <span className="font-bold text-slate-600">{label}</span>
                <span className="font-black text-slate-950">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] text-slate-900">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm ring-1 ring-blue-100">
            <Sparkles className="h-4 w-4" />
            AI-powered billing app for small businesses
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
            Smart billing made simple for everyday shops.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Create bills, accept QR payments, print thermal receipts, track udhaar,
            and understand your daily business from one Android app.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Fast billing", "Secure payments", "Instant receipts", "Udhaar tracking"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-100">
                <Check className="h-5 w-5 rounded-full bg-emerald-100 p-1 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton>Start 30-Day Free Trial</PrimaryButton>
            <SecondaryButton>Download Android APK</SecondaryButton>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-2 top-8 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 md:block">
            <QrCode className="h-7 w-7 text-blue-600" />
            <p className="mt-2 text-xs font-black text-slate-700">QR ready</p>
          </div>
          <PhoneMockup />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Built for shops"
          title="Perfect for every small business"
          text="A practical billing flow for counters, home services, street vendors, and fast-moving local shops."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {businessTypes.map((item) => (
            <div key={item} className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <Store className="mx-auto h-7 w-7 text-blue-600" />
              <p className="mt-3 text-sm font-black text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionHeading
          eyebrow="Why choose us"
          title="Everything needed for faster billing"
          text="Simple enough for daily use, complete enough to keep records clean as the business grows."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] text-slate-900">
      <section className="bg-slate-950 px-5 py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-blue-100 ring-1 ring-white/15">
              <Sparkles className="h-4 w-4" />
              Powerful features for everyday business
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Run billing, payment, credit, and reports in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Smart Billing Lite keeps shop workflows fast: bill customers, share
              receipts, manage pending dues, and review daily performance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton>Start Free Trial</PrimaryButton>
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/15">
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5">
          {featureGroups.map((group) => (
            <div key={group.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-black text-slate-950">{group.title}</h2>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                  group.tone === "emerald"
                    ? "bg-emerald-50 text-emerald-700"
                    : group.tone === "blue"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-violet-50 text-violet-700"
                }`}>
                  Included
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <Check className="h-5 w-5 shrink-0 rounded-full bg-white p-1 text-emerald-700 shadow-sm" />
                    <span className="text-sm font-black text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black sm:text-4xl">Hardware and device integrations</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Connect printers, POS devices, and QR sound boxes so shop counters can move faster during rush hours.
            </p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {hardware.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-sm font-black">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-950">AI-powered insights</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Daily sales insights", "Best-selling products", "Top customers", "Growth suggestions"].map((item) => (
              <div key={item} className="rounded-2xl bg-violet-50 p-4">
                <Sparkles className="h-5 w-5 text-violet-700" />
                <p className="mt-3 text-sm font-black text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-950">Made for Indian small businesses</h2>
          <div className="mt-5 space-y-3">
            {["Easy setup in minutes", "No training required", "Works for daily shop operations", "Affordable plans", "Secure and reliable records"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Check className="h-5 w-5 shrink-0 text-emerald-700" />
                <span className="text-sm font-black text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] text-slate-900">
      <section className="mx-auto max-w-7xl px-5 py-14 text-center sm:py-18">
        <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 ring-1 ring-blue-100">
          Simple pricing for every business
        </div>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Start free today. Upgrade only when you are ready.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Use Smart Billing Lite free for 30 days, then continue with affordable
          plans built for small businesses.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white p-6 shadow-sm ring-1 ${
                plan.featured ? "scale-[1.01] ring-blue-200 shadow-xl shadow-blue-100" : "ring-slate-100"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {plan.icon}
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                  {plan.badge}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">{plan.name}</h2>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-black text-slate-950">{plan.price}</span>
                <span className="pb-1 text-sm font-bold text-slate-500">{plan.duration}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <Check className="h-5 w-5 shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-700" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="#download-apk"
                onClick={scrollToDownload}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
              >
                Choose Plan
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          title="Start billing in four simple steps"
          text="No complicated setup. Register, add shop details, and begin billing from your phone."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, text], index) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-950">Login to your account</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Register or login using mobile number and OTP.</p>
          <label className="mt-6 block text-sm font-black text-slate-700" htmlFor="phone">
            Mobile number
          </label>
          <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center border-r border-slate-200 px-4 text-sm font-black text-slate-500">
              +91
            </div>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="Enter 10 digit mobile number"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            />
          </div>
          <Link
            href="#download-apk"
            onClick={scrollToDownload}
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
          >
            Send OTP
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-950">Why owners like Smart Billing Lite</h2>
          <div className="mt-5 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-bold leading-7 text-slate-700">
              Smart Billing Lite made billing, udhaar, and daily reporting much
              easier for our shop. Everything is available in one app.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                R
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Rajesh Kumar</p>
                <p className="text-xs font-semibold text-slate-500">Kirana store owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <>
      <HomePage />
      <DownloadApkPromo />
    </>
  );
}
