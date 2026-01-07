import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateCSRFTokenSync } from './lib/csrf'

/**
 * Middleware for CSRF protection and security headers
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add CSRF token to response for GET requests (so client can include it in subsequent requests)
  // In middleware, we can't use async cookies(), so we generate and set directly
  if (request.method === 'GET' && !request.nextUrl.pathname.startsWith('/api')) {
    const existingToken = request.cookies.get('csrf-token')?.value
    
    // Only set if token doesn't exist
    if (!existingToken) {
      const token = generateCSRFTokenSync()
      // Set token in a cookie that can be read by JavaScript for client-side requests
      response.cookies.set('csrf-token', token, {
        httpOnly: false, // Allow JavaScript to read it
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

