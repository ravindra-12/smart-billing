import { NextRequest } from "next/server";

/** Retire the old Hindi campaign URL with an explicit HTTP 301 response. */
export function GET(request: NextRequest) {
  const destination = new URL("https://smartbillinglite.in/festive-offer-hindi");
  destination.search = request.nextUrl.search;

  return Response.redirect(destination, 301);
}
