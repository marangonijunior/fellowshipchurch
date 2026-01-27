import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    
    // Check if user has admin role
    const allowedRoles = ["SUPER_ADMIN", "EDITOR", "AUTHOR"]
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
