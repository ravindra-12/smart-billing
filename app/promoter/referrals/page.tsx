'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Users } from 'lucide-react';
import {
  PromoterApiError,
  PromoterReferral,
  clearPromoterSession,
  getPromoterToken,
  getReferrals,
} from '@/lib/promoterApi';

const formatCurrency = (value: string | number) => {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
};

const formatDate = (value: string | null) => {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

const statusBadgeClassName = (status: string) => {
  switch (status) {
    case 'premium_purchased':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'expired':
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'premium_purchased':
      return 'Premium purchased';
    case 'pending':
      return 'Signed up';
    default:
      return status;
  }
};

const rewardBadgeClassName = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'approved':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    default:
      return 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
  }
};

export default function PromoterReferralsPage() {
  const router = useRouter();
  const [referrals, setReferrals] = useState<PromoterReferral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    const token = getPromoterToken();

    if (!token) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await getReferrals(token);
      setReferrals(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err instanceof PromoterApiError && err.status === 401) {
        clearPromoterSession();
        router.replace('/referral/login');
        return;
      }

      setError(err instanceof Error ? err.message : 'Unable to load referrals.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Referrals</h1>
          <p className="mt-1 text-sm text-slate-600">
            Everyone who signed up with your referral code.
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-10 text-center text-sm text-slate-500">
            Loading referrals...
          </div>
        ) : referrals.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-12 text-center">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-700">No referrals yet</p>
            <p className="max-w-sm text-sm text-slate-500">
              Share your referral code with shop owners. You earn ₹100 each time a referred
              vendor purchases premium.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-3">Referred vendor</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Signed up</th>
                  <th className="px-3 py-3">Purchased</th>
                  <th className="px-3 py-3">Reward</th>
                  <th className="px-3 py-3">Reward status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="align-top">
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-900">{referral.referred_name}</div>
                      <div className="text-xs text-slate-500">{referral.referred_phone}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClassName(referral.status)}`}
                      >
                        {statusLabel(referral.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{formatDate(referral.referred_at)}</td>
                    <td className="px-3 py-3 text-slate-600">
                      {formatDate(referral.premium_purchased_at)}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-900">
                      {referral.reward_status === 'none'
                        ? '-'
                        : formatCurrency(referral.reward_amount)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${rewardBadgeClassName(referral.reward_status)}`}
                      >
                        {referral.reward_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
