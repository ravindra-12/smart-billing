"use client";
import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import DownloadApkPromo from "./DownloadApkPromo";
import Link from "next/link";

// Smooth-scroll helper for hash links (works in SPA)
const scrollToDownload = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    const el = document.getElementById("download-apk");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // update URL hash without reloading
      history.replaceState(null, "", "#download-apk");
    }
  } catch {
    // no-op
  }
};
// ─── Types ────────────────────────────────────────────────────────────────────

interface StrapiImage {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
  };
}

interface WhyChooseFeature {
  id: number;
  title: string;
  description: string;
  icon?: StrapiImage;
}

interface WhyChooseData {
  heading: string;
  subheading: string;
  features: WhyChooseFeature[];
}

interface BusinessTypeFeature {
  id: number;
  title: string;
  icon?: StrapiImage;
}

interface BusinessTypeData {
  heading: string;
  subheading: string;
  features: BusinessTypeFeature[];
}

interface HeroFeature {
  id: number;
  text: string;
}

interface HeroSectionData {
  badgeText?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: { children?: { text?: string }[] }[];
  features?: HeroFeature[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  heroImage?: StrapiImage;
}

interface StatsItem {
  id: number;
  value: string;
  label: string;
}

interface StatsSectionData {
  stats: StatsItem[];
}

interface FeatureHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

interface TextCard {
  id?: number;
  icon?: string;
  title: string;
  description?: string;
}

interface FeatureGroup {
  id?: number;
  title: string;
  tone?: "green" | "blue" | "purple";
  items: TextCard[];
}

interface FeaturesListSectionData {
  groups: FeatureGroup[];
}

interface HardwareSectionData {
  heading?: string;
  subheading?: string;
  items: TextCard[];
}

interface FeatureHighlightsSectionData {
  aiHeading?: string;
  aiItems: TextCard[];
  businessHeading?: string;
  businessItems: { id?: number; text: string }[];
  buttonText?: string;
}

interface PricingHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
}

interface PricingPlan {
  id?: number;
  name: string;
  price: string;
  duration?: string;
  tag?: string;
  color?: "green" | "blue" | "orange";
  icon?: string;
  button?: string;
  features: { id?: number; text: string }[];
}

interface PricingPlansSectionData {
  plans: PricingPlan[];
  trustItems: { id?: number; text: string }[];
}

interface PricingStepsSectionData {
  heading?: string;
  subheading?: string;
  steps: TextCard[];
}

