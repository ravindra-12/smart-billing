import { NextResponse } from "next/server";
import { getPageMeta } from "@/lib/strapi";

export async function GET() {
  const pageMeta = await getPageMeta("home-meta");

  if (!pageMeta) {
    return NextResponse.json({ error: "Home meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
