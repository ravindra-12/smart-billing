import Link from "next/link";
import DownloadApkPromo from "./DownloadApkPromo";

const plans = [
  {
    name: "30-Day Free Trial",
    price: "₹0",
    duration: "/ 30 Days",
    tag: "Start Free",
    color: "green",
    button: "Start Free Trial",
    features: [
      "All features access",
      "Unlimited bills",
      "Thermal print",
      "QR payments",
      "Udhaar management",
      "AI insights",
    ],
  },
  {
    name: "Monthly Plan",
    price: "₹500",
    duration: "/ Month",
    tag: "Most Popular",
    color: "blue",
    button: "Choose Monthly",
    features: [
      "All trial features",
      "Daily reports",
      "WhatsApp reminders",
      "Data backup",
      "Regular updates",
      "Priority support",
    ],
  },
  {
    name: "Yearly Plan",
    price: "₹400",
    duration: "/ Month",
    tag: "Best Value",
    color: "orange",
    button: "Choose Yearly",
    features: [
      "All monthly features",
      "Save ₹100 yearly",
      "Yearly priority support",
      "Additional features access",
      "Early access to updates",
      "Business growth reports",
    ],
  },
];

const steps = [
  {
    title: "Register",
    text: "Enter your mobile number and verify with OTP.",
    icon: "📱",
  },
  {
    title: "Setup Shop",
    text: "Add shop name, business type, QR/UPI details.",
    icon: "🏪",
  },
  {
    title: "Start Billing",
    text: "Create bills, collect payments, print receipts.",
    icon: "🧾",
  },
  {
    title: "Track & Grow",
    text: "Track income, udhaar, profit, and business growth.",
    icon: "📈",
  },
];

const trustItems = [
  "No hidden charges",
  "Secure payment",
  "Cancel anytime",
  "100% safe records",
];

export default function SmartBillingLitePricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/smart-billing-lite" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
              🧾
            </div>
            <div>
              <div className="text-xl font-black leading-none">
                Smart Billing <span className="text-blue-600">Lite</span>
              </div>
              <div className="text-xs font-medium text-slate-500">
                AI Powered Billing App
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <Link href="/smart-billing-lite">Home</Link>
            <Link href="/smart-billing-lite/features">Features</Link>
            <Link href="/smart-billing-lite/pricing" className="text-blue-600">
              Pricing
            </Link>
            <Link href="#download-apk">Login</Link>
          </nav>

          <Link
            href="#download-apk"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-14 text-center lg:py-20">
        <div className="mx-auto inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 ring-1 ring-blue-100">
          Simple Pricing for Every Business
        </div>

        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
          Start Free Today. Upgrade Anytime.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Use Smart Billing Lite free for 30 days. Continue with an affordable
          monthly or yearly plan built for small businesses.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-4xl bg-white p-7 shadow-xl ring-1 ${
                plan.color === "blue"
                  ? "ring-blue-200 scale-[1.02]"
                  : plan.color === "orange"
                  ? "ring-orange-200"
                  : "ring-green-200"
              }`}
            >
              {plan.color === "blue" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${
                  plan.color === "green"
                    ? "bg-green-50"
                    : plan.color === "blue"
                    ? "bg-blue-50"
                    : "bg-orange-50"
                }`}
              >
                {plan.color === "green" ? "🎁" : plan.color === "blue" ? "📈" : "🏆"}
              </div>

              <h2 className="mt-5 text-center text-2xl font-black">
                {plan.name}
              </h2>

              <div className="mt-6 text-center">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="ml-1 font-bold text-slate-500">
                  {plan.duration}
                </span>
              </div>

              <ul className="mt-7 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                        plan.color === "green"
                          ? "bg-green-100 text-green-700"
                          : plan.color === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#download-apk"
                className={`mt-8 block rounded-2xl px-7 py-4 text-center font-black text-white shadow-lg ${
                  plan.color === "green"
                    ? "bg-green-600 shadow-green-100 hover:bg-green-700"
                    : plan.color === "blue"
                    ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700"
                    : "bg-orange-500 shadow-orange-100 hover:bg-orange-600"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-4xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700">
              <span className="text-green-600">✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-10">
          <div className="text-center">
            <h2 className="text-4xl font-black">How to Get Started?</h2>
            <p className="mt-3 text-slate-600">
              Start billing in just a few simple steps.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl bg-slate-50 p-6 text-center">
                <div className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  {index + 1}
                </div>
                <div className="mt-3 text-5xl">{step.icon}</div>
                <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-2">
        <div className="rounded-4xl bg-white p-7 shadow-xl ring-1 ring-slate-100">
          <h2 className="text-3xl font-black">Login to Your Account</h2>
          <p className="mt-2 text-slate-600">
            Register or login using mobile number and OTP.
          </p>

          <div className="mt-7">
            <label className="text-sm font-black text-slate-700">
              Mobile Number
            </label>
            <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center border-r border-slate-200 px-4 font-bold text-slate-500">
                +91
              </div>
              <input
                type="text"
                placeholder="Enter 10 digit mobile number"
                className="w-full bg-transparent px-4 py-4 outline-none"
              />
            </div>

            <a href="#download-apk" className="mt-5 block w-full rounded-2xl bg-blue-600 px-7 py-4 text-center font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700">
              Send OTP
            </a>

            <p className="mt-5 text-center text-sm font-semibold text-slate-600">
              New user?{" "}
              <a href="#download-apk" className="font-black text-blue-600">Register Now</a>
            </p>
          </div>
        </div>

        <div className="rounded-4xl bg-white p-7 shadow-xl ring-1 ring-slate-100">
          <h2 className="text-3xl font-black">
            Why Business Owners Love Smart Billing Lite ❤️
          </h2>

          <div className="mt-7 rounded-3xl bg-linear-to-br from-blue-50 to-purple-50 p-6">
            <p className="text-lg font-bold leading-8 text-slate-700">
              “Smart Billing Lite ने हमारे shop का काम बहुत आसान कर दिया है.
              Billing, udhaar और daily reporting अब एक ही app में मिल जाता है.”
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white">
                R
              </div>
              <div>
                <div className="font-black">Rajesh Kumar</div>
                <div className="text-sm text-slate-500">
                  Kirana Store Owner, Patna
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Fast & secure login",
              "Instant trial activation",
              "Works on all devices",
              "Lightning fast support",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold">
                ✅ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-4xl bg-linear-to-r from-blue-700 to-purple-700 p-8 text-white shadow-2xl md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">
                Ready to Make Your Billing Smarter?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-blue-100">
                Join thousands of small businesses using Smart Billing Lite for
                faster billing, secure payments, receipts, and daily business growth.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="#download-apk"
                className="rounded-2xl bg-white px-7 py-4 text-center font-black text-blue-700 shadow-xl"
              >
                Start 30-Day Free Trial →
              </Link>
              <Link
                href="#download-apk"
                className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-black text-white"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}
