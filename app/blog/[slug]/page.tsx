import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3, List } from 'lucide-react';
import { notFound } from 'next/navigation';
import { extractTableOfContents, getPost, getPosts, renderBlogContent } from '../../../lib/blog';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

type TocItem = { title: string; slug: string; level: number };

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

/* ---------- helpers: build TOC from the rendered HTML ---------- */

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function buildToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const withIds = html.replace(
    /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, lvl: string, attrs: string, inner: string) => {
      const level = Number(lvl);
      const title = stripTags(inner);
      if (!title) return _match;

      const existing = attrs.match(/\sid=["']([^"']+)["']/i);
      let slug = existing ? existing[1] : slugify(title) || `section-${toc.length + 1}`;

      const count = used.get(slug) ?? 0;
      used.set(slug, count + 1);
      if (count > 0) slug = `${slug}-${count}`;

      toc.push({ title, slug, level });

      const cleanAttrs = attrs.replace(/\sid=["'][^"']*["']/i, '');
      return `<h${level}${cleanAttrs} id="${slug}">${inner}</h${level}>`;
    }
  );

  return { html: withIds, toc };
}

/* ---------- page ---------- */

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

  const rendered = renderBlogContent(post.content ?? '');
  const built = buildToc(rendered);

  let contentHtml = built.html;
  let toc: TocItem[] = built.toc;

  // Fallback to the library extractor if no headings were found in the HTML
  if (!toc.length) {
    toc = (extractTableOfContents(post.content ?? '') as TocItem[]) ?? [];
  }

  const minLevel = toc.length ? Math.min(...toc.map((t) => t.level)) : 1;
  const hasToc = toc.length > 0;

  return (
    <main className="flex-1 bg-paper">
      {/* ---------- Hero ---------- */}
      <section className="bg-surface-dark px-5 py-12 text-paper md:py-20">
        <Container className="mx-auto max-w-4xl">
          <Button href="/blog" variant="ghost" className="px-0 text-paper/70 hover:text-paper">
            <ArrowLeft size={16} /> Back to all articles
          </Button>

          {post.coverImage ? (
            <div className="mt-10 overflow-hidden rounded-4xl border border-white/10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-70 w-full object-cover md:h-105"
              />
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

      {/* ---------- Body ---------- */}
      <div
        className={
          hasToc
            ? 'mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-12 lg:py-16'
            : 'mx-auto w-full max-w-3xl px-5 py-12 lg:py-16'
        }
      >
        {/* Table of contents */}
        {hasToc ? (
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
                <List size={14} /> Table of contents
              </p>
              <nav className="mt-4 space-y-2" aria-label="Table of contents">
                {toc.map((item, i) => (
                  <a
                    key={`${item.slug}-${i}`}
                    href={`#${item.slug}`}
                    className="block text-sm leading-6 text-ink-soft transition hover:text-accent"
                    style={{ paddingLeft: `${(item.level - minLevel) * 14}px` }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}

        {/* Article */}
        <article className="w-full min-w-0">
          {post.intro ? (
            <p className="text-xl font-medium leading-9 text-ink-soft md:text-2xl md:leading-10">
              {post.intro}
            </p>
          ) : null}

          {post.tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-paper-dim px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div
            className="mt-10 w-full max-w-none break-words text-base leading-8 text-ink-soft
              [&_h1]:scroll-mt-28 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28
              [&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-ink
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-ink
              [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-ink
              [&_p]:mb-5
              [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-2
              [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4
              [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl
              [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic
              [&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto
              [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-paper-dim [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* CTA */}
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