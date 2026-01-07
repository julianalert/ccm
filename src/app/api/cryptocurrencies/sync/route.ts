import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { upsertCryptocurrencies } from '@/lib/db/cryptocurrencies'
import { handleApiError } from '@/lib/errors'
import { checkRateLimit, getClientIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { validateRequestSize } from '@/lib/request-limits'
import { validateCSRFToken, getCSRFTokenFromRequest } from '@/lib/csrf'

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

async function syncCryptocurrencies() {
  const apiKey = process.env.COINMARKETCAP_API_KEY

  if (!apiKey) {
    throw new Error('CoinMarketCap API key is not configured')
  }

  // Fetch cryptocurrencies from CoinMarketCap
  const response = await fetch(
    `${COINMARKETCAP_API_URL}?start=1&limit=5000&convert=EUR`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('CoinMarketCap API error:', errorText)
    throw new Error(`CoinMarketCap API error: ${response.statusText}`)
  }

  const data = await response.json()

  if (data.status.error_code !== 0) {
    throw new Error(`CoinMarketCap API error: ${data.status.error_message}`)
  }

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Invalid response from CoinMarketCap API')
  }

  // Upsert cryptocurrencies into Supabase (using cmc_id for duplicate detection)
  const result = await upsertCryptocurrencies(data.data)

  return result
}

// POST handler for manual sync (from button) - requires authentication
export async function POST(request: NextRequest) {
  try {
    // Validate request size
    const sizeValidation = validateRequestSize(request)
    if (!sizeValidation.valid) {
      return NextResponse.json(
        { error: sizeValidation.error || 'Request too large' },
        { status: 413 }
      )
    }

    // CSRF protection (optional for API key authenticated endpoints, but good practice)
    const cookieStore = await cookies()
    const csrfToken = cookieStore.get('csrf-token')?.value || null
    const requestToken = getCSRFTokenFromRequest(request.headers)
    
    // Only validate CSRF if token is present (allows API key-only auth for external clients)
    if (csrfToken && requestToken && !validateCSRFToken(requestToken, csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(
      clientId,
      rateLimitConfig.sync.maxRequests,
      rateLimitConfig.sync.windowMs
    )

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitConfig.sync.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Check for API key in header
    const apiKey = request.headers.get('x-api-key')
    const expectedApiKey = process.env.ADMIN_API_KEY

    if (!expectedApiKey) {
      throw new Error('ADMIN_API_KEY not configured')
    }

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await syncCryptocurrencies()

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.length} cryptocurrencies`,
      count: result.length,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// GET handler for cron jobs (with optional authentication)
export async function GET(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET
    const authHeader = request.headers.get('authorization')
    const isVercelCron = request.headers.get('x-vercel-cron') === '1'

    // If CRON_SECRET is set and this is not a Vercel Cron request, require Bearer token
    if (cronSecret && !isVercelCron) {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    const result = await syncCryptocurrencies()

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.length} cryptocurrencies`,
      count: result.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return handleApiError(error)
  }
}

