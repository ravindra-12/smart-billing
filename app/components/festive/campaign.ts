export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN";
export const PRO_URL = "#claim";
export const SUPPORT_EMAIL = "contactus@murmusoftwareinfotech.com";
/** Brochure PDF, served from public/. */
export const BROCHURE_URL = "/smart-billing-lite-brochure.pdf";
/**
 * Demo videos (YouTube IDs) for the video section: the first plays in the main player, the rest sit in the row
 * below it. Their short titles are `video.videoTitles` in each language file (app/components/festive/i18n), in
 * the same order, so add or remove a title there when changing this list.
 */
export const DEMO_VIDEOS = [
  "HIkf0Lt_9io", // Smart Billing Lite & Pro – billing software and business growth partner
  "7GaZNxmVoK4", // Billing app + thermal printer for ₹6,500 (festive offer)
  "8xHznTaH1G0", // Your mini POS for fast billing
  "zELfm9cvzKg", // Bill in seconds with calculator billing
  "bhVxka75VRM", // Product & service billing made easy
] as const;
export const DEMO_VIDEO_ID = DEMO_VIDEOS[0];
export const WHATSAPP_NUMBER = "919110176498";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I am interested in Smart Billing Lite Festival Offer")}`;
export const BOOK_NOW_NUMBER = "+91-8235264677";

export const interests = {
  lite: "Smart Billing Lite Festival Bundle (₹6,500)",
  pro: "Smart Billing Pro Festival Offer (₹14,000/year)",
  demo: "Live demo",
} as const;

export type Interest = keyof typeof interests;

/** Fired on window when a CTA wants the claim form to preselect an interest. */
export const INTEREST_EVENT = "festive:interest";

export type CampaignEvent =
  | "trial_started"
  | "offer_clicked"
  | "demo_played"
  | "demo_requested"
  | "lead_submitted"
  | "brochure_downloaded";

/** Pushes a campaign event to window.dataLayer so any tag manager added later can pick it up. */
export function track(event: CampaignEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, campaign: "festival", ...params });
}

/** Gold gradient text for headline accents on dark festive backgrounds. */
export const goldText =
  "bg-[linear-gradient(100deg,#ffe9a3_0%,#f6c453_35%,#ffdb7a_55%,#e09b1c_100%)] bg-clip-text text-transparent";

/** Night-sky festive backdrop for the hero and the final CTA band. */
export const nightBg =
  "radial-gradient(ellipse 80% 55% at 50% 0%, #1d4ed8 0%, transparent 62%), radial-gradient(ellipse 55% 45% at 100% 45%, rgb(244 185 66 / 0.28) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 0% 70%, rgb(37 99 235 / 0.35) 0%, transparent 65%), linear-gradient(180deg, #0a1a3f 0%, #050f29 100%)";

export const btn = {
  base: "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
  blue: "bg-festive-blue text-white hover:bg-festive-navy focus-visible:outline-festive-blue",
  green: "bg-[#25D366] text-white hover:bg-[#1da851] focus-visible:outline-[#25D366]",
  gold: "bg-festive-gold text-festive-navy hover:bg-festive-gold-dark focus-visible:outline-festive-gold",
  white: "bg-white text-festive-navy hover:bg-festive-bg focus-visible:outline-white",
  outline:
    "border border-festive-navy/20 bg-white text-festive-navy hover:border-festive-navy focus-visible:outline-festive-navy",
};
