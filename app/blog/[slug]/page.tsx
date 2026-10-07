import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { extractTableOfContents, getPost, getPosts, renderBlogContent } from '../../../lib/blog';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

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
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const toc = extractTableOfContents(post.content ?? "");

  return (
    <main className="flex-1 bg-paper">
      <section className="bg-surface-dark px-5 py-12 text-paper md:py-20">
        <Container className="max-w-4xl">
          <Button href="/blog" variant="ghost" className="px-0 text-paper/70 hover:text-paper">
            <ArrowLeft size={16} /> Back to all articles
          </Button>

          {post.coverImage ? (
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10">
              <img src={post.coverImage} alt={post.title} className="h-[280px] w-full object-cover md:h-[420px]" />
            </div>
          ) : null}

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
            {post.authorName ? (
              <span className="inline-flex items-center gap-2 text-paper/70">
                By {post.authorName}
              </span>
            ) : null}
          </div>
        </Container>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[260px_1fr] md:py-16">
        {toc.length ? (
          <aside className="md:sticky md:top-24 h-fit">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Table of contents</p>
              <nav className="mt-4 space-y-2">
                {toc.map((item) => (
                  <a
                    key={`${item.slug}-${item.level}`}
                    href={`#${item.slug}`}
                    className="block text-sm text-ink-soft transition hover:text-accent"
                    style={{ marginLeft: `${(item.level - 1) * 12}px` }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}

        <article className="min-w-0">
          <p className="text-xl font-medium leading-9 text-ink-soft md:text-2xl md:leading-10">
            {post.intro}
          </p>

          {post.tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-paper-dim px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div
            className="prose prose-lg mt-12 max-w-none text-base leading-8 text-ink-soft [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_a]:text-accent [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
            dangerouslySetInnerHTML={{ __html: renderBlogContent(post.content) }}
          />

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
      </div>
    </main>
  );
}
