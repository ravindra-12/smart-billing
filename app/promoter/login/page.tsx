import { redirect } from 'next/navigation';

export default function PromoterLoginRedirect() {
  redirect('/referral/login');
}
