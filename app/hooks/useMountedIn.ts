"use client";

import { useEffect, useState } from "react";

/** True one animation frame after mount — for a fade/slide-in entrance on above-the-fold content. */
export function useMountedIn() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}
