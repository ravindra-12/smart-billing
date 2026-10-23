import { NextRequest } from "next/server";

/** Retire the old campaign URL with an explicit HTTP 301 response. */
export function GET(request: NextRequest) {
  const destination = new URL("/festive-offer", request.url);
  destination.search = request.nextUrl.search;

  return Response.redirect(destination, 301);
}
