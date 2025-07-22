import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a placeholder for a real authentication check.
// In a real app, you'd check a session cookie or token here.
const isAuthenticated = (req: NextRequest) => {
    // For demonstration purposes, we'll use a simple cookie check.
    // In a real app, verify a JWT or session from a backend.
    return req.cookies.has('auth_token');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the user is trying to access the studio but is not authenticated,
  // redirect them to the login page.
  if (pathname.startsWith('/studio') && !isAuthenticated(request)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname) // Optionally pass the original path
    return NextResponse.redirect(loginUrl)
  }
  
  // If the user is authenticated and tries to visit login or signup,
  // redirect them to the studio.
  if (isAuthenticated(request) && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
      return NextResponse.redirect(new URL('/studio', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*', '/login', '/signup', '/'],
}
