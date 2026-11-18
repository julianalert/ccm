import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { handleApiError } from '@/lib/errors'
import { checkRateLimit, getClientIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { validateRequestSize } from '@/lib/request-limits'
import { getCachedValue, CacheTags } from '@/lib/cache'
import { LIST_PROJECTION, toListItem } from '@/lib/db/cryptocurrencies'

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
    // "slim" marks the trimmed row shape so older cached entries are not reused
    const cacheKey = `crypto-list:slim:page:${page}:limit:${limit}`
    
    // The total only changes when the sync adds/removes coins, so count once
    // per cache window instead of once per page request.
    const getTotalCount = () =>
      getCachedValue<number>(
        'crypto-list:count',
        async () => {
          const supabase = createServerClient()
          const { count, error } = await supabase
            .from('cryptocurrencies')
            .select('id', { count: 'exact', head: true })

          if (error) {
            throw error
          }

          return count || 0
        },
        {
          tags: [CacheTags.CRYPTO_LIST],
          revalidate: 300, // 5 minutes
        }
      )

    const result = await getCachedValue(
      cacheKey,
      async () => {
        const supabase = createServerClient()

        // Get paginated data
        const [count, { data, error }] = await Promise.all([
          getTotalCount(),
          supabase
            .from('cryptocurrencies')
            // Only the EUR figures the table shows, not the whole quote object
            .select(LIST_PROJECTION)
            .order('cmc_rank', { ascending: true, nullsFirst: false })
            // Ranks are not unique; without a tie-breaker pages can overlap
            .order('id', { ascending: true })
            .range(offset, offset + limit - 1),
        ])

        if (error) {
          throw error
        }

        return {
          data: (data || []).map(toListItem),
          total: count || 0,
          page,
          limit,
          totalPages: Math.ceil((count || 0) / limit),
        }
      },
      {
        tags: [CacheTags.CRYPTO_LIST],
        revalidate: 300, // 5 minutes; the data itself only changes every 15
      }
    )

    return NextResponse.json(
      result,
      {
        headers: {
          // Prices change every 15 minutes (sync cron), so the CDN can hold
          // a response for 5 and keep serving it while it refreshes.
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
          'X-RateLimit-Limit': rateLimitConfig.default.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
        },
      }
    )
  } catch (error) {
    console.error('Error in /api/cryptocurrencies/list:', error)
    return handleApiError(error)
  }
}

