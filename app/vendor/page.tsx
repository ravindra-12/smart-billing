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
  ShareLinkResponse,
  VendorApiError,
  VendorReferralDashboard,
  clearVendorSession,
  getMyCode,
  getReferralDashboard,
  getShareLink,
  getStoredVendorSession,
  getVendorToken,
} from '@/lib/vendorApi';
import { buildShareLink, localizeShareMessage } from '@/lib/shareLink';

const formatCurrency = (value: string | number) => {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export default function VendorDashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<VendorReferralDashboard | null>(null);
  const [shareInfo, setShareInfo] = useState<ShareLinkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);
  const [vendorName, setVendorName] = useState('');

  const loadData = useCallback(async () => {
    const token = getVendorToken();

    if (!token) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // my-code auto-creates the referral code on first use, so it must
      // complete before dashboard/share-link are fetched.
      await getMyCode(token);

      const [dashboardData, shareData] = await Promise.all([
        getReferralDashboard(token),
        getShareLink(token),
      ]);

      setDashboard(dashboardData);
      setShareInfo(shareData);
    } catch (err) {
      if (err instanceof VendorApiError && err.status === 401) {
        clearVendorSession();
        router.replace('/referral/login?tab=vendor');
        return;
      }

      setError(err instanceof Error ? err.message : 'Unable to load dashboard.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const session = getStoredVendorSession();
    setVendorName(session?.user?.name || session?.vendor?.business_name || '');
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
    if (!shareInfo) {
      return;
    }

    const message = localizeShareMessage(shareInfo.share_message, shareInfo.referral_code);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Billing Lite',
          text: message,
        });
        return;
      } catch {
        // User dismissed the share sheet; nothing to do.
      }
    } else {
      await copyToClipboard(message, 'link');
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
            {vendorName ? `Hi, ${vendorName}` : 'Refer & Earn'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Share your referral code with other businesses and track your earnings.
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
              {isLoading && !shareInfo ? '...' : shareInfo?.referral_code ?? '—'}
            </p>
            <p className="mt-2 max-w-md text-sm text-blue-100">
              Other businesses enter this code in the Smart Billing Lite app when they sign up.
              You earn ₹150 when they purchase premium.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!shareInfo}
              onClick={() => shareInfo && void copyToClipboard(shareInfo.referral_code, 'code')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold ring-1 ring-white/20 transition hover:bg-white/25 disabled:opacity-50"
            >
              {copied === 'code' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'code' ? 'Copied!' : 'Copy code'}
            </button>
            <button
              type="button"
              disabled={!shareInfo}
              onClick={() =>
                shareInfo && void copyToClipboard(buildShareLink(shareInfo.referral_code), 'link')
              }
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold ring-1 ring-white/20 transition hover:bg-white/25 disabled:opacity-50"
            >
              {copied === 'link' ? <Check size={16} /> : <Link2 size={16} />}
              {copied === 'link' ? 'Copied!' : 'Copy link'}
            </button>
            <button
              type="button"
              disabled={!shareInfo}
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
