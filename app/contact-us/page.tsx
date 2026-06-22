import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Contact Us | Smart Billing Lite",
  description: "Contact Smart Billing Lite support for billing app help, payments, refunds, and account queries.",
};

export default function ContactUsPage() {
  return (
    <LegalPage
      title="Contact Us"
      description="For product support, payment questions, refund requests, or account help, contact the Smart Billing Lite support team."
      sections={[
        {
          title: "Support Details",
          body: [
            "Email: support@smartbillinglite.com",
            "Support hours: Monday to Saturday, 10:00 AM to 6:00 PM IST.",
            "Typical response time: 1 to 2 business days.",
          ],
        },
        {
          title: "Payment and Refund Queries",
          body: [
            "For payment related support, please include your registered mobile number, payment date, amount paid, and transaction reference ID.",
            "For refund requests, please also mention the reason for the request so our team can review it under the Refund & Cancellation Policy.",
          ],
        },
        {
          title: "Business Address",
          body: [
            "Smart Billing Lite Support Team, India.",
            "This website provides a digital software service and APK download for Android users.",
          ],
        },
      ]}
    />
  );
}
