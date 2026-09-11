"use client";

import { CheckCircle2 } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { useStrapiSection } from "@/app/hooks/useStrapiSection";
import type { FeatureGroup, FeaturesListSectionData } from "./types";

const featureGroups: FeatureGroup[] = [
  {
    title: "Billing & Business Management",
    items: [
      ["Smart Calculator Billing", "Create fast bills using calculator-style billing."],
      ["Product & Service Billing", "Add items, services, quantity, price, and generate bills."],
      ["Customer Management", "Save customer name, mobile number, and billing history."],
      ["Transaction History", "Track daily, weekly, and monthly transactions easily."],
      ["Daily / Monthly Reports", "Understand income, sales, payments, and business growth."],
      ["Expenses Tracking", "Record investment, expenses, and calculate actual profit."],
    ].map(([title, description]) => ({ title, description })),
  },
  {
    title: "Payment & Collection",
    items: [
      ["QR Code Payments", "Collect payments quickly using QR code and UPI."],
      ["UPI ID Support", "Connect your business UPI ID for direct collections."],
      ["Cash Management", "Track cash transactions along with digital payments."],
      ["Payment Sound Box", "Support payment confirmation sound box for shops."],
      ["WhatsApp Bill Sharing", "Send bills and receipts instantly to customer WhatsApp."],
      ["Clean Payment Status", "Mark paid, pending, partial, or cleared transactions."],
    ].map(([title, description]) => ({ title, description })),
  },
  {
    title: "Udhaar / Credit Management",
    items: [
      ["Customer Udhaar Tracking", "Save pending amount with customer name and mobile number."],
      ["Pending Amount List", "View who has remaining payment and how much is due."],
      ["Payment Reminders", "Send WhatsApp reminders with amount and due date."],
      ["Partial Payment", "Collect partial amount and auto-update remaining balance."],
      ["Clear Settlement", "Show clean payment status when remaining amount is paid."],
      ["Credit History", "Track all past pending and cleared transactions."],
    ].map(([title, description]) => ({ title, description })),
  },
];

export default function FeaturesListSection() {
  const { data } = useStrapiSection<FeaturesListSectionData>(
    "/api/features-list-section?populate[groups][populate][items]=*"
  );

  const groups = data?.groups?.length ? data.groups : featureGroups;

  return (
    <>
      {groups.map((group) => (
        <section key={group.title} className="py-8">
          <Container>
            <div className="rounded-[2.5rem] border border-line bg-white p-6 md:p-10">
              <div className="inline-flex rounded-2xl bg-accent-soft px-5 py-2.5 text-sm font-black text-accent-dark">
                {group.title}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-paper-dim p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <h3 className="text-sm font-black text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-6 text-ink-soft">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
