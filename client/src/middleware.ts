import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import ssrMainApi from "./app/_lib/axios/ssrMainApi";

const adminOnly = ["/admin/:path*"];
const userOnly = [""];
const guestOnly = ["/register", "/login"];

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
  if (userType != "admin" && pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  } else if (userType != "user" && pathname.startsWith("/chekOut/INV")) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (userType != "guest" && guestOnly.find((e) => e == pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: [...userOnly, ...guestOnly, ...adminOnly],
};
