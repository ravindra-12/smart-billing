'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BadgeIndianRupee,
  CreditCard,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ANALYTICS_API_URL = 'https://api.smartbillinglite.com/api/admin/analytics';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

type SummaryRange = 'today' | 'week' | 'month' | 'year' | 'custom';
type ChartPeriod = 'daily' | 'weekly' | 'monthly';

interface PaymentMethodMetric {
  amount: number;
  count: number;
  percentage: number;
}

interface AnalyticsSummary {
  total_vendors: number;
  active_vendors: number;
  new_vendors_this_month: number;
  today_revenue: number;
  week_revenue: number;
  month_revenue: number;
  last_month_revenue: number;
  total_revenue: number;
  month_over_month_growth: number;
  avg_revenue_per_vendor: number;
  total_billings: number;
  today_billings: number;
  month_billings: number;
  today_transactions: number;
  month_transactions: number;
  total_customers: number;
  new_customers_this_month: number;
  total_subscriptions: number;
  active_subscriptions: number;
  total_subscription_revenue: number;
  month_subscription_revenue: number;
  payment_method_breakdown: Record<string, PaymentMethodMetric>;
  period: string;
  generated_at: string;
}

interface RevenueChartResponse {
  labels: string[];
  revenue: number[];
  transactions: number[];
  new_vendors: number[];
  period: string;
  total_revenue: number;
  total_transactions: number;
  total_new_vendors: number;
  avg_revenue: number;
}

interface VendorRevenueMetric {
  id: number;
  business_name: string;
  owner_name: string;
  phone: string;
  email?: string | null;
  total_revenue: number;
  total_transactions: number;
}

interface VendorBillingMetric {
  id: number;
  business_name: string;
  owner_name: string;
  phone: string;
  total_bills: number;
  total_amount: number;
}

interface VendorCustomerMetric {
  id: number;
  business_name: string;
  owner_name: string;
  phone: string;
  total_customers: number;
}

interface VendorPerformanceResponse {
  top_vendors_by_revenue: VendorRevenueMetric[];
  top_vendors_by_billing_count: VendorBillingMetric[];
  top_vendors_by_customers: VendorCustomerMetric[];
  inactive_vendors: Array<{
    id: number;
    business_name: string;
    owner_name: string;
    phone: string;
    trial_end: string;
  }>;
  new_vendors_this_month: Array<{
    id: number;
    business_name: string;
    owner_name: string;
    phone: string;
    joined_at: string;
  }>;
  generated_at: string;
}

interface SubscriptionAnalyticsResponse {
  total_subscriptions: number;
  active_subscriptions: number;
  expired_subscriptions: number;
  cancelled_subscriptions: number;
  plan_distribution: Array<{
    plan_id: number;
    plan_name: string;
    price: number;
    duration_days: number;
    total_subscriptions: number;
    active_subscriptions: number;
  }>;
  mrr: number;
  total_subscription_revenue: number;
  month_subscription_revenue: number;
  subscription_revenue_chart: Array<{
    month: string;
    revenue: number;
    payments_count: number;
  }>;
  churn_rate: number;
  avg_subscription_duration_days: number;
  generated_at: string;
}

interface GrowthTrendsResponse {
  labels: string[];
  vendor_signups: number[];
  customer_growth: number[];
  billing_growth: number[];
  revenue_growth: number[];
  cumulative_vendors: number[];
  cumulative_customers: number[];
  totals: {
    total_vendor_signups: number;
    total_new_customers: number;
    total_billings: number;
    total_revenue: number;
  };
  generated_at: string;
}

const CHART_COLORS = ['#4f46e5', '#059669', '#ea580c', '#0891b2', '#dc2626'];

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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0);

const compactNumber = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value || 0);

