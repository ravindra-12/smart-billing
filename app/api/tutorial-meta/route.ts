import { NextResponse } from "next/server";
import { getPageMeta } from "@/lib/strapi";

const TUTORIAL_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[videos][populate][videos][populate]=*";

export async function GET() {
  const pageMeta = await getPageMeta("tutorial", TUTORIAL_PAGE_POPULATE);

  if (!pageMeta) {
    return NextResponse.json({ error: "Tutorial meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
