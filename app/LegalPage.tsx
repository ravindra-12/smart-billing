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

function LegalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
            SB
          </div>
          <div>
            <div className="text-lg font-black leading-none text-slate-950">
              Smart Billing <span className="text-blue-600">Lite</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-slate-500">
              AI Powered Billing App
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-700 lg:flex">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about-us" className="hover:text-blue-600">About</Link>
          <Link href="/contact-us" className="hover:text-blue-600">Contact</Link>
          <Link href="/terms-and-conditions" className="hover:text-blue-600">Terms</Link>
          <Link href="/privacy-policy" className="hover:text-blue-600">Privacy</Link>
          <Link href="/refund-cancellation-policy" className="hover:text-blue-600">Refunds</Link>
        </nav>

        <a
          href="/app-release.apk"
          download
          className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
        >
          Download APK
        </a>
      </div>
    </header>
  );
}

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <>
      <LegalHeader />
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
