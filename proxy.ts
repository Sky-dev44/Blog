import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

//define protected routes ->  /profile, /post/create, /post/edit/1
const protectedRoutes = ["/profile", "/post/create", "/post/edit"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const session = getSessionCookie(request);

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathName.startsWith(route),
  );

  if (isProtectedRoutes && !session) {
    //redirected the user to the auth page
    //because user is not logged in
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  //if user is already logged in and user is accessing auth route
  //they will automatically redirect to homepage
  if (pathName === "/auth" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    // "/post/:slug",
    "/post/create",
    "/post/edit/:path*",
    "/auth",
  ],
};
