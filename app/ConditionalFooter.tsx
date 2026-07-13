"use client";

import { usePathname } from "next/navigation";
import LegalFooter from "./LegalFooter";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/promoter")) {
    return null;
  }

  return <LegalFooter />;
}
