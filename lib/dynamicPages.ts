/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "").replace(/\/$/, "");

export type DynamicPage = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    shareImage?: { url?: string } | string | null;
  } | null;
  geo?: unknown;
  aeo?: unknown;
  blocks?: DynamicBlock[];
};

export type DynamicBlock = {
  id?: number;
  __component: string;
  [key: string]: any;
};

function unwrap<T>(value: T): T {
  const data = (value as any)?.data;
  return (data ?? value) as T;
}

async function request(path: string) {
  if (!API_BASE_URL) return null;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Dynamic page API error:", error);
    return null;
  }
}

export async function getDynamicPages(): Promise<DynamicPage[]> {
  const json = await request("/api/dynamic-pages");
  const data = Array.isArray(json?.data) ? json.data : [];
  return data.map((item: any) => unwrap<DynamicPage>(item)).filter((page: DynamicPage) => page?.slug && page?.title);
}

export async function getDynamicPage(slug: string): Promise<DynamicPage | null> {
  const query = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[blocks][populate]": "",
    "populate[seo][populate]": "*",
    "populate[geo][populate]": "*",
    "populate[aeo][populate]": "*",
  });
  const json = await request(`/api/dynamic-pages?${query.toString()}`);
  const item = Array.isArray(json?.data) ? json.data[0] : null;
  return item ? unwrap<DynamicPage>(item) : null;
}
