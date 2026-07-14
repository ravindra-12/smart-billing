'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Banknote, KeyRound, Landmark, MapPin, Phone, UserRound } from 'lucide-react';
import {
  PromoterApiError,
  promoterLogin,
  promoterRegister,
  savePromoterSession,
  sendOtp,
} from '@/lib/promoterApi';
import {
  inputClassName,
  inputWrapperClassName,
  labelClassName,
  primaryButtonClassName,
} from './formStyles';

type Step = 'phone' | 'login' | 'register';

export default function PromoterLoginForm() {
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
      <label htmlFor="promoter-otp" className={labelClassName}>
        OTP
      </label>
      <div className={inputWrapperClassName}>
        <KeyRound size={18} className="text-slate-400" />
        <input
          id="promoter-otp"
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
    <>
      {step === 'phone' && (
        <>
          <div className="mb-7">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Promoter login</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your mobile number to login or create your promoter account.
            </p>
          </div>

          <form onSubmit={(event) => void handleSendOtp(event)} className="space-y-5">
            <div>
              <label htmlFor="promoter-phone" className={labelClassName}>
                Mobile number
              </label>
              <div className={inputWrapperClassName}>
                <Phone size={18} className="text-slate-400" />
                <span className="pl-3 text-sm font-bold text-slate-400">+91</span>
                <input
                  id="promoter-phone"
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
            {otpField}
            {messages}
            <button type="submit" disabled={isSubmitting} className={primaryButtonClassName}>
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
              <label htmlFor="promoter-name" className={labelClassName}>
                Full name
              </label>
              <div className={inputWrapperClassName}>
                <UserRound size={18} className="text-slate-400" />
                <input
                  id="promoter-name"
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
              <label htmlFor="promoter-city" className={labelClassName}>
                City <span className="font-medium text-slate-400">(optional)</span>
              </label>
              <div className={inputWrapperClassName}>
                <MapPin size={18} className="text-slate-400" />
                <input
                  id="promoter-city"
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
                  <label htmlFor="promoter-upi" className={labelClassName}>
                    UPI ID
                  </label>
                  <div className={`${inputWrapperClassName} bg-white`}>
                    <Banknote size={18} className="text-slate-400" />
                    <input
                      id="promoter-upi"
                      type="text"
                      value={upiId}
                      onChange={(event) => setUpiId(event.target.value)}
                      className={inputClassName}
                      placeholder="name@upi"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="promoter-bank-name" className={labelClassName}>
                    Bank name
                  </label>
                  <div className={`${inputWrapperClassName} bg-white`}>
                    <Landmark size={18} className="text-slate-400" />
                    <input
                      id="promoter-bank-name"
                      type="text"
                      value={bankName}
                      onChange={(event) => setBankName(event.target.value)}
                      className={inputClassName}
                      placeholder="State Bank of India"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="promoter-bank-account" className={labelClassName}>
                    Account number
                  </label>
                  <div className={`${inputWrapperClassName} bg-white`}>
                    <Landmark size={18} className="text-slate-400" />
                    <input
                      id="promoter-bank-account"
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
                  <label htmlFor="promoter-bank-ifsc" className={labelClassName}>
                    IFSC code
                  </label>
                  <div className={`${inputWrapperClassName} bg-white`}>
                    <Landmark size={18} className="text-slate-400" />
                    <input
                      id="promoter-bank-ifsc"
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

            <button type="submit" disabled={isSubmitting} className={primaryButtonClassName}>
              {isSubmitting ? 'Creating account...' : 'Register as promoter'}
            </button>
          </form>
        </>
      )}
    </>
  );
}
