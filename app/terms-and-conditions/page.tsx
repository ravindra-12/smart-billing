import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Smart Billing Lite",
  description: "Terms and conditions for using Smart Billing Lite.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms explain how you may access and use Smart Billing Lite, including the APK download, free trial, paid plans, and support services."
      sections={[
        {
          title: "Acceptance of Terms",
          body: [
            "By downloading, installing, registering for, or using Smart Billing Lite, you agree to these Terms & Conditions.",
            "If you do not agree with these terms, please do not use the app or purchase any paid plan.",
          ],
        },
        {
          title: "Services Provided",
          body: [
            "Smart Billing Lite provides digital tools for billing, transaction records, customer management, QR and UPI payment support, receipt printing, udhaar tracking, reports, and related business features.",
            "The service is intended for lawful business use by small businesses and vendors.",
          ],
        },
        {
          title: "Account Registration",
          body: [
            "You may be required to register using a mobile number and OTP verification to use app features.",
            "You are responsible for keeping your account information accurate and for all activity under your account.",
          ],
        },
        {
          title: "Pricing and Payments",
          body: [
            "Smart Billing Lite may offer a free trial and paid subscription plans such as monthly or yearly plans. Pricing shown on the website or app is inclusive or exclusive of applicable taxes as displayed at checkout.",
            "Payments may be processed through third-party payment providers such as Razorpay. We do not store your full card, UPI, or net banking credentials on our servers.",
          ],
        },
        {
          title: "User Responsibilities",
          body: [
            "You agree to use the app only for lawful billing and business management purposes.",
            "You are responsible for the accuracy of bills, customer details, product prices, tax values, payment records, and business data entered by you.",
            "You must not misuse the app for fraud, illegal transactions, unauthorized access, or activities prohibited by applicable law or payment gateway policies.",
          ],
        },
        {
          title: "APK Download and Installation",
          body: [
            "The APK available on this website is provided for Android users who choose to install Smart Billing Lite manually.",
            "You should download the APK only from this website or official sources shared by Smart Billing Lite.",
          ],
        },
        {
          title: "Limitation of Liability",
          body: [
            "Smart Billing Lite is provided as a digital software service. While we aim to keep the app reliable, we do not guarantee uninterrupted or error-free operation at all times.",
            "To the maximum extent permitted by law, Smart Billing Lite is not liable for indirect losses, business losses, data entry mistakes, or losses caused by third-party payment, device, printer, internet, or UPI service issues.",
          ],
        },
        {
          title: "Changes to Terms",
          body: [
            "We may update these terms from time to time. Updated terms will be posted on this page with the latest update date.",
            "Continued use of the app after changes means you accept the updated terms.",
          ],
        },
        {
          title: "Contact",
          body: [
            "For questions about these terms, contact us at support@smartbillinglite.com.",
          ],
        },
      ]}
    />
  );
}
