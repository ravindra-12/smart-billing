export interface FeatureHeroData {
  badgeText?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  dashboardValue?: string;
  dashboardGrowth?: string;
  totalBills?: string;
  customers?: string;
  pending?: string;
  profit?: string;
  chartLabel?: string;
  chartValues?: string;
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
  buttonLink?: string;
}

export interface WorkspaceCard {
  id?: number;
  eyebrow?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  note?: string;
  theme?: "light" | "dark";
  features?: { id?: number; text: string }[];
}

export interface WorkspaceSectionData {
  badgeText?: string;
  title?: string;
  description?: string;
  cards: WorkspaceCard[];
}

export interface FeaturePageData {
  hero?: FeatureHeroData;
  featureGroups?: FeatureGroup[];
  hardware?: HardwareSectionData;
  highlights?: FeatureHighlightsSectionData;
  workspace?: WorkspaceSectionData;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    shareImage?: string | null;
  } | null;
  geo?: {
    aiSummary?: unknown;
    keyTakeaways?: string;
    faqs?: { question: string; answer?: unknown }[];
  } | null;
  aeo?: {
    enableAEO?: boolean;
    schemaType?: string;
    headline?: string;
    description?: string;
    url?: string;
    image?: string | null;
    faqItems?: { question: string; answer?: string }[];
  } | null;
}
