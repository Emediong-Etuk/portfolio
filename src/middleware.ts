import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

const PROTECTED_API_PREFIXES = ["/api/projects", "/api/profile"];
const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (pathname.startsWith("/admin/dashboard")) {
    const valid = await verifySessionToken(token);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtectedApi && MUTATING_METHODS.has(request.method)) {
    const valid = await verifySessionToken(token);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/projects/:path*", "/api/profile/:path*"],
};
