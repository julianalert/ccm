import { NextResponse } from 'next/server'
import { upsertCryptocurrencies } from '@/lib/db/cryptocurrencies'

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

export async function POST() {
  try {
    const apiKey = process.env.COINMARKETCAP_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'CoinMarketCap API key is not configured' },
        { status: 500 }
      )
    }

    // Fetch first 100 cryptocurrencies from CoinMarketCap
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
      return NextResponse.json(
        { error: `CoinMarketCap API error: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (data.status.error_code !== 0) {
      return NextResponse.json(
        { error: `CoinMarketCap API error: ${data.status.error_message}` },
        { status: 500 }
      )
    }

    if (!data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: 'Invalid response from CoinMarketCap API' },
        { status: 500 }
      )
    }

    // Upsert cryptocurrencies into Supabase (using cmc_id for duplicate detection)
    const result = await upsertCryptocurrencies(data.data)

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