interface PricingBottomSectionData {
  loginHeading?: string;
  loginDescription?: string;
  phoneLabel?: string;
  countryCode?: string;
  phonePlaceholder?: string;
  otpButtonText?: string;
  registerPrompt?: string;
  registerText?: string;
  testimonialHeading?: string;
  testimonialQuote?: string;
  testimonialInitial?: string;
  testimonialName?: string;
  testimonialMeta?: string;
  testimonialBenefits: { id?: number; text: string }[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimaryButtonText?: string;
  ctaSecondaryButtonText?: string;
}

// ─── Fallback emoji map (used when icon image not available) ──────────────────

const BUSINESS_EMOJI_MAP: Record<string, string> = {
  "Kirana Store": "🛒",
  "Grocery Store": "🥦",
  "Pharmacy": "💊",
  "Salon & Spa": "✂️",
  "Food Stall": "🍱",
  "Repair Shop": "🔧",
  "Small Vendors": "🏪",
};

const BENEFIT_EMOJI_MAP: Record<string, string> = {
  "Super Fast Billing": "⚡",
  "QR & UPI Payments": "📲",
  "Thermal Receipt Printing": "🖨️",
  "Udhaar Management": "📒",
  "Daily Income Tracking": "📊",
  "AI Business Insights": "🤖",
};

// ─── Static data (unchanged) ──────────────────────────────────────────────────

const plans = [
  {
    name: "30-Day Free Trial",
    price: "₹0",
    duration: "/ 30 Days",
    tag: "Start Free",
    color: "green",
    button: "Start Free Trial",
    features: ["All features access", "Unlimited bills", "Thermal print", "QR payments", "Udhaar management", "AI insights"],
  },
  {
    name: "Monthly Plan",
    price: "₹50",
    duration: "/ Month",
    tag: "Most Popular",
    color: "blue",
    button: "Choose Monthly",
    features: ["All trial features", "Daily reports", "WhatsApp reminders", "Data backup", "Regular updates", "Priority support"],
  },
  {
    name: "Yearly Plan",
    price: "₹500",
    duration: "/ Year",
    tag: "Best Value",
    color: "orange",
    button: "Choose Yearly",
    features: ["All monthly features", "Save ₹100 yearly", "Yearly priority support", "Additional features access", "Early access to updates", "Business growth reports"],
  },
];

const steps = [
  { title: "Register", text: "Enter your mobile number and verify with OTP.", icon: "📱" },
  { title: "Setup Shop", text: "Add shop name, business type, QR/UPI details.", icon: "🏪" },
  { title: "Start Billing", text: "Create bills, collect payments, print receipts.", icon: "🧾" },
  { title: "Track & Grow", text: "Track income, udhaar, profit, and business growth.", icon: "📈" },
];

const featureGroups = [
  {
    title: "Billing & Business Management",
    tone: "green",
    items: [
      ["Smart Calculator Billing", "Create fast bills using calculator-style billing."],
      ["Product & Service Billing", "Add items, services, quantity, price, and generate bills."],
      ["Customer Management", "Save customer name, mobile number, and billing history."],
      ["Transaction History", "Track daily, weekly, and monthly transactions easily."],
      ["Daily / Monthly Reports", "Understand income, sales, payments, and business growth."],
      ["Expenses Tracking", "Record investment, expenses, and calculate actual profit."],
    ],
  },
  {
    title: "Payment & Collection",
    tone: "blue",
    items: [
      ["QR Code Payments", "Collect payments quickly using QR code and UPI."],
      ["UPI ID Support", "Connect your business UPI ID for direct collections."],
      ["Cash Management", "Track cash transactions along with digital payments."],
      ["Payment Sound Box", "Support payment confirmation sound box for shops."],
      ["WhatsApp Bill Sharing", "Send bills and receipts instantly to customer WhatsApp."],
      ["Clean Payment Status", "Mark paid, pending, partial, or cleared transactions."],
    ],
  },
  {
    title: "Udhaar / Credit Management",
    tone: "purple",
    items: [
      ["Customer Udhaar Tracking", "Save pending amount with customer name and mobile number."],
      ["Pending Amount List", "View who has remaining payment and how much is due."],
      ["Payment Reminders", "Send WhatsApp reminders with amount and due date."],
      ["Partial Payment", "Collect partial amount and auto-update remaining balance."],
      ["Clear Settlement", "Show clean payment status when remaining amount is paid."],
      ["Credit History", "Track all past pending and cleared transactions."],
    ],
  },
];

const hardware = [
  { name: "Bluetooth Thermal Printer", text: "Print receipts wirelessly from your mobile device.", icon: "🖨️" },
  { name: "USB Thermal Printer", text: "Connect compatible USB printers for fast counter billing.", icon: "🧾" },
  { name: "58mm / 80mm Printer", text: "Supports common portable receipt printer sizes.", icon: "📄" },
  { name: "Pine Labs POS Device", text: "Useful for card payment and professional billing counters.", icon: "💳" },
  { name: "Payment QR Sound Box", text: "Hear payment confirmation instantly after QR payment.", icon: "🔊" },
];

const aiItems = [
  "Daily sales insights",
  "Best-selling products",
  "Top customer analysis",
  "Income growth tracking",
  "Smart business suggestions",
];

const fallbackStats = [
  { value: "10,000+", label: "Happy Users" },
  { value: "1L+", label: "Bills Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "24x7", label: "Support" },
];

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonCard({ width = "100%", height = 120 }: { width?: string; height?: number }) {
  return (
    <div style={{
      width, height, borderRadius: 20,
      background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
    }} />
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Features", key: "features" },
    { label: "Pricing", key: "pricing" },
  ];

  return (
     <header style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: "1px solid #e2e8f0",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
      }}>
        <button onClick={() => setPage("home")} style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: "#2563eb", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20, color: "#fff",
          }}>🧾</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, color: "#0f172a" }}>
              Smart Billing <span style={{ color: "#2563eb" }}>Lite</span>
            </div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>AI Powered Billing App</div>
          </div>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map(link => (
            <button key={link.key} onClick={() => setPage(link.key)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600,
              color: page === link.key ? "#2563eb" : "#334155",
              padding: "4px 0",
              borderBottom: page === link.key ? "2px solid #2563eb" : "2px solid transparent",
            }}>{link.label}</button>
          ))}
          <a href="#download-apk" onClick={scrollToDownload} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#334155",
            textDecoration: "none",
          }}>Login</a>
        </nav>

        <a href="#download-apk" onClick={scrollToDownload} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 12, padding: "10px 20px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          textDecoration: "none",
        }}>Start Free Trial</a>
      </div>
    </header>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage() {
  const [herosectionData, setHeroSectionData] = useState<HeroSectionData | null>(null);

  // ── Dynamic state for two new sections ──
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseData | null>(null);
  const [whyChooseLoading, setWhyChooseLoading] = useState(true);

  const [businessTypeData, setBusinessTypeData] = useState<BusinessTypeData | null>(null);
  const [businessTypeLoading, setBusinessTypeLoading] = useState(true);

  const [statsSectionData, setStatsSectionData] = useState<StatsSectionData | null>(null);

  // ── API calls ──
  const getHeroSectionData = async () => {
    try {
      const response = await api.get("/api/hero-section?populate=*");
      setHeroSectionData(response.data.data);
    } catch (err) {
      console.error("Hero section error:", err);
    }
  };

  const getWhyChooseData = async () => {
    try {
      setWhyChooseLoading(true);
      const response = await api.get("/api/why-choose-section?populate[features][populate]=*");
      setWhyChooseData(response.data.data);
    } catch (err) {
      console.error("Why choose section error:", err);
    } finally {
      setWhyChooseLoading(false);
    }
  };

  const getBusinessTypeData = async () => {
    try {
      setBusinessTypeLoading(true);
      const response = await api.get("/api/business-type?populate[features][populate]=*");
      setBusinessTypeData(response.data.data);
    } catch (err) {
      console.error("Business type section error:", err);
    } finally {
      setBusinessTypeLoading(false);
    }
  };

  const getStatsSectionData = async () => {
    try {
      const response = await api.get("/api/stats-section?populate=*");
      setStatsSectionData(response.data.data);
    } catch (err) {
      console.error("Stats section error:", err);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void getHeroSectionData();
      void getWhyChooseData();
      void getBusinessTypeData();
      void getStatsSectionData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const statsItems = statsSectionData?.stats?.length ? statsSectionData.stats : fallbackStats;

  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>

      {/* ── shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 20px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
          background: "linear-gradient(to right, #ffffff 0%, #eff6ff 100%)",
          borderRadius: 40, padding: "60px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          overflow: "hidden", border: "1px solid #e2e8f0",
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#dbeafe", color: "#1d4ed8",
              borderRadius: 999, padding: "10px 18px",
              fontSize: 13, fontWeight: 800, marginBottom: 22,
            }}>
              ✨ {herosectionData?.badgeText}
            </div>

            <h1 style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.1, color: "#0f172a", marginBottom: 22 }}>
              {herosectionData?.titleLine1}
              <br />
              <span style={{ color: "#2563eb" }}>{herosectionData?.titleLine2}</span>
            </h1>

            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.8, marginBottom: 30, maxWidth: 540 }}>
              {herosectionData?.description?.[0]?.children?.[0]?.text}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14, marginBottom: 35 }}>
              {herosectionData?.features?.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 700, color: "#334155" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a", fontWeight: 900, flexShrink: 0 }}>✓</div>
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="#download-apk" onClick={scrollToDownload} style={{
                background: "linear-gradient(to right, #2563eb, #1d4ed8)", color: "#fff",
                border: "none", borderRadius: 16, padding: "16px 30px",
                fontWeight: 800, fontSize: 15, cursor: "pointer",
                boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
              }}>
                {herosectionData?.primaryButtonText} →
              </Link>
              <Link href="#download-apk" onClick={scrollToDownload} style={{
                background: "#fff", border: "1px solid #cbd5e1", borderRadius: 16,
                padding: "16px 30px", fontWeight: 800, fontSize: 15,
                cursor: "pointer", color: "#1e293b", textDecoration: "none", textAlign: "center"
              }}>
                ▶ {herosectionData?.secondaryButtonText}
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute", width: 420, height: 420, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))",
              filter: "blur(50px)",
            }} />
            <div style={{
              position: "relative", zIndex: 2, background: "#fff",
              borderRadius: 32, padding: 18,
              boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
              border: "1px solid #e2e8f0",
            }}>
              {herosectionData?.heroImage?.url && (
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${herosectionData.heroImage.url}`}
                  alt="Hero Image"
                  width={520} height={520} priority
                  style={{ width: "100%", height: "auto", borderRadius: 24, objectFit: "contain" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Business Types Section (Dynamic) ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {businessTypeLoading ? (
            <>
              <div style={{ height: 40, width: 400, borderRadius: 12, background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", margin: "0 auto 12px" }} />
              <div style={{ height: 20, width: 560, borderRadius: 8, background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", margin: "0 auto" }} />
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>
                {businessTypeData?.heading ?? "Perfect For Every Small Business"}
              </h2>
              <p style={{ color: "#64748b", fontSize: 15 }}>
                {businessTypeData?.subheading ?? "Built for daily billing, payment collection, receipt printing, and business tracking."}
              </p>
            </>
          )}
        </div>

        {/* Business Type Cards */}
        {businessTypeLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonCard key={i} height={100} />
            ))}
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(businessTypeData?.features?.length ?? 7, 7)}, 1fr)`,
            gap: 12,
          }}>
            {(businessTypeData?.features ?? []).map((item) => {
              const iconUrl = item.icon?.url
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.icon.url}`
                : null;
              const emoji = BUSINESS_EMOJI_MAP[item.title] ?? "🏬";

              return (
                <div key={item.id} style={{
                  background: "#fff", borderRadius: 24, padding: "20px 10px",
                  textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  border: "1px solid #f1f5f9",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                  }}
                >
                  {/* Icon: use Strapi image if available, else emoji */}
                  {iconUrl ? (
                    <div style={{ width: 40, height: 40, margin: "0 auto 8px" }}>
                      <Image
                        unoptimized
                        src={iconUrl}
                        alt={item.title}
                        width={40} height={40}
                        style={{ width: 40, height: 40, objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>{item.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Why Choose Section (Dynamic) ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{
          background: "#fff", borderRadius: 32, padding: 40,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9",
        }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            {whyChooseLoading ? (
              <>
                <div style={{ height: 40, width: 440, borderRadius: 12, background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", margin: "0 auto 12px" }} />
                <div style={{ height: 20, width: 520, borderRadius: 8, background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", margin: "0 auto" }} />
              </>
            ) : (
              <>
                <h2 style={{ fontSize: 34, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>
                  {whyChooseData?.heading ?? "Why Choose Smart Billing Lite?"}
                </h2>
                <p style={{ color: "#64748b" }}>
                  {whyChooseData?.subheading ?? "Everything a small business needs to bill faster, collect better, and grow smarter."}
                </p>
              </>
            )}
          </div>

          {/* Feature Cards */}
          {whyChooseLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} height={160} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {(whyChooseData?.features ?? []).map((item) => {
                const iconUrl = item.icon?.url
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.icon.url}`
                  : null;
                const emoji = BENEFIT_EMOJI_MAP[item.title] ?? "✨";

                return (
                  <div key={item.id} style={{
                    background: "#f8fafc", borderRadius: 24, padding: 24,
                    border: "1px solid #f1f5f9",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(37,99,235,0.10)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 52, height: 52, borderRadius: 16, background: "#dbeafe",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, marginBottom: 14, overflow: "hidden",
                    }}>
                      {iconUrl ? (
                        <Image
                          unoptimized
                          src={iconUrl}
                          alt={item.title}
                          width={32} height={32}
                          style={{ width: 32, height: 32, objectFit: "contain" }}
                        />
                      ) : (
                        <span>{emoji}</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
          borderRadius: 32, padding: "40px 40px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
        }}>
          {statsItems.map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>{item.value}</div>
              <div style={{ fontSize: 13, color: "#bfdbfe", fontWeight: 600, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─── Pricing Page (unchanged) ─────────────────────────────────────────────────

function PricingPage() {
  const [pricingHeroData, setPricingHeroData] = useState<PricingHeroData | null>(null);
  const [pricingPlansData, setPricingPlansData] = useState<PricingPlansSectionData | null>(null);
  const [pricingStepsData, setPricingStepsData] = useState<PricingStepsSectionData | null>(null);
  const [pricingBottomData, setPricingBottomData] = useState<PricingBottomSectionData | null>(null);

  const fallbackPricingPlans: PricingPlan[] = plans.map((plan) => ({
    ...plan,
    color: plan.color as PricingPlan["color"],
    icon: plan.color === "green" ? "🎁" : plan.color === "blue" ? "📈" : "🏆",
    features: plan.features.map((text) => ({ text })),
  }));
  const fallbackTrustItems = ["No hidden charges", "Secure payment", "Cancel anytime", "100% safe records"].map((text) => ({ text }));
  const fallbackPricingSteps: TextCard[] = steps.map((step) => ({
    icon: step.icon,
    title: step.title,
    description: step.text,
  }));
  const fallbackTestimonialBenefits = ["Fast & secure login", "Instant trial activation", "Works on all devices", "Lightning fast support"].map((text) => ({ text }));

  const getPricingHeroData = async () => {
    try {
      const response = await api.get("/api/pricing-hero");
      setPricingHeroData(response.data.data);
    } catch (err) {
      console.error("Pricing hero error:", err);
    }
  };

  const getPricingPlansData = async () => {
    try {
      const response = await api.get("/api/pricing-plans-section?populate[plans][populate][features]=*&populate[trustItems]=*");
      setPricingPlansData(response.data.data);
    } catch (err) {
      console.error("Pricing plans section error:", err);
    }
  };

  const getPricingStepsData = async () => {
    try {
      const response = await api.get("/api/pricing-steps-section?populate[steps]=*");
      setPricingStepsData(response.data.data);
    } catch (err) {
      console.error("Pricing steps section error:", err);
    }
  };

  const getPricingBottomData = async () => {
    try {
      const response = await api.get("/api/pricing-bottom-section?populate=*");
      setPricingBottomData(response.data.data);
    } catch (err) {
      console.error("Pricing bottom section error:", err);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void getPricingHeroData();
      void getPricingPlansData();
      void getPricingStepsData();
      void getPricingBottomData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const pricingHero = {
    badgeText: pricingHeroData?.badgeText ?? "Simple Pricing for Every Business",
    title: pricingHeroData?.title ?? "Start Free Today. Upgrade Anytime.",
    description: pricingHeroData?.description ?? "Use Smart Billing Lite free for 30 days. Continue with an affordable monthly or yearly plan built for small businesses.",
  };
  const pricingPlans = pricingPlansData?.plans?.length ? pricingPlansData.plans : fallbackPricingPlans;
  const pricingTrustItems = pricingPlansData?.trustItems?.length ? pricingPlansData.trustItems : fallbackTrustItems;
  const pricingSteps = {
    heading: pricingStepsData?.heading ?? "How to Get Started?",
    subheading: pricingStepsData?.subheading ?? "Start billing in just a few simple steps.",
    steps: pricingStepsData?.steps?.length ? pricingStepsData.steps : fallbackPricingSteps,
  };
  const pricingBottom = {
    loginHeading: pricingBottomData?.loginHeading ?? "Login to Your Account",
    loginDescription: pricingBottomData?.loginDescription ?? "Register or login using mobile number and OTP.",
    phoneLabel: pricingBottomData?.phoneLabel ?? "Mobile Number",
    countryCode: pricingBottomData?.countryCode ?? "+91",
    phonePlaceholder: pricingBottomData?.phonePlaceholder ?? "Enter 10 digit mobile number",
    otpButtonText: pricingBottomData?.otpButtonText ?? "Send OTP",
    registerPrompt: pricingBottomData?.registerPrompt ?? "New user?",
    registerText: pricingBottomData?.registerText ?? "Register Now",
    testimonialHeading: pricingBottomData?.testimonialHeading ?? "Why Business Owners Love Smart Billing Lite ❤️",
    testimonialQuote: pricingBottomData?.testimonialQuote ?? "\"Smart Billing Lite ने हमारे shop का काम बहुत आसान कर दिया है. Billing, udhaar और daily reporting अब एक ही app में मिल जाता है.\"",
    testimonialInitial: pricingBottomData?.testimonialInitial ?? "R",
    testimonialName: pricingBottomData?.testimonialName ?? "Rajesh Kumar",
    testimonialMeta: pricingBottomData?.testimonialMeta ?? "Kirana Store Owner, Patna",
    testimonialBenefits: pricingBottomData?.testimonialBenefits?.length ? pricingBottomData.testimonialBenefits : fallbackTestimonialBenefits,
    ctaHeading: pricingBottomData?.ctaHeading ?? "Ready to Make Your Billing Smarter?",
    ctaDescription: pricingBottomData?.ctaDescription ?? "Join thousands of small businesses using Smart Billing Lite for faster billing, secure payments, receipts, and daily business growth.",
    ctaPrimaryButtonText: pricingBottomData?.ctaPrimaryButtonText ?? "Start 30-Day Free Trial →",
    ctaSecondaryButtonText: pricingBottomData?.ctaSecondaryButtonText ?? "Request Demo",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 30px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", background: "#eff6ff", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 800, color: "#1d4ed8", border: "1px solid #dbeafe", marginBottom: 20 }}>
          {pricingHero.badgeText}
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>{pricingHero.title}</h1>
        <p style={{ fontSize: 17, color: "#475569", maxWidth: 560, margin: "0 auto 50px", lineHeight: 1.7 }}>
          {pricingHero.description}
        </p>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, alignItems: "start" }}>
          {pricingPlans.map(plan => (
            <div key={plan.name} style={{
              position: "relative", background: "#fff", borderRadius: 28, padding: 28,
              boxShadow: plan.color === "blue" ? "0 20px 50px rgba(37,99,235,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
              border: `1px solid ${plan.color === "blue" ? "#93c5fd" : plan.color === "green" ? "#bbf7d0" : "#fed7aa"}`,
              transform: plan.color === "blue" ? "scale(1.02)" : "scale(1)",
            }}>
              {plan.tag && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", borderRadius: 999, padding: "6px 18px", fontSize: 12, fontWeight: 800, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
                  {plan.tag}
                </div>
              )}
              <div style={{ width: 60, height: 60, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto", background: plan.color === "green" ? "#dcfce7" : plan.color === "blue" ? "#dbeafe" : "#ffedd5" }}>
                {plan.icon ?? (plan.color === "green" ? "??" : plan.color === "blue" ? "??" : "??")}
              </div>
              <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 900, color: "#0f172a", margin: "16px 0 20px" }}>{plan.name}</h2>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#0f172a" }}>{plan.price}</span>
                <span style={{ color: "#64748b", fontWeight: 600, marginLeft: 4 }}>{plan.duration}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map(feature => (
                  <li key={feature.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "#334155" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, background: plan.color === "green" ? "#dcfce7" : plan.color === "blue" ? "#dbeafe" : "#ffedd5", color: plan.color === "green" ? "#15803d" : plan.color === "blue" ? "#1d4ed8" : "#c2410c" }}>✓</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <Link href="#download-apk" onClick={scrollToDownload} style={{ width: "100%", border: "none", borderRadius: 16, padding: "16px", textDecoration: "none", fontWeight: 900, fontSize: 15, cursor: "pointer", color: "#fff", background: plan.color === "green" ? "#16a34a" : plan.color === "blue" ? "#2563eb" : "#ea580c", boxShadow: plan.color === "green" ? "0 4px 14px rgba(22,163,74,0.3)" : plan.color === "blue" ? "0 4px 14px rgba(37,99,235,0.3)" : "0 4px 14px rgba(234,88,12,0.3)" }}>{plan.button}</Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: "#fff", borderRadius: 24, padding: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, border: "1px solid #f1f5f9" }}>
          {pricingTrustItems.map(item => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#334155" }}>
              <span style={{ color: "#16a34a" }}>✓</span>{item.text}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 32, padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{pricingSteps.heading}</h2>
            <p style={{ color: "#64748b" }}>{pricingSteps.subheading}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {pricingSteps.steps.map((step, i) => (
              <div key={step.title} style={{ position: "relative", background: "#f8fafc", borderRadius: 24, padding: "28px 20px 20px", textAlign: "center" }}>
                <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{i + 1}</div>
                <div style={{ fontSize: 44, marginBottom: 12, marginTop: 6 }}>{step.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{pricingBottom.loginHeading}</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>{pricingBottom.loginDescription}</p>
          <label style={{ fontSize: 13, fontWeight: 800, color: "#334155" }}>{pricingBottom.phoneLabel}</label>
          <div style={{ display: "flex", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", marginTop: 8, marginBottom: 16, background: "#f8fafc" }}>
            <div style={{ padding: "14px 16px", borderRight: "1px solid #e2e8f0", fontWeight: 700, color: "#64748b", fontSize: 14 }}>{pricingBottom.countryCode}</div>
            <input type="text" placeholder={pricingBottom.phonePlaceholder} style={{ flex: 1, border: "none", background: "transparent", padding: "14px 16px", outline: "none", fontSize: 14 }} />
          </div>
          <button style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 14, padding: 16, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>{pricingBottom.otpButtonText}</button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 16 }}>{pricingBottom.registerPrompt} <span style={{ color: "#2563eb", fontWeight: 800, cursor: "pointer" }}>{pricingBottom.registerText}</span></p>
        </div>

        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>{pricingBottom.testimonialHeading}</h2>
          <div style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", borderRadius: 20, padding: 20, marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#334155", lineHeight: 1.7, margin: "0 0 16px" }}>
              {pricingBottom.testimonialQuote}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16 }}>{pricingBottom.testimonialInitial}</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 14, color: "#0f172a" }}>{pricingBottom.testimonialName}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{pricingBottom.testimonialMeta}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {pricingBottom.testimonialBenefits.map(item => (
              <div key={item.text} style={{ background: "#f8fafc", borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 700, color: "#334155" }}>✓ {item.text}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)", borderRadius: 32, padding: "48px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>{pricingBottom.ctaHeading}</h2>
              <p style={{ fontSize: 16, color: "#bfdbfe", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>{pricingBottom.ctaDescription}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button style={{ background: "#fff", color: "#1d4ed8", border: "none", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}>{pricingBottom.ctaPrimaryButtonText}</button>
              <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>{pricingBottom.ctaSecondaryButtonText}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Features Page (unchanged) ────────────────────────────────────────────────

function FeaturesPage() {
  const [featuresHeroData, setFeaturesHeroData] = useState<FeatureHeroData | null>(null);
  const [featuresListData, setFeaturesListData] = useState<FeaturesListSectionData | null>(null);
  const [hardwareSectionData, setHardwareSectionData] = useState<HardwareSectionData | null>(null);
  const [featureHighlightsData, setFeatureHighlightsData] = useState<FeatureHighlightsSectionData | null>(null);

  const fallbackFeatureGroups: FeatureGroup[] = featureGroups.map((group) => ({
    title: group.title,
    tone: group.tone as FeatureGroup["tone"],
    items: group.items.map(([title, description]) => ({ title, description })),
  }));

  const fallbackHardware: TextCard[] = hardware.map((item) => ({
    icon: item.icon,
    title: item.name,
    description: item.text,
  }));

  const fallbackAiItems: TextCard[] = aiItems.map((title) => ({
    icon: "ðŸ“ˆ",
    title,
  }));

  const fallbackBusinessItems = [
    "Easy setup in minutes",
    "No training required",
    "Works for low-tech users",
    "Supports daily shop operations",
    "Affordable for small vendors",
    "Secure and reliable records",
  ].map((text) => ({ text }));

  const getFeaturesHeroData = async () => {
    try {
      const response = await api.get("/api/features-hero");
      setFeaturesHeroData(response.data.data);
    } catch (err) {
      console.error("Features hero error:", err);
    }
  };

  const getFeaturesListData = async () => {
    try {
      const response = await api.get("/api/features-list-section?populate[groups][populate][items]=*");
      setFeaturesListData(response.data.data);
    } catch (err) {
      console.error("Features list section error:", err);
    }
  };

  const getHardwareSectionData = async () => {
    try {
      const response = await api.get("/api/hardware-section?populate[items]=*");
      setHardwareSectionData(response.data.data);
    } catch (err) {
      console.error("Hardware section error:", err);
    }
  };

  const getFeatureHighlightsData = async () => {
    try {
      const response = await api.get("/api/feature-highlights-section?populate=*");
      setFeatureHighlightsData(response.data.data);
    } catch (err) {
      console.error("Feature highlights section error:", err);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void getFeaturesHeroData();
      void getFeaturesListData();
      void getHardwareSectionData();
      void getFeatureHighlightsData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const featureHero = {
    badgeText: featuresHeroData?.badgeText ?? "Powerful Features for Everyday Business",
    title: featuresHeroData?.title ?? "Everything You Need to Run Your Business Smarter",
    description: featuresHeroData?.description ?? "Manage billing, payments, customers, udhaar, receipts, reports, and hardware integrations from one simple mobile billing app.",
    primaryButtonText: featuresHeroData?.primaryButtonText ?? "Start 30-Day Free Trial",
    secondaryButtonText: featuresHeroData?.secondaryButtonText ?? "Request Demo",
  };
  const featuresGroups = featuresListData?.groups?.length ? featuresListData.groups : fallbackFeatureGroups;
  const hardwareContent = {
    heading: hardwareSectionData?.heading ?? "Hardware & Device Integration",
    subheading: hardwareSectionData?.subheading ?? "Connect your billing app with thermal printers, POS devices, and payment confirmation sound boxes.",
    items: hardwareSectionData?.items?.length ? hardwareSectionData.items : fallbackHardware,
  };
  const highlightsContent = {
    aiHeading: featureHighlightsData?.aiHeading ?? "AI-Powered Insights",
    aiItems: featureHighlightsData?.aiItems?.length ? featureHighlightsData.aiItems : fallbackAiItems,
    businessHeading: featureHighlightsData?.businessHeading ?? "Built for Indian Small Businesses",
    businessItems: featureHighlightsData?.businessItems?.length ? featureHighlightsData.businessItems : fallbackBusinessItems,
    buttonText: featureHighlightsData?.buttonText ?? "View Pricing & Start Trial",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #4338ca 50%, #7c3aed 100%)", padding: "60px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#fff", border: "1px solid rgba(255,255,255,0.2)", marginBottom: 20 }}>
              {featureHero.badgeText}
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>{featureHero.title}</h1>
            <p style={{ fontSize: 16, color: "#bfdbfe", lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
              {featureHero.description}
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <Link href="#download-apk" onClick={scrollToDownload} style={{ background: "#fff", color: "#1d4ed8", border: "none", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
                {featureHero.primaryButtonText}
              </Link>
              <Link href="#download-apk" onClick={scrollToDownload} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
                {featureHero.secondaryButtonText}
              </Link>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 28, padding: 16, border: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
              <div style={{ maxWidth: 260, margin: "0 auto", background: "#0f172a", borderRadius: 32, padding: 8 }}>
                <div style={{ background: "#fff", borderRadius: 26, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>Dashboard</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>₹12,450</div>
                    </div>
                    <span style={{ background: "#dcfce7", color: "#15803d", borderRadius: 999, padding: "3px 8px", fontSize: 9, fontWeight: 700 }}>+18%</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[["Total Bills", "68"], ["Customers", "128"], ["Pending", "₹2,350"], ["Profit", "₹4,870"]].map(([t, v]) => (
                      <div key={t} style={{ background: "#eff6ff", borderRadius: 12, padding: 10 }}>
                        <div style={{ fontSize: 8, color: "#64748b", fontWeight: 700 }}>{t}</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#f8fafc", borderRadius: 12, padding: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 900, marginBottom: 6 }}>Sales This Week</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
                      {[35, 55, 38, 70, 60, 90, 85].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: "#3b82f6", borderRadius: "4px 4px 0 0", height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <Link href="#download-apk" onClick={scrollToDownload} style={{ width: "100%", background: "#16a34a", color: "#fff", border: "none", borderRadius: 12, padding: "10px", fontWeight: 900, fontSize: 11, cursor: "pointer", textDecoration: "none", textAlign: "center" }}>
                    Create New Bill
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuresGroups.map(group => (
        <section key={group.title} style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 0" }}>
          <div style={{ background: "#fff", borderRadius: 28, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
            <div style={{ display: "inline-flex", borderRadius: 14, padding: "10px 20px", fontSize: 16, fontWeight: 900, marginBottom: 24, background: group.tone === "green" ? "#dcfce7" : group.tone === "blue" ? "#dbeafe" : "#ede9fe", color: group.tone === "green" ? "#15803d" : group.tone === "blue" ? "#1d4ed8" : "#6d28d9" }}>{group.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {group.items.map((item) => (
                <div key={item.title} style={{ background: "#f8fafc", borderRadius: 20, padding: 20, border: "1px solid #f1f5f9" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>{item.icon ?? "✅"}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>{item.title}</h3>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 28, padding: 32, color: "#fff" }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 10px" }}>{hardwareContent.heading}</h2>
          <p style={{ color: "#93c5fd", marginBottom: 28, fontSize: 14 }}>{hardwareContent.subheading}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {hardwareContent.items.map(item => (
              <div key={item.title} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 900, margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 11, color: "#93c5fd", lineHeight: 1.5, margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "inline-flex", background: "#ede9fe", borderRadius: 14, padding: "10px 20px", fontSize: 15, fontWeight: 900, color: "#6d28d9", marginBottom: 20 }}>{highlightsContent.aiHeading}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {highlightsContent.aiItems.map(item => (
              <div key={item.title} style={{ background: "#f8fafc", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#0f172a" }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "inline-flex", background: "#dcfce7", borderRadius: 14, padding: "10px 20px", fontSize: 15, fontWeight: 900, color: "#15803d", marginBottom: 20 }}>{highlightsContent.businessHeading}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {highlightsContent.businessItems.map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", borderRadius: 14, padding: "12px 16px" }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>✓</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#334155" }}>{item.text}</span>
              </div>
            ))}
          </div>
          <Link href="#download-apk" onClick={scrollToDownload} style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 15, cursor: "pointer", textDecoration: "none", textAlign: "center" }}>
            {highlightsContent.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header page={page} setPage={setPage} />
      {page === "home" && <HomePage />}
      {page === "pricing" && <PricingPage />}
      {page === "features" && <FeaturesPage />}
      <DownloadApkPromo />
    </div>
  );
}
