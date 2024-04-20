import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  if (isProtectedFromLoggedIn(req) && auth().userId) {
    let path = '/select-org';
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }
    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection)
  }
  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }
});

const isProtectedRoute = createRouteMatcher([
  '/protected(.*)',
  '/organization(.*)',
]);

const isProtectedFromLoggedIn = createRouteMatcher([
  '/'
])

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};