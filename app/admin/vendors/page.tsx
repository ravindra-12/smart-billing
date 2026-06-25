'use client';

import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Database, Edit2, RefreshCw, Search, Trash2, X } from 'lucide-react';

const VENDORS_API_URL = 'https://api.smartbillinglite.com/api/admin/vendors';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

type VendorStatusFilter = '' | 'active' | 'expired';

interface VendorUser {
  id: number;
  name: string;
  email: string;
}

interface Vendor {
  id: number;
  user_id: number;
  business_name: string;
  upi_id: string | null;
  qr_code_image: string | null;
  qr_code_url?: string | null;
  accept_upi: boolean;
  accept_cash: boolean;
  accept_card: boolean;
  accept_wallet: boolean;
  accept_credit: boolean;
  trial_start: string | null;
  trial_end: string | null;
  created_at: string;
  updated_at: string;
  base_storage_mb: string;
  user: VendorUser;
}

interface VendorPaginationResponse {
  current_page: number;
  data: Vendor[];
  from: number | null;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

interface VendorFormState {
  business_name: string;
  upi_id: string;
  base_storage_mb: string;
  accept_upi: boolean;
  accept_cash: boolean;
  accept_card: boolean;
  accept_wallet: boolean;
  accept_credit: boolean;
  trial_start: string;
  trial_end: string;
}

const emptyForm: VendorFormState = {
  business_name: '',
  upi_id: '',
  base_storage_mb: '',
  accept_upi: true,
  accept_cash: true,
  accept_card: false,
  accept_wallet: false,
  accept_credit: true,
  trial_start: '',
  trial_end: '',
};

const getAuthHeaders = () => {
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    throw new Error('Admin token not found. Please login again.');
  }

