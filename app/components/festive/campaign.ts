export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN";
export const PRO_URL = "#claim";
export const SUPPORT_EMAIL = "contactus@murmusoftwareinfotech.com";
export const DEMO_VIDEO_ID = "HIkf0Lt_9io";
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
  | "lead_submitted";

/** Pushes a campaign event to window.dataLayer so any tag manager added later can pick it up. */
export function track(event: CampaignEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, campaign: "festival", ...params });
}

export const btn = {
  base: "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
  blue: "bg-festive-blue text-white hover:bg-festive-navy focus-visible:outline-festive-blue",
  green: "bg-[#25D366] text-white hover:bg-[#1da851] focus-visible:outline-[#25D366]",
  gold: "bg-festive-gold text-festive-navy hover:bg-festive-gold-dark focus-visible:outline-festive-gold",
  white: "bg-white text-festive-navy hover:bg-festive-bg focus-visible:outline-white",
  outline:
    "border border-festive-navy/20 bg-white text-festive-navy hover:border-festive-navy focus-visible:outline-festive-navy",
};
