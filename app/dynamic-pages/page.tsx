import type { Metadata } from "next";
import { FileText, ArrowRight } from "lucide-react";
import { getDynamicPages } from "@/lib/dynamicPages";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconTile from "@/app/components/ui/IconTile";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "All Pages | Smart Billing Lite",
  description: "Browse every page published on the Smart Billing Lite website.",
};

export default async function DynamicPagesIndex() {
  const pages = await getDynamicPages();

  return (
    <main className="flex-1 bg-paper py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mx-auto">
            <FileText size={13} />
            All Pages
          </Badge>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Explore Smart Billing Lite
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            Every page currently published on the site, in one place.
          </p>
        </div>

        {pages.length === 0 ? (
          <p className="mt-12 text-center text-ink-soft">No pages are available right now.</p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page, index) => (
              <Reveal key={page.id} delay={(index % 6) * 70}>
                <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
                  <IconTile icon={FileText} size="md" />
                  <h2 className="font-display mt-4 text-lg font-semibold text-ink">{page.title}</h2>
                  {page.seo?.metaDescription && (
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-ink-soft">
                      {page.seo.metaDescription}
                    </p>
                  )}
                  <Button
                    href={`/dynamic-pages/${page.slug}`}
                    variant="secondary"
                    className="mt-6 self-start"
                  >
                    View page
                    <ArrowRight size={16} />
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
