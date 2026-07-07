"use client";

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
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);

  const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
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

        {/* Desktop nav */}
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

        {/* Desktop CTA */}
        <Link
          href="/#download-apk"
          onClick={scrollToDownload}
          className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 md:inline-flex"
        >
          Start Free Trial
        </Link>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#download-apk"
              onClick={scrollToDownload}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Login
            </Link>
          </nav>

          <Link
            href="/#download-apk"
            onClick={scrollToDownload}
            className="mt-3 block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-200"
          >
            Start Free Trial
          </Link>
        </div>
      )}
    </header>
  );
}
