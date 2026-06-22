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
    <footer className="border-t border-slate-200 bg-white px-5 py-8 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-base font-black text-slate-950">Smart Billing Lite</div>
          <div className="mt-1 text-sm text-slate-500">
            AI powered billing app for small businesses.
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
