import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPost, posts } from '../../../lib/blog';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Article not found | Smart Billing Lite' };
  }

  return {
    title: `${post.title} | Smart Billing Lite Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      <section className="bg-linear-to-br from-[#061c36] via-[#0b63f6] to-[#2563eb] px-5 py-12 text-white md:py-20">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-blue-100 transition hover:text-white">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black">
            <BookOpen size={16} /> {post.category}
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold text-blue-100">
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {post.date}</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xl font-medium leading-9 text-slate-700 md:text-2xl md:leading-10">{post.intro}</p>
        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-4xl bg-white p-8 shadow-xl ring-1 ring-slate-100 md:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">Ready to simplify billing?</p>
          <h2 className="mt-2 text-2xl font-black">Manage your business from one simple app.</h2>
          <Link href="/download" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
            Get Smart Billing Lite <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    </main>
  );
}
