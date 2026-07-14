const API_BASE_URL = 'https://api.smartbillinglite.com/api';

export const VENDOR_TOKEN_KEY = 'smartbilling_vendor_token';
export const VENDOR_PROFILE_KEY = 'smartbilling_vendor_profile';
export const VENDOR_AUTH_EVENT = 'smartbilling-vendor-auth-change';

export interface VendorUser {
  id: number;
  name: string;
  phone: string;
  city: string | null;
}

export interface Vendor {
  id: number;
  user_id: number;
  business_name: string;
  trial_start: string | null;
  trial_end: string | null;
}

export interface StoredVendorSession {
  user: VendorUser;
  vendor: Vendor;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  is_registered: boolean;
}

// Vendor registration is mobile-app only; the web only logs in existing vendors.
export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  token: string;
  user: VendorUser;
  vendor: Vendor | null;
  referral_applied?: boolean;
}

export interface MyCodeResponse {
  referral_code: string;
  referrer_type: string;
  is_active: boolean;
  created_at: string;
}

export interface ShareLinkResponse {
  share_link: string;
  referral_code: string;
  share_message: string;
}

export interface VendorReferralDashboard {
  referral_code: string;
  total_referrals: number;
  premium_purchases: number;
  pending_rewards: string;
  approved_rewards: string;
  paid_rewards: string;
  total_earnings: string;
}

export type ReferralStatus = 'pending' | 'premium_purchased' | 'expired' | 'cancelled';

export type RewardStatus = 'none' | 'pending' | 'approved' | 'paid' | 'cancelled';

export interface VendorReferral {
  id: number;
  referred_name: string;
  referred_phone: string;
  status: ReferralStatus;
  referred_at: string | null;
  premium_purchased_at: string | null;
  reward_status: RewardStatus;
  reward_amount: string;
}

export interface VendorEarning {
  id: number;
  amount: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  eligible_at: string | null;
  approved_at: string | null;
  paid_at: string | null;
  payout_method: string | null;
  referred_vendor_name: string;
  referred_vendor_phone: string;
  purchased_at: string | null;
  created_at: string;
}

export class VendorApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'VendorApiError';
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // Non-JSON response body; fall through to the status check below.
  }

  if (!response.ok) {
    const message =
      (data as { message?: string } | null)?.message ||
      `Request failed (${response.status}).`;
    throw new VendorApiError(message, response.status);
  }

  return data as T;
}

export const sendOtp = (phone: string) =>
  request<SendOtpResponse>('/auth/send-otp', { method: 'POST', body: { phone } });

export const verifyOtp = (payload: VerifyOtpPayload) =>
  request<VerifyOtpResponse>('/auth/verify-otp', { method: 'POST', body: payload });

export const getMyCode = (token: string) =>
  request<MyCodeResponse>('/referral/my-code', { token });

export const getShareLink = (token: string) =>
  request<ShareLinkResponse>('/referral/share-link', { token });

export const getReferralDashboard = (token: string) =>
  request<VendorReferralDashboard>('/referral/dashboard', { token });

export const getReferrals = (token: string) =>
  request<VendorReferral[]>('/referral/referrals', { token });

export const getEarnings = (token: string) =>
  request<VendorEarning[]>('/referral/earnings', { token });

export const getVendorToken = () =>
  window.localStorage.getItem(VENDOR_TOKEN_KEY);

export const getStoredVendorSession = (): StoredVendorSession | null => {
  const raw = window.localStorage.getItem(VENDOR_PROFILE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredVendorSession;
  } catch {
    return null;
  }
};

export const saveVendorSession = (token: string, session: StoredVendorSession) => {
  window.localStorage.setItem(VENDOR_TOKEN_KEY, token);
  window.localStorage.setItem(VENDOR_PROFILE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(VENDOR_AUTH_EVENT));
};

export const clearVendorSession = () => {
  window.localStorage.removeItem(VENDOR_TOKEN_KEY);
  window.localStorage.removeItem(VENDOR_PROFILE_KEY);
  window.dispatchEvent(new Event(VENDOR_AUTH_EVENT));
};
