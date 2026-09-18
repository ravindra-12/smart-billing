import { NextResponse } from "next/server";
import { getPageMeta } from "@/lib/strapi";

const FEATURE_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[featureGroups][populate][items][populate]=*&populate[hardware][populate][items][populate]=*&populate[highlights][populate][aiItems][populate]=*&populate[highlights][populate][businessItems]=*&populate[workspace][populate][cards][populate][features]=*";

export async function GET() {
  const pageMeta = await getPageMeta("feature-page", FEATURE_PAGE_POPULATE);

  if (!pageMeta) {
    return NextResponse.json({ error: "Feature meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
