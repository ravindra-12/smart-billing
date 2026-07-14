'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Store } from 'lucide-react';
import { PROMOTER_TOKEN_KEY } from '@/lib/promoterApi';
import { VENDOR_TOKEN_KEY } from '@/lib/vendorApi';
import PromoterLoginForm from './PromoterLoginForm';
import VendorLoginForm from './VendorLoginForm';

export type LoginTab = 'promoter' | 'vendor';

const heroContent: Record<
  LoginTab,
  { badge: string; heading: string; body: string; highlights: string[] }
> = {
  promoter: {
    badge: 'Earn ₹100 per conversion',
    heading: 'Share Smart Billing Lite. Earn rewards for every business you bring.',
    body: 'Get your personal referral code, share it with shop owners, and earn ₹100 every time a referred vendor purchases premium.',
    highlights: ['Your referral code', 'Track earnings', 'Direct payouts'],
  },
  vendor: {
    badge: 'Earn ₹150 per conversion',
    heading: 'Refer other businesses. Earn ₹150 for every premium signup.',
    body: 'Already using Smart Billing Lite? Share your referral code with other shop owners and earn ₹150 every time they purchase premium.',
    highlights: ['Your referral code', 'Track referrals', 'Direct payouts'],
  },
};

export default function LoginClient({ initialTab }: { initialTab: LoginTab }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LoginTab>(initialTab);

  useEffect(() => {
    if (activeTab === 'vendor' && window.localStorage.getItem(VENDOR_TOKEN_KEY)) {
      router.replace('/vendor');
      return;
    }

    if (activeTab === 'promoter' && window.localStorage.getItem(PROMOTER_TOKEN_KEY)) {
      router.replace('/promoter');
    }
  }, [activeTab, router]);

  const hero = heroContent[activeTab];

  const tabs: { id: LoginTab; label: string; icon: typeof Gift }[] = [
    { id: 'promoter', label: 'Brand Promoter', icon: Gift },
    { id: 'vendor', label: 'Vendor', icon: Store },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1fr_560px]">
        <section className="hidden bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <Gift size={24} />
            </div>
            <div>
              <div className="text-xl font-black">Smart Billing Lite</div>
              <div className="text-sm font-medium text-blue-100">Referral Program</div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">
              {hero.badge}
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight">{hero.heading}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">{hero.body}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {hero.highlights.map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold ring-1 ring-white/10">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Gift size={24} />
              </div>
              <div>
                <div className="text-xl font-black">Smart Billing Lite</div>
                <div className="text-sm font-medium text-slate-500">Referral Program</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
              <div className="mb-7 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-black transition ${
                        isActive
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'promoter' ? (
                <PromoterLoginForm />
              ) : (
                <VendorLoginForm onSwitchToPromoter={() => setActiveTab('promoter')} />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
