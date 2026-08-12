import { NextResponse } from "next/server";
import { getPageMeta } from "@/lib/strapi";

export async function GET() {
  const pageMeta = await getPageMeta("blog-meta");

  if (!pageMeta) {
    return NextResponse.json({ error: "Blog meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
