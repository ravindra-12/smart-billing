"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    const downloadSection = document.getElementById("download-apk");

    if (!downloadSection) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", "/#download-apk");
    downloadSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-blue-600 text-xl text-white">
            🧾
          </div>
          <div>
            <div className="text-lg font-black leading-none text-slate-900">
              Smart Billing <span className="text-blue-600">Lite</span>
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-500">
              AI Powered Billing App
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 py-1 text-sm font-semibold ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#download-apk"
            onClick={scrollToDownload}
            className="text-sm font-semibold text-slate-700"
          >
            Login
          </Link>
        </nav>

        <Link
          href="/#download-apk"
          onClick={scrollToDownload}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200"
        >
          Start Free Trial
        </Link>
      </div>
    </header>
  );
}
