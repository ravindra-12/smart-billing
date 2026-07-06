"use client";

import { Menu, ReceiptText, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const closeMenu = () => setIsOpen(false);

  const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      closeMenu();
      return;
    }

    const downloadSection = document.getElementById("download-apk");

    if (!downloadSection) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", "/#download-apk");
    downloadSection.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5">
        <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-blue-600 text-white">
            <ReceiptText className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-black leading-none text-slate-900 sm:text-lg">
              Smart Billing <span className="text-blue-600">Lite</span>
            </div>
            <div className="mt-1 hidden text-[11px] font-medium text-slate-500 sm:block">
              AI Powered Billing App
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
          className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 md:inline-flex"
        >
          Start Free Trial
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-800 md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-black ${
                    isActive ? "bg-blue-50 text-blue-700" : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#download-apk"
              onClick={scrollToDownload}
              className="rounded-xl px-4 py-3 text-sm font-black text-slate-700"
            >
              Login
            </Link>
            <Link
              href="/#download-apk"
              onClick={scrollToDownload}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-blue-100"
            >
              Start Free Trial
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
