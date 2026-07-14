'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Download, Gift, KeyRound, Phone } from 'lucide-react';
import { saveVendorSession, sendOtp, verifyOtp } from '@/lib/vendorApi';
import {
  inputClassName,
  inputWrapperClassName,
  labelClassName,
  primaryButtonClassName,
} from './formStyles';

type Step = 'phone' | 'login';

export default function VendorLoginForm({
  onSwitchToPromoter,
}: {
  onSwitchToPromoter: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [showNotRegistered, setShowNotRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError('');
    setInfo('');
    setShowNotRegistered(false);

    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Please enter a valid 10 digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await sendOtp(phone);

      if (!data.success) {
        setError(data.message || 'Unable to send OTP. Please try again.');
        return;
      }

      if (!data.is_registered) {
        setShowNotRegistered(true);
        return;
      }

      setInfo(`OTP sent to ${phone}.`);
      setStep('login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setInfo('');
    setIsSubmitting(true);

    try {
      const data = await sendOtp(phone);

      if (!data.success) {
        setError(data.message || 'Unable to resend OTP. Please try again.');
        return;
      }

      setInfo(`OTP re-sent to ${phone}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to resend OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setIsSubmitting(true);

    try {
      const data = await verifyOtp({ phone, otp: otp.trim() });

      if (!data.token) {
        setError(data.message || 'Login failed. Please check the OTP and try again.');
        return;
      }

      if (!data.vendor) {
        setError(
          'This number is not registered as a vendor. If you are a brand promoter, please use the Brand Promoter tab.'
        );
        return;
      }

      saveVendorSession(data.token, { user: data.user, vendor: data.vendor });
      router.replace('/vendor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeNumber = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setInfo('');
    setShowNotRegistered(false);
  };

  const messages = (
    <>
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
      {info && !error && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {info}
        </div>
      )}
    </>
  );

  return (
    <>
      {step === 'phone' && (
        <>
          <div className="mb-7">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Vendor login</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Already using Smart Billing Lite? Enter your registered mobile number to login.
            </p>
          </div>

          <form onSubmit={(event) => void handleSendOtp(event)} className="space-y-5">
            <div>
              <label htmlFor="vendor-phone" className={labelClassName}>
                Mobile number
              </label>
              <div className={inputWrapperClassName}>
                <Phone size={18} className="text-slate-400" />
                <span className="pl-3 text-sm font-bold text-slate-400">+91</span>
                <input
                  id="vendor-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
                  className={inputClassName}
                  placeholder="10 digit number"
                  autoComplete="tel-national"
                  required
                />
              </div>
            </div>

            {showNotRegistered && (
              <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                <p className="text-sm font-semibold leading-6 text-amber-800">
                  This number doesn&apos;t have a vendor account. Vendor accounts can only be
                  created in the Smart Billing Lite mobile app — or you can join as a Brand
                  Promoter instead.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  
                  <button
                    type="button"
                    onClick={onSwitchToPromoter}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-black text-amber-700 transition hover:bg-amber-100"
                  >
                    <Gift size={16} />
                    Join as Brand Promoter
                  </button>
                </div>
              </div>
            )}

            {messages}

            <button type="submit" disabled={isSubmitting} className={primaryButtonClassName}>
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </>
      )}

      {step === 'login' && (
        <>
          <div className="mb-7">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter the OTP sent to <span className="font-bold text-slate-700">{phone}</span>.
            </p>
          </div>

          <form onSubmit={(event) => void handleLogin(event)} className="space-y-5">
            <div>
              <label htmlFor="vendor-otp" className={labelClassName}>
                OTP
              </label>
              <div className={inputWrapperClassName}>
                <KeyRound size={18} className="text-slate-400" />
                <input
                  id="vendor-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                  className={`${inputClassName} tracking-[0.4em]`}
                  placeholder="6 digit OTP"
                  autoComplete="one-time-code"
                  required
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-semibold">
                <button
                  type="button"
                  onClick={changeNumber}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={() => void handleResendOtp()}
                  disabled={isSubmitting}
                  className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </div>

            {messages}

            <button type="submit" disabled={isSubmitting} className={primaryButtonClassName}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </>
      )}
    </>
  );
}
