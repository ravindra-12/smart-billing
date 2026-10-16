"use client";

import { useEffect, useState } from "react";
import TrackedLink from "./TrackedLink";
import { PLAY_STORE_URL, btn } from "./campaign";

/** Phone-only sticky CTA; hides once the final CTA section is reached so it never covers the form or footer. */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("claim");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top > 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-festive-navy/10 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      inert={!visible}
    >
      <div className="grid grid-cols-2 gap-3">
        <TrackedLink href={PLAY_STORE_URL} event="trial_started" className={`${btn.base} ${btn.blue} px-4 text-sm`}>
          Free Trial
        </TrackedLink>
        <TrackedLink href="#offer" event="offer_clicked" interest="lite" className={`${btn.base} ${btn.gold} px-4 text-sm`}>
          Get Offer
        </TrackedLink>
      </div>
    </div>
  );
}
