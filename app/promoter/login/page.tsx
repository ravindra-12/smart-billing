'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Banknote,
  Gift,
  KeyRound,
  Landmark,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react';
import {
  PROMOTER_TOKEN_KEY,
  PromoterApiError,
  promoterLogin,
  promoterRegister,
  savePromoterSession,
  sendOtp,
} from '@/lib/promoterApi';

type Step = 'phone' | 'login' | 'register';

const inputWrapperClassName =
  'flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100';
const inputClassName =
  'h-12 flex-1 border-0 bg-transparent px-3 text-sm font-semibold outline-none';
const labelClassName = 'mb-2 block text-sm font-bold text-slate-700';

export default function PromoterLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(PROMOTER_TOKEN_KEY)) {
      router.replace('/promoter');
    }
  }, [router]);

  const handleSendOtp = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError('');
    setInfo('');

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

      setInfo(`OTP sent to ${phone}.`);
      setStep(data.is_registered ? 'login' : 'register');
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
      const data = await promoterLogin(phone, otp.trim());

      if (!data.success || !data.token || !data.promoter) {
        setError(data.message || 'Login failed. Please check the OTP and try again.');
        return;
      }

      savePromoterSession(data.token, data.promoter);
      router.replace('/promoter');
    } catch (err) {
      if (err instanceof PromoterApiError && err.status === 403) {
        setError(
          err.message ||
            'This number is registered but not as a brand promoter. Please use a different number.'
        );
      } else {
        setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInfo('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await promoterRegister({
        name: name.trim(),
        mobile: phone,
        otp: otp.trim(),
        ...(city.trim() ? { city: city.trim() } : {}),
        ...(upiId.trim() ? { upi_id: upiId.trim() } : {}),
        ...(bankName.trim() ? { bank_name: bankName.trim() } : {}),
        ...(bankAccountNumber.trim() ? { bank_account_number: bankAccountNumber.trim() } : {}),
        ...(bankIfsc.trim() ? { bank_ifsc: bankIfsc.trim().toUpperCase() } : {}),
      });

      if (!data.success || !data.token || !data.promoter) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      savePromoterSession(data.token, data.promoter);
      router.replace('/promoter');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeNumber = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setInfo('');
  };

  const otpField = (
    <div>
      <label htmlFor="otp" className={labelClassName}>
        OTP
      </label>
      <div className={inputWrapperClassName}>
        <KeyRound size={18} className="text-slate-400" />
        <input
          id="otp"
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
        <button type="button" onClick={changeNumber} className="text-slate-500 hover:text-slate-700">
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
  );

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
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1fr_560px]">
        <section className="hidden bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <Gift size={24} />
            </div>
            <div>
              <div className="text-xl font-black">Smart Billing Lite</div>
              <div className="text-sm font-medium text-blue-100">Brand Promoter Program</div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">
              Earn ₹100 per conversion
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Share Smart Billing Lite. Earn rewards for every business you bring.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
              Get your personal referral code, share it with shop owners, and earn ₹100 every time
              a referred vendor purchases premium.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {['Your referral code', 'Track earnings', 'Direct payouts'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold ring-1 ring-white/10">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Gift size={24} />
              </div>
              <div>
                <div className="text-xl font-black">Smart Billing Lite</div>
                <div className="text-sm font-medium text-slate-500">Brand Promoter Program</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
              {step === 'phone' && (
                <>
                  <div className="mb-7">
                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                      Promoter login
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Enter your mobile number to login or create your promoter account.
                    </p>
                  </div>

                  <form onSubmit={(event) => void handleSendOtp(event)} className="space-y-5">
                    <div>
                      <label htmlFor="phone" className={labelClassName}>
                        Mobile number
                      </label>
                      <div className={inputWrapperClassName}>
                        <Phone size={18} className="text-slate-400" />
                        <span className="pl-3 text-sm font-bold text-slate-400">+91</span>
                        <input
                          id="phone"
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

                    {messages}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                      {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                </>
              )}

              {step === 'login' && (
                <>
                  <div className="mb-7">
                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                      Welcome back
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Enter the OTP sent to <span className="font-bold text-slate-700">{phone}</span>.
                    </p>
                  </div>

                  <form onSubmit={(event) => void handleLogin(event)} className="space-y-5">
                    {otpField}
                    {messages}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                </>
              )}

              {step === 'register' && (
                <>
                  <div className="mb-7">
                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                      Create promoter account
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      New number! Fill in your details and the OTP sent to{' '}
                      <span className="font-bold text-slate-700">{phone}</span>.
                    </p>
                  </div>

                  <form onSubmit={(event) => void handleRegister(event)} className="space-y-5">
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
                          placeholder="Rajesh Kumar"
                          autoComplete="name"
                          required
                        />
                      </div>
                    </div>

                    {otpField}

                    <div>
                      <label htmlFor="city" className={labelClassName}>
                        City <span className="font-medium text-slate-400">(optional)</span>
                      </label>
                      <div className={inputWrapperClassName}>
                        <MapPin size={18} className="text-slate-400" />
                        <input
                          id="city"
                          type="text"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          className={inputClassName}
                          placeholder="Mumbai"
                          autoComplete="address-level2"
                        />
                      </div>
                    </div>

                    <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <summary className="cursor-pointer text-sm font-bold text-slate-700">
                        Payout details <span className="font-medium text-slate-400">(optional, needed before payout)</span>
                      </summary>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="upi" className={labelClassName}>
                            UPI ID
                          </label>
                          <div className={`${inputWrapperClassName} bg-white`}>
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
                          <div className={`${inputWrapperClassName} bg-white`}>
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
                        <div>
                          <label htmlFor="bank-account" className={labelClassName}>
                            Account number
                          </label>
                          <div className={`${inputWrapperClassName} bg-white`}>
                            <Landmark size={18} className="text-slate-400" />
                            <input
                              id="bank-account"
                              type="text"
                              inputMode="numeric"
                              value={bankAccountNumber}
                              onChange={(event) =>
                                setBankAccountNumber(event.target.value.replace(/\D/g, ''))
                              }
                              className={inputClassName}
                              placeholder="1234567890"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="bank-ifsc" className={labelClassName}>
                            IFSC code
                          </label>
                          <div className={`${inputWrapperClassName} bg-white`}>
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
                    </details>

                    {messages}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                      {isSubmitting ? 'Creating account...' : 'Register as promoter'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
