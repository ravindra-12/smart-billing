import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { posts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Smart Billing Lite Blog',
  description:
    'Practical billing, payment, and business growth tips for Indian small businesses.',
};

export default function BlogPage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      <section className="bg-linear-to-br from-[#061c36] via-[#0b63f6] to-[#2563eb] px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black">
            <BookOpen size={16} /> Smart Billing Lite Blog
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Simple ideas to help your business grow smarter.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Practical tips about billing, payments, customer management, and digital growth for Indian small businesses.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">Latest articles</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Business tips that work in the real world</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">New articles and practical guides will be added here as the Smart Billing Lite community grows.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-44 items-end bg-linear-to-br from-blue-100 via-indigo-100 to-slate-100 p-6">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 shadow-sm">{post.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {post.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {post.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-black leading-tight">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-800">
                  Article preview <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 md:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-4xl bg-white p-8 shadow-xl ring-1 ring-slate-100 md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">Ready to simplify billing?</p>
            <h2 className="mt-2 text-2xl font-black">Manage your business from one simple app.</h2>
          </div>
          <Link href="/download" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
            Get Smart Billing Lite <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
