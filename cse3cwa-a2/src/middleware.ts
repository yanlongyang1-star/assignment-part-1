import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname, search } = request.nextUrl;
  const fullUrl = `${pathname}${search}`;

  console.log(`[${new Date().toISOString()}] → ${request.method} ${fullUrl}`);

  const response = NextResponse.next();

  response.headers.set("X-Request-Start-Time", startTime.toString());
  response.headers.set("X-Request-URL", fullUrl);

  if (request.method === "GET" && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
    response.cookies.set("lastPage", pathname, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(
    `[${new Date().toISOString()}] ← ${request.method} ${fullUrl} - ${duration}ms`
  );

  return response;
}

/**
 * Configure which routes to run middleware on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
