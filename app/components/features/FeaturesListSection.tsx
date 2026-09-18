"use client";

import { CheckCircle2 } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Reveal from "@/app/components/ui/Reveal";
import type { FeatureGroup } from "./types";

export default function FeaturesListSection({ groups = [] }: { groups?: FeatureGroup[] }) {
  return <>{groups.map((group) => <section key={group.id ?? group.title} className="py-8"><Container><Reveal><div className="rounded-[2.5rem] border border-line bg-white p-6 md:p-10"><div className={`inline-flex rounded-2xl px-5 py-2.5 text-sm font-black ${group.tone === "green" ? "bg-green-50 text-green-700" : group.tone === "blue" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>{group.title}</div><div className="mt-6 grid gap-4 md:grid-cols-3">{group.items.map((item) => <div key={item.id ?? item.title} className="rounded-2xl bg-paper-dim p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-ink/5"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent"><CheckCircle2 size={20} /></div><h3 className="text-sm font-black text-ink">{item.title}</h3><p className="mt-1.5 text-xs leading-6 text-ink-soft">{item.description}</p></div>)}</div></div></Reveal></Container></section>)}</>;
}
