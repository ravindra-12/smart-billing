import Link from "next/link";
import { Receipt } from "lucide-react";
import PlayStoreIcon from "./components/PlayStoreIcon";
import Container from "./components/ui/Container";

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
    <footer className="border-t border-white/10 bg-surface-dark px-5 py-12 text-paper/70">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-paper">
                <Receipt size={22} strokeWidth={2.25} />
              </div>
              <div>
                <div className="font-display text-xl font-semibold leading-none text-paper">
                  Smart Billing <span className="text-accent">Lite</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-paper/50">
                  AI Powered Billing App
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-paper/60">
              Mobile billing, QR/UPI payments, receipt printing, udhaar tracking,
              and business reports for Indian small businesses.
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-black text-paper transition-colors hover:bg-accent-dark"
            >
              <PlayStoreIcon className="h-5 w-5" />
              Download APK
            </a>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-paper">
              Company
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold">
              <Link href="/" className="hover:text-paper">Home</Link>
              <Link href="/about-us" className="hover:text-paper">About Us</Link>
              <Link href="/contact-us" className="hover:text-paper">Contact Us</Link>
              <Link href="/blog" className="hover:text-paper">Blog</Link>
              <Link href="/smart-billing-lite-affiliate-program" className="hover:text-paper">Affiliate Program</Link>
              <Link href="/referral/login" className="hover:text-paper">Become a Brand Promoter</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-paper">
              Legal Policies
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold">
              {legalLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-paper">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-paper">
              Support
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-paper/60">
              <p>
                Email:{" "}
                <a href="mailto:contactus@murmusoftwareinfotech.com" className="font-bold text-paper/80 hover:text-paper">
                  contactus@murmusoftwareinfotech.com
                </a>
              </p>
              <p>Support: Monday to Saturday, 10:00 AM to 6:00 PM IST</p>
              <p>Payments are processed securely through supported payment gateway partners.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Smart Billing Lite. All rights reserved.</p>
          <Link href="https://murmusoftwareinfotech.com/" className="flex items-center gap-3">
            <p>Design and Developed by Murmu Software Infotech</p>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
