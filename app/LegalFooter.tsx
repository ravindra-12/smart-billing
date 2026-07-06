import Link from "next/link";

const legalLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-cancellation-policy", label: "Refund & Cancellation" },
  { href: "/shipping-delivery-policy", label: "Delivery Policy" },
];

export default function LegalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-5 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
                SB
              </div>
              <div className="min-w-0">
                <div className="text-lg font-black leading-none text-white sm:text-xl">
                  Smart Billing <span className="text-blue-400">Lite</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-400">
                  AI Powered Billing App
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              Mobile billing, QR/UPI payments, receipt printing, udhaar tracking,
              and business reports for Indian small businesses.
            </p>

            <a
              href="/app-release.apk"
              download
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white hover:bg-green-700 sm:w-auto sm:rounded-2xl"
            >
              Download APK
            </a>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-white">
              Company
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/about-us" className="hover:text-white">About Us</Link>
              <Link href="/contact-us" className="hover:text-white">Contact Us</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-white">
              Legal Policies
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold">
              {legalLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-white">
              Support
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <p>
                Email:{" "}
                <a href="mailto:support@smartbillinglite.com" className="break-all font-bold text-slate-200 hover:text-white">
                  support@smartbillinglite.com
                </a>
              </p>
              <p>Support: Monday to Saturday, 10:00 AM to 6:00 PM IST</p>
              <p>Payments are processed securely through supported payment gateway partners.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Smart Billing Lite. All rights reserved.</p>
          <Link href="https://murmusoftwareinfotech.com/" className="flex items-center gap-3">
          <p>Designed and Developed by Murmu Software Infotech</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
