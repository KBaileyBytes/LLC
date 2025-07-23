import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/signIn", "https://llc-drab.vercel.app/signIn")
  );

  response.cookies.set("admin-auth", "", {
    path: "/admin",
    maxAge: 0,
  });

  return response;
}
