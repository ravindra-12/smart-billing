import type { Metadata } from 'next';
import ReferralCodeCard from './ReferralCodeCard';

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
    <main className="flex-1 bg-slate-50 px-5 py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
            📱 Android App
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            Download Smart Billing Lite
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600">
            Mobile billing, QR/UPI payments, receipt printing, udhaar tracking, and business
            reports — built for Indian small businesses.
          </p>
        </div>

        {referralCode ? <ReferralCodeCard code={referralCode} /> : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-200/70">
          <h2 className="text-xl font-black text-slate-950">Get the app</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Download the APK directly and install it on your Android phone. Free 30-day trial, no
            credit card needed.
          </p>
          <a
            href="/app-release.apk"
            download
            className="mt-5 inline-flex rounded-2xl bg-green-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
          >
            Download APK
          </a>
          <p className="mt-4 text-xs font-semibold text-slate-400">
            You may need to allow installs from unknown sources in your phone settings.
          </p>
        </div>

        {referralCode ? (
          <ol className="rounded-3xl border border-slate-200 bg-white p-7 text-sm leading-6 text-slate-600 shadow-sm">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">
              How to claim your referral
            </p>
            {[
              'Download and install the Smart Billing Lite app.',
              'Sign up with your mobile number.',
              `Enter the referral code ${referralCode} during signup.`,
            ].map((stepText, index) => (
              <li key={stepText} className="flex items-start gap-3 py-1.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="font-semibold">{stepText}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </main>
  );
}
