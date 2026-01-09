/**
 * Caching utilities for database queries
 * Uses Upstash Redis if available, falls back to Next.js unstable_cache
 */

import { Redis } from '@upstash/redis'
import { unstable_cache } from 'next/cache'

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
  console.warn('Failed to initialize Upstash Redis for caching, using Next.js cache:', error)
}

interface CacheOptions {
  tags?: string[]
  revalidate?: number // Time in seconds
}

/**
 * Get cached value from Redis or Next.js cache
 * Works in both Server Components and API Route Handlers
 */
export async function getCachedValue<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const { tags = [], revalidate = 300 } = options // Default 5 minutes

  // If Redis is available, use it for distributed caching
  if (redis) {
    try {
      const cached = await redis.get<T>(`cache:${key}`)
      if (cached !== null) {
        return cached
      }

      // Cache miss - fetch and store
      const data = await fetcher()
      await redis.set(`cache:${key}`, data, {
        ex: revalidate, // Expiration in seconds
      })
      return data
    } catch (error) {
      console.error('Redis cache error, falling back to direct fetch:', error)
      // Fall through to direct fetch (or Next.js cache if in Server Component)
    }
  }

  // For API route handlers, unstable_cache might not work reliably
  // Check if we're in a route handler context by trying to use unstable_cache
  // If it fails, just fetch directly
  try {
    // Use Next.js unstable_cache for Server Components
    // This works in Server Components but may not work in all route handler contexts
    const cachedFetcher = unstable_cache(
      fetcher,
      [key],
      {
        tags,
        revalidate,
      }
    )

    return cachedFetcher()
  } catch (error) {
    // If unstable_cache fails (e.g., in route handlers), fetch directly
    // This is acceptable since Redis cache will handle most caching in production
    console.warn('unstable_cache not available, fetching directly:', error)
    return fetcher()
  }
}

/**
 * Invalidate cache by tag or key
 */
export async function invalidateCache(tag?: string, key?: string): Promise<void> {
  if (tag && typeof import('next/cache').then !== 'undefined') {
    // Next.js cache invalidation by tag
    const { revalidateTag } = await import('next/cache')
    revalidateTag(tag)
  }

  if (redis && key) {
    try {
      await redis.del(`cache:${key}`)
    } catch (error) {
      console.error('Failed to invalidate Redis cache:', error)
    }
  }
}

/**
 * Cache tags for different data types
 */
export const CacheTags = {
  CRYPTO_LIST: 'crypto-list',
  CRYPTO_DETAIL: 'crypto-detail',
  CRYPTO_SEARCH: 'crypto-search',
  SITEMAP: 'sitemap',
} as const

