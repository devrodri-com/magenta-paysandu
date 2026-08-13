import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { shouldSendNoindexHeader } from "@/config/seo";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (
    shouldSendNoindexHeader(
      request.nextUrl.pathname,
      request.headers.get("host"),
      process.env,
      { portfolioHasContent: PORTFOLIO_ITEMS.length > 0 },
    )
  ) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api(?:/|$)|_next(?:/|$)|robots\\.txt$|sitemap\\.xml$|manifest\\.webmanifest$|favicon\\.ico$|.*\\.(?:css|js|map|json|xml|txt|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf)$).*)",
  ],
};
