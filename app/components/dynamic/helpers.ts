/* eslint-disable @typescript-eslint/no-explicit-any */

export function text(value: any): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(text).join(" ");
  if (value?.children) return text(value.children);
  return value?.text || "";
}

export function youtubeUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export function isEmbeddableVideo(url: string) {
  return /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))[^?&/]+/.test(url);
}

export function assetUrl(value: any) {
  const image = value?.data ?? value;
  const url = image?.url || image?.attributes?.url;
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "").replace(/\/$/, "");
  return base ? `${base}${url.startsWith("/") ? "" : "/"}${url}` : url;
}
