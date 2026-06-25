'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ReceiptText } from 'lucide-react';

const ADMIN_LOGIN_URL = 'https://api.smartbillinglite.com/api/login';
const ADMIN_AUTH_KEY = 'smartbilling_admin_auth';
const ADMIN_TOKEN_KEY = 'smartbilling_admin_token';
const ADMIN_USER_KEY = 'smartbilling_admin_user';

interface AdminLoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    phone: string;
    name: string;
    email: string;
    role: string;
    city: string;
    phone_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    business_type_id: number | null;
  };
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@adminn.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isLoggedIn = Boolean(window.localStorage.getItem(ADMIN_TOKEN_KEY));

    if (isLoggedIn) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(ADMIN_LOGIN_URL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: 'admin',
        }),
      });

      const data = (await response.json()) as Partial<AdminLoginResponse> & {
        message?: string;
      };

      if (!response.ok || !data.token || !data.user) {
        setError(data.message || 'Invalid email or password.');
        return;
      }

      window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      window.localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      window.localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user));
      window.dispatchEvent(new Event('smartbilling-admin-auth-change'));
      router.replace('/admin');
    } catch {
      setError('Unable to login right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">
        <section className="hidden bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <ReceiptText size={24} />
            </div>
            <div>
              <div className="text-xl font-black">Smart Billing Lite</div>
              <div className="text-sm font-medium text-blue-100">Admin Console</div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">
              Admin API login
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Manage your billing platform from one clean dashboard.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
              Sign in with the admin account and continue into the Smart Billing Lite dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {['Dashboard', 'Vendors', 'Reports'].map((item) => (
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
                <ReceiptText size={24} />
              </div>
              <div>
                <div className="text-xl font-black">Smart Billing Lite</div>
                <div className="text-sm font-medium text-slate-500">Admin Console</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
              <div className="mb-7">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">Admin login</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in with your Smart Billing Lite admin credentials.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
                    Email
                  </label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 flex-1 border-0 bg-transparent px-3 text-sm font-semibold outline-none"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <Lock size={18} className="text-slate-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-12 flex-1 border-0 bg-transparent px-3 text-sm font-semibold outline-none"
                      autoComplete="current-password"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
