const API_BASE_URL = 'https://api.smartbillinglite.com/api';

export const PROMOTER_TOKEN_KEY = 'smartbilling_promoter_token';
export const PROMOTER_PROFILE_KEY = 'smartbilling_promoter_profile';
export const PROMOTER_AUTH_EVENT = 'smartbilling-promoter-auth-change';

export interface Promoter {
  id: number;
  user_id: number;
  name: string;
  mobile: string;
  city: string | null;
  upi_id: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  is_registered: boolean;
}

export interface RegisterPayload {
  name: string;
  mobile: string;
  otp: string;
  city?: string;
  upi_id?: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
  promoter: Promoter;
  referral_code: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    role: string;
    city: string | null;
  };
  promoter: Promoter;
}

export interface MyCodeResponse {
  referral_code: string;
  share_link: string;
  share_message: string;
}

export interface PromoterDashboard {
  referral_code: string;
  total_referrals: number;
  premium_purchases: number;
  pending_rewards: string;
  approved_rewards: string;
  paid_rewards: string;
  total_earnings: string;
}

export type EarningStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

export interface PromoterEarning {
  id: number;
  amount: string;
  status: EarningStatus;
  eligible_at: string | null;
  approved_at: string | null;
  paid_at: string | null;
  payout_method: string | null;
  referred_vendor_name: string;
  referred_vendor_phone: string;
  purchased_at: string | null;
  created_at: string;
}

export type PromoterReferralStatus = 'pending' | 'premium_purchased' | 'expired' | 'cancelled';

export type PromoterRewardStatus = 'none' | 'pending' | 'approved' | 'paid' | 'cancelled';

export interface PromoterReferral {
  id: number;
  referred_name: string;
  referred_phone: string;
  status: PromoterReferralStatus;
  referred_at: string | null;
  premium_purchased_at: string | null;
  reward_status: PromoterRewardStatus;
  reward_amount: string;
}

export interface UpdateProfilePayload {
  name?: string;
  city?: string;
  upi_id?: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  promoter: Promoter;
}

export class PromoterApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'PromoterApiError';
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
    throw new PromoterApiError(message, response.status);
  }

  return data as T;
}

export const sendOtp = (phone: string) =>
  request<SendOtpResponse>('/auth/send-otp', { method: 'POST', body: { phone } });

export const promoterLogin = (mobile: string, otp: string) =>
  request<LoginResponse>('/promoter/login', { method: 'POST', body: { mobile, otp } });

export const promoterRegister = (payload: RegisterPayload) =>
  request<RegisterResponse>('/promoter/register', { method: 'POST', body: payload });

export const getMyCode = (token: string) =>
  request<MyCodeResponse>('/promoter/my-code', { token });

export const getDashboard = (token: string) =>
  request<PromoterDashboard>('/promoter/dashboard', { token });

export const getEarnings = (token: string) =>
  request<PromoterEarning[]>('/promoter/earnings', { token });

export const getReferrals = (token: string) =>
  request<PromoterReferral[]>('/promoter/referrals', { token });

export const updateProfile = (token: string, payload: UpdateProfilePayload) =>
  request<UpdateProfileResponse>('/promoter/profile', { method: 'PUT', body: payload, token });

export const getPromoterToken = () =>
  window.localStorage.getItem(PROMOTER_TOKEN_KEY);

export const getStoredPromoter = (): Promoter | null => {
  const raw = window.localStorage.getItem(PROMOTER_PROFILE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Promoter;
  } catch {
    return null;
  }
};

export const savePromoterSession = (token: string, promoter: Promoter) => {
  window.localStorage.setItem(PROMOTER_TOKEN_KEY, token);
  window.localStorage.setItem(PROMOTER_PROFILE_KEY, JSON.stringify(promoter));
  window.dispatchEvent(new Event(PROMOTER_AUTH_EVENT));
};

export const clearPromoterSession = () => {
  window.localStorage.removeItem(PROMOTER_TOKEN_KEY);
  window.localStorage.removeItem(PROMOTER_PROFILE_KEY);
  window.dispatchEvent(new Event(PROMOTER_AUTH_EVENT));
};
