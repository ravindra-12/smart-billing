export interface PricingHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
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
}
