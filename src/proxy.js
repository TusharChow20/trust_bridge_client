import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isRegisterPage = req.nextUrl.pathname === "/register";
  const role = req.auth?.user?.role;
  const { pathname } = req.nextUrl;
  if (isLoggedIn && (isLoginPage || isRegisterPage)) {
    const role = req.auth?.user?.role;
    return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
  }
  const protectedRoutes = ["/sell-item", "/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn) {
    const isAdminRoute = pathname.startsWith("/dashboard/admin");
    const isUserRoute = pathname.startsWith("/dashboard/user");

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    if (isUserRoute && role !== "user") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/sell-item",
    "/dashboard/:path*",
    "/profile",
    "/login",
    "/register",
  ],
};
