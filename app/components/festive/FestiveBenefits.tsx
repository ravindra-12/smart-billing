import { NotebookPen, QrCode, Sparkles, TicketPercent, Users, Zap } from "lucide-react";
import Container from "@/app/components/ui/Container";

const benefits = [
  { icon: Zap, title: "Quick Billing", text: "Create bills in seconds." },
  { icon: QrCode, title: "UPI Payments", text: "Accept UPI, QR, cash and card." },
  { icon: NotebookPen, title: "Udhaar Tracking", text: "Track pending and cleared dues." },
  { icon: Users, title: "Customer CRM", text: "Save customers for repeat business." },
  { icon: TicketPercent, title: "Offers & Memberships", text: "Run coupons and loyalty plans." },
  { icon: Sparkles, title: "AI Insights", text: "Smart tips and business reports." },
];

export default function FestiveBenefits() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-blue">Why Smart Billing Lite</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-festive-navy md:text-4xl">
            Everything Your Business Needs. One Simple App.
          </h2>
          <p className="mt-4 text-base leading-7 text-festive-navy/70">
            Faster billing, easy payments, customer tracking, offers, and smart business growth.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-3xl border border-festive-navy/10 bg-festive-bg p-5 transition-colors duration-200 hover:border-festive-blue/40 md:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-festive-blue/10 text-festive-blue">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 text-base font-bold text-festive-navy md:text-lg">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-festive-navy/65">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
