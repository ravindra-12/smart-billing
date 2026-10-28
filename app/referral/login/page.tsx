import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Referral Program Login — Smart Billing Lite',
  description:
    'Login or register as a Smart Billing Lite brand promoter or vendor to share your referral code and track earnings.',
};

export default async function ReferralLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialTab = params.tab === 'vendor' ? 'vendor' : 'promoter';

  return <LoginClient initialTab={initialTab} />;
}
