import { NextResponse } from "next/server";
import { getPageMeta } from "@/lib/strapi";

const PRICING_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[plans][populate][plans][populate][features]=*&populate[plans][populate][trustItems]=*&populate[steps][populate][steps]=*&populate[bottom][populate]=*&populate[workspace][populate][cards][populate][features]=*";

export async function GET() {
  const pageMeta = await getPageMeta("pricing-page", PRICING_PAGE_POPULATE);

  if (!pageMeta) {
    return NextResponse.json({ error: "Pricing meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
