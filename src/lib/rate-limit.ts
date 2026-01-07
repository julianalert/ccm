/**
 * Simple in-memory rate limiting
 * For production, consider using Upstash Redis or Vercel Edge Config
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

const requestCounts = new Map<string, RateLimitRecord>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetAt) {
      requestCounts.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed status, remaining requests, and reset time
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  // No existing record or window expired
  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs }
  }

  // Rate limit exceeded
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt }
  }

  // Increment count
  record.count++
  return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt }
}

/**
 * Get client identifier from request
 * Tries IP address from various headers
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback to a default identifier
  return 'unknown'
}

/**
 * Rate limit configurations for different endpoints
 */
export const rateLimitConfig = {
  search: {
    maxRequests: 30, // 30 requests
    windowMs: 60 * 1000, // per minute
  },
  sync: {
    maxRequests: 5, // 5 requests
    windowMs: 60 * 60 * 1000, // per hour
  },
  default: {
    maxRequests: 100, // 100 requests
    windowMs: 60 * 1000, // per minute
  },
}

