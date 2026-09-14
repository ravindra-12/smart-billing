/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Reveal from "@/app/components/ui/Reveal";
import { assetUrl, isEmbeddableVideo, text, youtubeUrl } from "./helpers";

export default function DynamicVideoBlock({ block }: { block: any }) {
  const videoIsValid = typeof block.videoUrl === "string" && isEmbeddableVideo(block.videoUrl);
  const thumbnail = assetUrl(block.thumbnail);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading align="left" title={block.title} description={text(block.description)} />
            {block.videoUrl && (
              <Button href={block.videoUrl} target="_blank" rel="noreferrer" size="lg" className="shrink-0">
                Watch Video Tutorial
              </Button>
            )}
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-paper-dim">
            {videoIsValid ? (
              <iframe
                className="aspect-video w-full"
                src={youtubeUrl(block.videoUrl)}
                title={block.videoTitle || block.title}
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-paper-dim text-center">
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt={block.videoTitle || block.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="px-5 font-semibold text-ink-faint">Video tutorial coming soon</p>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
