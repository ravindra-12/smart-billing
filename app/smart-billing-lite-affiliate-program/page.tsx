import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeIndianRupee,
  BarChart3,
  Check,
  Gift,
  Link2,
  Megaphone,
  Rocket,
  Share2,
  Store,
  Users,
  Wallet,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smart Billing Lite Affiliate Program | Share & Earn Rewards',
  description:
    'Join the Smart Billing Lite Affiliate Program and earn ₹150 as a vendor or ₹100 as a brand promoter for every successful premium purchase made by your referred business.',
  openGraph: {
    title: 'Smart Billing Lite Affiliate Program – Share Smart Billing & Earn',
    description:
      'Promote Smart Billing Lite to small businesses, vendors, and retailers. Earn rewards on every successful premium subscription purchase.',
  },
};

const steps = [
  ['Register or login', 'Vendors can log in to the app. Brand promoters can register with their details and payout information.', Store],
  ['Get your referral link', 'Receive a unique referral code and sharing link from your dashboard.', Link2],
  ['Share with businesses', 'Reach shop owners, retailers, salons, pharmacies, service providers, and local businesses.', Share2],
  ['Vendor installs the app', 'The referred business installs Smart Billing Lite using your referral link or referral code.', Rocket],
  ['Premium plan purchase', 'Your reward becomes eligible when the referred vendor purchases a monthly or yearly premium plan.', BadgeIndianRupee],
  ['Earn your reward', 'After payment verification and admin approval, the reward is added to your earnings.', Wallet],
] as const;

const audiences = ['Existing Smart Billing Lite vendors', 'Students', 'Freelancers', 'Sales executives', 'Digital marketers', 'Shop owners', 'Accountants', 'GST consultants', 'CSC centres', 'Business consultants', 'Local entrepreneurs'];
const promoteItems = ['Fast mobile billing', 'QR/UPI payment collection', 'Customer management', 'Udhaar tracking', 'WhatsApp bill sharing', 'Membership plans', 'Coupon offers', 'Daily and monthly reports', 'Simple digital business management'];
const rules = ['Reward is given only after a successful premium purchase.', 'Free trial users are not counted for reward.', 'One referred vendor is eligible for one reward.', 'Self-referral is not allowed.', 'Duplicate mobile numbers or fake referrals are not eligible.', 'Rewards may remain pending for verification.', 'Admin approval is required before payout.', 'Cancelled or refunded purchases are not eligible.'];

