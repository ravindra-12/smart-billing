'use client';

import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, Edit2, IndianRupee, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react';

const PLANS_API_URL = 'https://api.smartbillinglite.com/api/plans';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

interface PlanFormState {
  name: string;
  price: string;
  duration_days: string;
}

const emptyForm: PlanFormState = {
  name: '',
  price: '',
  duration_days: '',
};

const formatDate = (value: string) => {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [form, setForm] = useState<PlanFormState>(emptyForm);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sortedPlans = useMemo(() => {
    return [...plans].sort((a, b) => a.duration_days - b.duration_days);
  }, [plans]);

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

  const loadPlans = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(PLANS_API_URL, {
        headers: {
          Accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Unable to load subscription plans.');
      }

      const data = (await response.json()) as SubscriptionPlan[];
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load subscription plans.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadPlans();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const closeModal = () => {
    setForm(emptyForm);
    setEditingPlanId(null);
    setError('');
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditingPlanId(null);
    setError('');
    setSuccess('');
    setIsModalOpen(true);
  };

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlanId(plan.id);
    setForm({
      name: plan.name,
      price: plan.price,
      duration_days: String(plan.duration_days),
    });
    setError('');
    setSuccess('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    const price = Number(form.price);
    const durationDays = Number(form.duration_days);

    if (!form.name.trim() || Number.isNaN(price) || Number.isNaN(durationDays)) {
      setError('Please enter a valid name, price, and duration.');
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(
        editingPlanId ? `${PLANS_API_URL}/${editingPlanId}` : PLANS_API_URL,
        {
          method: editingPlanId ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            name: form.name.trim(),
            price,
            duration_days: durationDays,
          }),
        }
      );

      const data = (await response.json()) as SubscriptionPlan | { message?: string };

      if (!response.ok) {
        throw new Error('message' in data && data.message ? data.message : 'Unable to save plan.');
      }

      setSuccess(editingPlanId ? 'Plan updated successfully.' : 'Plan created successfully.');
      closeModal();
      await loadPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save plan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (plan: SubscriptionPlan) => {
    const confirmed = window.confirm(`Delete "${plan.name}" plan?`);

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingPlanId(plan.id);

    try {
      const response = await fetch(`${PLANS_API_URL}/${plan.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete plan.');
      }

      setSuccess(data.message || 'Plan deleted successfully.');
      await loadPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete plan.');
    } finally {
      setDeletingPlanId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Subscription Plans
          </h1>
          <p className="mt-1 text-slate-500">
            Create and manage pricing plans used by Smart Billing Lite.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCreate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 md:w-auto"
          >
            <Plus size={17} />
            Create Plan
          </button>
          <button
            onClick={() => void loadPlans()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:w-auto"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>
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

      <div>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-800">All Plans</h2>
            <p className="mt-1 text-sm text-slate-500">
              {sortedPlans.length} plan{sortedPlans.length === 1 ? '' : 's'} available
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Duration</th>
                  <th className="px-6 py-4 font-semibold">Updated</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center font-semibold text-slate-500">
                      Loading plans...
                    </td>
                  </tr>
                ) : sortedPlans.length > 0 ? (
                  sortedPlans.map((plan) => (
                    <tr key={plan.id} className="transition hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{plan.name}</div>
                        <div className="text-xs text-slate-400">ID: {plan.id}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">₹{plan.price}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                          {plan.duration_days} days
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(plan.updated_at)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit plan"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => void handleDelete(plan)}
                            disabled={deletingPlanId === plan.id}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete plan"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="font-bold text-slate-700">No plans found</div>
                      <div className="mt-1 text-sm text-slate-500">Create your first subscription plan.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingPlanId ? 'Edit Plan' : 'Create Plan'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Set plan name, price, and billing duration.
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

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <div>
                <label htmlFor="plan-name" className="mb-2 block text-sm font-bold text-slate-700">
                  Plan Name
                </label>
                <input
                  id="plan-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Monthly"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="plan-price" className="mb-2 block text-sm font-bold text-slate-700">
                  Price
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                  <IndianRupee size={17} className="text-slate-400" />
                  <input
                    id="plan-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                    placeholder="100"
                    className="h-12 flex-1 border-0 bg-transparent px-2 text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="plan-duration" className="mb-2 block text-sm font-bold text-slate-700">
                  Duration Days
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                  <CalendarDays size={17} className="text-slate-400" />
                  <input
                    id="plan-duration"
                    type="number"
                    min="1"
                    step="1"
                    value={form.duration_days}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, duration_days: event.target.value }))
                    }
                    placeholder="30"
                    className="h-12 flex-1 border-0 bg-transparent px-2 text-sm font-semibold outline-none"
                  />
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
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {editingPlanId ? <Save size={17} /> : <Plus size={17} />}
                  {isSaving ? 'Saving...' : editingPlanId ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
