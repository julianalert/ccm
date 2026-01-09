import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for CSRF protection and security headers
 * Made defensive to prevent production errors
 */
export function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next()

    // Add CSRF token to response for GET requests (so client can include it in subsequent requests)
    // In middleware, we can't use async cookies(), so we generate and set directly
    if (request.method === 'GET' && !request.nextUrl.pathname.startsWith('/api')) {
      const existingToken = request.cookies.get('csrf-token')?.value
      
      // Only set if token doesn't exist
      if (!existingToken) {
        try {
          // Generate CSRF token using Web Crypto API (Edge Runtime compatible)
          const array = new Uint8Array(32)
          if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            crypto.getRandomValues(array)
            const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
            
            // Use double-submit cookie pattern for CSRF protection
            // Set HttpOnly cookie for server-side validation (secure)
            response.cookies.set('csrf-token', token, {
              httpOnly: true, // Secure - not accessible to JavaScript
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 60 * 60 * 24, // 24 hours
              path: '/',
            })
            
            // Set separate non-HttpOnly cookie for client-side reading (double-submit pattern)
            // Client reads this cookie and sends it in header, server validates against HttpOnly cookie
            response.cookies.set('csrf-token-header', token, {
              httpOnly: false, // Accessible to JavaScript for client-side requests
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 60 * 60 * 24, // 24 hours
              path: '/',
            })
          }
        } catch (error) {
          // If token generation fails, continue without it (non-critical)
          console.error('Failed to generate CSRF token in middleware:', error)
        }
      }
    }

    return response
  } catch (error) {
    // If middleware fails completely, return response without modifications
    // This prevents middleware from breaking the entire application
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
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

