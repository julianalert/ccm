'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface Cryptocurrency {
  id: number
  cmc_id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number | null
  logo: string | null
  quote: {
    EUR?: {
      price?: number
      market_cap?: number
      volume_24h?: number
      percent_change_24h?: number
      percent_change_7d?: number
    }
  }
}

function formatLargeNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  
  // Format with billions/trillions for very large numbers
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)} T€`
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} Md€`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} M€`
  }
  
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'standard',
  }).format(value) + ' €'
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function MarketStatsCards() {
  const router = useRouter()
  const [allCryptocurrencies, setAllCryptocurrencies] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCryptocurrencies() {
      try {
        setLoading(true)

        // Fetch first page immediately
        const BATCH_SIZE = 1000
        const firstPageResponse = await fetch(
          `/api/cryptocurrencies/list?page=1&limit=${BATCH_SIZE}`
        )

        if (!firstPageResponse.ok) {
          throw new Error(`Failed to fetch: ${firstPageResponse.statusText}`)
        }

        const firstPageResult = await firstPageResponse.json()
        
        if (!firstPageResult.data || firstPageResult.data.length === 0) {
          setAllCryptocurrencies([])
          setLoading(false)
          return
        }

        const allData: Cryptocurrency[] = [...firstPageResult.data]

        // If there are more pages, fetch them in parallel
        const totalPages = firstPageResult.totalPages || 1
        if (totalPages > 1) {
          const remainingPages = Array.from(
            { length: totalPages - 1 },
            (_, i) => i + 2
          )

          const remainingPagePromises = remainingPages.map((page) =>
            fetch(`/api/cryptocurrencies/list?page=${page}&limit=${BATCH_SIZE}`)
              .then((response) => {
                if (!response.ok) {
                  console.warn(`Failed to fetch page ${page}: ${response.statusText}`)
                  return null
                }
                return response.json()
              })
              .catch((err) => {
                console.warn(`Error fetching page ${page}:`, err)
                return null
              })
          )

          const remainingPageResults = await Promise.all(remainingPagePromises)

          remainingPageResults.forEach((result) => {
            if (result && result.data && result.data.length > 0) {
              allData.push(...result.data)
            }
          })
        }

        setAllCryptocurrencies(allData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching cryptocurrencies:', err)
        setLoading(false)
      }
    }

    fetchCryptocurrencies()
  }, [])

  // Calculate market statistics
  const { totalMarketCap, totalVolume24h, topGainers, topLosers } = useMemo(() => {
    let totalCap = 0
    let totalVol = 0
    const gainers: Cryptocurrency[] = []
    const losers: Cryptocurrency[] = []

    allCryptocurrencies.forEach((crypto) => {
      const eurQuote = crypto.quote?.EUR
      const marketCap = eurQuote?.market_cap
      const volume24h = eurQuote?.volume_24h
      const change24h = eurQuote?.percent_change_24h

      if (marketCap) {
        totalCap += marketCap
      }
      if (volume24h) {
        totalVol += volume24h
      }

      if (change24h !== null && change24h !== undefined) {
        if (change24h > 0) {
          gainers.push(crypto)
        } else if (change24h < 0) {
          losers.push(crypto)
        }
      }
    })

    // Sort gainers by percent_change_24h descending
    gainers.sort((a, b) => {
      const aChange = a.quote?.EUR?.percent_change_24h ?? 0
      const bChange = b.quote?.EUR?.percent_change_24h ?? 0
      return bChange - aChange
    })

    // Sort losers by percent_change_24h ascending (most negative first)
    losers.sort((a, b) => {
      const aChange = a.quote?.EUR?.percent_change_24h ?? 0
      const bChange = b.quote?.EUR?.percent_change_24h ?? 0
      return aChange - bChange
    })

    return {
      totalMarketCap: totalCap,
      totalVolume24h: totalVol,
      topGainers: gainers.slice(0, 3), // Top 3 gainers
      topLosers: losers.slice(0, 3), // Top 3 losers
    }
  }, [allCryptocurrencies])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5 px-5 py-4">
          <div className="text-slate-600 text-sm">Chargement...</div>
        </div>
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5 px-5 py-4">
          <div className="text-slate-600 text-sm">Chargement...</div>
        </div>
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5 px-5 py-4">
          <div className="text-slate-600 text-sm">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
      {/* Card 1: Market Cap & Volume (split in 2) */}
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5">
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
            💰 Marché global
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-600 mb-1">Capitalisation totale</p>
              <p className="text-xl font-semibold text-slate-900">
                {formatLargeNumber(totalMarketCap)}
              </p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <p className="text-xs text-slate-600 mb-1">Volume 24h</p>
              <p className="text-xl font-semibold text-slate-900">
                {formatLargeNumber(totalVolume24h)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Top Gainers */}
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5">
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
            🔥 Plus grosses hausses (24h)
          </h3>
          <div className="space-y-2">
            {topGainers.length > 0 ? (
              topGainers.map((crypto) => {
                const eurQuote = crypto.quote?.EUR
                const change24h = eurQuote?.percent_change_24h
                return (
                  <div
                    key={crypto.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded transition-colors"
                    onClick={() => router.push(`/${crypto.slug}`)}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {crypto.logo ? (
                        <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={crypto.logo}
                            alt={crypto.name}
                            width={20}
                            height={20}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200">
                          <span className="text-xs font-medium text-slate-600">
                            {crypto.symbol.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {crypto.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 text-right">
                      <p className="text-xs font-medium text-green-600">
                        {formatPercent(change24h)}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-slate-500">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Top Losers */}
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5">
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
            🥶 Plus grosses baisses (24h)
          </h3>
          <div className="space-y-2">
            {topLosers.length > 0 ? (
              topLosers.map((crypto) => {
                const eurQuote = crypto.quote?.EUR
                const change24h = eurQuote?.percent_change_24h
                return (
                  <div
                    key={crypto.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded transition-colors"
                    onClick={() => router.push(`/${crypto.slug}`)}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {crypto.logo ? (
                        <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={crypto.logo}
                            alt={crypto.name}
                            width={20}
                            height={20}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200">
                          <span className="text-xs font-medium text-slate-600">
                            {crypto.symbol.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {crypto.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 text-right">
                      <p className="text-xs font-medium text-red-600">
                        {formatPercent(change24h)}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-slate-500">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
