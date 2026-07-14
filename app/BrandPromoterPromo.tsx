import Link from "next/link";

const steps = [
  {
    icon: "📝",
    title: "Register free",
    text: "Sign up as a brand promoter with just your mobile number and OTP.",
  },
  {
    icon: "🔗",
    title: "Share your code",
    text: "Get a personal referral code and share it with shop owners you know.",
  },
  {
    icon: "💰",
    title: "Earn ₹100 per conversion",
    text: "Earn ₹100 every time a referred vendor purchases a premium plan.",
  },
];

export default function BrandPromoterPromo() {
  return (
    <section
      id="brand-promoter"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16"
    >
      <div className="overflow-hidden rounded-4xl bg-linear-to-br from-violet-700 via-indigo-700 to-blue-700 p-8 text-white shadow-2xl shadow-indigo-200/60 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black">
              🤝 Brand Promoter Program
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              Become a Brand Promoter.
              <br />
              <span className="text-blue-200">Earn ₹100 for every business you bring.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-blue-100">
              You don&apos;t need to be a shop owner. Promote Smart Billing Lite in your area,
              share your referral code with local businesses, and get paid directly to your UPI
              or bank account when they go premium.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/referral/login"
                className="rounded-2xl bg-white px-7 py-4 text-center font-black text-indigo-700 shadow-xl transition hover:bg-blue-50"
              >
                Become a Promoter →
              </Link>
              <Link
                href="/referral/login"
                className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-black text-white transition hover:bg-white/20"
              >
                Promoter Login
              </Link>
            </div>

            <p className="mt-4 text-xs font-semibold text-blue-200">
              Free to join • No investment needed • Track earnings in your promoter dashboard
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex items-start gap-4 rounded-3xl border border-white/15 bg-white/10 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wide text-blue-200">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-1 text-base font-black">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-blue-100">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-blue-200">
              🏪 Already a Smart Billing Lite vendor?
            </div>
            <p className="mt-1 text-sm leading-6 text-blue-100">
              Refer other businesses with your own code and earn{" "}
              <span className="font-black text-white">₹150</span> every time they purchase
              premium.
            </p>
          </div>
          <Link
            href="/referral/login?tab=vendor"
            className="shrink-0 rounded-2xl bg-white/15 px-6 py-3 text-center font-black text-white ring-1 ring-white/25 transition hover:bg-white/25"
          >
            Vendor Refer &amp; Earn →
          </Link>
        </div>
      </div>
    </section>
  );
}
