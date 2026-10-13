"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MessageSquareText, Phone, ReceiptText, Send, Smartphone, User } from "lucide-react";
import Container from "@/app/components/ui/Container";
import type { AppDownloadBlock } from "./types";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  description: "",
};

export default function ApkDownloadSection({ appDownload }: { appDownload?: AppDownloadBlock }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("https://api.smartbillinglite.com/api/enquiries", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send enquiry");
      }

      setFormData(initialForm);
      setStatus({
        type: "success",
        message: "Your enquiry has been submitted successfully. Our team will contact you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting your enquiry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-6xl rounded-4xl border border-[#e7dccc] bg-[#f4f1ee] p-6 md:p-10 lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1a1a1a] text-white shadow-md">
              <ReceiptText className="h-9 w-9 text-[#f8f3ee]" />
            </div>

            <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-[#e0b79d] bg-[#f5e7df] px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-[#d66b45]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg border border-[#d66b45] bg-[#f9efe8]">
                <Smartphone className="h-3.5 w-3.5" />
              </span>
              Software
            </div>

            <h3 className="font-display mt-8 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#1b1a18] md:text-6xl">
              Retail billing software that makes quick billing easy
            </h3>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-[#4e4945] md:text-xl md:leading-8">
              Manage sales, invoices, payments, and daily reporting with a simple retail billing
              software built for fast checkout, smoother operations, and better customer service.
            </p>

            {/* <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {[
                "Version: v3.2.0",
                "Size: 18 MB",
                "Requires: Android 7.0+",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[#e0d9cf] bg-[#f0ece6] px-5 py-3 text-lg font-semibold text-[#2f2c29]"
                >
                  {item}
                </div>
              ))}
            </div> */}

            <form onSubmit={(event) => void handleSubmit(event)} className="mx-auto mt-10 max-w-3xl">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-left text-sm font-semibold text-[#2d2a28] md:col-span-1">
                  <span className="mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#d66b45]" />
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-2xl border border-[#e7dfd5] bg-white px-4 py-3.5 text-base text-[#1f1e1d] outline-none transition focus:border-[#d66b45] focus:ring-2 focus:ring-[#f2c7b0]"
                  />
                </label>

                <label className="block text-left text-sm font-semibold text-[#2d2a28] md:col-span-1">
                  <span className="mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#d66b45]" />
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full rounded-2xl border border-[#e7dfd5] bg-white px-4 py-3.5 text-base text-[#1f1e1d] outline-none transition focus:border-[#d66b45] focus:ring-2 focus:ring-[#f2c7b0]"
                  />
                </label>

                <label className="block text-left text-sm font-semibold text-[#2d2a28] md:col-span-1">
                  <span className="mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#d66b45]" />
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    className="w-full rounded-2xl border border-[#e7dfd5] bg-white px-4 py-3.5 text-base text-[#1f1e1d] outline-none transition focus:border-[#d66b45] focus:ring-2 focus:ring-[#f2c7b0]"
                  />
                </label>

                <label className="block text-left text-sm font-semibold text-[#2d2a28] md:col-span-1">
                  <span className="mb-2 flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-[#d66b45]" />
                    Subject
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Product inquiry"
                    required
                    className="w-full rounded-2xl border border-[#e7dfd5] bg-white px-4 py-3.5 text-base text-[#1f1e1d] outline-none transition focus:border-[#d66b45] focus:ring-2 focus:ring-[#f2c7b0]"
                  />
                </label>

                <label className="block text-left text-sm font-semibold text-[#2d2a28] md:col-span-2">
                  <span className="mb-2 flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-[#d66b45]" />
                    Description
                  </span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="I would like to know more about your offers."
                    rows={4}
                    required
                    className="w-full rounded-2xl border border-[#e7dfd5] bg-white px-4 py-3.5 text-base text-[#1f1e1d] outline-none transition focus:border-[#d66b45] focus:ring-2 focus:ring-[#f2c7b0]"
                  />
                </label>
              </div>

              {status.message ? (
                <div
                  className={`mt-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${
                    status.type === "success"
                      ? "border border-[#bfe7c6] bg-[#edf9f0] text-[#1d6b3d]"
                      : "border border-[#f6d0ca] bg-[#fff1ef] text-[#a23a2e]"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <MessageSquareText className="h-4 w-4" />
                  )}
                  <span>{status.message}</span>
                </div>
              ) : null}

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1b1a] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#2a2624] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