export default function AffiliateProgramPage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      <section className="overflow-hidden bg-linear-to-br from-[#061c36] via-[#0b63f6] to-[#2563eb] px-5 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black"><Gift size={16} /> Smart Billing Lite Affiliate Program</div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">Share Smart Billing. <span className="text-blue-200">Earn Every Month.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">Help small businesses go digital with Smart Billing Lite and earn rewards on every successful premium purchase.</p>
            <p className="mt-4 max-w-2xl leading-7 text-blue-100">Promote billing, QR/UPI payments, customer records, udhaar, WhatsApp bills, offers, reports, and business growth from one simple app.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/referral/login" className="rounded-2xl bg-white px-7 py-4 text-center font-black text-blue-700 shadow-xl hover:bg-blue-50">Join Affiliate Program →</Link>
              <a href="#how-it-works" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-black text-white hover:bg-white/20">How It Works</a>
            </div>
          </div>
          <div className="rounded-4xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
            <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
              <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-blue-600">Reward potential</p><p className="mt-2 text-3xl font-black">Share &amp; Earn</p></div><div className="rounded-2xl bg-amber-100 p-3 text-amber-600"><BadgeIndianRupee size={30} /></div></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-blue-50 p-4"><p className="text-sm font-bold text-slate-500">For vendors</p><p className="mt-1 text-3xl font-black text-blue-700">₹150</p><p className="text-xs font-semibold text-slate-500">per premium purchase</p></div><div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm font-bold text-slate-500">For promoters</p><p className="mt-1 text-3xl font-black text-emerald-600">₹100</p><p className="text-xs font-semibold text-slate-500">per premium purchase</p></div></div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600"><Share2 size={18} className="text-blue-600" /> Share your link with businesses you know.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-black uppercase tracking-widest text-blue-600">Earn rewards</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Choose how you want to grow with us</h2></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-4xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/60"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600"><Store /></div><h3 className="mt-6 text-2xl font-black">For Smart Billing Lite Vendors</h3><p className="mt-3 leading-7 text-slate-600">Already using Smart Billing Lite? Share your referral link with other shop owners and business owners.</p><p className="mt-6 text-4xl font-black text-blue-600">₹150 <span className="text-base text-slate-500">per successful premium purchase</span></p></article>
          <article className="rounded-4xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-100/60"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600"><Megaphone /></div><h3 className="mt-6 text-2xl font-black">For Brand Promoters</h3><p className="mt-3 leading-7 text-slate-600">Not a Smart Billing Lite vendor? No problem. Anyone can become a Smart Billing Brand Promoter.</p><p className="mt-6 text-4xl font-black text-emerald-600">₹100 <span className="text-base text-slate-500">per successful premium purchase</span></p></article>
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-5 py-16 md:py-20"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-black uppercase tracking-widest text-blue-600">Simple six-step process</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">How It Works</h2></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{steps.map(([title, text, Icon], index) => <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><div className="flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white"><Icon size={20} /></div><div><p className="text-xs font-black uppercase tracking-wide text-blue-600">Step {index + 1}</p><h3 className="font-black">{title}</h3></div></div><p className="mt-4 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:py-20 lg:grid-cols-2"><div className="rounded-4xl bg-[#061c36] p-8 text-white md:p-10"><div className="flex items-center gap-3"><BarChart3 className="text-blue-300" /><h2 className="text-2xl font-black">Referral Dashboard</h2></div><p className="mt-3 leading-7 text-blue-100">Your dashboard will show everything you need to measure your sharing and earnings.</p><div className="mt-7 grid grid-cols-2 gap-3">{['Referral code', 'Share link', 'Total referrals', 'App installs', 'Premium purchases', 'Pending rewards', 'Approved rewards', 'Paid rewards', 'Lifetime earnings'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm font-bold text-blue-100">{item}</div>)}</div></div><div><p className="text-sm font-black uppercase tracking-widest text-blue-600">Who can join?</p><h2 className="mt-3 text-3xl font-black tracking-tight">Anyone can join the Smart Billing Lite Affiliate Program.</h2><p className="mt-4 leading-7 text-slate-600">It is perfect for people who already help businesses discover better tools.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{audiences.map((item) => <div key={item} className="flex items-start gap-2 text-sm font-bold text-slate-700"><Check size={18} className="mt-0.5 shrink-0 text-emerald-600" />{item}</div>)}</div></div></section>

      <section className="bg-slate-100 px-5 py-16 md:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><p className="text-sm font-black uppercase tracking-widest text-blue-600">What you can promote</p><h2 className="mt-3 text-3xl font-black tracking-tight">Help businesses work smarter</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{promoteItems.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold shadow-sm"><Check size={18} className="shrink-0 text-blue-600" />{item}</div>)}</div></div><div><p className="text-sm font-black uppercase tracking-widest text-blue-600">Payout rules</p><h2 className="mt-3 text-3xl font-black tracking-tight">Clear and fair rewards</h2><div className="mt-7 space-y-3">{rules.map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><Check size={18} className="mt-1 shrink-0 text-emerald-600" />{item}</div>)}</div></div></div></section>

      <section className="px-5 py-16 md:py-20"><div className="mx-auto max-w-5xl rounded-4xl bg-linear-to-br from-blue-700 to-indigo-800 p-8 text-center text-white shadow-2xl shadow-blue-200 md:p-14"><h2 className="text-3xl font-black md:text-5xl">Start Earning Today</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">Become a Smart Billing Lite Affiliate Partner and help local businesses move from manual billing to smart digital billing.</p><p className="mt-6 text-xl font-black">Share Smart Billing. Help Businesses Grow. Earn Rewards.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/referral/login" className="rounded-2xl bg-white px-7 py-4 font-black text-blue-700 hover:bg-blue-50">Join Affiliate Program</Link><Link href="/referral/login?tab=vendor" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-black hover:bg-white/20">Login as Vendor</Link><Link href="/referral/login" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-black hover:bg-white/20">Share &amp; Earn Now</Link></div></div></section>
    </main>
  );
}
