import { NextResponse } from "next/server";
import { getHomeMeta } from "@/lib/strapi";

export async function GET() {
  const pageMeta = await getHomeMeta();

  if (!pageMeta) {
    return NextResponse.json({ error: "Home meta not found." }, { status: 404 });
  }

  return NextResponse.json(pageMeta);
}
