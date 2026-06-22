import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Smart Billing Lite",
  description: "Digital delivery policy for Smart Billing Lite APK and subscription access.",
};

export default function ShippingDeliveryPolicyPage() {
  return (
    <LegalPage
      title="Shipping & Delivery Policy"
      description="Smart Billing Lite is a digital software service. This policy explains how APK download and plan access are delivered."
      sections={[
        {
          title: "Digital Delivery",
          body: [
            "Smart Billing Lite does not ship physical products.",
            "The Android APK is delivered digitally through the download link available on this website.",
          ],
        },
        {
          title: "Plan Activation",
          body: [
            "After a successful payment, paid plan access is activated digitally in the app or user account after payment confirmation.",
            "Activation is usually instant, but in some cases it may take additional time due to payment gateway, bank, internet, or verification delays.",
          ],
        },
        {
          title: "Delivery Issues",
          body: [
            "If you are unable to download the APK or your paid plan is not activated after a successful payment, contact support@smartbillinglite.com.",
            "Please include your registered mobile number, payment amount, payment date, and transaction reference ID for faster support.",
          ],
        },
      ]}
    />
  );
}
