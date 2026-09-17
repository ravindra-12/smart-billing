import { Receipt, Smartphone } from "lucide-react";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import type { AppDownloadBlock } from "./types";

const DEFAULT_LINK = "https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN";

export default function ApkDownloadSection({ appDownload }: { appDownload?: AppDownloadBlock }) {
  const details = [
    { label: "Version", value: appDownload?.version?.replace(/^Version:\s*/i, "") ?? "v3.2.0" },
    { label: "Size", value: appDownload?.size?.replace(/^Size:\s*/i, "") ?? "18 MB" },
    { label: "Requires", value: appDownload?.requirements?.replace(/^Requires:\s*/i, "") ?? "Android 7.0+" },
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[2.5rem] border border-line bg-white p-8 text-center md:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-ink text-paper">
            <Receipt size={28} strokeWidth={2.25} />
          </div>

          <Badge>
            <Smartphone size={13} />
            {appDownload?.badgeText ?? "Android App"}
          </Badge>

          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {appDownload?.title ?? "Get Smart Billing Lite on your phone"}
          </h2>
          <p className="max-w-xl leading-7 text-ink-soft">
            {appDownload?.description ??
              "Download the APK directly and start billing in minutes — free 30-day trial, no credit card needed."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {details.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-line bg-paper-dim px-4 py-1.5 text-xs font-bold text-ink-soft"
              >
                {item.label}: <span className="text-ink">{item.value}</span>
              </div>
            ))}
          </div>

          <Button
            href={appDownload?.buttonLink ?? DEFAULT_LINK}
            target="_blank"
            rel="noreferrer"
            size="lg"
          >
            {appDownload?.buttonText ?? "Download APK"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
