export interface StrapiImage {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
  };
}

export interface HeroBlock {
  badgeText?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  heroImage?: StrapiImage | null;
}

export interface StatsItem {
  id: number;
  value: string;
  label: string;
}

export interface StatsBlock {
  items: StatsItem[];
}

export interface WorkspaceCardFeature {
  id: number;
  text: string;
}

export interface WorkspaceCard {
  id: number;
  eyebrow?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  note?: string;
  theme?: "light" | "dark";
  features: WorkspaceCardFeature[];
}

export interface WorkspaceBlock {
  badgeText?: string;
  title?: string;
  description?: string;
  cards: WorkspaceCard[];
}

export interface VideoItem {
  id: number;
  badgeText?: string;
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnail?: StrapiImage | null;
}

export interface VideosBlock {
  badgeText?: string;
  title?: string;
  description?: string;
  videos: VideoItem[];
}

export interface BusinessTypeItem {
  id: number;
  title: string;
  icon?: StrapiImage | null;
}

export interface BusinessTypesBlock {
  badgeText?: string;
  title?: string;
  description?: string;
  items: BusinessTypeItem[];
}

export interface WhyChooseFeature {
  id: number;
  title: string;
  description: string;
  icon?: StrapiImage | null;
}

export interface WhyChooseBlock {
  badgeText?: string;
  title?: string;
  description?: string;
  features: WhyChooseFeature[];
}

export interface AppDownloadBlock {
  badgeText?: string;
  title?: string;
  description?: string;
  version?: string;
  size?: string;
  requirements?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface HomeData {
  hero?: HeroBlock;
  stats?: StatsBlock;
  workspace?: WorkspaceBlock;
  videos?: VideosBlock;
  businessTypes?: BusinessTypesBlock;
  whyChoose?: WhyChooseBlock;
  appDownload?: AppDownloadBlock;
  seo?: Record<string, unknown>;
  geo?: Record<string, unknown>;
  aeo?: Record<string, unknown>;
}
