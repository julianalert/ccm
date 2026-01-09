import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { timingSafeEqual } from 'crypto'
import { upsertCryptocurrencies } from '@/lib/db/cryptocurrencies'
import { handleApiError, logger } from '@/lib/errors'
import { checkRateLimit, getClientIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { validateRequestSize } from '@/lib/request-limits'
import { validateCSRFToken, getCSRFTokenFromRequest } from '@/lib/csrf'

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

async function syncCryptocurrencies() {
  const apiKey = process.env.COINMARKETCAP_API_KEY

  if (!apiKey) {
    throw new Error('CoinMarketCap API key is not configured')
  }

  // CoinMarketCap API has a limit of 5000 per request, but some plans may limit to 1000
  // We'll try to fetch 5000 in one request first, then fall back to batching if needed
  const TARGET_LIMIT = 5000
  const allCryptocurrencies = []

  // Try to fetch 2000 in a single request first
  let response = await fetch(
    `${COINMARKETCAP_API_URL}?start=1&limit=${TARGET_LIMIT}&convert=EUR`,
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

  let data = await response.json()

  if (data.status.error_code !== 0) {
    throw new Error(`CoinMarketCap API error: ${data.status.error_message}`)
  }

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Invalid response from CoinMarketCap API')
  }

  allCryptocurrencies.push(...data.data)

  // If we got fewer than 2000, try to fetch more in batches
  if (allCryptocurrencies.length < TARGET_LIMIT && data.data.length >= 1000) {
    // The API might have a per-request limit, so fetch in batches
    const BATCH_SIZE = 1000
    let start = allCryptocurrencies.length + 1
    
    while (allCryptocurrencies.length < TARGET_LIMIT) {
      const remaining = TARGET_LIMIT - allCryptocurrencies.length
      const limit = Math.min(BATCH_SIZE, remaining)
      
      response = await fetch(
        `${COINMARKETCAP_API_URL}?start=${start}&limit=${limit}&convert=EUR`,
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
        break // Stop if we get an error, but keep what we have
      }

      data = await response.json()

      if (data.status.error_code !== 0) {
        break // Stop on API error, but keep what we have
      }

      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        break // No more data available
      }

      allCryptocurrencies.push(...data.data)
      start += data.data.length

      // If we got fewer results than requested, we've reached the end
      if (data.data.length < limit) {
        break
      }

      // If we've reached our target, stop
      if (allCryptocurrencies.length >= TARGET_LIMIT) {
        break
      }
    }
  }

  // Upsert cryptocurrencies into Supabase (using cmc_id for duplicate detection)
  const result = await upsertCryptocurrencies(allCryptocurrencies)

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
    const rateLimit = await checkRateLimit(
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

    // Use constant-time comparison to prevent timing attacks
    let isAuthorized = false
    if (apiKey) {
      try {
        const providedKey = Buffer.from(apiKey, 'utf8')
        const expectedKey = Buffer.from(expectedApiKey, 'utf8')
        
        // Constant-time comparison
        if (providedKey.length === expectedKey.length) {
          isAuthorized = timingSafeEqual(providedKey, expectedKey)
        }
      } catch (error) {
        // If comparison fails, treat as unauthorized
        isAuthorized = false
      }
    }

    // Audit log API key usage attempt
    logger.info('API key usage attempt', {
      endpoint: '/api/cryptocurrencies/sync',
      ip: clientId,
      authorized: isAuthorized,
      timestamp: new Date().toISOString(),
    })

    if (!isAuthorized) {
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

