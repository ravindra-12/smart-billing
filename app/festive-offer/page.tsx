import FestivePage from "@/app/components/festive/FestivePage";
import { festiveMetadata } from "@/app/components/festive/i18n";

// English (default language). Other languages: /festive-offer/[lang].
export const metadata = festiveMetadata("en");

export default function FestiveOfferPage() {
  return <FestivePage locale="en" />;
}
