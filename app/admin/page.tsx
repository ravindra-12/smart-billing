'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BadgeIndianRupee, Database, ReceiptText, RefreshCw, TrendingUp, Users } from 'lucide-react';

const API_BASE_URL = 'https://api.smartbillinglite.com/api';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

interface VendorSummary {
  id: number;
  business_name: string;
  trial_end: string | null;
}

interface SubscriptionPayment {
  amount: string;
  status: string;
  paid_at: string | null;
}

interface SubscriptionSummary {
  id: number;
  status: string;
  end_date: string | null;
  vendor: {
    business_name: string;
    user: {
      name: string;
      phone: string;
      email: string | null;
    };
  };
  plan: {
    name: string;
    price: string;
    duration_days: number;
  };
  payments: SubscriptionPayment[];
}

interface PlanSummary {
  id: number;
  name: string;
}

interface StoragePackSummary {
  id: number;
  name: string;
  is_active: boolean;
}

interface StoragePacksResponse {
  success: boolean;
  data: StoragePackSummary[];
}

interface DashboardMetrics {
  totalVendors: number;
  activeTrials: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  cancelledSubscriptions: number;
  totalPlans: number;
  totalStoragePacks: number;
  activeStoragePacks: number;
  monthlyRevenue: number;
  recentSubscriptions: SubscriptionSummary[];
}

const defaultMetrics: DashboardMetrics = {
  totalVendors: 0,
  activeTrials: 0,
  totalSubscriptions: 0,
  activeSubscriptions: 0,
  expiredSubscriptions: 0,
  cancelledSubscriptions: 0,
  totalPlans: 0,
  totalStoragePacks: 0,
  activeStoragePacks: 0,
  monthlyRevenue: 0,
  recentSubscriptions: [],
};

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
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

