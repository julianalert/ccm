import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { handleApiError } from '@/lib/errors'
import { checkRateLimit, getClientIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { validateRequestSize } from '@/lib/request-limits'
import { getCachedValue, CacheTags } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    // Validate request size
    const sizeValidation = validateRequestSize(request)
    if (!sizeValidation.valid) {
      return NextResponse.json(
        { error: sizeValidation.error || 'Request too large' },
        { status: 413 }
      )
    }

    // Rate limiting (more permissive for list endpoint)
    const clientId = getClientIdentifier(request)
    const rateLimit = await checkRateLimit(
      clientId,
      rateLimitConfig.default.maxRequests, // 100 requests per minute
      rateLimitConfig.default.windowMs
    )

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitConfig.default.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    let limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = (page - 1) * limit

    // Validate pagination parameters
    // Supabase PostgREST has a default max of 1000 rows per query
    // We cap at 1000 to ensure compatibility
    if (page < 1 || limit < 1 || limit > 1000) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters. Limit must be between 1 and 1000.' },
        { status: 400 }
      )
    }
    
    // Cap limit at 1000 for Supabase compatibility
    limit = Math.min(limit, 1000)

    // Cache the query result to reduce database load
    // Cache key includes page and limit for proper pagination
    const cacheKey = `crypto-list:page:${page}:limit:${limit}`
    
    const result = await getCachedValue(
      cacheKey,
      async () => {
        const supabase = createServerClient()

        // Get total count (cached separately)
        const { count } = await supabase
          .from('cryptocurrencies')
          .select('*', { count: 'exact', head: true })

        // Get paginated data
        const { data, error } = await supabase
          .from('cryptocurrencies')
          .select('id, cmc_id, name, symbol, slug, cmc_rank, logo, quote')
          .order('cmc_rank', { ascending: true, nullsFirst: false })
          .range(offset, offset + limit - 1)

        if (error) {
          throw error
        }

        return {
          data: data || [],
          total: count || 0,
          page,
          limit,
          totalPages: Math.ceil((count || 0) / limit),
        }
      },
      {
        tags: [CacheTags.CRYPTO_LIST],
        revalidate: 60, // 1 minute - shorter cache for list view
      }
    )

    return NextResponse.json(
      result,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Limit': rateLimitConfig.default.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
        },
      }
    )
  } catch (error) {
    console.error('Error in /api/cryptocurrencies/list:', error)
    // Return more detailed error for debugging
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, details: error.stack },
        { status: 500 }
      )
    }
    return handleApiError(error)
  }
}

