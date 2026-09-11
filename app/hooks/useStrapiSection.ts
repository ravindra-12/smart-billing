"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useStrapiSection<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await api.get(endpoint);
        if (!cancelled) setData(response.data.data);
      } catch (err) {
        console.error(`Strapi fetch error [${endpoint}]:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [endpoint]);

  return { data, loading };
}
