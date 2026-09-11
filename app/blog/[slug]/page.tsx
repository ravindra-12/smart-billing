import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPost, posts } from '../../../lib/blog';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

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
    <main className="flex-1 bg-paper">
      <section className="bg-surface-dark px-5 py-12 text-paper md:py-20">
        <Container className="max-w-4xl">
          <Button href="/blog" variant="ghost" className="px-0 text-paper/70 hover:text-paper">
            <ArrowLeft size={16} /> Back to all articles
          </Button>
          <Badge tone="inverse" className="mt-10">
            <BookOpen size={14} /> {post.category}
          </Badge>
          <h1 className="font-display mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold text-paper/60">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} /> {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} /> {post.readTime}
            </span>
          </div>
        </Container>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xl font-medium leading-9 text-ink-soft md:text-2xl md:leading-10">
          {post.intro}
        </p>
        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-ink-soft">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-[2.5rem] border border-line bg-white p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Ready to simplify billing?
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-ink">
            Manage your business from one simple app.
          </h2>
          <Button href="/download" className="mt-6">
            Get Smart Billing Lite <ArrowRight size={17} />
          </Button>
        </div>
      </article>
    </main>
  );
}
