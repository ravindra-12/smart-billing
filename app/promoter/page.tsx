'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  CircleDollarSign,
  Copy,
  Gift,
  Link2,
  RefreshCw,
  Share2,
  ShoppingBag,
  Users,
  Wallet,
} from 'lucide-react';
import {
  MyCodeResponse,
  PromoterApiError,
  PromoterDashboard,
  clearPromoterSession,
  getDashboard,
  getMyCode,
  getPromoterToken,
  getStoredPromoter,
} from '@/lib/promoterApi';

const formatCurrency = (value: string | number) => {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export default function PromoterDashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<PromoterDashboard | null>(null);
  const [myCode, setMyCode] = useState<MyCodeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);
  const [promoterName, setPromoterName] = useState('');

  const loadData = useCallback(async () => {
    const token = getPromoterToken();

    if (!token) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const [dashboardData, codeData] = await Promise.all([
        getDashboard(token),
        getMyCode(token),
      ]);

      setDashboard(dashboardData);
      setMyCode(codeData);
    } catch (err) {
      if (err instanceof PromoterApiError && err.status === 401) {
        clearPromoterSession();
        router.replace('/promoter/login');
        return;
      }

      setError(err instanceof Error ? err.message : 'Unable to load dashboard.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    setPromoterName(getStoredPromoter()?.name || '');
    void loadData();
  }, [loadData]);

  const copyToClipboard = async (text: string, which: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setError('Unable to copy. Please copy manually.');
    }
  };

  const handleShare = async () => {
    if (!myCode) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Billing Lite',
          text: myCode.share_message,
        });
        return;
      } catch {
        // User dismissed the share sheet; nothing to do.
      }
    } else {
      await copyToClipboard(myCode.share_message, 'link');
    }
  };

  const stats = [
    {
      label: 'Total referrals',
      value: dashboard?.total_referrals?.toLocaleString('en-IN') ?? '0',
      icon: Users,
    },
    {
      label: 'Premium purchases',
      value: dashboard?.premium_purchases?.toLocaleString('en-IN') ?? '0',
      icon: ShoppingBag,
    },
    {
      label: 'Pending rewards',
      value: formatCurrency(dashboard?.pending_rewards ?? 0),
      icon: Gift,
    },
    {
      label: 'Approved rewards',
      value: formatCurrency(dashboard?.approved_rewards ?? 0),
      icon: Wallet,
    },
    {
      label: 'Paid rewards',
      value: formatCurrency(dashboard?.paid_rewards ?? 0),
      icon: CircleDollarSign,
    },
    {
      label: 'Total earnings',
      value: formatCurrency(dashboard?.total_earnings ?? 0),
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {promoterName ? `Hi, ${promoterName}` : 'Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Share your referral code and track your earnings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadData()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="rounded-3xl bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 p-6 text-white shadow-lg shadow-indigo-200">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
              Your referral code
            </p>
            <p className="mt-2 text-4xl font-black tracking-widest">
              {isLoading && !myCode ? '...' : myCode?.referral_code ?? '—'}
            </p>
            <p className="mt-2 max-w-md text-sm text-blue-100">
              Vendors enter this code in the Smart Billing Lite app when they sign up. You earn
              ₹100 when they purchase premium.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!myCode}
              onClick={() => myCode && void copyToClipboard(myCode.referral_code, 'code')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold ring-1 ring-white/20 transition hover:bg-white/25 disabled:opacity-50"
            >
              {copied === 'code' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'code' ? 'Copied!' : 'Copy code'}
            </button>
            <button
              type="button"
              disabled={!myCode}
              onClick={() => myCode && void copyToClipboard(myCode.share_link, 'link')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold ring-1 ring-white/20 transition hover:bg-white/25 disabled:opacity-50"
            >
              {copied === 'link' ? <Check size={16} /> : <Link2 size={16} />}
              {copied === 'link' ? 'Copied!' : 'Copy link'}
            </button>
            <button
              type="button"
              disabled={!myCode}
              onClick={() => void handleShare()}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-blue-700 shadow-lg transition hover:bg-blue-50 disabled:opacity-50"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {isLoading && !dashboard ? '...' : item.value}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
