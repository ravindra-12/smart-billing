"use client";

import type { ReactNode } from "react";
import { INTEREST_EVENT, track, type CampaignEvent, type Interest } from "./campaign";

/**
 * Anchor that records a campaign event. In-page "#id" links scroll smoothly and,
 * when `interest` is set, tell the claim form which offer to preselect. `download` saves the target as a file
 * (with that file name) instead of opening it.
 */
export default function TrackedLink({
  href,
  event,
  interest,
  download,
  className = "",
  label,
  children,
}: {
  href: string;
  event: CampaignEvent;
  interest?: Interest;
  download?: string;
  className?: string;
  /** Accessible name, when the visible text is shortened. */
  label?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      download={download}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={(e) => {
        track(event, interest ? { interest } : {});
        if (external || download) return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        if (interest) window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", href);
      }}
    >
      {children}
    </a>
  );
}