  return {
    Accept: '*/*',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
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

const toDateInputValue = (value: string | null) => {
  if (!value) {
    return '';
  }

  return value.slice(0, 10);
};

const getTrialStatus = (trialEnd: string | null) => {
  if (!trialEnd) {
    return 'Unknown';
  }

  return new Date(trialEnd).getTime() >= Date.now() ? 'Active' : 'Expired';
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [status, setStatus] = useState<VendorStatusFilter>('');
  const [perPage, setPerPage] = useState('10');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<VendorPaginationResponse | null>(null);
  const [form, setForm] = useState<VendorFormState>(emptyForm);
  const [editingVendorId, setEditingVendorId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingVendorId, setDeletingVendorId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadVendors = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const params = new URLSearchParams();

    if (appliedSearch.trim()) {
      params.set('search', appliedSearch.trim());
    }

    if (status) {
      params.set('status', status);
    }

    params.set('per_page', perPage || '10');
    params.set('page', String(page));

    try {
      const response = await fetch(`${VENDORS_API_URL}?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Unable to load vendors.');
      }

      const data = (await response.json()) as VendorPaginationResponse;
      setVendors(data.data);
      setPagination(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load vendors.');
    } finally {
      setIsLoading(false);
    }
  }, [appliedSearch, page, perPage, status]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadVendors();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadVendors]);

  const closeModal = () => {
    setForm(emptyForm);
    setEditingVendorId(null);
    setError('');
    setIsModalOpen(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(searchTerm);
  };

  const handleEdit = async (vendor: Vendor) => {
    setError('');
    setSuccess('');
    setEditingVendorId(vendor.id);

    try {
      const response = await fetch(`${VENDORS_API_URL}/${vendor.id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Unable to fetch vendor details.');
      }

      const data = (await response.json()) as Vendor;
      setForm({
        business_name: data.business_name,
        upi_id: data.upi_id || '',
        base_storage_mb: data.base_storage_mb,
        accept_upi: data.accept_upi,
        accept_cash: data.accept_cash,
        accept_card: data.accept_card,
        accept_wallet: data.accept_wallet,
        accept_credit: data.accept_credit,
        trial_start: toDateInputValue(data.trial_start),
        trial_end: toDateInputValue(data.trial_end),
      });
      setIsModalOpen(true);
    } catch (err) {
      setEditingVendorId(null);
      setError(err instanceof Error ? err.message : 'Unable to fetch vendor details.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    if (!editingVendorId) {
      setError('Please select a vendor to update.');
      setIsSaving(false);
      return;
    }

    const baseStorageMb = Number(form.base_storage_mb);

    if (!form.business_name.trim() || Number.isNaN(baseStorageMb)) {
      setError('Please enter a valid business name and base storage.');
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(`${VENDORS_API_URL}/${editingVendorId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          business_name: form.business_name.trim(),
          upi_id: form.upi_id.trim() || null,
          base_storage_mb: baseStorageMb,
          accept_upi: form.accept_upi,
          accept_cash: form.accept_cash,
          accept_card: form.accept_card,
          accept_wallet: form.accept_wallet,
          accept_credit: form.accept_credit,
          trial_start: form.trial_start || null,
          trial_end: form.trial_end || null,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update vendor.');
      }

      setSuccess(data.message || 'Vendor updated successfully.');
      closeModal();
      await loadVendors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update vendor.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (vendor: Vendor) => {
    const confirmed = window.confirm(`Delete "${vendor.business_name}" vendor?`);

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingVendorId(vendor.id);

    try {
      const response = await fetch(`${VENDORS_API_URL}/${vendor.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete vendor.');
      }

      setSuccess(data.message || 'Vendor deleted successfully.');
      await loadVendors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete vendor.');
    } finally {
      setDeletingVendorId(null);
    }
  };

  const paymentOptions = [
    ['accept_upi', 'UPI'],
    ['accept_cash', 'Cash'],
    ['accept_card', 'Card'],
    ['accept_wallet', 'Wallet'],
    ['accept_credit', 'Credit'],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">Vendors</h1>
          <p className="mt-1 text-slate-500">
            Search, filter, update, and remove vendors from the admin panel.
          </p>
        </div>
        <button
          onClick={() => void loadVendors()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:w-auto"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {(error || success) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
            error
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {error || success}
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
              placeholder="Search business name or UPI ID"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as VendorStatusFilter);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
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
          <h2 className="text-lg font-bold text-slate-800">All Vendors</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing {pagination?.from ?? 0} to {pagination?.to ?? 0} of {pagination?.total ?? 0} vendors
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Vendor</th>
                <th className="px-6 py-4 font-semibold">Payments</th>
                <th className="px-6 py-4 font-semibold">Trial</th>
                <th className="px-6 py-4 font-semibold">Storage</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-semibold text-slate-500">
                    Loading vendors...
                  </td>
                </tr>
              ) : vendors.length > 0 ? (
                vendors.map((vendor) => {
                  const trialStatus = getTrialStatus(vendor.trial_end);
                  const enabledPayments = [
                    vendor.accept_upi && 'UPI',
                    vendor.accept_cash && 'Cash',
                    vendor.accept_card && 'Card',
                    vendor.accept_wallet && 'Wallet',
                    vendor.accept_credit && 'Credit',
                  ].filter((payment): payment is string => Boolean(payment));

                  return (
                    <tr key={vendor.id} className="transition hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{vendor.business_name}</div>
                        <div className="text-xs text-slate-500">{vendor.user.email}</div>
                        <div className="text-xs text-slate-400">ID: {vendor.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex max-w-xs flex-wrap gap-1.5">
                          {enabledPayments.length > 0 ? (
                            enabledPayments.map((payment) => (
                              <span key={payment} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                                {payment}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-semibold text-slate-700">
                          {formatDate(vendor.trial_start)} - {formatDate(vendor.trial_end)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          <Database size={14} />
                          {vendor.base_storage_mb} MB
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            trialStatus === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {trialStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => void handleEdit(vendor)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit vendor"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => void handleDelete(vendor)}
                            disabled={deletingVendorId === vendor.id}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete vendor"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="font-bold text-slate-700">No vendors found</div>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Edit Vendor</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update business details, payment modes, trial dates, and storage.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="business-name" className="mb-2 block text-sm font-bold text-slate-700">
                    Business Name
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    value={form.business_name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, business_name: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="upi-id" className="mb-2 block text-sm font-bold text-slate-700">
                    UPI ID
                  </label>
                  <input
                    id="upi-id"
                    type="text"
                    value={form.upi_id}
                    onChange={(event) => setForm((current) => ({ ...current, upi_id: event.target.value }))}
                    placeholder="vendor@upi"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="base-storage" className="mb-2 block text-sm font-bold text-slate-700">
                    Base Storage MB
                  </label>
                  <input
                    id="base-storage"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.base_storage_mb}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, base_storage_mb: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="trial-start" className="mb-2 block text-sm font-bold text-slate-700">
                    Trial Start
                  </label>
                  <input
                    id="trial-start"
                    type="date"
                    value={form.trial_start}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, trial_start: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="trial-end" className="mb-2 block text-sm font-bold text-slate-700">
                    Trial End
                  </label>
                  <input
                    id="trial-end"
                    type="date"
                    value={form.trial_end}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, trial_end: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-3 text-sm font-bold text-slate-700">Accepted Payment Modes</div>
                <div className="grid gap-3 sm:grid-cols-5">
                  {paymentOptions.map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={form[key]}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, [key]: event.target.checked }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="h-11 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {isSaving ? 'Saving...' : 'Update Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
