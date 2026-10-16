"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send,  } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { INTEREST_EVENT, PLAY_STORE_URL, SUPPORT_EMAIL, btn, interests, track, type Interest } from "./campaign";

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
          subject: `Dussehra offer: ${label}`,
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold">Dussehra Festival Offer</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Your Business Deserves Smarter Billing.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/75">
            Move from manual billing to faster billing, easier payments, better customer management, and smarter
            business growth.
          </p>
          <p className="mt-4 font-semibold text-festive-gold">
            Start with a 5-day free trial or secure the festive yearly offer today.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={PLAY_STORE_URL} event="trial_started" className={`${btn.base} ${btn.white}`}>
              Start 5-Day Free Trial
              <ArrowUpRight size={18} />
            </TrackedLink>
            <TrackedLink href="#claim-form" event="offer_clicked" interest="lite" className={`${btn.base} ${btn.gold}`}>
              Get Festival Offer
            </TrackedLink>
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
          <h3 className="text-2xl font-extrabold">Claim your festive offer</h3>
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
