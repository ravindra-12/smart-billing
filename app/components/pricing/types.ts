export interface PricingHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
}

export interface PricingWorkspaceData {
  badgeText?: string;
  title?: string;
  description?: string;
  cards: {
    id?: number;
    eyebrow?: string;
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    note?: string;
    theme?: "light" | "dark";
    features?: TextItem[];
  }[];
}

export interface TextItem {
  id?: number;
  text: string;
}

export interface PricingPlan {
  id?: number;
  name: string;
  price: string;
  duration?: string;
  tag?: string;
  color?: "green" | "blue" | "orange";
  icon?: string;
  button?: string;
  features: TextItem[];
}

export interface PricingPlansSectionData {
  plans: PricingPlan[];
  trustItems: TextItem[];
}

export interface StepCard {
  id?: number;
  icon?: string;
  title: string;
  description?: string;
}

export interface PricingStepsSectionData {
  badgeText?: string;
  heading?: string;
  subheading?: string;
  steps: StepCard[];
}

export interface PricingBottomSectionData {
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
  testimonialBenefits: TextItem[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimaryButtonText?: string;
  ctaSecondaryButtonText?: string;
  ctaPrimaryButtonLink?: string;
  ctaSecondaryButtonLink?: string;
}

export interface PricingPageData {
  hero?: PricingHeroData;
  plans?: PricingPlansSectionData;
  steps?: PricingStepsSectionData;
  bottom?: PricingBottomSectionData;
  workspace?: PricingWorkspaceData;
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string; canonicalUrl?: string; shareImage?: string | null } | null;
  geo?: { aiSummary?: unknown; faqs?: { question: string; answer?: unknown }[] } | null;
  aeo?: { enableAEO?: boolean; schemaType?: string; headline?: string; description?: string; url?: string; image?: string | null; faqItems?: { question: string; answer?: string }[] } | null;
}
