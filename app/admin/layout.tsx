'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, Search, Bell, BadgeIndianRupee, Database, ReceiptText, ChartNoAxesCombined } from 'lucide-react';

const ADMIN_AUTH_KEY = 'smartbilling_admin_auth';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';
const ADMIN_USER_KEY = 'smartbilling_admin_user';

const subscribeToAuthChanges = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('smartbilling-admin-auth-change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('smartbilling-admin-auth-change', callback);
  };
};

const getAdminAuthSnapshot = () => {
  return Boolean(window.localStorage.getItem(ADMIN_TOKEN_KEY));
};

const getAdminAuthServerSnapshot = () => false;

const navItems = [
  { href: '/admin', label: 'Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/vendors', label: 'Vendors', shortLabel: 'Vendors', icon: Users },
  { href: '/admin/plans', label: 'Plans', shortLabel: 'Plans', icon: BadgeIndianRupee },
  { href: '/admin/storage-packs', label: 'Storage Packs', shortLabel: 'Storage', icon: Database },
  { href: '/admin/subscriptions', label: 'Subscriptions', shortLabel: 'Subs', icon: ReceiptText },
  { href: '/admin/analytics', label: 'Analytics', shortLabel: 'Analytics', icon: ChartNoAxesCombined },
  { href: '#', label: 'Settings', shortLabel: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const isActiveRoute = (href: string, exact?: boolean) => {
    if (href === '#') {
      return false;
    }

    return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  };
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    getAdminAuthSnapshot,
    getAdminAuthServerSnapshot
  );

  useEffect(() => {
    if (!isLoginPage && !isLoggedIn) {
      router.replace('/admin/login');
    }
  }, [isLoginPage, isLoggedIn, router]);

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.localStorage.removeItem(ADMIN_USER_KEY);
    window.dispatchEvent(new Event('smartbilling-admin-auth-change'));
    router.replace('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-slate-600 shadow-sm">
          Loading admin...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans md:h-screen md:overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 p-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-slate-800 text-xl tracking-tight">SmartBilling</span>
        </div>
        
        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href, item.exact);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100'
                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut size={20} className="shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden md:ml-64 md:h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="md:hidden flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-slate-800">SmartBilling</span>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-sm font-black text-indigo-700">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 pb-24 md:p-8">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Navigation (optional/simplistic for now) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex items-center justify-around p-3 pb-safe z-20">
         {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href, item.exact);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? 'text-indigo-700' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.shortLabel}</span>
              </Link>
            );
         })}
      </nav>
    </div>
  );
}
