import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/admin",
  "/client",
  "/freelancer",
  "/moderator",
];

const authRoutes = ["/auth"];

const roleDashboard: Record<string, string> = {
  admin: "/admin/dashboard",
  client: "/client/dashboard",
  freelancer: "/freelancer/dashboard",
  moderator: "/moderator/dashboard",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  
  if (isAuthRoute && token) {
    try {
      
      const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}/auth/me`,
        {
          headers: {
            Cookie: request.headers.get("cookie") ?? "",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        
        return NextResponse.next();
      }

      const data: { user?: { role?: string } } = await response.json();

      const dashboard = data.user?.role
        ? roleDashboard[data.user.role]
        : undefined;

      if (!dashboard) {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      }

      return NextResponse.redirect(
        new URL(dashboard, request.url)
      );
    } catch (error) {
      console.error("Failed to verify the access token:", error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/admin/:path*",
    "/client/:path*",
    "/freelancer/:path*",
    "/moderator/:path*",
  ],
};