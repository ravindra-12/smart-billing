import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDynamicPage, getDynamicPages, type DynamicBlock } from "../../../lib/dynamicPages";

export const dynamic = "force-dynamic";

function text(value: any): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(text).join(" ");
  if (value?.children) return text(value.children);
  return value?.text || "";
}

function youtubeUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function isEmbeddableVideo(url: string) {
  return /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))[^?&/]+/.test(url);
}

function assetUrl(value: any) {
  const image = value?.data ?? value;
  const url = image?.url || image?.attributes?.url;
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "").replace(/\/$/, "");
  return base ? `${base}${url.startsWith("/") ? "" : "/"}${url}` : url;
}

function Block({ block }: { block: DynamicBlock }) {
  const component = block.__component;

  if (component === "shared.dynamic-page-hero") {
    const heroImage = assetUrl(block.image) || "/hero-bg.png";
    return <section className="bg-linear-to-br from-[#061c36] via-blue-700 to-blue-500 px-5 py-16 text-white md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"><div><p className="text-sm font-black uppercase tracking-widest text-blue-200">{block.badgeText}</p><h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{block.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">{text(block.description)}</p>{block.primaryButton?.url && <Link href={block.primaryButton.url} className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 font-black text-blue-700">{block.primaryButton.label}</Link>}</div><div className="relative min-h-64 overflow-hidden rounded-4xl border border-white/20 bg-white/10 shadow-2xl"><img src={heroImage} alt={block.title || "Smart Billing Lite"} className="h-full min-h-64 w-full object-cover" /></div></div></section>;
  }

  if (component === "shared.dynamic-page-video-section") {
    const videoIsValid = typeof block.videoUrl === "string" && isEmbeddableVideo(block.videoUrl);
    const thumbnail = assetUrl(block.thumbnail);
    return <section className="bg-slate-50 px-5 py-16 md:py-20"><div className="mx-auto max-w-6xl"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-black text-slate-900 md:text-4xl">{block.title}</h2><p className="mt-4 max-w-2xl leading-8 text-slate-600">{text(block.description)}</p></div>{block.videoUrl && <Link href={block.videoUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 rounded-2xl bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-200">Watch Video Tutorial</Link>}</div><div className="mt-10 overflow-hidden rounded-3xl bg-slate-200 shadow-xl">{videoIsValid ? <iframe className="aspect-video w-full" src={youtubeUrl(block.videoUrl)} title={block.videoTitle || block.title} allowFullScreen /> : <div className="flex aspect-video items-center justify-center bg-linear-to-br from-slate-200 to-slate-300 text-center">{thumbnail ? <img src={thumbnail} alt={block.videoTitle || block.title} className="h-full w-full object-cover" /> : <p className="px-5 font-bold text-slate-500">Video tutorial coming soon</p>}</div>}</div></div></section>;
  }

  if (component === "shared.dynamic-page-intro") return <section className="px-5 py-14 text-center"><p className="text-sm font-black uppercase tracking-widest text-blue-600">{block.badgeText}</p><p className="mx-auto mt-4 max-w-3xl text-xl leading-9 text-slate-600">{text(block.description)}</p></section>;

  if (component === "shared.dynamic-page-feature-grid") return <section className="bg-white px-5 py-16"><div className="mx-auto max-w-6xl"><p className="text-sm font-black uppercase tracking-widest text-blue-600">{block.badgeText}</p><h2 className="mt-3 max-w-4xl text-3xl font-black text-slate-900 md:text-4xl">{block.title}</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{(block.features || []).map((feature: any) => <article key={feature.id || feature.title} className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100"><h3 className="text-lg font-black text-slate-900">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600">{text(feature.description)}</p></article>)}</div></div></section>;

  if (component === "shared.dynamic-page-cta-banner") return <section className="px-5 py-16"><div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-4xl bg-blue-600 px-7 py-12 text-white md:flex-row md:items-center md:justify-between md:px-12"><div><h2 className="text-3xl font-black">{block.title}</h2><p className="mt-3 max-w-2xl text-blue-100">{text(block.description)}</p></div>{block.buttonUrl && <Link href={block.buttonUrl} className="inline-flex shrink-0 rounded-2xl bg-white px-6 py-3 font-black text-blue-700">{block.buttonLabel}</Link>}</div></section>;

  if (component === "shared.dynamic-page-faq-section") return <section className="bg-slate-50 px-5 py-16"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black text-slate-900 md:text-4xl">{block.title}</h2><p className="mt-3 text-slate-600">{text(block.description)}</p><div className="mt-8 space-y-4">{(block.items || []).map((item: any) => <details key={item.id || item.question} className="rounded-2xl bg-white p-5 shadow-sm"><summary className="cursor-pointer font-black text-slate-900">{item.question}</summary><p className="mt-3 leading-7 text-slate-600">{text(item.answer)}</p></details>)}</div></div></section>;

  return null;
}

export async function generateStaticParams() {
  const pages = await getDynamicPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = await getDynamicPage((await params).slug);
  return { title: page?.seo?.metaTitle || page?.title || "Page | Smart Billing Lite", description: page?.seo?.metaDescription };
}

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = await getDynamicPage((await params).slug);
  if (!page) notFound();
  return <main className="flex-1 bg-white text-slate-900">{(page.blocks || []).map((block, index) => <Block key={block.id || index} block={block} />)}</main>;
}
