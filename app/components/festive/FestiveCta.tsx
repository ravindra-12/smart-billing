"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send,  } from "lucide-react";
import Container from "@/app/components/ui/Container";
import TrackedLink from "./TrackedLink";
import { INTEREST_EVENT, WHATSAPP_URL, SUPPORT_EMAIL, btn, goldText, interests, nightBg, track, type Interest } from "./campaign";
import RazorpayPaymentButton from "./RazorpayPaymentButton";
import { Burst, Confetti, Diya, Lanterns, Rangoli, RangoliDiya, StringLights } from "./Decorations";
import { localeInfo, type FestiveLocale } from "./i18n/locales";
import type { FestiveDict } from "./i18n/en";

const ENQUIRY_URL = "https://api.smartbillinglite.com/api/enquiries";

const initialForm = { interest: "lite" as Interest, name: "", phone: "", email: "", message: "" };

const inputClass =
  "mt-1.5 w-full rounded-xl border border-festive-navy/15 bg-festive-bg px-4 py-3 text-base text-festive-navy outline-none transition-colors placeholder:text-festive-navy/40 focus:border-festive-blue focus:bg-white";
const labelClass = "block text-sm font-bold text-festive-navy";

export default function FestiveCta({ t, locale }: { t: FestiveDict["cta"]; locale: FestiveLocale }) {
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
    // The enquiry stays in English for the sales team, with the visitor's language so they can call back in it.
    const label = interests[form.interest];
    const language = localeInfo(locale).english;

    try {
      const response = await fetch(ENQUIRY_URL, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Festival offer: ${label} [${language}]`,
          description: `${form.message.trim() || `Interested in ${label}.`}

Preferred language: ${language}`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());

      track("lead_submitted", { interest: form.interest, language: locale });
      setForm({ ...initialForm, interest: form.interest });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="claim" className="relative isolate scroll-mt-24 overflow-clip pt-20 pb-16 text-white md:pt-28 md:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: nightBg }} />
      <StringLights className="absolute inset-x-0 top-10 -z-10 h-14 w-full sm:top-14 sm:h-20" />
      {/* Only in the wide page margin, so they never sit behind the heading or the form. */}
      <Lanterns className="absolute top-10 right-0 -z-10 hidden h-64 w-40 -scale-x-100 min-[1700px]:block" />
      <Lanterns className="absolute top-10 left-0 -z-10 hidden h-64 w-40 min-[1700px]:block" />
      <Burst className="absolute top-8 right-4 -z-10 size-16 sm:right-10 sm:size-24 lg:top-16 lg:right-auto lg:left-[47%]" />
      <Burst className="absolute bottom-24 left-[47%] -z-10 hidden size-14 lg:block" color="#ff7ac6" delay={1.4} />
      <RangoliDiya className="absolute -bottom-28 -left-28 size-96" rangoliClass="opacity-25" />
      <Rangoli className="absolute -top-32 -right-40 -z-10 hidden size-112 opacity-15 md:block" />
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-festive-gold">✦ {t.eyebrow} ✦</p>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-balance min-[400px]:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl">
            {t.title} <span className={goldText}>{t.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/75">{t.description}</p>
          <p className="mt-4 font-semibold text-festive-gold">{t.note}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={WHATSAPP_URL} event="offer_clicked" interest="lite" className={`${btn.base} ${btn.green}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.whatsapp}
              <ArrowUpRight size={18} />
            </TrackedLink>
            <RazorpayPaymentButton />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-6 text-sm text-white/70">
            <span>{t.help}</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex min-w-0 items-center gap-1.5 font-bold break-all text-white hover:text-festive-gold">
              <Mail size={15} />
              {SUPPORT_EMAIL}
            </a>
           
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-6 text-sm text-white/70">
            <span>{t.call}</span>
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

        <div
          id="claim-form"
          className="relative scroll-mt-24 rounded-4xl border-2 border-festive-gold/70 bg-white p-6 text-festive-navy shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6),0_0_0_6px_rgb(244_185_66/0.15)] md:p-8"
        >
          <Diya className="absolute -top-12 right-6 w-20" />
          <h3 className="text-2xl font-extrabold">{t.formTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-festive-navy/65">{t.formDescription}</p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label className={labelClass}>
              {t.interest}
              <select name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
                {(Object.keys(interests) as Interest[]).map((key) => (
                  <option key={key} value={key}>
                    {t.interests[key]}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              {t.name}
              <input
                ref={nameRef}
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className={inputClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t.phone}
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title={t.phoneTitle}
                  autoComplete="tel-national"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                {t.email}
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
              {t.message} <span className="font-medium text-festive-navy/50">{t.optional}</span>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                className={inputClass}
              />
            </label>

            <button type="submit" disabled={status === "sending"} className={`${btn.base} ${btn.blue} w-full disabled:opacity-60`}>
              {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
              {status === "sending" ? t.sending : t.submit}
            </button>

            <p aria-live="polite" className="text-sm font-semibold">
              {status === "sent" ? (
                <span className="relative flex items-center gap-2 text-festive-success">
                  <Confetti />
                  <CheckCircle2 size={17} />
                  {t.sent}
                </span>
              ) : status === "error" ? (
                <span className="text-red-600">
                  {t.error} {SUPPORT_EMAIL}.
                </span>
              ) : null}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
