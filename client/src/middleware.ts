import { NextRequest, NextResponse } from "next/server";
import mainAPI from "@/app/_lib/mainApi";
import { jwtDecode } from "jwt-decode";

const adminOnly = ["/admin/:path*"];
const userOnly = [""];
const guestOnly = ["/register", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("rauth")?.value || ".";
  const response = NextResponse.next();
  const access_token = await mainAPI
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

  // const is_verified = res.is_verified;

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
  if (userType != "admin" && adminOnly.find((e) => e == pathname)) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  } else if (userType != "user" && userOnly.find((e) => e == pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (userType != "guest" && guestOnly.find((e) => e == pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: [...userOnly, ...guestOnly, ...adminOnly],
};
