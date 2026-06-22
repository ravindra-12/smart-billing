import Link from "next/link";
import DownloadApkPromo from "./DownloadApkPromo";

const businessTypes = [
  "Kirana Store",
  "Grocery Store",
  "Pharmacy",
  "Salon & Spa",
  "Food Stall",
  "Repair Shop",
  "Small Vendors",
];

const benefits = [
  {
    title: "Super Fast Billing",
    text: "Create bills in seconds with calculator and item-based billing.",
  },
  {
    title: "QR & UPI Payments",
    text: "Accept digital payments instantly with QR and UPI support.",
  },
  {
    title: "Thermal Receipt Print",
    text: "Print customer receipts using Bluetooth or USB thermal printers.",
  },
  {
    title: "Udhaar Management",
    text: "Track pending payments and send WhatsApp reminders easily.",
  },
  {
    title: "Daily Income Tracking",
    text: "Know your sales, profit, and payment status every day.",
  },
  {
    title: "AI Business Insights",
    text: "Get smart suggestions to understand and grow your business.",
  },
];

const devices = [
  "Bluetooth Thermal Printer",
  "USB Thermal Printer",
  "Pine Labs POS Device",
  "QR Payment Sound Box",
];

export default function SmartBillingLiteHome() {
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
            <Link href="/smart-billing-lite/features">Features</Link>
            <Link href="/smart-billing-lite/pricing">Pricing</Link>
            <Link href="/smart-billing-lite/pricing#get-started">How It Works</Link>
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

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
            ✨ AI-Powered Billing App for Small Businesses
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
            Smart Billing <br />
            <span className="text-blue-600">Made Simple!</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            AI-powered mobile billing app with QR payments, thermal printing,
            POS device support, sound box integration, udhaar tracking, and
            daily business reports.
          </p>

          <div className="mt-7 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
            {[
              "Fast Billing",
              "Secure Payments",
              "Instant Receipts",
              "Business Growth",
              "Udhaar Tracking",
              "AI Insights",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#download-apk"
              className="rounded-2xl bg-blue-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-blue-200 hover:bg-blue-700"
            >
              Start 30-Day Free Trial →
            </Link>
            <Link
              href="#download-apk"
              className="rounded-2xl border border-blue-200 bg-white px-7 py-4 text-center font-black text-blue-700 shadow-sm hover:bg-blue-50"
            >
              ▶ Watch Demo
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-slate-100 md:block">
            <div className="text-xs font-bold text-slate-500">QR Sound Box</div>
            <div className="mt-2 text-4xl">🔊</div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-5 shadow-2xl ring-1 ring-slate-100">
            <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-purple-50 p-5">
              <div className="mx-auto max-w-sm rounded-[2.5rem] bg-slate-950 p-3 shadow-2xl">
                <div className="rounded-[2rem] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-400">
                        Today’s Sales
                      </div>
                      <div className="mt-1 text-3xl font-black">₹8,450.00</div>
                      <div className="text-xs font-semibold text-green-600">
                        12 Orders
                      </div>
                    </div>
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                      Live
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {["Quick Bill", "Products", "Customers", "Udhaar", "Reports", "More"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-2xl bg-blue-50 p-3 text-center text-xs font-bold text-slate-700"
                        >
                          <div className="mb-1 text-xl">▣</div>
                          {item}
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between text-sm font-black">
                      <span>Recent Transactions</span>
                      <span className="text-blue-600">View</span>
                    </div>

                    {[
                      ["Cash Sale", "₹450.00"],
                      ["UPI Payment", "₹890.00"],
                      ["Credit Sale", "₹1,250.00"],
                    ].map(([name, amount]) => (
                      <div
                        key={name}
                        className="mb-2 flex justify-between rounded-xl bg-white px-3 py-2 text-sm shadow-sm"
                      >
                        <span className="font-semibold">{name}</span>
                        <span className="font-black">{amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-green-50 p-4 text-center">
                    <div className="text-sm font-bold text-slate-500">
                      Total Profit
                    </div>
                    <div className="text-2xl font-black text-green-700">
                      ₹2,340.00
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {devices.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-4 text-center text-sm font-bold text-slate-700 shadow-sm"
                  >
                    <div className="mb-2 text-3xl">🖨️</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            Perfect For Every Small Business
          </h2>
          <p className="mt-3 text-slate-600">
            Built for daily billing, payment collection, receipt printing, and business tracking.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {businessTypes.map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                🏪
              </div>
              <div className="text-sm font-black">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-10">
          <div className="text-center">
            <h2 className="text-3xl font-black md:text-4xl">
              Why Choose Smart Billing Lite?
            </h2>
            <p className="mt-3 text-slate-600">
              Everything a small business needs to bill faster, collect better, and grow smarter.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  ✅
                </div>
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-5 rounded-[2rem] bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-white md:grid-cols-4 md:p-10">
          {[
            ["10,000+", "Happy Users"],
            ["1L+", "Bills Generated"],
            ["99.9%", "Uptime"],
            ["24x7", "Support"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-black">{num}</div>
              <div className="mt-2 text-sm font-semibold text-blue-100">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}
