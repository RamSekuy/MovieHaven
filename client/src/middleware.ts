import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import ssrMainApi from "./app/_lib/axios/ssrMainApi";

const guestOnly = ["/register", "/login", "/forgot"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("rauth")?.value || ".";
  const response = NextResponse.next();
  const access_token = await ssrMainApi()
    .get("/user/validate", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      response.cookies.set("aauth", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      response.cookies.delete("aauth");
      response.cookies.delete("rauth");
      return false;
    });

  let userType = "guest";
  if (access_token) {
    const decodedToken: any = jwtDecode(access_token);
    userType =
      decodedToken?.isActive != undefined
        ? "admin"
        : decodedToken?.referalCode != undefined
        ? "user"
        : "guest";
  }
  //Route Protection
  if (
    (userType != "admin" && pathname.startsWith("/admin/")) ||
    pathname == "admin-register"
  ) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  } else if (userType == "admin" && pathname == "/admin-login") {
    return NextResponse.redirect(new URL("/admin/chart", request.url));
  } else if (
    userType != "user" &&
    (pathname.startsWith("/chekOut/") || pathname.endsWith("/ticket"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (userType == "user" && guestOnly.find((e) => e == pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    "/register",
    "/login",
    "/forgot",
    "/admin/:path*",
    "/:path*/ticket",
    "/chekOut/:path*",
  ],
};
