/**
 * CSRF Protection utilities
 * For Next.js App Router API routes
 * Uses Web Crypto API for Edge Runtime compatibility
 */

import { cookies } from 'next/headers'

const CSRF_TOKEN_NAME = 'csrf-token' // HttpOnly cookie for server validation
const CSRF_TOKEN_HEADER_NAME = 'csrf-token-header' // Non-HttpOnly cookie for client-side reading
const CSRF_TOKEN_MAX_AGE = 60 * 60 * 24 // 24 hours

/**
 * Generate a CSRF token using Web Crypto API (Edge Runtime compatible)
 */
export async function generateCSRFToken(): Promise<string> {
  // Use Web Crypto API for Edge Runtime compatibility
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a CSRF token synchronously (for middleware)
 * Uses Web Crypto API which is available in Edge Runtime
 */
export function generateCSRFTokenSync(): string {
  // Use Web Crypto API for Edge Runtime compatibility
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Get or create CSRF token from cookies
 * Returns the token if it exists, creates a new one if it doesn't
 * Uses double-submit cookie pattern: HttpOnly cookie for validation, non-HttpOnly for client access
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies()
  let token = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!token) {
    token = await generateCSRFToken()
    // Set HttpOnly cookie for server-side validation (secure)
    cookieStore.set(CSRF_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: CSRF_TOKEN_MAX_AGE,
      path: '/',
    })
    // Set non-HttpOnly cookie for client-side reading (double-submit pattern)
    cookieStore.set(CSRF_TOKEN_HEADER_NAME, token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: CSRF_TOKEN_MAX_AGE,
      path: '/',
    })
  }

  return token
}

/**
 * Get CSRF token from non-HttpOnly cookie (for client-side access)
 * This is the cookie that JavaScript can read to include in requests
 */
export async function getCSRFTokenForClient(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(CSRF_TOKEN_HEADER_NAME)?.value || null
}

/**
 * Validate CSRF token from request
 * @param requestToken - Token from request header or body
 * @param cookieToken - Token from cookie
 * @returns true if valid, false otherwise
 */
export function validateCSRFToken(requestToken: string | null, cookieToken: string | null): boolean {
  if (!requestToken || !cookieToken) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  if (requestToken.length !== cookieToken.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < requestToken.length; i++) {
    result |= requestToken.charCodeAt(i) ^ cookieToken.charCodeAt(i)
  }

  return result === 0
}

/**
 * Get CSRF token from request headers
 */
export function getCSRFTokenFromRequest(headers: Headers): string | null {
  return headers.get('x-csrf-token')
}

