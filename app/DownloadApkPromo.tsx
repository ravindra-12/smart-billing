import {
  ArrowUpRight,
  BarChart3,
  Check,
  Monitor,
  Package,
  Play,
  Smartphone,
  Zap,
} from "lucide-react";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN";

const mobileBenefits = ["Fast billing on the go", "UPI and QR payments", "Receipts and daily reports"];
const desktopBenefits = ["Powerful desktop workspace", "Clear business insights", "Built for growing teams"];

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check size={12} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function DownloadApkPromo() {
  return (
    <section id="download-apk" className="scroll-mt-24 bg-slate-50 px-5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Choose your workspace</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Smart billing, wherever business happens.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl shadow-blue-100/60 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-50" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  <Smartphone size={28} />
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-blue-700">
                  Android app
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-black text-slate-950 md:text-3xl">Smart Billing Lite</h3>
              <p className="mt-3 max-w-md leading-7 text-slate-600">
                Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.
              </p>
              <BenefitList items={mobileBenefits} />
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 sm:w-auto"
              >
                <Play size={17} fill="currentColor" />
                Download on Google Play
                <ArrowUpRight size={17} />
              </a>
              <p className="mt-3 text-xs font-semibold text-slate-400">Free 30-day trial · No credit card needed</p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl shadow-slate-300/50 md:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-indigo-200 ring-1 ring-white/15">
                  <Monitor size={28} />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-indigo-200 ring-1 ring-white/10">
                  Laptop & desktop
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-black md:text-3xl">SmartBill Pro</h3>
              <p className="mt-3 max-w-md leading-7 text-slate-300">
                A complete web workspace for teams that want more control over billing, inventory, and business performance.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {desktopBenefits.map((item, index) => {
                  const Icon = [Package, BarChart3, Zap][index];
                  return (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                      <Icon size={18} className="text-indigo-300" />
                      {item}
                    </div>
                  );
                })}
              </div>
              <a
                href="https://www.smartbillpro.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:bg-indigo-50 sm:w-auto"
              >
                Open SmartBill Pro
                <ArrowUpRight size={17} />
              </a>
              <p className="mt-3 text-xs font-semibold text-slate-400">Open the web app from any laptop or desktop browser</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
