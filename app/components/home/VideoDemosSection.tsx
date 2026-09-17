import { PlayCircle } from "lucide-react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Card from "@/app/components/ui/Card";
import Reveal from "@/app/components/ui/Reveal";
import { isEmbeddableVideo, youtubeUrl } from "@/app/components/dynamic/helpers";
import type { VideosBlock } from "./types";

const FALLBACK_VIDEO_ID = "HIkf0Lt_9io";

const fallbackDemos = [
  {
    title: "Complete App Overview",
    description:
      "Full walkthrough of Smart Billing Lite — billing, payments, receipts, reports and more.",
  },
  {
    title: "Billing & Invoicing",
    description:
      "Create professional invoices, add items, apply discounts, and print thermal receipts instantly.",
  },
  {
    title: "Payments & Reports",
    description: "Collect UPI payments, track udhaar, and view daily profit reports on your mobile.",
  },
];

export default function VideoDemosSection({ videos }: { videos?: VideosBlock }) {
  const demos = videos?.videos?.length ? videos.videos : fallbackDemos;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={videos?.badgeText ?? "See it in action"}
          title={videos?.title ?? "See how Smart Billing works"}
          description={
            videos?.description ??
            "Watch quick demos of the key features that make billing faster, easier, and smarter for your business."
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {demos.map((demo, index) => {
            const embeddable = "videoUrl" in demo && demo.videoUrl && isEmbeddableVideo(demo.videoUrl);
            const src = embeddable
              ? youtubeUrl(demo.videoUrl as string)
              : `https://www.youtube.com/embed/${FALLBACK_VIDEO_ID}`;

            return (
              <Reveal key={demo.title} delay={index * 120}>
                <Card hover className="overflow-hidden p-0">
                  <div className="bg-surface-dark p-1.5">
                    <div className="aspect-video overflow-hidden rounded-2xl">
                      <iframe
                        src={src}
                        title={demo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="h-full w-full border-0"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-accent">
                      <PlayCircle size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        {"badgeText" in demo && demo.badgeText ? demo.badgeText : "Demo"}
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-lg font-semibold text-ink">{demo.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{demo.description}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
