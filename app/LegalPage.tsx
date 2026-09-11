import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "./components/ui/Container";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <main className="bg-paper py-14 md:py-20">
      <Container className="max-w-4xl">
        <article className="rounded-[2.5rem] border border-line bg-white p-7 md:p-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark">
            <ArrowLeft size={15} />
            Back to Smart Billing Lite
          </Link>

          <div className="mt-8 border-b border-line pb-8">
            <p className="text-sm font-semibold text-ink-faint">Last updated: 22 June 2026</p>
            <h1 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-soft">{description}</p>
          </div>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-semibold text-ink">{section.title}</h2>
                <div className="mt-3 space-y-3 text-base leading-7 text-ink-soft">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
