import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Promoter Login | Smart Billing Lite',
  description: 'Redirecting to the Smart Billing Lite promoter login page.',
};

export default function PromoterLoginRedirect() {
  redirect('/referral/login');
}
