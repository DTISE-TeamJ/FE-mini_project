import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((request) => {
  const { auth: token, nextUrl } = request;
  const isLoggedIn = !!token;

  const isAuthPage = nextUrl.pathname.startsWith("/auth/");
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
  
  if (isAuthPage) {
    if (isLoggedIn) {
      // User is logged in, redirect away from auth pages
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to auth pages for logged-out users
    return NextResponse.next();
  }

  if (isDashboardPage) {
    if (!isLoggedIn) {
      // User is not logged in, redirect to login page
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    if (token?.user?.role !== "ADMIN") {
      // User is not an admin, redirect to unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // User is an admin, allow access to dashboard
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
}) as any; // 'as any' is used here to bypass TypeScript errors, but it's not ideal

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
