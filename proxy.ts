import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/"];

// Check exact public route
const isPublicRoute = (pathname: string) => {
  return PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
};

// Check auth route
const isAuthRoute = (pathname: string) => {
  return AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken =
    request.cookies.get("accessToken")?.value ?? null;

  const refreshToken =
    request.cookies.get("refreshToken")?.value ?? null;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  /**
   * Response আগে তৈরি করছি।
   * নতুন accessToken / delete cookie এই response-এর মাধ্যমে পাঠাবো।
   */
  const response = NextResponse.next();

  /**
   * Access token expired কিন্তু refresh token valid
   */
  if (
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success
  ) {
    try {
      const result = await getNewAccessToken();

      if (result.success && result.data?.accessToken) {
        const newAccessToken = result.data.accessToken;

        accessToken = newAccessToken;

        decodedAccessToken = jwtUtils.verifyToken(
          newAccessToken,
          process.env.JWT_ACCESS_SECRET as string
        );

        response.cookies.set(
          "accessToken",
          newAccessToken,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
          }
        );
      } else {
        /**
         * Refresh token কাজ করেনি
         */
        accessToken = null;
        decodedAccessToken = null;

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
      }
    } catch (error) {
      console.error(
        "Refresh access token error:",
        error
      );

      accessToken = null;
      decodedAccessToken = null;

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }
  }

  /**
   * Access token এবং refresh token দুটোই invalid
   */
  if (!decodedAccessToken?.success) {
    accessToken = null;

    response.cookies.delete("accessToken");

    /**
     * Refresh token-ও invalid হলে সেটাও delete
     */
    if (refreshToken && !decodedRefreshToken?.success) {
      response.cookies.delete("refreshToken");
    }
  }

  /**
   * User role বের করা
   */
  let userRole: string | null = null;

  if (
    decodedAccessToken?.success &&
    decodedAccessToken.data
  ) {
    userRole =
      (decodedAccessToken.data as JwtPayload).role
        ?.toString()
        .toUpperCase() ?? null;
  }

  /**
   * Logged-in user login/register page-এ গেলে
   * dashboard-এ পাঠাবে
   */
  if (accessToken && isAuthRoute(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/technician-dashboard", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  /**
   * Protected route
   *
   * Login করা নেই এবং public/auth route-ও না
   * তাহলে login page-এ পাঠাবে
   */
  if (
    !accessToken &&
    !isPublicRoute(pathname) &&
    !isAuthRoute(pathname)
  ) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "redirectTo",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  /**
   * CUSTOMER authorization
   */
  if (
    pathname.startsWith("/dashboard") &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  /**
   * ADMIN authorization
   */
  if (
    pathname.startsWith("/admin-dashboard") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  /**
   * TECHNICIAN authorization
   */
  if (
    pathname.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};