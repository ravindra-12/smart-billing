import type { Metadata } from "next";
import FestiveHindiPage from "@/app/components/festive/FestiveHindiPage";

const title = "दशहरा बंपर ऑफर: Smart Billing Lite + थर्मल प्रिंटर ₹6,500 में";
const description = "दुकानों और छोटे व्यवसायों के लिए AI-संचालित मोबाइल बिलिंग। ₹6,500 में Smart Billing Lite के 13 महीने और मोबाइल थर्मल प्रिंटर, साथ में 5 दिन का मुफ्त ट्रायल।";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/hero-bg.png"] },
};

export default function HindiDussehraOfferPage() {
  return <FestiveHindiPage />;
}
