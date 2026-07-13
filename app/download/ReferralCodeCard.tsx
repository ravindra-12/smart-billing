'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function ReferralCodeCard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the code is still visible to copy manually.
    }
  };

  return (
    <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        Your referral code
      </p>
      <p className="mt-3 text-4xl font-black tracking-widest text-slate-900">{code}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
        Enter this code when you sign up in the Smart Billing Lite app to claim your referral
        benefits.
      </p>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy code'}
      </button>
    </div>
  );
}
