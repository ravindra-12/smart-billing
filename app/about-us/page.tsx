import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "About Us | Smart Billing Lite",
  description: "Learn about Smart Billing Lite and the billing app services offered.",
};

export default function AboutUsPage() {
  return (
    <LegalPage
      title="About Us"
      description="Smart Billing Lite helps small businesses manage billing, payments, receipts, udhaar, and daily business tracking from a simple Android app."
      sections={[
        {
          title: "Who We Serve",
          body: [
            "Smart Billing Lite is designed for kirana stores, grocery shops, pharmacies, salons, food stalls, repair shops, and small vendors who need fast and reliable billing tools.",
            "Our goal is to make day-to-day billing, payment collection, receipt printing, and business records easier for Indian small businesses.",
          ],
        },
        {
          title: "Our Product",
          body: [
            "The app provides mobile billing, QR and UPI payment support, customer management, udhaar tracking, transaction history, reports, and thermal receipt printer support.",
            "Users can download the Android APK from this website and use the app based on the applicable free trial or paid plan.",
          ],
        },
        {
          title: "Business Information",
          body: [
            "Business name: Smart Billing Lite.",
            "Service type: Digital billing and business management application.",
            "Service area: India.",
          ],
        },
      ]}
    />
  );
}
