import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

async function verifySessionCookie(cookie: string | undefined) {
    if (!cookie) {
        return false;
    }
    try {
        await getAuth().verifySessionCookie(cookie, true);
        return true;
    } catch (error) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('auth_token')?.value;
  const isAuthenticated = await verifySessionCookie(authToken);

  // If the user is trying to access the studio but is not authenticated,
  // redirect them to the login page.
  if (pathname.startsWith('/studio') && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname) // Optionally pass the original path
    return NextResponse.redirect(loginUrl)
  }
  
  // If the user is authenticated and tries to visit login, signup, or the root,
  // redirect them to the studio.
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
      return NextResponse.redirect(new URL('/studio', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*', '/login', '/signup', '/'],
}
