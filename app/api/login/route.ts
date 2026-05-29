import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.PORTAL_PASSWORD) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("auth_token", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
