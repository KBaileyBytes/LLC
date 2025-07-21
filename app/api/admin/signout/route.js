import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL(
      "/signIn",
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    )
  );

  response.cookies.set("admin-auth", "", {
    path: "/admin",
    maxAge: 0,
  });

  return response;
}
