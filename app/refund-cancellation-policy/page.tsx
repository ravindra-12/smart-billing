import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Smart Billing Lite",
  description: "Refund and cancellation policy for Smart Billing Lite subscriptions and digital services.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      description="This policy explains cancellations, refunds, failed payments, duplicate payments, and digital service access for Smart Billing Lite."
      sections={[
        {
          title: "Digital Service Policy",
          body: [
            "Smart Billing Lite is a digital software product delivered through an Android app/APK and related online services.",
            "Once a paid plan is activated, access to digital features may begin immediately.",
          ],
        },
        {
          title: "Free Trial",
          body: [
            "If a free trial is offered, users can evaluate the app during the trial period before choosing a paid plan.",
            "Trial availability, duration, and included features may vary as displayed in the app or on the website.",
          ],
        },
        {
          title: "Cancellation",
          body: [
            "You may request cancellation of future subscription renewal by contacting support@smartbillinglite.com with your registered mobile number and payment details.",
            "Cancellation stops future access or renewal as applicable. It does not automatically refund a payment already completed unless the refund conditions below are met.",
          ],
        },
        {
          title: "Refund Eligibility",
          body: [
            "Refunds may be considered for duplicate payments, payment success without plan activation, incorrect charge due to a technical issue, or other cases approved by Smart Billing Lite after review.",
            "Refund requests should be raised within 7 days from the payment date with transaction details.",
            "Refunds are generally not provided for completed billing periods where the paid digital service has been activated and used, except where required by law or approved after review.",
          ],
        },
        {
          title: "Failed or Pending Payments",
          body: [
            "If your payment is debited but the plan is not activated, please wait for payment gateway confirmation or contact support with your transaction reference.",
            "If the payment gateway marks the transaction as failed, any debit is usually reversed by the bank or payment provider according to their timelines.",
          ],
        },
        {
          title: "Refund Processing Time",
          body: [
            "Approved refunds will be initiated to the original payment method where possible.",
            "After approval, refunds may take 5 to 10 business days to reflect, depending on the bank, card issuer, UPI provider, or payment gateway.",
          ],
        },
        {
          title: "How to Request a Refund",
          body: [
            "Email support@smartbillinglite.com with your registered mobile number, payment date, paid amount, transaction ID, and reason for the refund request.",
            "Our team may ask for additional information to verify the payment and account before processing the request.",
          ],
        },
      ]}
    />
  );
}
