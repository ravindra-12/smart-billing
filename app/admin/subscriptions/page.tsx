'use client';

import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { BadgeIndianRupee, CalendarDays, Eye, RefreshCw, Search, Store, X } from 'lucide-react';

const SUBSCRIPTIONS_API_URL = 'https://api.smartbillinglite.com/api/admin/subscriptions';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

type SubscriptionStatusFilter = '' | 'active' | 'expired' | 'cancelled';

interface SubscriptionVendorUser {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

interface SubscriptionVendor {
  id: number;
  user_id: number;
  business_name: string;
  upi_id: string | null;
  trial_start: string | null;
  trial_end: string | null;
  base_storage_mb?: string;
  user: SubscriptionVendorUser;
}

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  duration_days: number;
  created_at?: string;
  updated_at?: string;
}

interface SubscriptionPayment {
  id: number;
  subscription_id: number;
  vendor_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount: string;
  currency: string;
  status: string;
  payment_method: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: number;
  vendor_id: number;
  plan_id: number;
  status: 'active' | 'expired' | 'cancelled' | string;
  start_date: string | null;
  end_date: string | null;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
  vendor: SubscriptionVendor;
  plan: SubscriptionPlan;
  payments: SubscriptionPayment[];
  is_currently_active?: boolean;
  days_remaining?: number;
}

interface SubscriptionPaginationResponse {
  current_page: number;
  data: Subscription[];
  from: number | null;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

const getAuthHeaders = () => {
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    throw new Error('Admin token not found. Please login again.');
  }

  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
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

const getStatusClasses = (status: string) => {
  if (status === 'active') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'expired') {
    return 'bg-red-50 text-red-700';
  }

  return 'bg-slate-100 text-slate-600';
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [status, setStatus] = useState<SubscriptionStatusFilter>('');
  const [perPage, setPerPage] = useState('15');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<SubscriptionPaginationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const params = new URLSearchParams();

    if (appliedSearch.trim()) {
      params.set('search', appliedSearch.trim());
    }

    if (status) {
      params.set('status', status);
    }

    params.set('per_page', perPage || '15');
    params.set('page', String(page));

    try {
      const response = await fetch(`${SUBSCRIPTIONS_API_URL}?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Unable to load subscriptions.');
      }

      const data = (await response.json()) as SubscriptionPaginationResponse;
      setSubscriptions(data.data);
      setPagination(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load subscriptions.');
    } finally {
      setIsLoading(false);
    }
  }, [appliedSearch, page, perPage, status]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadSubscriptions();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadSubscriptions]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(searchTerm);
  };

  const handleViewDetails = async (subscription: Subscription) => {
    setError('');
    setIsDetailLoading(true);
    setSelectedSubscription(subscription);

    try {
      const response = await fetch(`${SUBSCRIPTIONS_API_URL}/${subscription.id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Unable to load subscription details.');
      }

      const data = (await response.json()) as Subscription;
      setSelectedSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load subscription details.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Subscriptions
          </h1>
          <p className="mt-1 text-slate-500">
            Review subscription status, vendor details, plans, and payment history.
          </p>
        </div>
        <button
          onClick={() => void loadSubscriptions()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:w-auto"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="grid gap-4 lg:grid-cols-[1fr_180px_160px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search vendor, phone, email, or business"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as SubscriptionStatusFilter);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={perPage}
            onChange={(event) => {
              setPerPage(event.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>

          <button
            type="submit"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <Search size={17} />
            Search
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">All Subscriptions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing {pagination?.from ?? 0} to {pagination?.to ?? 0} of {pagination?.total ?? 0} subscriptions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Vendor</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Period</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-semibold text-slate-500">
                    Loading subscriptions...
                  </td>
                </tr>
              ) : subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{subscription.vendor.business_name}</div>
                      <div className="text-xs text-slate-500">
                        {subscription.vendor.user.phone || subscription.vendor.user.email || 'No contact'}
                      </div>
                      <div className="text-xs text-slate-400">ID: {subscription.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{subscription.plan.name}</div>
                      <div className="text-xs text-slate-500">
                        ₹{subscription.plan.price} / {subscription.plan.duration_days} days
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-700">
                        {formatDate(subscription.start_date)} - {formatDate(subscription.end_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-700">
                        {subscription.payment_id || '-'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {subscription.payments[0]?.payment_method || 'No payment'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClasses(subscription.status)}`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => void handleViewDetails(subscription)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="font-bold text-slate-700">No subscriptions found</div>
                    <div className="mt-1 text-sm text-slate-500">Try changing your filters.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Page <span className="font-bold text-slate-800">{pagination?.current_page ?? page}</span> of{' '}
            <span className="font-bold text-slate-800">{pagination?.last_page ?? 1}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={!pagination?.prev_page_url}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((current) => current + 1)}
              disabled={!pagination?.next_page_url}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Subscription Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isDetailLoading ? 'Refreshing details...' : `Subscription #${selectedSubscription.id}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubscription(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <Store size={15} />
                    Vendor
                  </div>
                  <div className="font-bold text-slate-800">{selectedSubscription.vendor.business_name}</div>
                  <div className="mt-1 text-sm text-slate-500">{selectedSubscription.vendor.user.name}</div>
                  <div className="text-sm text-slate-500">{selectedSubscription.vendor.user.phone}</div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <BadgeIndianRupee size={15} />
                    Plan
                  </div>
                  <div className="font-bold text-slate-800">{selectedSubscription.plan.name}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    ₹{selectedSubscription.plan.price} for {selectedSubscription.plan.duration_days} days
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <CalendarDays size={15} />
                    Period
                  </div>
                  <div className="font-bold text-slate-800 capitalize">{selectedSubscription.status}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {formatDate(selectedSubscription.start_date)} - {formatDate(selectedSubscription.end_date)}
                  </div>
                  {typeof selectedSubscription.days_remaining === 'number' && (
                    <div className="mt-1 text-sm text-slate-500">
                      {selectedSubscription.days_remaining} days remaining
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 px-4 py-3">
                  <h3 className="font-bold text-slate-800">Payment History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Payment ID</th>
                        <th className="px-4 py-3 font-semibold">Amount</th>
                        <th className="px-4 py-3 font-semibold">Method</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Paid At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {selectedSubscription.payments.length > 0 ? (
                        selectedSubscription.payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-4 py-3 font-semibold text-slate-800">{payment.razorpay_payment_id}</td>
                            <td className="px-4 py-3">
                              {payment.currency} {payment.amount}
                            </td>
                            <td className="px-4 py-3 capitalize">{payment.payment_method}</td>
                            <td className="px-4 py-3 capitalize">{payment.status}</td>
                            <td className="px-4 py-3">{formatDate(payment.paid_at)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                            No payments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
