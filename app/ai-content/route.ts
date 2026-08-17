import { NextResponse } from "next/server";
import { posts } from "@/lib/blog";

// This endpoint returns a structured, AI-friendly summary of the website
export async function GET() {
  const data = {
    organization: {
      name: "Smart Billing Lite",
      description:
        "AI-powered mobile billing app for small businesses. Supports fast billing, QR/UPI payments, thermal printing, udhaar tracking and daily business reports.",
      serviceArea: "India",
      website: "https://smartbillinglite.in",
      contactPage: "/contact-us",
    },

    services: [
      {
        id: "billing",
        title: "Billing & Invoicing",
        description:
          "Create fast bills using calculator-style billing, product and service itemisation, and invoice generation.",
      },
      {
        id: "payments",
        title: "Digital Payments (QR & UPI)",
        description: "Accept QR and UPI payments and record payments alongside bills.",
      },
      {
        id: "printing",
        title: "Thermal Receipt Printing",
        description: "Print customer receipts using Bluetooth or USB thermal printers.",
      },
      {
        id: "udhaar",
        title: "Udhaar (Credit) Management",
        description: "Track outstanding credit per customer, record partial payments, and send reminders.",
      },
      {
        id: "reports",
        title: "Daily Income & Reports",
        description: "Daily sales summaries, best-selling products and simple AI insights for small businesses.",
      },
    ],

    keyFeatures: [
      "Super Fast Billing",
      "QR & UPI Payments",
      "Thermal Receipt Print",
      "Udhaar Management",
      "Daily Income Tracking",
      "AI Business Insights",
    ],

    hardware: [
      "Bluetooth Thermal Printer",
      "USB Thermal Printer",
      "Pine Labs POS Device",
      "Payment QR Sound Box",
    ],

    industries: [
      "Kirana Store",
      "Grocery Store",
      "Pharmacy",
      "Salon & Spa",
      "Food Stall",
      "Repair Shop",
      "Small Vendors",
    ],

    pages: [
      { path: "/", purpose: "Marketing homepage and primary product landing" },
      { path: "/smart-billing-lite", purpose: "Product landing / alternative homepage" },
      { path: "/smart-billing-lite/features", purpose: "Features overview" },
      { path: "/smart-billing-lite/pricing", purpose: "Pricing and plan comparison" },
      { path: "/features", purpose: "Features (alternate)" },
      { path: "/pricing", purpose: "Pricing (alternate)" },
      { path: "/about-us", purpose: "About the product and service area" },
      { path: "/contact-us", purpose: "Contact and support page" },
      { path: "/download", purpose: "APK download" },
      { path: "/blog", purpose: "Blog index and articles" },
      { path: "/privacy-policy", purpose: "Privacy policy" },
      { path: "/terms-and-conditions", purpose: "Terms and conditions" },
    ],

    blogArticles: posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      url: `/blog/${p.slug}`,
      date: p.date,
    })),

    faqs: {
      note:
        "FAQ content is provided from the CMS (Strapi) under the page `geo.faqs`. Agents should fetch the relevant page meta endpoints such as /api/home-meta or /api/about-meta to retrieve authoritative FAQs.",
      cmsEndpoints: ["/api/home-meta", "/api/about-meta", "/api/blog-meta", "/api/feature-meta"],
    },

    contact: {
      note:
        "The repository does not include an explicit postal address or phone number. Use the live /contact-us page or the site owner to obtain contact details.",
      contactPage: "/contact-us",
    },

    meta: {
      generatedAt: new Date().toISOString(),
      source: "repository content and CMS endpoints",
    },
  };

  return NextResponse.json(data, { status: 200 });
}
