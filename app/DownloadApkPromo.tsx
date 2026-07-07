"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function DownloadApkPromo() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="download-apk"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "40px 20px 60px",
        scrollMarginTop: 96,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 50%, #0f172a 100%)",
          borderRadius: 32,
          padding: "40px",
          color: "#fff",
          boxShadow: "0 25px 60px rgba(37,99,235,0.2)",
          overflow: "hidden",
        }}
        className="rp-hero-card"
      >
        <div className="rg-hero" style={{ gap: 32 }}>
          {/* Left column */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 800,
                border: "1px solid rgba(255,255,255,0.2)",
                marginBottom: 16,
              }}
            >
              ✨ Early Access
            </div>
            <h2
              style={{
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#fff",
                margin: "0 0 16px",
              }}
              className="rt-cta"
            >
              Get early access to Smart Billing Lite.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#bfdbfe",
                lineHeight: 1.7,
                maxWidth: 480,
                margin: 0,
              }}
            >
              Be among the first to try Smart Billing Lite. Sign up now and
              we&apos;ll notify you as soon as the app is ready for download.
            </p>

            {/* Benefits checklist */}
            <div
              className="rg-features-2"
              style={{ marginTop: 24, gap: 10 }}
            >
              {["30-day free trial", "No credit card needed", "Cancel anytime", "Priority support"].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#bfdbfe",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: "#93c5fd",
                        fontWeight: 900,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right column — form card */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: 12,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 24,
                  color: "#0f172a",
                }}
              >
                {submitted ? (
                  <div style={{ padding: "32px 0", textAlign: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "#dcfce7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#15803d",
                        margin: "0 auto 16px",
                      }}
                    >
                      ✓
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>
                      You&apos;re on the list!
                    </p>
                    <p style={{ fontSize: 14, color: "#64748b", fontWeight: 600, margin: 0 }}>
                      We&apos;ll reach out as soon as early access is available.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>
                      Reserve your spot
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 600, margin: "0 0 20px" }}>
                      Join the waitlist for early access.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="ea-name"
                          style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#334155", marginBottom: 6 }}
                        >
                          Full name
                        </label>
                        <input
                          id="ea-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Rajesh Kumar"
                          style={{
                            width: "100%",
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            background: "#f8fafc",
                            padding: "12px 16px",
                            fontSize: 14,
                            outline: "none",
                            color: "#0f172a",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="ea-email"
                          style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#334155", marginBottom: 6 }}
                        >
                          Email ID
                        </label>
                        <input
                          id="ea-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          style={{
                            width: "100%",
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            background: "#f8fafc",
                            padding: "12px 16px",
                            fontSize: 14,
                            outline: "none",
                            color: "#0f172a",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      {/* Mobile */}
                      <div>
                        <label
                          htmlFor="ea-mobile"
                          style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#334155", marginBottom: 6 }}
                        >
                          Mobile number
                        </label>
                        <div
                          style={{
                            display: "flex",
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            background: "#f8fafc",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0 14px",
                              borderRight: "1px solid #e2e8f0",
                              fontSize: 14,
                              fontWeight: 800,
                              color: "#94a3b8",
                              background: "#f1f5f9",
                            }}
                          >
                            +91
                          </span>
                          <input
                            id="ea-mobile"
                            name="mobile"
                            type="tel"
                            inputMode="numeric"
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                            placeholder="10 digit number"
                            style={{
                              flex: 1,
                              minWidth: 0,
                              border: "none",
                              background: "transparent",
                              padding: "12px 16px",
                              fontSize: 14,
                              outline: "none",
                              color: "#0f172a",
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          background: "linear-gradient(to right, #2563eb, #1d4ed8)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 14,
                          padding: "14px 20px",
                          fontWeight: 900,
                          fontSize: 15,
                          cursor: "pointer",
                          boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
                          marginTop: 4,
                        }}
                      >
                        Request Early Access →
                      </button>
                    </form>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        color: "#94a3b8",
                        fontWeight: 600,
                        marginTop: 14,
                        marginBottom: 0,
                      }}
                    >
                      No spam. We&apos;ll only contact you about Smart Billing Lite.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
