export interface StrapiImage {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
  };
}

export interface WhyChooseFeature {
  id: number;
  title: string;
  description: string;
  icon?: StrapiImage;
}

export interface WhyChooseData {
  heading: string;
  subheading: string;
  features: WhyChooseFeature[];
}

export interface BusinessTypeFeature {
  id: number;
  title: string;
  icon?: StrapiImage;
}

export interface BusinessTypeData {
  heading: string;
  subheading: string;
  features: BusinessTypeFeature[];
}

export interface HeroFeature {
  id: number;
  text: string;
}

export interface HeroSectionData {
  badgeText?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: { children?: { text?: string }[] }[];
  features?: HeroFeature[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  heroImage?: StrapiImage;
}

export interface StatsItem {
  id: number;
  value: string;
  label: string;
}

export interface StatsSectionData {
  stats: StatsItem[];
}
