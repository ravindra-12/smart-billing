"use client";

import type { ReactNode } from "react";
import { INTEREST_EVENT, track, type CampaignEvent, type Interest } from "./campaign";

/**
 * Anchor that records a campaign event. In-page "#id" links scroll smoothly and,
 * when `interest` is set, tell the claim form which offer to preselect.
 */
export default function TrackedLink({
  href,
  event,
  interest,
  className = "",
  children,
}: {
  href: string;
  event: CampaignEvent;
  interest?: Interest;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={(e) => {
        track(event, interest ? { interest } : {});
        if (external) return;

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
