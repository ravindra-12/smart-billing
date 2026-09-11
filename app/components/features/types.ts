export interface FeatureHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export interface TextCard {
  id?: number;
  icon?: string;
  title: string;
  description?: string;
}

export interface FeatureGroup {
  id?: number;
  title: string;
  tone?: "green" | "blue" | "purple";
  items: TextCard[];
}

export interface FeaturesListSectionData {
  groups: FeatureGroup[];
}

export interface HardwareSectionData {
  heading?: string;
  subheading?: string;
  items: TextCard[];
}

export interface FeatureHighlightsSectionData {
  aiHeading?: string;
  aiItems: TextCard[];
  businessHeading?: string;
  businessItems: { id?: number; text: string }[];
  buttonText?: string;
}
