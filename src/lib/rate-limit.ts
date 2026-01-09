/**
 * Distributed rate limiting with Upstash Redis
 * Falls back to in-memory rate limiting if Redis is not configured
 */

import { Redis } from '@upstash/redis'

interface RateLimitRecord {
  count: number
  resetAt: number
}

// In-memory fallback for development or when Redis is not configured
const requestCounts = new Map<string, RateLimitRecord>()

// Clean up old entries every 5 minutes (in-memory only)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of requestCounts.entries()) {
      if (now > record.resetAt) {
        requestCounts.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

// Initialize Redis client if credentials are available
let redis: Redis | null = null
try {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
  
  if (redisUrl && redisToken) {
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    })
  }
} catch (error) {
  console.warn('Failed to initialize Upstash Redis, falling back to in-memory rate limiting:', error)
}

/**
 * Check if a request should be rate limited
 * Uses Upstash Redis if configured, otherwise falls back to in-memory
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed status, remaining requests, and reset time
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  // Use Redis if available (production/distributed)
  if (redis) {
    try {
      const key = `ratelimit:${identifier}`
      const windowSeconds = Math.ceil(windowMs / 1000)
      
      // Increment counter
      const count = await redis.incr(key)
      
      // Set expiration on first request
      if (count === 1) {
        await redis.expire(key, windowSeconds)
      }
      
      // Get TTL to calculate reset time
      const ttl = await redis.ttl(key)
      const resetAt = Date.now() + (ttl * 1000)
      
      return {
        allowed: count <= maxRequests,
        remaining: Math.max(0, maxRequests - count),
        resetAt,
      }
    } catch (error) {
      // If Redis fails, fall back to in-memory
      console.error('Redis rate limiting failed, falling back to in-memory:', error)
      return checkRateLimitInMemory(identifier, maxRequests, windowMs)
    }
  }
  
  // Fallback to in-memory rate limiting
  return checkRateLimitInMemory(identifier, maxRequests, windowMs)
}

/**
 * In-memory rate limiting (fallback)
 */
function checkRateLimitInMemory(
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