export default function AnalyticsPage() {
  const [range, setRange] = useState<SummaryRange>('month');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [period, setPeriod] = useState<ChartPeriod>('daily');
  const [days, setDays] = useState('30');
  const [months, setMonths] = useState('12');
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartResponse | null>(null);
  const [vendorPerformance, setVendorPerformance] = useState<VendorPerformanceResponse | null>(null);
  const [subscriptionAnalytics, setSubscriptionAnalytics] =
    useState<SubscriptionAnalyticsResponse | null>(null);
  const [growthTrends, setGrowthTrends] = useState<GrowthTrendsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const summaryParams = new URLSearchParams({ range });
    if (range === 'custom' && dateFrom && dateTo) {
      summaryParams.set('date_from', dateFrom);
      summaryParams.set('date_to', dateTo);
    }

    const chartParams = new URLSearchParams({
      period,
      days: days || '30',
    });

    try {
      const headers = getAuthHeaders();
      const responses = await Promise.all([
        fetch(`${ANALYTICS_API_URL}/summary?${summaryParams.toString()}`, { headers }),
        fetch(`${ANALYTICS_API_URL}/revenue-chart?${chartParams.toString()}`, { headers }),
        fetch(`${ANALYTICS_API_URL}/vendor-performance?limit=10`, { headers }),
        fetch(`${ANALYTICS_API_URL}/subscription-analytics`, { headers }),
        fetch(`${ANALYTICS_API_URL}/growth-trends?months=${months || '12'}`, { headers }),
      ]);

      if (responses.some((response) => !response.ok)) {
        throw new Error('Unable to load analytics data.');
      }

      const [summaryData, revenueData, vendorData, subscriptionData, growthData] =
        await Promise.all([
          responses[0].json() as Promise<AnalyticsSummary>,
          responses[1].json() as Promise<RevenueChartResponse>,
          responses[2].json() as Promise<VendorPerformanceResponse>,
          responses[3].json() as Promise<SubscriptionAnalyticsResponse>,
          responses[4].json() as Promise<GrowthTrendsResponse>,
        ]);

      setSummary(summaryData);
      setRevenueChart(revenueData);
      setVendorPerformance(vendorData);
      setSubscriptionAnalytics(subscriptionData);
      setGrowthTrends(growthData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load analytics data.');
    } finally {
      setIsLoading(false);
    }
  }, [dateFrom, dateTo, days, months, period, range]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAnalytics();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadAnalytics]);

  const revenueData = useMemo(
    () =>
      revenueChart?.labels.map((label, index) => ({
        label,
        revenue: revenueChart.revenue[index] ?? 0,
        transactions: revenueChart.transactions[index] ?? 0,
        vendors: revenueChart.new_vendors[index] ?? 0,
      })) ?? [],
    [revenueChart]
  );

  const paymentData = useMemo(
    () =>
      Object.entries(summary?.payment_method_breakdown ?? {}).map(([name, metric]) => ({
        name: name.toUpperCase(),
        value: metric.amount,
        count: metric.count,
      })),
    [summary]
  );

  const growthData = useMemo(
    () =>
      growthTrends?.labels.map((label, index) => ({
        label,
        vendors: growthTrends.vendor_signups[index] ?? 0,
        customers: growthTrends.customer_growth[index] ?? 0,
        billings: growthTrends.billing_growth[index] ?? 0,
        revenue: growthTrends.revenue_growth[index] ?? 0,
      })) ?? [],
    [growthTrends]
  );

  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(summary?.total_revenue ?? 0), icon: BadgeIndianRupee },
    { label: 'Month Revenue', value: formatCurrency(summary?.month_revenue ?? 0), icon: TrendingUp },
    { label: 'Total Vendors', value: String(summary?.total_vendors ?? 0), icon: Users },
    { label: 'Active Vendors', value: String(summary?.active_vendors ?? 0), icon: Activity },
    { label: 'Total Billings', value: String(summary?.total_billings ?? 0), icon: ShoppingCart },
    { label: 'Total Customers', value: String(summary?.total_customers ?? 0), icon: Users },
    { label: 'MRR', value: formatCurrency(subscriptionAnalytics?.mrr ?? 0), icon: CreditCard },
    {
      label: 'MoM Growth',
      value: `${Number(summary?.month_over_month_growth ?? 0).toFixed(1)}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">Analytics</h1>
          <p className="mt-1 text-slate-500">
            Platform revenue, growth, vendors, subscriptions, and payment performance.
          </p>
        </div>
        <button
          onClick={() => void loadAnalytics()}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[180px_1fr_180px_130px_130px]">
        <select
          value={range}
          onChange={(event) => setRange(event.target.value as SummaryRange)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-indigo-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom</option>
        </select>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="date"
            value={dateFrom}
            disabled={range !== 'custom'}
            onChange={(event) => setDateFrom(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none disabled:opacity-40"
          />
          <input
            type="date"
            value={dateTo}
            disabled={range !== 'custom'}
            onChange={(event) => setDateTo(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none disabled:opacity-40"
          />
        </div>
        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value as ChartPeriod)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-indigo-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(event) => setDays(event.target.value)}
          title="Chart days"
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none"
        />
        <select
          value={months}
          onChange={(event) => setMonths(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none"
        >
          <option value="6">6 months</option>
          <option value="12">12 months</option>
          <option value="24">24 months</option>
        </select>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={20} />
              </div>
              <div className="text-sm font-semibold text-slate-500">{kpi.label}</div>
              <div className="mt-1 text-2xl font-bold text-slate-800">
                {isLoading ? '...' : kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-800">Revenue Trend</h2>
            <p className="text-sm text-slate-500">
              {revenueChart?.total_transactions ?? 0} transactions across the selected period
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} minTickGap={24} />
                <YAxis tickFormatter={compactNumber} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Payment Mix</h2>
          <p className="text-sm text-slate-500">Revenue by payment method</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                  {paymentData.map((entry, index) => (
                    <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Transactions & New Vendors</h2>
          <p className="mb-5 text-sm text-slate-500">Activity across the revenue chart period</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} minTickGap={20} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="#0891b2" name="Transactions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vendors" fill="#ea580c" name="New Vendors" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Platform Growth</h2>
          <p className="mb-5 text-sm text-slate-500">Monthly vendors, customers, and billings</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} minTickGap={20} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendors" stroke="#4f46e5" name="Vendors" strokeWidth={2} />
                <Line type="monotone" dataKey="customers" stroke="#059669" name="Customers" strokeWidth={2} />
                <Line type="monotone" dataKey="billings" stroke="#ea580c" name="Billings" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Subscription Revenue</h2>
          <p className="mb-5 text-sm text-slate-500">
            MRR {formatCurrency(subscriptionAnalytics?.mrr ?? 0)} · Churn{' '}
            {subscriptionAnalytics?.churn_rate ?? 0}%
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionAnalytics?.subscription_revenue_chart ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={compactNumber} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Plan Distribution</h2>
          <p className="mb-5 text-sm text-slate-500">Total and active subscriptions by plan</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionAnalytics?.plan_distribution ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="plan_name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_subscriptions" name="Total" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active_subscriptions" name="Active" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-800">Top Vendors by Revenue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Vendor</th>
                <th className="px-5 py-3 font-semibold">Owner</th>
                <th className="px-5 py-3 font-semibold">Transactions</th>
                <th className="px-5 py-3 text-right font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(vendorPerformance?.top_vendors_by_revenue ?? []).map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-5 py-4 font-bold text-slate-800">{vendor.business_name}</td>
                  <td className="px-5 py-4">{vendor.owner_name}</td>
                  <td className="px-5 py-4">{vendor.total_transactions}</td>
                  <td className="px-5 py-4 text-right font-bold text-slate-800">
                    {formatCurrency(vendor.total_revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
