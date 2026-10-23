import type { Metadata } from "next";
import FestiveHindiPage from "@/app/components/festive/FestiveHindiPage";

const title = "फेस्टिवल ऑफर | Smart Billing Lite";
const description =
  "दुकानों और छोटे व्यवसायों के लिए Smart Billing Lite का फेस्टिवल ऑफर।";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/hero-bg.png"] },
};

export default function FestiveOfferHindiPage() {
  return <FestiveHindiPage />;
}
