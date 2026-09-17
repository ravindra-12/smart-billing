"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { HomeData } from "@/app/components/home/types";

const POPULATE =
  "populate[seo][populate]=*" +
  "&populate[geo][populate]=*" +
  "&populate[aeo][populate]=*" +
  "&populate[hero][populate]=*" +
  "&populate[workspace][populate][cards][populate][features]=*" +
  "&populate[videos][populate][videos][populate]=*" +
  "&populate[businessTypes][populate][items][populate]=*" +
  "&populate[whyChoose][populate][features][populate]=*" +
  "&populate[appDownload][populate]=*" +
  "&populate[stats][populate][items]=*";

export function useHomeData(locale: string) {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        let response;
        try {
          response = await api.get(`/api/home?${POPULATE}&locale=${locale}`);
        } catch {
          // This locale may not have a translated /api/home entry yet — fall back to English
          // rather than leaving the whole page blank.
          if (locale !== "en") {
            response = await api.get(`/api/home?${POPULATE}&locale=en`);
          } else {
            throw new Error("home fetch failed");
          }
        }
        if (!cancelled) setData(response.data.data);
      } catch (err) {
        console.error("Strapi fetch error [/api/home]:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [locale]);

  return { data, loading };
}
