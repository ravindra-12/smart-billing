import type { Metadata } from 'next';
import { Smartphone } from 'lucide-react';
import ReferralCodeCard from './ReferralCodeCard';
import PlayStoreIcon from '../components/PlayStoreIcon';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export const metadata: Metadata = {
  title: 'Download Smart Billing Lite',
  description:
    'Download the Smart Billing Lite app — mobile billing, QR/UPI payments, receipt printing, and business reports for Indian small businesses.',
};

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const refParam = params.ref;
  const referralCode = typeof refParam === 'string' ? refParam.trim() : '';

  return (
    <main className="flex-1 bg-paper px-5 py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="text-center">
          <Badge className="mx-auto">
            <Smartphone size={13} />
            Android App
          </Badge>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-ink">
            Download Smart Billing Lite
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-ink-soft">
            Mobile billing, QR/UPI payments, receipt printing, udhaar tracking, and business
            reports — built for Indian small businesses.
          </p>
        </div>

        {referralCode ? <ReferralCodeCard code={referralCode} /> : null}

        <Card className="p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-ink">Get the app</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Download the APK directly and install it on your Android phone. Free 30-day trial, no
            credit card needed.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-black text-paper transition-colors hover:bg-accent-dark"
          >
            <PlayStoreIcon />
            Download APK
          </a>
          <p className="mt-4 text-xs font-semibold text-ink-faint">
            You may need to allow installs from unknown sources in your phone settings.
          </p>
        </Card>

        {referralCode ? (
          <ol className="rounded-3xl border border-line bg-white p-7 text-sm leading-6 text-ink-soft">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-ink-faint">
              How to claim your referral
            </p>
            {[
              'Download and install the Smart Billing Lite app.',
              'Sign up with your mobile number.',
              `Enter the referral code ${referralCode} during signup.`,
            ].map((stepText, index) => (
              <li key={stepText} className="flex items-start gap-3 py-1.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-paper">
                  {index + 1}
                </span>
                <span className="font-semibold text-ink-soft">{stepText}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </main>
  );
}
