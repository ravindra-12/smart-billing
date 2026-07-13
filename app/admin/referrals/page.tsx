'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CircleDollarSign,
  Gift,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

const API_BASE_URL = 'https://api.smartbillinglite.com/api';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

type ReferralStatusFilter = '' | 'pending' | 'premium_purchased' | 'expired' | 'cancelled';
type ReferralTypeFilter = '' | 'VENDOR' | 'BRAND_PROMOTER';
type RewardStatusFilter = '' | 'pending' | 'approved' | 'paid' | 'cancelled';

type RewardStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

interface ReferralRecord {
  id: number;
  referral_code_id: number;
  referrer_user_id: number;
  referred_user_id: number;
  referred_phone: string;
  status: string;
  referred_at: string;
  premium_purchased_at: string | null;
  created_at: string;
  updated_at: string;
  referrer: {
    id: number;
    phone: string;
    name: string;
    email: string | null;
    role: string;
    city: string | null;
  };
  referred: {
    id: number;
    phone: string;
    name: string;
    email: string | null;
    role: string;
    city: string | null;
  };
  referral_code: {
    id: number;
    user_id: number;
    referrer_type: string;
    code: string;
    is_active: boolean;
  };
  reward?: {
    id: number;
    amount: string;
    status: RewardStatus;
    payout_method: string | null;
    payout_reference: string | null;
    admin_notes: string | null;
  };
}

interface ReferralPaginationResponse {
  current_page: number;
  data: ReferralRecord[];
  from: number | null;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

interface ReferralRewardRecord {
  id: number;
  referral_id: number;
  referrer_user_id: number;
  amount: string;
  status: RewardStatus;
  eligible_at: string | null;
  approved_at: string | null;
  paid_at: string | null;
  payout_method: string | null;
  payout_reference: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  referral: ReferralRecord;
}

interface ReferralRewardsPaginationResponse {
  current_page: number;
  data: ReferralRewardRecord[];
  from: number | null;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

interface ReferralAnalytics {
  total_referral_codes: number;
  total_referrals: number;
  pending_referrals: number;
  premium_conversions: number;
  conversion_rate: number;
  total_rewards_pending: number;
  total_rewards_approved: number;
  total_rewards_paid: string;
  total_rewards_cancelled: number;
  total_brand_promoters: number;
  active_brand_promoters: number;
  vendor_referrals: number;
  promoter_referrals: number;
}

const getAuthHeaders = () => {
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    throw new Error('Admin token not found. Please login again.');
  }

  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

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

const badgeClassName = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'premium_purchased':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'approved':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'paid':
      return 'bg-violet-50 text-violet-700 ring-1 ring-violet-200';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'expired':
      return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
  }
};

