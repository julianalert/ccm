/**
 * Request size and validation limits
 */

export const REQUEST_LIMITS = {
  // Maximum body size in bytes (1MB)
  MAX_BODY_SIZE: 1024 * 1024,
  
  // Maximum query string length
  MAX_QUERY_LENGTH: 2048,
  
  // Maximum number of query parameters
  MAX_QUERY_PARAMS: 50,
  
  // Maximum URL length
  MAX_URL_LENGTH: 2048,
  
  // Maximum header size (approximate)
  MAX_HEADER_SIZE: 8192,
} as const

/**
 * Validate request size
 */
export function validateRequestSize(request: Request): { valid: boolean; error?: string } {
  const contentLength = request.headers.get('content-length')
  
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    if (isNaN(size) || size > REQUEST_LIMITS.MAX_BODY_SIZE) {
      return {
        valid: false,
        error: `Request body too large. Maximum size is ${REQUEST_LIMITS.MAX_BODY_SIZE / 1024}KB`,
      }
    }
  }

  // Check URL length
  if (request.url.length > REQUEST_LIMITS.MAX_URL_LENGTH) {
    return {
      valid: false,
      error: `URL too long. Maximum length is ${REQUEST_LIMITS.MAX_URL_LENGTH} characters`,
    }
  }

  return { valid: true }
}

/**
 * Get request size from headers
 */
export function getRequestSize(request: Request): number {
  const contentLength = request.headers.get('content-length')
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    return isNaN(size) ? 0 : size
  }
  return 0
}

