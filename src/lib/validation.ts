import { z } from 'zod'

/**
 * Validation schema for search queries
 * Allows alphanumeric characters, spaces, hyphens, and underscores
 * Maximum length: 100 characters
 */
export const searchQuerySchema = z.object({
  q: z.string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query too long')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Invalid characters in search query')
    .transform(val => val.trim().toLowerCase())
})

/**
 * Sanitize input string to prevent injection attacks
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, maxLength) // Enforce max length
}

/**
 * Validate and sanitize search query
 */
export function validateSearchQuery(query: string | null | undefined): string | null {
  if (!query) {
    return null
  }

  const result = searchQuerySchema.safeParse({ q: query })
  
  if (!result.success) {
    return null
  }

  return result.data.q
}

