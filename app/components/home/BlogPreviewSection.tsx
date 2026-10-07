import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import type { BlogPost } from "@/lib/blog";

export default function BlogPreviewSection({ posts }: { posts?: BlogPost[] }) {
  const visiblePosts = posts?.slice(0, 3) ?? [];

  if (!visiblePosts.length) return null;

  return (
    <section className="bg-paper px-5 py-16 md:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Insights & guides"
            title="Fresh tips for growing your business"
            description="Practical ideas about billing, payments, and steady business growth from the Smart Billing blog."
          />
          <Button href="/blog" variant="ghost" className="justify-start px-0 text-accent hover:text-accent-dark">
            View all articles <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <Card key={post.slug} hover className="flex h-full flex-col overflow-hidden p-0">
              <div className="relative h-44 overflow-hidden bg-paper-dim">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-end p-6">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-accent-dark">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={12} /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={12} /> {post.readTime}
                  </span>
                </div>

                <div className="mt-4 inline-flex w-fit rounded-full bg-surface-dark px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-paper">
                  {post.category}
                </div>

                <h3 className="font-display mt-4 text-2xl font-semibold leading-tight text-ink">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark"
                >
                  View details <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
