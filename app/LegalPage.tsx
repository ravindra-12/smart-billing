import Link from "next/link";

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
    <>
      <main className="min-h-screen bg-[#f6f9ff] px-5 py-12 text-slate-900">
        <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-10">
          <Link href="/" className="text-sm font-black text-blue-600 hover:text-blue-700">
            Back to Smart Billing Lite
          </Link>

          <div className="mt-6 border-b border-slate-100 pb-8">
            <p className="text-sm font-bold text-slate-500">Last updated: 22 June 2026</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
          </div>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-black">{section.title}</h2>
                <div className="mt-3 space-y-3 text-base leading-7 text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
