import { NextRequest, NextResponse } from 'next/server'
import { upsertCryptocurrencies } from '@/lib/db/cryptocurrencies'

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

// POST handler for manual sync (from button)
export async function POST() {
  try {
    const result = await syncCryptocurrencies()

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.length} cryptocurrencies`,
      count: result.length,
    })
  } catch (error) {
    console.error('Error syncing cryptocurrencies:', error)
    return NextResponse.json(
      {
        error: 'Failed to sync cryptocurrencies',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
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
    console.error('Error syncing cryptocurrencies (cron):', error)
    return NextResponse.json(
      {
        error: 'Failed to sync cryptocurrencies',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

