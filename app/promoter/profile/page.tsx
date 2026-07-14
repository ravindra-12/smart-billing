'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Banknote, Landmark, MapPin, UserRound } from 'lucide-react';
import {
  PROMOTER_PROFILE_KEY,
  Promoter,
  PromoterApiError,
  UpdateProfilePayload,
  clearPromoterSession,
  getPromoterToken,
  getStoredPromoter,
  updateProfile,
} from '@/lib/promoterApi';

const inputWrapperClassName =
  'flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100';
const inputClassName =
  'h-12 flex-1 border-0 bg-transparent px-3 text-sm font-semibold outline-none';
const labelClassName = 'mb-2 block text-sm font-bold text-slate-700';

export default function PromoterProfilePage() {
  const router = useRouter();
  const [promoter, setPromoter] = useState<Promoter | null>(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = getStoredPromoter();

    if (stored) {
      setPromoter(stored);
      setName(stored.name || '');
      setCity(stored.city || '');
      setUpiId(stored.upi_id || '');
      setBankName(stored.bank_name || '');
      setBankAccountNumber(stored.bank_account_number || '');
      setBankIfsc(stored.bank_ifsc || '');
    }
  }, []);

  const hasPayoutDetails = Boolean(
    promoter && (promoter.upi_id || (promoter.bank_account_number && promoter.bank_ifsc))
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const token = getPromoterToken();

    if (!token) {
      router.replace('/referral/login');
      return;
    }

    const payload: UpdateProfilePayload = {};

    if (name.trim() && name.trim() !== (promoter?.name || '')) {
      payload.name = name.trim();
    }

    if (city.trim() !== (promoter?.city || '')) {
      payload.city = city.trim();
    }

    if (upiId.trim() !== (promoter?.upi_id || '')) {
      payload.upi_id = upiId.trim();
    }

    if (bankName.trim() !== (promoter?.bank_name || '')) {
      payload.bank_name = bankName.trim();
    }

    if (bankAccountNumber.trim() !== (promoter?.bank_account_number || '')) {
      payload.bank_account_number = bankAccountNumber.trim();
    }

    if (bankIfsc.trim().toUpperCase() !== (promoter?.bank_ifsc || '')) {
      payload.bank_ifsc = bankIfsc.trim().toUpperCase();
    }

    if (Object.keys(payload).length === 0) {
      setSuccess('Nothing to update.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await updateProfile(token, payload);

      if (!data.success || !data.promoter) {
        setError(data.message || 'Unable to update profile.');
        return;
      }

      setPromoter(data.promoter);
      window.localStorage.setItem(PROMOTER_PROFILE_KEY, JSON.stringify(data.promoter));
      setSuccess(data.message || 'Profile updated successfully.');
    } catch (err) {
      if (err instanceof PromoterApiError && err.status === 401) {
        clearPromoterSession();
        router.replace('/referral/login');
        return;
      }

      setError(err instanceof Error ? err.message : 'Unable to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-600">
          Keep your payout details up to date to receive rewards.
        </p>
      </div>

      {!hasPayoutDetails && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>
            <span className="font-bold">Payout details missing.</span> Add your UPI ID or bank
            account details below — rewards cannot be paid out without them.
          </p>
        </div>
      )}

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div>
          <label className={labelClassName}>Mobile number</label>
          <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-500">
            {promoter?.mobile || '-'}
          </div>
          <p className="mt-1 text-xs text-slate-400">Mobile number cannot be changed.</p>
        </div>

        <div>
          <label htmlFor="name" className={labelClassName}>
            Full name
          </label>
          <div className={inputWrapperClassName}>
            <UserRound size={18} className="text-slate-400" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClassName}
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="city" className={labelClassName}>
            City
          </label>
          <div className={inputWrapperClassName}>
            <MapPin size={18} className="text-slate-400" />
            <input
              id="city"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputClassName}
              autoComplete="address-level2"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">
            Payout details
          </h2>
        </div>

        <div>
          <label htmlFor="upi" className={labelClassName}>
            UPI ID
          </label>
          <div className={inputWrapperClassName}>
            <Banknote size={18} className="text-slate-400" />
            <input
              id="upi"
              type="text"
              value={upiId}
              onChange={(event) => setUpiId(event.target.value)}
              className={inputClassName}
              placeholder="name@upi"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bank-name" className={labelClassName}>
            Bank name
          </label>
          <div className={inputWrapperClassName}>
            <Landmark size={18} className="text-slate-400" />
            <input
              id="bank-name"
              type="text"
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
              className={inputClassName}
              placeholder="State Bank of India"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bank-account" className={labelClassName}>
              Account number
            </label>
            <div className={inputWrapperClassName}>
              <Landmark size={18} className="text-slate-400" />
              <input
                id="bank-account"
                type="text"
                inputMode="numeric"
                value={bankAccountNumber}
                onChange={(event) => setBankAccountNumber(event.target.value.replace(/\D/g, ''))}
                className={inputClassName}
                placeholder="1234567890"
              />
            </div>
          </div>
          <div>
            <label htmlFor="bank-ifsc" className={labelClassName}>
              IFSC code
            </label>
            <div className={inputWrapperClassName}>
              <Landmark size={18} className="text-slate-400" />
              <input
                id="bank-ifsc"
                type="text"
                value={bankIfsc}
                onChange={(event) => setBankIfsc(event.target.value.toUpperCase())}
                className={inputClassName}
                placeholder="SBIN0001234"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success && !error && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
