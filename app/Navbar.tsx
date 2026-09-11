"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X, Receipt } from "lucide-react";
import type { DynamicPage } from "../lib/dynamicPages";
import Button from "./components/ui/Button";
import Container from "./components/ui/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar({ dynamicPages = [] }: { dynamicPages?: DynamicPage[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/promoter") ||
    pathname.startsWith("/vendor") ||
    pathname.startsWith("/referral")
  ) {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);
  const dynamicNavLinks = dynamicPages.map((page) => ({
    href: `/dynamic-pages/${page.slug}`,
    label: page.title,
  }));
  const allNavLinks = [...navLinks, ...dynamicNavLinks];

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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex items-center justify-between py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-paper">
            <Receipt size={20} strokeWidth={2.25} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold leading-none text-ink">
              Smart Billing <span className="text-accent">Lite</span>
            </div>
            <div className="mt-1 text-[11px] font-medium text-ink-faint">
              AI Powered Billing App
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {allNavLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 py-1 text-sm font-semibold transition-colors ${
                  isActive ? "border-accent text-accent" : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#download-apk"
            onClick={scrollToDownload}
            className="text-sm font-semibold text-ink-soft hover:text-ink"
          >
            Login
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Button
          href="/#download-apk"
          onClick={scrollToDownload}
          className="hidden md:inline-flex"
        >
          Start Free Trial
        </Button>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition hover:bg-paper-dim md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-line bg-paper px-5 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {allNavLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-accent-soft text-accent-dark" : "text-ink-soft hover:bg-paper-dim"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#download-apk"
              onClick={scrollToDownload}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft transition hover:bg-paper-dim"
            >
              Login
            </Link>
          </nav>

          <Button href="/#download-apk" onClick={scrollToDownload} className="mt-3 w-full">
            Start Free Trial
          </Button>
        </div>
      )}
    </header>
  );
}
