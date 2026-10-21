"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send,  } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { INTEREST_EVENT, WHATSAPP_URL, BOOK_NOW_NUMBER, SUPPORT_EMAIL, btn, interests, track, type Interest } from "./campaign";

const ENQUIRY_URL = "https://api.smartbillinglite.com/api/enquiries";

const initialForm = { interest: "lite" as Interest, name: "", phone: "", email: "", message: "" };

const inputClass =
  "mt-1.5 w-full rounded-xl border border-festive-navy/15 bg-festive-bg px-4 py-3 text-base text-festive-navy outline-none transition-colors placeholder:text-festive-navy/40 focus:border-festive-blue focus:bg-white";
const labelClass = "block text-sm font-bold text-festive-navy";

export default function FestiveCta() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onInterest = (event: Event) => {
      const interest = (event as CustomEvent<Interest>).detail;
      setForm((prev) => ({ ...prev, interest }));
      setStatus((prev) => (prev === "sent" ? "idle" : prev));
      nameRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const label = interests[form.interest];

    try {
      const response = await fetch(ENQUIRY_URL, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Festival offer: ${label}`,
          description: form.message.trim() || `Interested in ${label}.`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());

      track("lead_submitted", { interest: form.interest });
      setForm({ ...initialForm, interest: form.interest });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="claim"
      className="scroll-mt-24 bg-linear-to-br from-festive-navy via-festive-navy to-festive-blue py-16 text-white md:py-24"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold">Festival Bumper Offer</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Your Business Deserves Smarter Billing.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/75">
            Move from manual billing to faster billing, easier payments, better customer management, and smarter
            business growth.
          </p>
          <p className="mt-4 font-semibold text-festive-gold">
            Start with a 5-day free trial or secure the festival yearly offer today.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={WHATSAPP_URL} event="offer_clicked" interest="lite" className={`${btn.base} ${btn.green}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
              <ArrowUpRight size={18} />
            </TrackedLink>
            <a href={`tel:${BOOK_NOW_NUMBER.replace(/[\s-]/g, "")}`} className={`${btn.base} ${btn.gold}`}>
              <Phone size={18} />
              Book Now
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-6 text-sm text-white/70">
            <span>Need help? Our team will help you get started quickly.</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1.5 font-bold text-white hover:text-festive-gold">
              <Mail size={15} />
              {SUPPORT_EMAIL}
            </a>
           
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-6 text-sm text-white/70">
            <span>Call:</span>
             {[
  "+91-9110176498",
  "+91-8709183148",
  "+91-8235264677",
].map((phone) => (
  <a
    key={phone}
    href={`tel:${phone.replace(/[\s-]/g, "")}`}
    className="inline-flex items-center gap-1.5 font-bold text-white hover:text-festive-gold"
  >
    <Phone size={15} />
    {phone}
  </a>
))}
           
          </div>
          
        </div>

        <div id="claim-form" className="scroll-mt-24 rounded-4xl bg-white p-6 text-festive-navy shadow-2xl md:p-8">
          <h3 className="text-2xl font-extrabold">Claim your festival offer</h3>
          <p className="mt-2 text-sm leading-6 text-festive-navy/65">
            Leave your details and our team will call you to confirm pricing, printer delivery and setup.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label className={labelClass}>
              I&apos;m interested in
              <select name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
                {(Object.keys(interests) as Interest[]).map((key) => (
                  <option key={key} value={key}>
                    {interests[key]}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Name
              <input
                ref={nameRef}
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Mobile number
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit mobile number"
                  autoComplete="tel-national"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>
            </div>
            <label className={labelClass}>
              Message <span className="font-medium text-festive-navy/50">(optional)</span>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Business type, city, or any questions"
                className={inputClass}
              />
            </label>

            <button type="submit" disabled={status === "sending"} className={`${btn.base} ${btn.blue} w-full disabled:opacity-60`}>
              {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
              {status === "sending" ? "Sending..." : "Request a Call Back"}
            </button>

            <p aria-live="polite" className="text-sm font-semibold">
              {status === "sent" ? (
                <span className="flex items-center gap-2 text-festive-success">
                  <CheckCircle2 size={17} />
                  Thank you! Our team will contact you soon.
                </span>
              ) : status === "error" ? (
                <span className="text-red-600">
                  Something went wrong. Please try again or email {SUPPORT_EMAIL}.
                </span>
              ) : null}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
