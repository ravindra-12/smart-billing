import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Billing Lite",
  description: "Privacy policy for Smart Billing Lite users.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This Privacy Policy explains what information Smart Billing Lite may collect, how it is used, and how users can contact us about privacy questions."
      sections={[
        {
          title: "Information We Collect",
          body: [
            "We may collect account information such as name, mobile number, shop name, business type, and login verification details.",
            "We may collect business data entered by you, such as bills, products or services, customer details, transaction records, payment status, udhaar records, reports, and app settings.",
            "We may collect technical information such as device type, app version, crash logs, and basic usage data to improve app performance and support.",
          ],
        },
        {
          title: "How We Use Information",
          body: [
            "We use information to provide billing, customer management, payment tracking, receipt printing, reports, and support services.",
            "We may use contact details to send OTPs, service messages, payment confirmations, support responses, and important account updates.",
            "We may use aggregated or non-personal data to improve app features, security, reliability, and business insights.",
          ],
        },
        {
          title: "Payments",
          body: [
            "Payments may be processed by third-party payment providers such as Razorpay.",
            "We do not store your full card details, UPI PIN, net banking password, or other sensitive payment authentication credentials.",
          ],
        },
        {
          title: "Data Sharing",
          body: [
            "We do not sell your personal information.",
            "We may share limited information with service providers only when needed for app hosting, OTP delivery, payment processing, analytics, support, legal compliance, fraud prevention, or security.",
          ],
        },
        {
          title: "Data Security",
          body: [
            "We use reasonable technical and organizational measures to protect user data.",
            "No digital service can guarantee absolute security, so users should keep their device, login credentials, and OTPs secure.",
          ],
        },
        {
          title: "User Choices",
          body: [
            "You may contact us to request support with account access, correction of account information, or deletion requests where applicable.",
            "Some business records may need to be retained for legal, accounting, security, dispute resolution, or payment compliance reasons.",
          ],
        },
        {
          title: "Children's Privacy",
          body: [
            "Smart Billing Lite is intended for business users and is not directed to children.",
            "Users should be legally capable of operating a business account or should use the app under appropriate supervision.",
          ],
        },
        {
          title: "Contact",
          body: [
            "For privacy questions or requests, contact support@smartbillinglite.com.",
          ],
        },
      ]}
    />
  );
}
