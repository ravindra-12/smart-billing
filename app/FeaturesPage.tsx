import Link from "next/link";
import DownloadApkPromo from "./DownloadApkPromo";

const featureGroups = [
  {
    title: "Billing & Business Management",
    tone: "green",
    items: [
      ["Smart Calculator Billing", "Create fast bills using calculator-style billing."],
      ["Product & Service Billing", "Add items, services, quantity, price, and generate bills."],
      ["Customer Management", "Save customer name, mobile number, and billing history."],
      ["Transaction History", "Track daily, weekly, and monthly transactions easily."],
      ["Daily / Monthly Reports", "Understand income, sales, payments, and business growth."],
      ["Expenses Tracking", "Record investment, expenses, and calculate actual profit."],
    ],
  },
  {
    title: "Payment & Collection",
    tone: "blue",
    items: [
      ["QR Code Payments", "Collect payments quickly using QR code and UPI."],
      ["UPI ID Support", "Connect your business UPI ID for direct collections."],
      ["Cash Management", "Track cash transactions along with digital payments."],
      ["Payment Sound Box", "Support payment confirmation sound box for shops."],
      ["WhatsApp Bill Sharing", "Send bills and receipts instantly to customer WhatsApp."],
      ["Clean Payment Status", "Mark paid, pending, partial, or cleared transactions."],
    ],
  },
  {
    title: "Udhaar / Credit Management",
    tone: "purple",
    items: [
      ["Customer Udhaar Tracking", "Save pending amount with customer name and mobile number."],
      ["Pending Amount List", "View who has remaining payment and how much is due."],
      ["Payment Reminders", "Send WhatsApp reminders with amount and due date."],
      ["Partial Payment", "Collect partial amount and auto-update remaining balance."],
      ["Clear Settlement", "Show clean payment status when remaining amount is paid."],
      ["Credit History", "Track all past pending and cleared transactions."],
    ],
  },
];

const hardware = [
  {
    name: "Bluetooth Thermal Printer",
    text: "Print receipts wirelessly from your mobile device.",
    icon: "🖨️",
  },
  {
    name: "USB Thermal Printer",
    text: "Connect compatible USB printers for fast counter billing.",
    icon: "🧾",
  },
  {
    name: "58mm / 80mm Printer",
    text: "Supports common portable receipt printer sizes.",
    icon: "📄",
  },
  {
    name: "Pine Labs POS Device",
    text: "Useful for card payment and professional billing counters.",
    icon: "💳",
  },
  {
    name: "Payment QR Sound Box",
    text: "Hear payment confirmation instantly after QR payment.",
    icon: "🔊",
  },
];

const aiItems = [
  "Daily sales insights",
  "Best-selling products",
  "Top customer analysis",
  "Income growth tracking",
  "Smart business suggestions",
];

export default function SmartBillingLiteFeaturesPage() {
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
            <Link href="/smart-billing-lite/features" className="text-blue-600">
              Features
            </Link>
            <Link href="/smart-billing-lite/pricing">Pricing</Link>
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

      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 px-5 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/20">
                Powerful Features for Everyday Business
              </div>

              <h1 className="text-5xl font-black leading-tight md:text-6xl">
                Everything You Need to Run Your Business Smarter
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50">
                Manage billing, payments, customers, udhaar, receipts, reports,
                and hardware integrations from one simple mobile billing app.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#download-apk"
                  className="rounded-2xl bg-white px-7 py-4 text-center font-black text-blue-700 shadow-xl"
                >
                  Start 30-Day Free Trial
                </Link>
                <Link
                  href="#download-apk"
                  className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-black text-white"
                >
                  Request Demo
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-5 text-slate-900 shadow-2xl">
                <div className="mx-auto max-w-sm rounded-[2.5rem] bg-slate-950 p-3">
                  <div className="rounded-[2rem] bg-white p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400">Dashboard</div>
                        <div className="text-2xl font-black">₹12,450</div>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        +18%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Total Bills", "68"],
                        ["Customers", "128"],
                        ["Pending", "₹2,350"],
                        ["Profit", "₹4,870"],
                      ].map(([title, value]) => (
                        <div key={title} className="rounded-2xl bg-blue-50 p-4">
                          <div className="text-xs font-bold text-slate-500">{title}</div>
                          <div className="mt-1 text-xl font-black">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <div className="mb-3 text-sm font-black">Sales This Week</div>
                      <div className="flex h-28 items-end gap-2">
                        {[35, 55, 38, 70, 60, 90, 85].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-xl bg-blue-500"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <button className="mt-5 w-full rounded-2xl bg-green-600 py-4 font-black text-white">
                      Create New Bill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featureGroups.map((group) => (
        <section key={group.title} className="mx-auto max-w-7xl px-5 py-10">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-8">
            <div
              className={`mb-6 inline-flex rounded-2xl px-5 py-3 text-lg font-black ${
                group.tone === "green"
                  ? "bg-green-50 text-green-700"
                  : group.tone === "blue"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-purple-50 text-purple-700"
              }`}
            >
              {group.title}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {group.items.map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    ✅
                  </div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-xl md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black md:text-4xl">
              Hardware & Device Integration
            </h2>
            <p className="mt-3 max-w-2xl text-blue-100">
              Connect your billing app with thermal printers, POS devices, and
              payment confirmation sound boxes for faster shop operations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {hardware.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl bg-white/10 p-5 text-center ring-1 ring-white/10"
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="mt-4 text-sm font-black">{item.name}</h3>
                <p className="mt-2 text-xs leading-5 text-blue-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-8">
            <div className="mb-6 inline-flex rounded-2xl bg-purple-50 px-5 py-3 text-lg font-black text-purple-700">
              AI-Powered Insights
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aiItems.map((item) => (
                <div key={item} className="rounded-3xl bg-slate-50 p-5">
                  <div className="mb-3 text-3xl">📈</div>
                  <div className="font-black">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-8">
            <div className="mb-6 inline-flex rounded-2xl bg-green-50 px-5 py-3 text-lg font-black text-green-700">
              Built for Indian Small Businesses
            </div>

            <div className="space-y-4">
              {[
                "Easy setup in minutes",
                "No training required",
                "Works for low-tech users",
                "Supports daily shop operations",
                "Affordable for small vendors",
                "Secure and reliable records",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-black text-green-700">
                    ✓
                  </span>
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="#download-apk"
              className="mt-8 block rounded-2xl bg-blue-600 px-7 py-4 text-center font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
            >
              View Pricing & Start Trial
            </Link>
          </div>
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}