const isCurrentMonth = (value: string | null) => {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  const now = new Date();

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const headers = getAuthHeaders();
      const [
        vendorsResponse,
        activeVendorsResponse,
        subscriptionsResponse,
        activeSubscriptionsResponse,
        expiredSubscriptionsResponse,
        cancelledSubscriptionsResponse,
        plansResponse,
        storagePacksResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/vendors?per_page=1`, { headers }),
        fetch(`${API_BASE_URL}/admin/vendors?status=active&per_page=1`, { headers }),
        fetch(`${API_BASE_URL}/admin/subscriptions?per_page=50`, { headers }),
        fetch(`${API_BASE_URL}/admin/subscriptions?status=active&per_page=1`, { headers }),
        fetch(`${API_BASE_URL}/admin/subscriptions?status=expired&per_page=1`, { headers }),
        fetch(`${API_BASE_URL}/admin/subscriptions?status=cancelled&per_page=1`, { headers }),
        fetch(`${API_BASE_URL}/plans`, { headers: { Accept: '*/*' } }),
        fetch(`${API_BASE_URL}/storage-packs`, { headers }),
      ]);

      if (
        !vendorsResponse.ok ||
        !activeVendorsResponse.ok ||
        !subscriptionsResponse.ok ||
        !activeSubscriptionsResponse.ok ||
        !expiredSubscriptionsResponse.ok ||
        !cancelledSubscriptionsResponse.ok ||
        !plansResponse.ok ||
        !storagePacksResponse.ok
      ) {
        throw new Error('Unable to load dashboard metrics.');
      }

      const vendors = (await vendorsResponse.json()) as PaginatedResponse<VendorSummary>;
      const activeVendors = (await activeVendorsResponse.json()) as PaginatedResponse<VendorSummary>;
      const subscriptions = (await subscriptionsResponse.json()) as PaginatedResponse<SubscriptionSummary>;
      const activeSubscriptions = (await activeSubscriptionsResponse.json()) as PaginatedResponse<SubscriptionSummary>;
      const expiredSubscriptions = (await expiredSubscriptionsResponse.json()) as PaginatedResponse<SubscriptionSummary>;
      const cancelledSubscriptions = (await cancelledSubscriptionsResponse.json()) as PaginatedResponse<SubscriptionSummary>;
      const plans = (await plansResponse.json()) as PlanSummary[];
      const storagePacks = (await storagePacksResponse.json()) as StoragePacksResponse;

      const monthlyRevenue = subscriptions.data.reduce((total, subscription) => {
        const capturedThisMonth = subscription.payments.filter((payment) => {
          return payment.status === 'captured' && isCurrentMonth(payment.paid_at);
        });

        return (
          total +
          capturedThisMonth.reduce((paymentTotal, payment) => paymentTotal + Number(payment.amount || 0), 0)
        );
      }, 0);

      setMetrics({
        totalVendors: vendors.total,
        activeTrials: activeVendors.total,
        totalSubscriptions: subscriptions.total,
        activeSubscriptions: activeSubscriptions.total,
        expiredSubscriptions: expiredSubscriptions.total,
        cancelledSubscriptions: cancelledSubscriptions.total,
        totalPlans: plans.length,
        totalStoragePacks: storagePacks.data.length,
        activeStoragePacks: storagePacks.data.filter((pack) => pack.is_active).length,
        monthlyRevenue,
        recentSubscriptions: subscriptions.data.slice(0, 5),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load dashboard metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  const stats = useMemo(
    () => [
      {
        name: 'Total Vendors',
        value: metrics.totalVendors.toLocaleString('en-IN'),
        detail: `${metrics.activeTrials.toLocaleString('en-IN')} active trials`,
        icon: Users,
      },
      {
        name: 'Active Subscriptions',
        value: metrics.activeSubscriptions.toLocaleString('en-IN'),
        detail: `${metrics.totalSubscriptions.toLocaleString('en-IN')} total subscriptions`,
        icon: ReceiptText,
      },
      {
        name: 'Revenue This Month',
        value: formatCurrency(metrics.monthlyRevenue),
        detail: 'Captured payments from loaded subscriptions',
        icon: TrendingUp,
      },
      {
        name: 'Plans',
        value: metrics.totalPlans.toLocaleString('en-IN'),
        detail: 'Subscription plans configured',
        icon: BadgeIndianRupee,
      },
      {
        name: 'Storage Packs',
        value: metrics.totalStoragePacks.toLocaleString('en-IN'),
        detail: `${metrics.activeStoragePacks.toLocaleString('en-IN')} active packs`,
        icon: Database,
      },
      {
        name: 'Expired / Cancelled',
        value: `${metrics.expiredSubscriptions}/${metrics.cancelledSubscriptions}`,
        detail: 'Subscription cleanup watchlist',
        icon: ReceiptText,
      },
    ],
    [metrics]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">Dashboard Overview</h1>
          <p className="mt-1 text-slate-500">Live KPIs from vendor, plan, storage, and subscription APIs.</p>
        </div>
        <button
          onClick={() => void loadDashboard()}
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={24} />
                </div>
                {isLoading && <span className="text-xs font-bold text-slate-400">Loading</span>}
              </div>
              <h3 className="mb-1 font-medium text-slate-500">{stat.name}</h3>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Recent Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 font-semibold">Vendor</th>
                  <th className="py-3 font-semibold">Plan</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Ends</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentSubscriptions.length > 0 ? (
                  metrics.recentSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="py-3">
                        <div className="font-bold text-slate-800">{subscription.vendor.business_name}</div>
                        <div className="text-xs text-slate-500">{subscription.vendor.user.phone}</div>
                      </td>
                      <td className="py-3">{subscription.plan.name}</td>
                      <td className="py-3 capitalize">{subscription.status}</td>
                      <td className="py-3">{formatDate(subscription.end_date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      {isLoading ? 'Loading subscriptions...' : 'No subscriptions found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Useful KPIs</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p>Total vendors and active trials from `/admin/vendors`.</p>
            <p>Active, expired, and cancelled subscriptions from `/admin/subscriptions`.</p>
            <p>Monthly captured revenue from subscription payment history.</p>
            <p>Total subscription plans and active storage packs.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
