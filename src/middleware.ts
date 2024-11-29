import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')

  if (request.nextUrl.pathname.startsWith('/')) {
    if (!token) {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }
}

// Protect route
export const config = {
  matcher: ['/', '/cart', '/favourites'],
}