export default function ReferralManagementPage() {
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [rewards, setRewards] = useState<ReferralRewardRecord[]>([]);
  const [analytics, setAnalytics] = useState<ReferralAnalytics | null>(null);
  const [pagination, setPagination] = useState<ReferralPaginationResponse | null>(null);
  const [rewardPagination, setRewardPagination] = useState<ReferralRewardsPaginationResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReferralStatusFilter>('');
  const [typeFilter, setTypeFilter] = useState<ReferralTypeFilter>('');
  const [rewardStatusFilter, setRewardStatusFilter] = useState<RewardStatusFilter>('');
  const [page, setPage] = useState(1);
  const [rewardPage, setRewardPage] = useState(1);
  const [perPage, setPerPage] = useState('10');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const params = new URLSearchParams({ page: String(page), per_page: perPage || '10' });
    const rewardParams = new URLSearchParams({ page: String(rewardPage), per_page: '10' });

    if (statusFilter) {
      params.set('status', statusFilter);
    }

    if (typeFilter) {
      params.set('referrer_type', typeFilter);
    }

    if (rewardStatusFilter) {
      rewardParams.set('status', rewardStatusFilter);
    }

    try {
      const headers = getAuthHeaders();

      const [referralsResponse, rewardsResponse, analyticsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/referrals?${params.toString()}`, { headers }),
        fetch(`${API_BASE_URL}/admin/referral-rewards?${rewardParams.toString()}`, { headers }),
        fetch(`${API_BASE_URL}/admin/referral-analytics`, { headers }),
      ]);

      if (!referralsResponse.ok || !rewardsResponse.ok || !analyticsResponse.ok) {
        throw new Error('Unable to load referral data.');
      }

      const referralsData = (await referralsResponse.json()) as ReferralPaginationResponse;
      const rewardsData = (await rewardsResponse.json()) as ReferralRewardsPaginationResponse;
      const analyticsData = (await analyticsResponse.json()) as ReferralAnalytics;

      setReferrals(referralsData.data || []);
      setPagination(referralsData);
      setRewards(rewardsData.data || []);
      setRewardPagination(rewardsData);
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load referral data.');
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage, rewardPage, rewardStatusFilter, statusFilter, typeFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadData]);

  const handleRewardAction = async (rewardId: number, action: 'approve' | 'pay' | 'cancel') => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload: Record<string, string> = {
        admin_notes: `Updated from admin panel (${action})`,
      };

      if (action === 'pay') {
        payload.payout_method = 'UPI';
        payload.payout_reference = `SBL-${rewardId}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/referral-rewards/${rewardId}/${action}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Unable to ${action} reward.`);
      }

      setSuccess(`Reward ${action}d successfully.`);
      setRewardPage(1);
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update reward.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = useMemo(
    () => [
      {
        label: 'Total referrals',
        value: analytics?.total_referrals?.toLocaleString('en-IN') ?? '0',
        detail: `${analytics?.premium_conversions ?? 0} premium conversions`,
        icon: Users,
      },
      {
        label: 'Conversion rate',
        value: `${analytics?.conversion_rate ?? 0}%`,
        detail: `${analytics?.pending_referrals ?? 0} still pending`,
        icon: TrendingUp,
      },
      {
        label: 'Rewards pending',
        value: formatCurrency(analytics?.total_rewards_pending ?? 0),
        detail: `${analytics?.total_rewards_approved ?? 0} approved`,
        icon: Gift,
      },
      {
        label: 'Rewards paid',
        value: formatCurrency(analytics?.total_rewards_paid ?? 0),
        detail: `${analytics?.total_rewards_cancelled ?? 0} cancelled`,
        icon: CircleDollarSign,
      },
    ],
    [analytics]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <Sparkles size={16} /> Referral management
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">Referral program overview</h1>
          <p className="mt-2 text-sm text-slate-600">
            Track referrals, reward eligibility, and payout status from one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPage(1);
            setRewardPage(1);
            void loadData();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-500">{item.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Referral list</h2>
              <p className="text-sm text-slate-500">Filter by referral status and referrer type.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value as ReferralStatusFilter);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
              >
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="premium_purchased">Premium purchased</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value as ReferralTypeFilter);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
              >
                <option value="">All referrer types</option>
                <option value="VENDOR">Vendor</option>
                <option value="BRAND_PROMOTER">Brand promoter</option>
              </select>
              <select
                value={perPage}
                onChange={(event) => {
                  setPerPage(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
              </select>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-3">Referrer</th>
                  <th className="px-3 py-3">Referred</th>
                  <th className="px-3 py-3">Code</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Reward</th>
                  <th className="px-3 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center text-slate-500">
                      Loading referrals...
                    </td>
                  </tr>
                ) : referrals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center text-slate-500">
                      No referrals found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  referrals.map((referral) => (
                    <tr key={referral.id} className="align-top">
                      <td className="px-3 py-3">
                        <div className="font-medium text-slate-900">{referral.referrer.name}</div>
                        <div className="text-xs text-slate-500">{referral.referrer.phone}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-slate-900">{referral.referred.name}</div>
                        <div className="text-xs text-slate-500">{referral.referred_phone}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-slate-900">{referral.referral_code.code}</div>
                        <div className="text-xs text-slate-500">{referral.referral_code.referrer_type}</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClassName(referral.status)}`}>
                          {referral.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        {referral.reward ? (
                          <div>
                            <div className="font-medium text-slate-900">{formatCurrency(referral.reward.amount)}</div>
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClassName(referral.reward.status)}`}>
                              {referral.reward.status}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">No reward</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-600">{formatDate(referral.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <span>
                Showing {pagination.from ?? 0} - {pagination.to ?? 0} of {pagination.total} referrals
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={!pagination.prev_page_url}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                  {pagination.current_page}/{pagination.last_page}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={!pagination.next_page_url}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Reward queue</h2>
                <p className="text-sm text-slate-500">Approve, pay, or cancel pending rewards.</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                <Wallet size={18} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <select
                value={rewardStatusFilter}
                onChange={(event) => {
                  setRewardStatusFilter(event.target.value as RewardStatusFilter);
                  setRewardPage(1);
                }}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
              >
                <option value="">All rewards</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mt-4 space-y-3">
              {isLoading ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-5 text-center text-sm text-slate-500">
                  Loading rewards...
                </div>
              ) : rewards.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-5 text-center text-sm text-slate-500">
                  No reward records found.
                </div>
              ) : (
                rewards.map((reward) => (
                  <div key={reward.id} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{reward.referral.referrer.name}</div>
                        <div className="text-sm text-slate-500">
                          {reward.referral.referral_code.code} • {reward.referral.referred.name}
                        </div>
                      </div>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClassName(reward.status)}`}>
                        {reward.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                      <span>{formatCurrency(reward.amount)}</span>
                      <span>{formatDate(reward.created_at)}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reward.status === 'pending' ? (
                        <>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => void handleRewardAction(reward.id, 'approve')}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => void handleRewardAction(reward.id, 'cancel')}
                            className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {reward.status === 'approved' ? (
                        <>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => void handleRewardAction(reward.id, 'pay')}
                            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Mark paid
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => void handleRewardAction(reward.id, 'cancel')}
                            className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {reward.status === 'paid' ? (
                        <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700">
                          Paid
                        </span>
                      ) : null}
                      {reward.status === 'cancelled' ? (
                        <span className="rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700">
                          Cancelled
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>

            {rewardPagination ? (
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                <span>{rewardPagination.total} total</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRewardPage((current) => Math.max(1, current - 1))}
                    disabled={!rewardPagination.prev_page_url}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setRewardPage((current) => current + 1)}
                    disabled={!rewardPagination.next_page_url}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </section>

        </aside>
      </div>
    </div>
  );
}
