import type { Metadata } from 'next';
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { posts } from '../../lib/blog';
import JsonLd from '../components/JsonLd';
import { getPageMeta } from '@/lib/strapi';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

export async function generateMetadata(): Promise<Metadata> {
  const blogMeta = await getPageMeta('blog-meta');

  if (!blogMeta?.seo) {
    return {
      title: 'Smart Billing Lite Blog',
      description: 'Practical billing, payment, and business growth tips for Indian small businesses.',
    };
  }

  return {
    title: blogMeta.seo.metaTitle,
    description: blogMeta.seo.metaDescription,
    openGraph: {
      title: blogMeta.seo.metaTitle,
      description: blogMeta.seo.metaDescription,
      url: blogMeta.seo.canonicalUrl,
      images: blogMeta.seo.shareImage?.url ? [blogMeta.seo.shareImage.url] : [],
    },
  };
}

export default async function BlogPage() {
  const blogMeta = await getPageMeta('blog-meta');

  return (
    <>
      <JsonLd data={blogMeta} />
      <main className="flex-1 bg-paper">
        <section className="bg-surface-dark px-5 py-16 text-paper md:py-24">
          <Container>
            <Badge tone="inverse">
              <BookOpen size={14} />
              Smart Billing Lite Blog
            </Badge>
            <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Simple ideas to help your business grow smarter.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/70">
              Practical tips about billing, payments, customer management, and digital growth for Indian small businesses.
            </p>
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <SectionHeading
                align="left"
                eyebrow="Latest articles"
                title="Business tips that work in the real world"
              />
              <p className="max-w-md text-sm leading-6 text-ink-faint">
                New articles and practical guides will be added here as the Smart Billing Lite community grows.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.slug} hover className="flex flex-col overflow-hidden p-0">
                  <div className="flex h-40 items-end bg-paper-dim p-6">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-accent-dark">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-ink-faint">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={14} /> {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={14} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-xl font-semibold leading-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
                    <Button
                      href={`/blog/${post.slug}`}
                      variant="ghost"
                      className="mt-6 justify-start px-0 text-accent hover:text-accent-dark"
                    >
                      Article preview <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="px-5 pb-16 md:pb-20">
          <Container className="flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-surface-dark p-8 text-paper md:flex-row md:items-center md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-paper/50">Ready to simplify billing?</p>
              <h2 className="font-display mt-2 text-2xl font-semibold">Manage your business from one simple app.</h2>
            </div>
            <Button href="/download" variant="inverse" size="lg" className="shrink-0">
              Get Smart Billing Lite <ArrowRight size={17} />
            </Button>
          </Container>
        </section>
      </main>
    </>
  );
}
