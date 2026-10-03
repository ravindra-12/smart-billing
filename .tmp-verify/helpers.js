"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = text;
exports.youtubeUrl = youtubeUrl;
exports.isEmbeddableVideo = isEmbeddableVideo;
exports.assetUrl = assetUrl;
function text(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return value.map(text).join(" ");
    if (value?.children)
        return text(value.children);
    return value?.text || "";
}
function youtubeUrl(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([^?&/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
function isEmbeddableVideo(url) {
    return /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))[^?&/]+/.test(url);
}
function assetUrl(value) {
    const image = value?.data ?? value;
    const url = image?.url || image?.attributes?.url;
    if (!url)
        return null;
    if (/^https?:\/\//i.test(url))
        return url;
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "").replace(/\/$/, "");
    return base ? `${base}${url.startsWith("/") ? "" : "/"}${url}` : url;
}
