'use client';

import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Archive, Database, Edit2, IndianRupee, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react';

const STORAGE_PACKS_API_URL = 'https://api.smartbillinglite.com/api/storage-packs';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

type StoragePackType = 'one_time' | 'recurring';

interface StoragePack {
  id: number;
  name: string;
  storage_mb: number;
  price: number;
  type: StoragePackType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface StoragePackFormState {
  name: string;
  storage_mb: string;
  price: string;
  type: StoragePackType;
  is_active: boolean;
}

interface StoragePackApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const emptyForm: StoragePackFormState = {
  name: '',
  storage_mb: '',
  price: '',
  type: 'one_time',
  is_active: true,
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

const formatStorage = (storageMb: number) => {
  if (storageMb >= 1024) {
    return `${Number((storageMb / 1024).toFixed(2))} GB`;
  }

  return `${storageMb} MB`;
};

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

export default function StoragePacksPage() {
  const [storagePacks, setStoragePacks] = useState<StoragePack[]>([]);
  const [form, setForm] = useState<StoragePackFormState>(emptyForm);
  const [editingPackId, setEditingPackId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingPackId, setDeletingPackId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sortedStoragePacks = useMemo(() => {
    return [...storagePacks].sort((a, b) => a.storage_mb - b.storage_mb);
  }, [storagePacks]);

  const loadStoragePacks = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(STORAGE_PACKS_API_URL, {
        headers: getAuthHeaders(),
      });

      const result = (await response.json()) as Partial<StoragePackApiResponse<StoragePack[]>>;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'Unable to load storage packs.');
      }

      setStoragePacks(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load storage packs.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadStoragePacks();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadStoragePacks]);

  const closeModal = () => {
    setForm(emptyForm);
    setEditingPackId(null);
    setError('');
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditingPackId(null);
    setError('');
    setSuccess('');
    setIsModalOpen(true);
  };

  const handleEdit = (pack: StoragePack) => {
    setEditingPackId(pack.id);
    setForm({
      name: pack.name,
      storage_mb: String(pack.storage_mb),
      price: String(pack.price),
      type: pack.type,
      is_active: pack.is_active,
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

    const storageMb = Number(form.storage_mb);
    const price = Number(form.price);

    if (!form.name.trim() || Number.isNaN(storageMb) || Number.isNaN(price)) {
      setError('Please enter a valid name, storage, and price.');
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(
        editingPackId ? `${STORAGE_PACKS_API_URL}/${editingPackId}` : STORAGE_PACKS_API_URL,
        {
          method: editingPackId ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            name: form.name.trim(),
            storage_mb: storageMb,
            price,
            type: form.type,
            is_active: form.is_active,
          }),
        }
      );

      const result = (await response.json()) as Partial<StoragePackApiResponse<StoragePack>>;

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to save storage pack.');
      }

      setSuccess(result.message || (editingPackId ? 'Storage pack updated successfully.' : 'Storage pack created successfully.'));
      closeModal();
      await loadStoragePacks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save storage pack.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (pack: StoragePack) => {
    const confirmed = window.confirm(`Delete "${pack.name}" storage pack?`);

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingPackId(pack.id);

    try {
      const response = await fetch(`${STORAGE_PACKS_API_URL}/${pack.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const result = (await response.json()) as Partial<StoragePackApiResponse<null>>;

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to delete storage pack.');
      }

      setSuccess(result.message || 'Storage pack deleted successfully.');
      await loadStoragePacks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete storage pack.');
    } finally {
      setDeletingPackId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Storage Packs
          </h1>
          <p className="mt-1 text-slate-500">
            Create and manage add-on storage packs for users.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCreate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 md:w-auto"
          >
            <Plus size={17} />
            Create Pack
          </button>
          <button
            onClick={() => void loadStoragePacks()}
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

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">All Storage Packs</h2>
          <p className="mt-1 text-sm text-slate-500">
            {sortedStoragePacks.length} pack{sortedStoragePacks.length === 1 ? '' : 's'} available
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Pack</th>
                <th className="px-6 py-4 font-semibold">Storage</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Updated</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center font-semibold text-slate-500">
                    Loading storage packs...
                  </td>
                </tr>
              ) : sortedStoragePacks.length > 0 ? (
                sortedStoragePacks.map((pack) => (
                  <tr key={pack.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{pack.name}</div>
                      <div className="text-xs text-slate-400">ID: {pack.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                        <Database size={14} />
                        {formatStorage(pack.storage_mb)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">₹{pack.price}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700">
                        {pack.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          pack.is_active
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {pack.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(pack.updated_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(pack)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="Edit storage pack"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => void handleDelete(pack)}
                          disabled={deletingPackId === pack.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete storage pack"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="font-bold text-slate-700">No storage packs found</div>
                    <div className="mt-1 text-sm text-slate-500">Create your first storage add-on.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingPackId ? 'Edit Storage Pack' : 'Create Storage Pack'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Configure storage amount, price, type, and availability.
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
                <label htmlFor="storage-pack-name" className="mb-2 block text-sm font-bold text-slate-700">
                  Pack Name
                </label>
                <input
                  id="storage-pack-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="100 MB Pack"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="storage-mb" className="mb-2 block text-sm font-bold text-slate-700">
                    Storage MB
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                    <Archive size={17} className="text-slate-400" />
                    <input
                      id="storage-mb"
                      type="number"
                      min="1"
                      step="1"
                      value={form.storage_mb}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, storage_mb: event.target.value }))
                      }
                      placeholder="100"
                      className="h-12 flex-1 border-0 bg-transparent px-2 text-sm font-semibold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="storage-price" className="mb-2 block text-sm font-bold text-slate-700">
                    Price
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                    <IndianRupee size={17} className="text-slate-400" />
                    <input
                      id="storage-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                      placeholder="20"
                      className="h-12 flex-1 border-0 bg-transparent px-2 text-sm font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="storage-type" className="mb-2 block text-sm font-bold text-slate-700">
                    Type
                  </label>
                  <select
                    id="storage-type"
                    value={form.type}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, type: event.target.value as StoragePackType }))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold capitalize outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="one_time">One time</option>
                    <option value="recurring">Recurring</option>
                  </select>
                </div>

                <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span>
                    <span className="block text-sm font-bold text-slate-700">Active</span>
                    <span className="text-xs font-medium text-slate-500">Visible to users</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, is_active: event.target.checked }))
                    }
                    className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
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
                  {editingPackId ? <Save size={17} /> : <Plus size={17} />}
                  {isSaving ? 'Saving...' : editingPackId ? 'Update Pack' : 'Create Pack'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
