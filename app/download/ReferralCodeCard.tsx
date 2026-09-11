'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Button from '../components/ui/Button';

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
    <div className="rounded-3xl border-2 border-dashed border-accent/40 bg-accent-soft p-6 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-accent-dark">
        Your referral code
      </p>
      <p className="font-display mt-3 text-4xl font-semibold tracking-widest text-ink">{code}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ink-soft">
        Enter this code when you sign up in the Smart Billing Lite app to claim your referral
        benefits.
      </p>
      <Button onClick={() => void handleCopy()} className="mt-4">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy code'}
      </Button>
    </div>
  );
}
