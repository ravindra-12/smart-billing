'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Gift, LayoutDashboard, LogOut, UserRound, Wallet } from 'lucide-react';
import {
  PROMOTER_AUTH_EVENT,
  PROMOTER_TOKEN_KEY,
  clearPromoterSession,
} from '@/lib/promoterApi';

const subscribeToAuthChanges = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(PROMOTER_AUTH_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PROMOTER_AUTH_EVENT, callback);
  };
};

const getAuthSnapshot = () => Boolean(window.localStorage.getItem(PROMOTER_TOKEN_KEY));

const getAuthServerSnapshot = () => false;

const navItems = [
  { href: '/promoter', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/promoter/earnings', label: 'Earnings', icon: Wallet },
  { href: '/promoter/profile', label: 'Profile', icon: UserRound },
];

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/promoter/login';
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  useEffect(() => {
    if (!isLoginPage && !isLoggedIn) {
      router.replace('/promoter/login');
    }
  }, [isLoggedIn, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm font-semibold text-slate-500">Redirecting to login...</p>
      </main>
    );
  }

  const handleLogout = () => {
    clearPromoterSession();
    router.replace('/promoter/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5">
          <Link href="/promoter" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Gift size={18} />
            </div>
            <div>
              <div className="text-sm font-black leading-none">Smart Billing Lite</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Brand Promoter</div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="ml-1 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">{children}</main>
    </div>
  );
}
