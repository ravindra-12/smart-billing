# 🎯 Referral Program — Frontend Integration Guide

> Complete step-by-step API documentation for integrating the Referral Program on the frontend (React Native / Web).  
> **Base URL:** `https://api.smartbillinglite.com/api` (Production) | `http://localhost:8000/api` (Dev)

---

## Table of Contents

1. [Overview & Concepts](#1-overview--concepts)
2. [Reward Structure](#2-reward-structure)
3. [Flow A — New Vendor Signs Up with Referral Code](#3-flow-a--new-vendor-signs-up-with-referral-code)
4. [Flow B — Existing Vendor Shares Referral](#4-flow-b--existing-vendor-shares-referral)
5. [Flow C — Brand Promoter Registration & Referral](#5-flow-c--brand-promoter-registration--referral)
6. [Flow D — Admin Manages Referral Rewards](#6-flow-d--admin-manages-referral-rewards)
7. [Complete API Reference](#7-complete-api-reference)
8. [Status & Lifecycle Diagrams](#8-status--lifecycle-diagrams)
9. [Error Handling](#9-error-handling)

---

## 1. Overview & Concepts

The referral program has **3 user roles** that interact with different sets of APIs:

| Role | Description | Auth Required |
|------|-------------|---------------|
| **Vendor** | Existing vendor who refers other vendors. Earns ₹150 per conversion | Yes (Sanctum token) |
| **Brand Promoter** | External agent who promotes the app. Earns ₹100 per conversion | Yes (Sanctum token after registration) |
| **Admin** | Platform admin who reviews, approves, and pays out rewards | Yes (Sanctum token + admin role) |

### Key Entities

| Entity | What it represents |
|--------|--------------------|
| **Referral Code** | Unique code like `SBL-A3K9F2` assigned to a vendor or brand promoter |
| **Referral** | A record created when a new vendor signs up using someone's referral code |
| **Referral Reward** | A pending payout created when the referred vendor buys a premium plan |

---

## 2. Reward Structure

| Referrer Type | Reward Amount | Lock Period | Payout Methods |
|---------------|---------------|-------------|----------------|
| Vendor | ₹150 | 7 days | UPI / Bank Transfer |
| Brand Promoter | ₹100 | 7 days | UPI / Bank Transfer |

**Reward Status Lifecycle:**  
`pending` → `approved` (by admin) → `paid` (by admin with payout details)  
Any pending/approved reward can be `cancelled` by admin.

---

## 3. Flow A — New Vendor Signs Up with Referral Code

This is the flow when a **new user downloads the app via a referral link** and signs up.

### Step 1: Send OTP (same as normal signup)

```
POST /auth/send-otp
```

**Request:**
```json
{
  "phone": "9123456789"
}
```

**Response (200):**
```json
{
  "message": "OTP sent successfully.",
  "is_registered": false,
  "otp_debug": "123456"   // only in development
}
```

**When to use:** Always the first step. Call this when user enters their phone number on the signup/login screen.

---

### Step 2: Verify OTP with Referral Code

```
POST /auth/verify-otp
```

**Request:**
```json
{
  "phone": "9123456789",
  "otp": "123456",
  "name": "Amit Shop",
  "city": "Pune",
  "business_type_id": 2,
  "referral_code": "SBL-A3K9F2"
}
```

> ⚠️ **Important:** The `referral_code` field is **optional**. It is only applied when the vendor is **newly created** (first-time signup). If the user already exists, the code is silently ignored.

**Response (200):**
```json
{
  "message": "Login successful.",
  "token": "5|abc123def456...",
  "user": {
    "id": 12,
    "name": "Amit Shop",
    "phone": "9123456789",
    "city": "Pune"
  },
  "vendor": {
    "id": 8,
    "user_id": 12,
    "business_name": "Amit Shop",
    "trial_start": "2026-07-01",
    "trial_end": "2026-07-31"
  },
  "referral_applied": true
}
```

**Frontend logic:**
- If user arrived via a share link like `https://smartbillinglite.com/download?ref=SBL-A3K9F2`, extract the `ref` query parameter and pass it as `referral_code`.
- Check `referral_applied` in response — if `true`, show a success toast like *"Referral code applied! Your referrer will earn a reward when you go premium."*
- If `false`, the code was invalid/expired or user was already referred. No need to show error — just proceed normally.

---

## 4. Flow B — Existing Vendor Shares Referral

This is the flow for an **existing vendor** who wants to refer others and earn rewards.

### Step 1: Get My Referral Code

```
GET /referral/my-code
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "referral_code": "SBL-A3K9F2",
  "referrer_type": "VENDOR",
  "is_active": true,
  "created_at": "2026-06-15T10:30:00.000000Z"
}
```

**When to use:** Call this when the vendor opens the "Refer & Earn" section. This auto-creates a code if one doesn't exist yet. Display the `referral_code` prominently with a copy button.

---

### Step 2: Get Share Link

```
GET /referral/share-link
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "share_link": "https://smartbillinglite.com/download?ref=SBL-A3K9F2",
  "referral_code": "SBL-A3K9F2",
  "share_message": "Hey! I'm using Smart Billing Lite for my business billing. Try it out and get a free trial! Download here: https://smartbillinglite.com/download?ref=SBL-A3K9F2 — Use my referral code: SBL-A3K9F2"
}
```

**When to use:** Call this when the vendor taps "Share" button. Use the `share_message` directly with the native Share API (WhatsApp, SMS, etc.) — it's pre-composed and ready to send.

---

### Step 3: View Dashboard Stats

```
GET /referral/dashboard
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "referral_code": "SBL-A3K9F2",
  "total_referrals": 10,
  "premium_purchases": 5,
  "pending_rewards": "750.00",
  "approved_rewards": "300.00",
  "paid_rewards": "450.00",
  "total_earnings": "1500.00"
}
```

**When to use:** Show this on the main "Refer & Earn" dashboard screen. Display stats as cards:
- Total people referred (`total_referrals`)
- How many bought premium (`premium_purchases`)
- Earnings breakdown: pending / approved / paid
- Grand total (`total_earnings`)

---

### Step 4: View My Referrals List

```
GET /referral/referrals
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "referred_name": "Amit Store",
    "referred_phone": "9123456789",
    "status": "premium_purchased",
    "referred_at": "2026-06-20T14:00:00.000000Z",
    "premium_purchased_at": "2026-06-25T09:30:00.000000Z",
    "reward_status": "pending",
    "reward_amount": "150.00"
  },
  {
    "id": 2,
    "referred_name": "Suresh Shop",
    "referred_phone": "9876500002",
    "status": "pending",
    "referred_at": "2026-06-28T11:00:00.000000Z",
    "premium_purchased_at": null,
    "reward_status": "none",
    "reward_amount": "0.00"
  }
]
```

**When to use:** Show as a list/table under "My Referrals" tab. Each row shows:
- Referred vendor name & phone
- **Status badge:** `pending` (signed up but free) vs `premium_purchased` (bought a plan)
- **Reward status:** `none` → `pending` → `approved` → `paid`

---

### Step 5: View Earnings History

```
GET /referral/earnings
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "amount": "150.00",
    "status": "paid",
    "eligible_at": "2026-07-02",
    "approved_at": "2026-07-03T10:00:00.000000Z",
    "paid_at": "2026-07-04T15:00:00.000000Z",
    "payout_method": "UPI",
    "referred_vendor_name": "Amit Store",
    "referred_vendor_phone": "9123456789",
    "purchased_at": "2026-06-25T09:30:00.000000Z",
    "created_at": "2026-06-25T09:30:00.000000Z"
  }
]
```

**When to use:** Show under an "Earnings" or "Payout History" tab. Each row shows the reward amount, which vendor triggered it, current status, and when it was paid out.

---

## 5. Flow C — Brand Promoter Registration & Referral

Brand promoters are external agents (not vendors) who promote the app and earn ₹100 per conversion.

### Step 1: Send OTP (reuse existing endpoint)

```
POST /auth/send-otp
```

```json
{
  "phone": "9876543210"
}
```

**When to use:** Same OTP flow. Call when promoter enters phone on the registration screen.

---

### Step 2: Register as Brand Promoter

```
POST /promoter/register
```

> ⚠️ **No auth token needed** — this is a public endpoint. But OTP must be verified first.

**Request:**
```json
{
  "name": "Rajesh Kumar",
  "mobile": "9876543210",
  "otp": "123456",
  "city": "Mumbai",
  "upi_id": "rajesh@upi",
  "bank_name": "State Bank of India",
  "bank_account_number": "1234567890",
  "bank_ifsc": "SBIN0001234"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Brand promoter registered successfully.",
  "token": "3|abc123def456...",
  "promoter": {
    "id": 1,
    "user_id": 5,
    "name": "Rajesh Kumar",
    "mobile": "9876543210",
    "city": "Mumbai",
    "upi_id": "rajesh@upi",
    "bank_name": "State Bank of India",
    "bank_account_number": "1234567890",
    "bank_ifsc": "SBIN0001234",
    "status": "active"
  },
  "referral_code": "SBL-X7M2P9"
}
```

**Frontend logic:**
- Save the `token` — all subsequent API calls need this as `Authorization: Bearer {token}`
- Display `referral_code` prominently — this is what the promoter shares
- Bank/UPI fields are optional at registration but needed before payout

---

### Step 3: Get Promoter's Referral Code & Share Link

```
GET /promoter/my-code
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "referral_code": "SBL-X7M2P9",
  "share_link": "https://smartbillinglite.com/download?ref=SBL-X7M2P9",
  "share_message": "Download Smart Billing Lite — the best billing app for your business! Get a free trial: https://smartbillinglite.com/download?ref=SBL-X7M2P9 — Use code: SBL-X7M2P9"
}
```

**When to use:** Show on promoter home screen with a big "Share" button. Use `share_message` with native share.

---

### Step 4: Promoter Dashboard

```
GET /promoter/dashboard
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "referral_code": "SBL-X7M2P9",
  "total_referrals": 25,
  "premium_purchases": 12,
  "pending_rewards": "500.00",
  "approved_rewards": "200.00",
  "paid_rewards": "800.00",
  "total_earnings": "1500.00"
}
```

**When to use:** Main dashboard screen for promoters. Same stat cards as vendor referral dashboard.

---

### Step 5: Promoter Earnings History

```
GET /promoter/earnings
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "amount": "100.00",
    "status": "paid",
    "eligible_at": "2026-07-02",
    "approved_at": "2026-07-03T10:00:00.000000Z",
    "paid_at": "2026-07-05T12:00:00.000000Z",
    "payout_method": "Bank Transfer",
    "referred_vendor_name": "Ramesh Shop",
    "referred_vendor_phone": "9876500001",
    "purchased_at": "2026-06-25T09:30:00.000000Z",
    "created_at": "2026-06-25T09:30:00.000000Z"
  }
]
```

**When to use:** "Earnings" tab — shows each reward with referred vendor details and payout status.

---

### Step 6: Update Promoter Profile

```
PUT /promoter/profile
Authorization: Bearer {token}
```

**Request:**
```json
{
  "name": "Rajesh Kumar",
  "city": "Pune",
  "upi_id": "rajesh@upi",
  "bank_name": "HDFC Bank",
  "bank_account_number": "9876543210",
  "bank_ifsc": "HDFC0001234"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "promoter": {
    "id": 1,
    "user_id": 5,
    "name": "Rajesh Kumar",
    "mobile": "9876543210",
    "city": "Pune",
    "upi_id": "rajesh@upi",
    "bank_name": "HDFC Bank",
    "bank_account_number": "9876543210",
    "bank_ifsc": "HDFC0001234",
    "status": "active"
  }
}
```

**When to use:** Settings/Profile screen. All fields are optional — send only what's changed. Important for payment details before payout.

---

## 6. Flow D — Admin Manages Referral Rewards

All admin endpoints require `Authorization: Bearer {admin_token}` and are prefixed with `/admin/`.

### Step 1: View Referral Analytics (Dashboard Overview)

```
GET /admin/referral-analytics
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "total_referral_codes": 50,
  "total_referrals": 120,
  "pending_referrals": 45,
  "premium_conversions": 55,
  "conversion_rate": 45.83,
  "total_rewards_pending": "3750.00",
  "total_rewards_approved": "1500.00",
  "total_rewards_paid": "5250.00",
  "total_rewards_cancelled": "300.00",
  "total_brand_promoters": 15,
  "active_brand_promoters": 12,
  "vendor_referrals": 70,
  "promoter_referrals": 50
}
```

**When to use:** Admin dashboard homepage — shows the complete referral program health at a glance. Display `conversion_rate` as a percentage, show reward amounts as ₹ values.

---

### Step 2: List All Referrals

```
GET /admin/referrals?status=pending&referrer_type=VENDOR&page=1
Authorization: Bearer {admin_token}
```

**Query Parameters:**

| Param | Type | Required | Values |
|-------|------|----------|--------|
| `status` | string | No | `pending`, `premium_purchased`, `expired`, `cancelled` |
| `referrer_type` | string | No | `VENDOR`, `BRAND_PROMOTER` |
| `page` | integer | No | Page number (20 per page) |

**Response (200):**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "referral_code_id": 3,
      "referrer_user_id": 5,
      "referred_user_id": 12,
      "referred_phone": "9123456789",
      "status": "pending",
      "referred_at": "2026-06-28T11:00:00.000000Z",
      "premium_purchased_at": null,
      "referrer": { "id": 5, "name": "Vendor A", "phone": "9876543210" },
      "referred": { "id": 12, "name": "Amit Store", "phone": "9123456789" },
      "referral_code": { "code": "SBL-A3K9F2", "referrer_type": "VENDOR" },
      "reward": null
    }
  ],
  "last_page": 5,
  "per_page": 20,
  "total": 95
}
```

**When to use:** Admin "Referrals" list page with filter dropdowns. Shows who referred whom, via what code, and current status.

---

### Step 3: List All Rewards

```
GET /admin/referral-rewards?status=pending
Authorization: Bearer {admin_token}
```

**Query Parameters:**

| Param | Type | Required | Values |
|-------|------|----------|--------|
| `status` | string | No | `pending`, `approved`, `paid`, `cancelled` |

**Response (200):**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "referral_id": 3,
      "referrer_user_id": 5,
      "amount": "150.00",
      "status": "pending",
      "eligible_at": "2026-07-08",
      "approved_at": null,
      "paid_at": null,
      "payout_method": null,
      "payout_reference": null,
      "admin_notes": null,
      "referral": {
        "referrer": { "name": "Vendor A" },
        "referred": { "name": "Amit Store" },
        "referral_code": { "code": "SBL-A3K9F2" }
      }
    }
  ],
  "last_page": 3,
  "per_page": 20,
  "total": 42
}
```

**When to use:** Admin "Rewards" management page. Filter by status to see pending rewards that need action.

---

### Step 4: Approve a Pending Reward

```
PATCH /admin/referral-rewards/{id}/approve
Authorization: Bearer {admin_token}
```

**Request:**
```json
{
  "admin_notes": "Verified and approved for payout"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reward approved successfully.",
  "reward": {
    "id": 1,
    "status": "approved",
    "approved_at": "2026-07-03T10:00:00.000000Z",
    "admin_notes": "Verified and approved for payout"
  }
}
```

**When to use:** Admin clicks "Approve" button on a pending reward row. Moves it to the approved queue for payout.

> ⚠️ Only rewards with `status: "pending"` can be approved. Others will return a `400` error.

---

### Step 5: Mark Reward as Paid

```
PATCH /admin/referral-rewards/{id}/pay
Authorization: Bearer {admin_token}
```

**Request:**
```json
{
  "payout_method": "UPI",
  "payout_reference": "TXN123456",
  "admin_notes": "Paid via UPI to rajesh@upi"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reward marked as paid successfully.",
  "reward": {
    "id": 1,
    "status": "paid",
    "paid_at": "2026-07-04T15:00:00.000000Z",
    "payout_method": "UPI",
    "payout_reference": "TXN123456"
  }
}
```

**When to use:** After admin has manually transferred the money, they click "Mark Paid" and fill in the transaction details. `payout_method` is required, `payout_reference` is optional but recommended.

> ⚠️ Only rewards with `status: "approved"` can be marked as paid.

---

### Step 6: Cancel a Reward

```
PATCH /admin/referral-rewards/{id}/cancel
Authorization: Bearer {admin_token}
```

**Request:**
```json
{
  "admin_notes": "Cancelled due to suspected fraud"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reward cancelled successfully.",
  "reward": {
    "id": 1,
    "status": "cancelled",
    "admin_notes": "Cancelled due to suspected fraud"
  }
}
```

**When to use:** Admin clicks "Cancel" on a reward that shouldn't be paid out (fraud, refund, etc.).

> ⚠️ **Paid rewards cannot be cancelled.** Only `pending` or `approved` rewards can be cancelled.

---

## 7. Complete API Reference

### Public Endpoints (No Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/send-otp` | Send OTP for phone verification |
| `POST` | `/auth/verify-otp` | Verify OTP + apply referral code on new signup |
| `POST` | `/promoter/register` | Register as brand promoter (requires OTP) |

### Vendor Referral Endpoints (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/referral/my-code` | Get/generate vendor's referral code |
| `GET` | `/referral/dashboard` | Referral stats (totals, earnings breakdown) |
| `GET` | `/referral/earnings` | Detailed earnings history with payout info |
| `GET` | `/referral/share-link` | Get share link + pre-composed message |
| `GET` | `/referral/referrals` | List of all referred vendors |

### Brand Promoter Endpoints (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/promoter/dashboard` | Promoter referral stats |
| `GET` | `/promoter/earnings` | Promoter earnings history |
| `GET` | `/promoter/my-code` | Get referral code + share link |
| `PUT` | `/promoter/profile` | Update promoter profile & payment details |

### Admin Referral Endpoints (Auth + Admin Role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/referrals` | List all referrals (filterable, paginated) |
| `GET` | `/admin/referral-rewards` | List all rewards (filterable, paginated) |
| `PATCH` | `/admin/referral-rewards/{id}/approve` | Approve pending reward |
| `PATCH` | `/admin/referral-rewards/{id}/pay` | Mark approved reward as paid |
| `PATCH` | `/admin/referral-rewards/{id}/cancel` | Cancel pending/approved reward |
| `GET` | `/admin/referral-analytics` | Referral program analytics overview |

---

## 8. Status & Lifecycle Diagrams

### Referral Status Flow

```
New Vendor Signs Up with Code
        │
        ▼
   ┌─────────┐
   │ pending  │ ──── Vendor signed up but hasn't purchased premium
   └────┬────┘
        │  Vendor buys premium plan
        ▼
┌──────────────────┐
│ premium_purchased│ ──── Reward is auto-created with 7-day lock
└──────────────────┘
```

### Reward Status Flow

```
Referred vendor buys premium
        │
        ▼
   ┌─────────┐
   │ pending  │ ──── 7-day lock period (eligible_at date)
   └────┬────┘
        │  Admin approves
        ▼
   ┌──────────┐
   │ approved │ ──── Ready for payout
   └────┬─────┘
        │  Admin marks paid (with payout details)
        ▼
   ┌──────┐
   │ paid │ ──── Final state, cannot be cancelled
   └──────┘

At any point (pending or approved):
        │
        ▼
   ┌───────────┐
   │ cancelled │ ──── By admin or auto (refund)
   └───────────┘
```

---

## 9. Error Handling

### Common Error Responses

| Status | Scenario | Example Message |
|--------|----------|-----------------|
| `401` | Missing or invalid token | `"Unauthenticated."` |
| `404` | Reward ID not found | `"No query results for model [ReferralReward]."` |
| `422` | Validation failed | `"The mobile field is required."` |
| `422` | Duplicate promoter mobile | `"This mobile number is already registered as a promoter."` |
| `422` | Invalid/expired OTP | `"Invalid or expired OTP."` |
| `400` | Wrong reward status for action | `"Only pending rewards can be approved."` |
| `400` | Trying to cancel paid reward | `"Paid rewards cannot be cancelled."` |

### Frontend Tips

1. **Deep linking:** Extract `ref` param from the download URL and persist it in local storage until signup completes.
2. **Silent failures:** If `referral_applied` is `false`, don't show an error — the referral code might have been invalid but the signup still succeeds.
3. **Reward polling:** On the dashboard, poll every 30-60 seconds or use pull-to-refresh to show updated reward statuses.
4. **Share integration:** Use React Native's `Share.share({ message: share_message })` for the pre-composed message.
5. **Payment details prompt:** Before a promoter's first reward is due, prompt them to fill in UPI/bank details via `PUT /promoter/profile`.

---

> 📌 **Last Updated:** July 2026  
> 📌 **OpenAPI Spec:** See `storage/api-docs/api-docs.json` for the full Swagger/OpenAPI 3.0 specification.
