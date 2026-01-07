import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { validateSearchQuery } from '@/lib/validation'
import { handleApiError } from '@/lib/errors'
import { checkRateLimit, getClientIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { validateRequestSize } from '@/lib/request-limits'

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

    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(
      clientId,
      rateLimitConfig.search.maxRequests,
      rateLimitConfig.search.windowMs
    )

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitConfig.search.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const rawQuery = searchParams.get('q')

    // Validate and sanitize input
    const query = validateSearchQuery(rawQuery)

    if (!query || query.length < 1) {
      return NextResponse.json({ data: [] })
    }

    const supabase = createServerClient()

    // Search in name, symbol, and slug (case-insensitive)
    // Use proper Supabase query methods with escaped pattern
    // Supabase handles parameterization internally, but we still validate input
    const searchPattern = `%${query.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`
    
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('id, name, symbol, slug, logo')
      .or(`name.ilike."${searchPattern}",symbol.ilike."${searchPattern}",slug.ilike."${searchPattern}"`)
      .order('cmc_rank', { ascending: true, nullsFirst: false })
      .limit(10)

    if (error) {
      throw error
    }

    return NextResponse.json(
      { data: data || [] },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitConfig.search.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
        },
      }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

