import { permanentRedirect } from "next/navigation";

/** The Hindi campaign page now lives at /festive-offer/hi, with the other languages. */
export default function FestiveOfferHindiPage() {
  permanentRedirect("/festive-offer/hi");
}
