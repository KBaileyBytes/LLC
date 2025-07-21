import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  try {
    if (
      email === process.env.EMAIL_SIGNIN &&
      password === process.env.EMAIL_PASSWORD
    ) {
      const response = NextResponse.json(
        { message: "Successfully signed in" },
        { status: 200 }
      );

      response.cookies.set("admin-auth", "true", {
        httpOnly: true,
        path: "/admin",
        maxAge: 60 * 60 * 24 * 31, // 31 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // only true in prod
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "Failed to sign in" },
        { status: 401 }
      );
    }
  } catch (e) {
    return NextResponse.json({ message: `Error: ${e}` }, { status: 500 });
  }
}
