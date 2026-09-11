import type { Metadata } from 'next';
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
  Wallet,
} from 'lucide-react';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import IconTile from '../components/ui/IconTile';

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
const dashboardItems = ['Referral code', 'Share link', 'Total referrals', 'App installs', 'Premium purchases', 'Pending rewards', 'Approved rewards', 'Paid rewards', 'Lifetime earnings'];

export default function AffiliateProgramPage() {
  return (
    <main className="flex-1 bg-paper">
      <section className="overflow-hidden bg-surface-dark px-5 py-16 text-paper md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Badge tone="inverse" className="mb-5">
              <Gift size={14} /> Smart Billing Lite Affiliate Program
            </Badge>
            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Share Smart Billing. <span className="text-accent">Earn Every Month.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/70">
              Help small businesses go digital with Smart Billing Lite and earn rewards on every successful premium purchase.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-paper/60">
              Promote billing, QR/UPI payments, customer records, udhaar, WhatsApp bills, offers, reports, and business growth from one simple app.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/referral/login" variant="inverse" size="lg">Join Affiliate Program</Button>
              <Button href="#how-it-works" variant="ghost" size="lg" className="border border-white/20 text-paper hover:bg-white/10">
                How It Works
              </Button>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-5">
            <div className="rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-accent">Reward potential</p>
                  <p className="font-display mt-2 text-3xl font-semibold text-ink">Share &amp; Earn</p>
                </div>
                <IconTile icon={BadgeIndianRupee} size="lg" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-paper-dim p-4">
                  <p className="text-sm font-bold text-ink-faint">For vendors</p>
                  <p className="font-display mt-1 text-3xl font-semibold text-ink">₹150</p>
                  <p className="text-xs font-semibold text-ink-faint">per premium purchase</p>
                </div>
                <div className="rounded-2xl bg-paper-dim p-4">
                  <p className="text-sm font-bold text-ink-faint">For promoters</p>
                  <p className="font-display mt-1 text-3xl font-semibold text-ink">₹100</p>
                  <p className="text-xs font-semibold text-ink-faint">per premium purchase</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-paper-dim p-4 text-sm font-bold text-ink-soft">
                <Share2 size={18} className="text-accent" /> Share your link with businesses you know.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Earn rewards"
            title="Choose how you want to grow with us"
            className="mx-auto"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="p-8">
              <IconTile icon={Store} size="lg" />
              <h3 className="font-display mt-6 text-2xl font-semibold text-ink">For Smart Billing Lite Vendors</h3>
              <p className="mt-3 leading-7 text-ink-soft">Already using Smart Billing Lite? Share your referral link with other shop owners and business owners.</p>
              <p className="font-display mt-6 text-4xl font-semibold text-accent">
                ₹150 <span className="font-body text-base font-normal text-ink-faint">per successful premium purchase</span>
              </p>
            </Card>
            <Card className="p-8">
              <IconTile icon={Megaphone} size="lg" />
              <h3 className="font-display mt-6 text-2xl font-semibold text-ink">For Brand Promoters</h3>
              <p className="mt-3 leading-7 text-ink-soft">Not a Smart Billing Lite vendor? No problem. Anyone can become a Smart Billing Brand Promoter.</p>
              <p className="font-display mt-6 text-4xl font-semibold text-accent">
                ₹100 <span className="font-body text-base font-normal text-ink-faint">per successful premium purchase</span>
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-paper-dim py-16 md:py-20">
        <Container>
          <SectionHeading align="left" eyebrow="Simple six-step process" title="How It Works" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([title, text, Icon], index) => (
              <div key={title} className="rounded-3xl border border-line bg-white p-6">
                <div className="flex items-center gap-4">
                  <IconTile icon={Icon} size="md" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-accent">Step {index + 1}</p>
                    <h3 className="font-black text-ink">{title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-surface-dark p-8 text-paper md:p-10">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-accent" />
              <h2 className="font-display text-2xl font-semibold">Referral Dashboard</h2>
            </div>
            <p className="mt-3 leading-7 text-paper/70">Your dashboard will show everything you need to measure your sharing and earnings.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {dashboardItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-paper/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-accent">Who can join?</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">
              Anyone can join the Smart Billing Lite Affiliate Program.
            </h2>
            <p className="mt-4 leading-7 text-ink-soft">It is perfect for people who already help businesses discover better tools.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm font-bold text-ink-soft">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-dim py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-accent">What you can promote</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">Help businesses work smarter</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {promoteItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-ink-soft">
                  <Check size={18} className="shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-accent">Payout rules</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">Clear and fair rewards</h2>
            <div className="mt-7 space-y-3">
              {rules.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                  <Check size={18} className="mt-1 shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="max-w-5xl">
          <div className="rounded-[2.5rem] bg-surface-dark p-8 text-center text-paper md:p-14">
            <h2 className="font-display text-3xl font-semibold md:text-5xl">Start Earning Today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-paper/70">
              Become a Smart Billing Lite Affiliate Partner and help local businesses move from manual billing to smart digital billing.
            </p>
            <p className="mt-6 text-xl font-black">Share Smart Billing. Help Businesses Grow. Earn Rewards.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/referral/login" variant="inverse" size="lg">Join Affiliate Program</Button>
              <Button href="/referral/login?tab=vendor" variant="ghost" size="lg" className="border border-white/20 text-paper hover:bg-white/10">
                Login as Vendor
              </Button>
              <Button href="/referral/login" variant="ghost" size="lg" className="border border-white/20 text-paper hover:bg-white/10">
                Share &amp; Earn Now
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
