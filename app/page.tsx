"use client";
import { useState } from "react";
import DownloadApkPromo from "./DownloadApkPromo";

const businessTypes = [
  { name: "Kirana Store", icon: "🛒" },
  { name: "Grocery Store", icon: "🥦" },
  { name: "Pharmacy", icon: "💊" },
  { name: "Salon & Spa", icon: "✂️" },
  { name: "Food Stall", icon: "🍱" },
  { name: "Repair Shop", icon: "🔧" },
  { name: "Small Vendors", icon: "🏪" },
];

const benefits = [
  { title: "Super Fast Billing", text: "Create bills in seconds with calculator and item-based billing.", icon: "⚡" },
  { title: "QR & UPI Payments", text: "Accept digital payments instantly with QR and UPI support.", icon: "📲" },
  { title: "Thermal Receipt Print", text: "Print customer receipts using Bluetooth or USB thermal printers.", icon: "🖨️" },
  { title: "Udhaar Management", text: "Track pending payments and send WhatsApp reminders easily.", icon: "📒" },
  { title: "Daily Income Tracking", text: "Know your sales, profit, and payment status every day.", icon: "📊" },
  { title: "AI Business Insights", text: "Get smart suggestions to understand and grow your business.", icon: "🤖" },
];

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
    price: "₹500",
    duration: "/ Month",
    tag: "Most Popular",
    color: "blue",
    button: "Choose Monthly",
    features: ["All trial features", "Daily reports", "WhatsApp reminders", "Data backup", "Regular updates", "Priority support"],
  },
  {
    name: "Yearly Plan",
    price: "₹400",
    duration: "/ Month",
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
          <a href="#download-apk" style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#334155",
            textDecoration: "none",
          }}>Login</a>
        </nav>

        <a href="#download-apk" style={{
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

function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>
      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div>
          <div style={{
            display: "inline-flex", background: "#eff6ff", borderRadius: 999,
            padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#1d4ed8",
            border: "1px solid #dbeafe", marginBottom: 20,
          }}>✨ AI-Powered Billing App for Small Businesses</div>

          <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: "#0f172a", margin: "0 0 20px" }}>
            Smart Billing<br /><span style={{ color: "#2563eb" }}>Made Simple!</span>
          </h1>

          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
            AI-powered mobile billing app with QR payments, thermal printing, POS device support, sound box integration, udhaar tracking, and daily business reports.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
            {["Fast Billing", "Secure Payments", "Instant Receipts", "Business Growth", "Udhaar Tracking", "AI Insights"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <a href="#download-apk" style={{
              background: "#2563eb", color: "#fff", border: "none", borderRadius: 14,
              padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
              textDecoration: "none",
            }}>Start 30-Day Free Trial →</a>
            <a href="#download-apk" style={{
              background: "#fff", color: "#1d4ed8", border: "1px solid #bfdbfe",
              borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer",
              textDecoration: "none",
            }}>▶ Watch Demo</a>
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: 40, background: "#fff", padding: 20, boxShadow: "0 25px 50px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0" }}>
            <div style={{ borderRadius: 32, background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)", padding: 16 }}>
              <div style={{ maxWidth: 300, margin: "0 auto", background: "#0f172a", borderRadius: 36, padding: 10 }}>
                <div style={{ background: "#fff", borderRadius: 28, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, marginBottom: 2 }}>Today&apos;s Sales</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>₹8,450</div>
                      <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700 }}>12 Orders</div>
                    </div>
                    <div style={{ background: "#dbeafe", borderRadius: 999, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#1d4ed8" }}>Live</div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                    {["Quick Bill", "Products", "Customers", "Udhaar", "Reports", "More"].map(item => (
                      <div key={item} style={{ background: "#eff6ff", borderRadius: 14, padding: "10px 6px", textAlign: "center", fontSize: 9, fontWeight: 700, color: "#334155" }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>▣</div>{item}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#f8fafc", borderRadius: 14, padding: 12, marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 900, marginBottom: 10 }}>
                      <span>Recent Transactions</span>
                      <span style={{ color: "#2563eb" }}>View</span>
                    </div>
                    {[["Cash Sale", "₹450"], ["UPI Payment", "₹890"], ["Credit Sale", "₹1,250"]].map(([n, a]) => (
                      <div key={n} style={{ display: "flex", justifyContent: "space-between", background: "#fff", borderRadius: 10, padding: "7px 10px", fontSize: 10, marginBottom: 5, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                        <span style={{ fontWeight: 600 }}>{n}</span>
                        <span style={{ fontWeight: 900 }}>{a}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#f0fdf4", borderRadius: 14, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>Total Profit</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#15803d" }}>₹2,340</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business types */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>Perfect For Every Small Business</h2>
          <p style={{ color: "#64748b", fontSize: 15 }}>Built for daily billing, payment collection, receipt printing, and business tracking.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
          {businessTypes.map(item => (
            <div key={item.name} style={{
              background: "#fff", borderRadius: 24, padding: "20px 10px",
              textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 32, padding: 40, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>Why Choose Smart Billing Lite?</h2>
            <p style={{ color: "#64748b" }}>Everything a small business needs to bill faster, collect better, and grow smarter.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {benefits.map(item => (
              <div key={item.title} style={{
                background: "#f8fafc", borderRadius: 24, padding: 24,
                border: "1px solid #f1f5f9", transition: "transform 0.2s",
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)", borderRadius: 32, padding: "40px 40px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[["26+", "Happy Users"], ["560+", "Bills Generated"], ["99.9%", "Uptime"], ["24x7", "Support"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>{num}</div>
              <div style={{ fontSize: 13, color: "#bfdbfe", fontWeight: 600, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}

function PricingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>
      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 30px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", background: "#eff6ff", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 800, color: "#1d4ed8", border: "1px solid #dbeafe", marginBottom: 20 }}>
          Simple Pricing for Every Business
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Start Free Today. Upgrade Anytime.</h1>
        <p style={{ fontSize: 17, color: "#475569", maxWidth: 560, margin: "0 auto 50px", lineHeight: 1.7 }}>
          Use Smart Billing Lite free for 30 days. Continue with an affordable monthly or yearly plan built for small businesses.
        </p>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, alignItems: "start" }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              position: "relative", background: "#fff", borderRadius: 28, padding: 28,
              boxShadow: plan.color === "blue" ? "0 20px 50px rgba(37,99,235,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
              border: `1px solid ${plan.color === "blue" ? "#93c5fd" : plan.color === "green" ? "#bbf7d0" : "#fed7aa"}`,
              transform: plan.color === "blue" ? "scale(1.02)" : "scale(1)",
            }}>
              {plan.color === "blue" && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", borderRadius: 999, padding: "6px 18px", fontSize: 12, fontWeight: 800, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
                  Most Popular
                </div>
              )}

              <div style={{ width: 60, height: 60, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto", background: plan.color === "green" ? "#dcfce7" : plan.color === "blue" ? "#dbeafe" : "#ffedd5" }}>
                {plan.color === "green" ? "🎁" : plan.color === "blue" ? "📈" : "🏆"}
              </div>

              <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 900, color: "#0f172a", margin: "16px 0 20px" }}>{plan.name}</h2>

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#0f172a" }}>{plan.price}</span>
                <span style={{ color: "#64748b", fontWeight: 600, marginLeft: 4 }}>{plan.duration}</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "#334155" }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0,
                      background: plan.color === "green" ? "#dcfce7" : plan.color === "blue" ? "#dbeafe" : "#ffedd5",
                      color: plan.color === "green" ? "#15803d" : plan.color === "blue" ? "#1d4ed8" : "#c2410c",
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#download-apk" style={{
                width: "100%", border: "none", borderRadius: 16, padding: "16px", fontWeight: 900, fontSize: 15, cursor: "pointer", color: "#fff",
                background: plan.color === "green" ? "#16a34a" : plan.color === "blue" ? "#2563eb" : "#ea580c",
                boxShadow: plan.color === "green" ? "0 4px 14px rgba(22,163,74,0.3)" : plan.color === "blue" ? "0 4px 14px rgba(37,99,235,0.3)" : "0 4px 14px rgba(234,88,12,0.3)",
                display: "block", textAlign: "center", textDecoration: "none",
              }}>{plan.button}</a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: "#fff", borderRadius: 24, padding: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, border: "1px solid #f1f5f9" }}>
          {["No hidden charges", "Secure payment", "Cancel anytime", "100% safe records"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#334155" }}>
              <span style={{ color: "#16a34a" }}>✓</span>{item}
            </div>
          ))}
        </div>
      </section>

      {/* How to get started */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 32, padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>How to Get Started?</h2>
            <p style={{ color: "#64748b" }}>Start billing in just a few simple steps.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {steps.map((step, i) => (
              <div key={step.title} style={{ position: "relative", background: "#f8fafc", borderRadius: 24, padding: "28px 20px 20px", textAlign: "center" }}>
                <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{i + 1}</div>
                <div style={{ fontSize: 44, marginBottom: 12, marginTop: 6 }}>{step.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login + Testimonial */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>Login to Your Account</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Register or login using mobile number and OTP.</p>
          <label style={{ fontSize: 13, fontWeight: 800, color: "#334155" }}>Mobile Number</label>
          <div style={{ display: "flex", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", marginTop: 8, marginBottom: 16, background: "#f8fafc" }}>
            <div style={{ padding: "14px 16px", borderRight: "1px solid #e2e8f0", fontWeight: 700, color: "#64748b", fontSize: 14 }}>+91</div>
            <input type="text" placeholder="Enter 10 digit mobile number" style={{ flex: 1, border: "none", background: "transparent", padding: "14px 16px", outline: "none", fontSize: 14 }} />
          </div>
          <a href="#download-apk" style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 14, padding: 16, fontWeight: 900, fontSize: 15, cursor: "pointer", display: "block", textAlign: "center", textDecoration: "none" }}>Send OTP</a>
          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 16 }}>New user? <a href="#download-apk" style={{ color: "#2563eb", fontWeight: 800, cursor: "pointer", textDecoration: "none" }}>Register Now</a></p>
        </div>

        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Why Business Owners Love Smart Billing Lite ❤️</h2>
          <div style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", borderRadius: 20, padding: 20, marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#334155", lineHeight: 1.7, margin: "0 0 16px" }}>
              &quot;Smart Billing Lite ने हमारे shop का काम बहुत आसान कर दिया है. Billing, udhaar और daily reporting अब एक ही app में मिल जाता है.&quot;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16 }}>R</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 14, color: "#0f172a" }}>Rajesh Kumar</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>Kirana Store Owner, Patna</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Fast & secure login", "Instant trial activation", "Works on all devices", "Lightning fast support"].map(item => (
              <div key={item} style={{ background: "#f8fafc", borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 700, color: "#334155" }}>✅ {item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)", borderRadius: 32, padding: "48px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Ready to Make Your Billing Smarter?</h2>
              <p style={{ fontSize: 16, color: "#bfdbfe", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>Join thousands of small businesses using Smart Billing Lite for faster billing, secure payments, receipts, and daily business growth.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="#download-apk" style={{ background: "#fff", color: "#1d4ed8", border: "none", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap", textAlign: "center", textDecoration: "none" }}>Start 30-Day Free Trial →</a>
              <a href="#download-apk" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", textAlign: "center", textDecoration: "none" }}>Request Demo</a>
            </div>
          </div>
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}

function FeaturesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6f9ff" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #4338ca 50%, #7c3aed 100%)", padding: "60px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#fff", border: "1px solid rgba(255,255,255,0.2)", marginBottom: 20 }}>
              Powerful Features for Everyday Business
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>Everything You Need to Run Your Business Smarter</h1>
            <p style={{ fontSize: 16, color: "#bfdbfe", lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
              Manage billing, payments, customers, udhaar, receipts, reports, and hardware integrations from one simple mobile billing app.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <a href="#download-apk" style={{ background: "#fff", color: "#1d4ed8", border: "none", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", textDecoration: "none" }}>Start 30-Day Free Trial</a>
              <a href="#download-apk" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "16px 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", textDecoration: "none" }}>Request Demo</a>
            </div>
          </div>

          {/* Dashboard mockup */}
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
                  <button style={{ width: "100%", background: "#16a34a", color: "#fff", border: "none", borderRadius: 12, padding: "10px", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>Create New Bill</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature groups */}
      {featureGroups.map(group => (
        <section key={group.title} style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 0" }}>
          <div style={{ background: "#fff", borderRadius: 28, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
            <div style={{
              display: "inline-flex", borderRadius: 14, padding: "10px 20px", fontSize: 16, fontWeight: 900, marginBottom: 24,
              background: group.tone === "green" ? "#dcfce7" : group.tone === "blue" ? "#dbeafe" : "#ede9fe",
              color: group.tone === "green" ? "#15803d" : group.tone === "blue" ? "#1d4ed8" : "#6d28d9",
            }}>{group.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {group.items.map(([title, text]) => (
                <div key={title} style={{ background: "#f8fafc", borderRadius: 20, padding: 20, border: "1px solid #f1f5f9" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>✅</div>
                  <h3 style={{ fontSize: 14, fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Hardware */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 28, padding: 32, color: "#fff" }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 10px" }}>Hardware & Device Integration</h2>
          <p style={{ color: "#93c5fd", marginBottom: 28, fontSize: 14 }}>Connect your billing app with thermal printers, POS devices, and payment confirmation sound boxes.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {hardware.map(item => (
              <div key={item.name} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 900, margin: "0 0 8px" }}>{item.name}</h3>
                <p style={{ fontSize: 11, color: "#93c5fd", lineHeight: 1.5, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI + Built for India */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "inline-flex", background: "#ede9fe", borderRadius: 14, padding: "10px 20px", fontSize: 15, fontWeight: 900, color: "#6d28d9", marginBottom: 20 }}>AI-Powered Insights</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {aiItems.map(item => (
              <div key={item} style={{ background: "#f8fafc", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📈</div>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#0f172a" }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "inline-flex", background: "#dcfce7", borderRadius: 14, padding: "10px 20px", fontSize: 15, fontWeight: 900, color: "#15803d", marginBottom: 20 }}>Built for Indian Small Businesses</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {["Easy setup in minutes", "No training required", "Works for low-tech users", "Supports daily shop operations", "Affordable for small vendors", "Secure and reliable records"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", borderRadius: 14, padding: "12px 16px" }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>✓</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#334155" }}>{item}</span>
              </div>
            ))}
          </div>
          <a href="#download-apk" style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 15, cursor: "pointer", display: "block", textAlign: "center", textDecoration: "none" }}>View Pricing & Start Trial</a>
        </div>
      </section>
      <DownloadApkPromo />
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header page={page} setPage={setPage} />
      {page === "home" && <HomePage />}
      {page === "pricing" && <PricingPage />}
      {page === "features" && <FeaturesPage />}
    </div>
  );
}
