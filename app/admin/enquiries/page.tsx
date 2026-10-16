'use client';

import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Eye,
  Mail,
  MessageSquareText,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react';

const ENQUIRIES_API_URL = 'https://api.smartbillinglite.com/api/enquiries';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface EnquiryFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const emptyForm: EnquiryFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  description: '',
};

const formatDate = (value: string, withTime = false) => {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(new Date(value));
};

const getErrorMessage = (data: unknown, fallback: string) => {
  if (!data || typeof data !== 'object') {
    return fallback;
  }

  const { message, errors } = data as ApiErrorResponse;
  const firstFieldError = errors ? Object.values(errors).flat()[0] : undefined;

  return firstFieldError || message || fallback;
};

const readJson = async (response: Response) => {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [form, setForm] = useState<EnquiryFormState>(emptyForm);
  const [editingEnquiryId, setEditingEnquiryId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingEnquiry, setViewingEnquiry] = useState<Enquiry | null>(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadedAt, setLoadedAt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingEnquiryId, setDeletingEnquiryId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredEnquiries = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const sorted = [...enquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    if (!query) {
      return sorted;
    }

    return sorted.filter((enquiry) =>
      [enquiry.name, enquiry.email, enquiry.phone, enquiry.subject, enquiry.description].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );
  }, [enquiries, searchTerm]);

  const stats = useMemo(() => {
    const dayMs = 24 * 60 * 60 * 1000;
    const startOfToday = new Date(loadedAt);
    startOfToday.setHours(0, 0, 0, 0);

    return {
      total: enquiries.length,
      today: enquiries.filter((enquiry) => new Date(enquiry.created_at) >= startOfToday).length,
      lastSevenDays: enquiries.filter(
        (enquiry) => loadedAt - new Date(enquiry.created_at).getTime() <= 7 * dayMs
      ).length,
    };
  }, [enquiries, loadedAt]);

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

  const loadEnquiries = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(ENQUIRIES_API_URL, {
        headers: getAuthHeaders(),
      });
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to load enquiries.'));
      }

      setEnquiries(Array.isArray(data) ? (data as Enquiry[]) : []);
      setLoadedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load enquiries.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadEnquiries();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const closeForm = () => {
    setForm(emptyForm);
    setEditingEnquiryId(null);
    setError('');
    setIsFormOpen(false);
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditingEnquiryId(null);
    setError('');
    setSuccess('');
    setIsFormOpen(true);
  };

  const handleView = async (enquiry: Enquiry) => {
    setViewingEnquiry(enquiry);
    setIsViewLoading(true);
    setError('');

    try {
      const response = await fetch(`${ENQUIRIES_API_URL}/${enquiry.id}`, {
        headers: getAuthHeaders(),
      });
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to load enquiry details.'));
      }

      setViewingEnquiry(data as Enquiry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load enquiry details.');
    } finally {
      setIsViewLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      description: form.description.trim(),
    };

    if (Object.values(payload).some((value) => !value)) {
      setError('Please fill in name, email, phone, subject, and description.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        editingEnquiryId ? `${ENQUIRIES_API_URL}/${editingEnquiryId}` : ENQUIRIES_API_URL,
        {
          method: editingEnquiryId ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        }
      );
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to save enquiry.'));
      }

      const message = editingEnquiryId ? 'Enquiry updated successfully.' : 'Enquiry created successfully.';
      closeForm();
      setSuccess(message);
      await loadEnquiries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save enquiry.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (enquiry: Enquiry) => {
    const confirmed = window.confirm(`Delete enquiry from "${enquiry.name}"?`);

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingEnquiryId(enquiry.id);

    try {
      const response = await fetch(`${ENQUIRIES_API_URL}/${enquiry.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to delete enquiry.'));
      }

      if (viewingEnquiry?.id === enquiry.id) {
        setViewingEnquiry(null);
      }

      setSuccess((data as ApiErrorResponse | null)?.message || 'Enquiry deleted successfully.');
      await loadEnquiries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete enquiry.');
    } finally {
      setDeletingEnquiryId(null);
    }
  };

  const inputClassName =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">Enquiries</h1>
          <p className="mt-1 text-slate-500">
            Review and manage customer enquiries submitted from the contact form.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCreate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 md:w-auto"
          >
            <Plus size={17} />
            Add Enquiry
          </button>
          <button
            onClick={() => void loadEnquiries()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:w-auto"
          >
            <RefreshCw size={17} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Enquiries', value: stats.total, tone: 'bg-indigo-50 text-indigo-700' },
          { label: 'Received Today', value: stats.today, tone: 'bg-emerald-50 text-emerald-700' },
          { label: 'Last 7 Days', value: stats.lastSevenDays, tone: 'bg-amber-50 text-amber-700' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-800">{isLoading ? '-' : stat.value}</span>
              <span className={`rounded-full p-2 ${stat.tone}`}>
                <MessageSquareText size={18} />
              </span>
            </div>
          </div>
        ))}
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
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/70 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Enquiries</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredEnquiries.length} enquir{filteredEnquiries.length === 1 ? 'y' : 'ies'}
              {searchTerm.trim() ? ' matching your search' : ' received'}
            </p>
          </div>
          <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-3 transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 md:w-80">
            <Search size={17} className="text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, email, phone, subject..."
              className="h-10 flex-1 border-0 bg-transparent px-2 text-sm outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Received</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-semibold text-slate-500">
                    Loading enquiries...
                  </td>
                </tr>
              ) : filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{enquiry.name}</div>
                      <div className="text-xs text-slate-400">ID: {enquiry.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="block font-medium text-slate-700 hover:text-indigo-600"
                      >
                        {enquiry.email}
                      </a>
                      <a href={`tel:${enquiry.phone}`} className="text-xs text-slate-400 hover:text-indigo-600">
                        {enquiry.phone}
                      </a>
                    </td>
                    <td className="max-w-xs px-6 py-4">
                      <div className="truncate font-semibold text-slate-800">{enquiry.subject}</div>
                      <div className="truncate text-xs text-slate-400">{enquiry.description}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {formatDate(enquiry.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => void handleView(enquiry)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="View enquiry"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => void handleDelete(enquiry)}
                          disabled={deletingEnquiryId === enquiry.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete enquiry"
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
                    <div className="font-bold text-slate-700">No enquiries found</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {searchTerm.trim()
                        ? 'Try a different search term.'
                        : 'Enquiries submitted from the contact form will appear here.'}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {viewingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-full w-full max-w-lg flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-slate-800">{viewingEnquiry.subject}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enquiry #{viewingEnquiry.id}
                  {isViewLoading ? ' · Refreshing...' : ''}
                </p>
              </div>
              <button
                onClick={() => setViewingEnquiry(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto px-6 py-5">
              <div className="text-lg font-bold text-slate-800">{viewingEnquiry.name}</div>
              <div className="space-y-2 text-sm">
                <a
                  href={`mailto:${viewingEnquiry.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-indigo-600"
                >
                  <Mail size={16} className="text-slate-400" />
                  {viewingEnquiry.email}
                </a>
                <a
                  href={`tel:${viewingEnquiry.phone}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-indigo-600"
                >
                  <Phone size={16} className="text-slate-400" />
                  {viewingEnquiry.phone}
                </a>
                <div className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={16} className="text-slate-400" />
                  {formatDate(viewingEnquiry.created_at, true)}
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm font-bold text-slate-700">Message</div>
                <p className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {viewingEnquiry.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setViewingEnquiry(null)}
                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-full w-full max-w-lg flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingEnquiryId ? 'Edit Enquiry' : 'Add Enquiry'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">All fields are required.</p>
              </div>
              <button
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto px-6 py-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-name" className="mb-2 block text-sm font-bold text-slate-700">
                    Name
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="John Doe"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className="mb-2 block text-sm font-bold text-slate-700">
                    Phone
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="9876543210"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-email" className="mb-2 block text-sm font-bold text-slate-700">
                  Email
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="john@example.com"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-subject" className="mb-2 block text-sm font-bold text-slate-700">
                  Subject
                </label>
                <input
                  id="enquiry-subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                  placeholder="Product inquiry"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-description" className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  id="enquiry-description"
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="I would like to know more about your offers."
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {editingEnquiryId ? <Save size={17} /> : <Plus size={17} />}
                  {isSaving ? 'Saving...' : editingEnquiryId ? 'Update Enquiry' : 'Add Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
