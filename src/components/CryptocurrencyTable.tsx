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
    }
  }
}

type SortColumn = 'rank' | 'price' | 'market_cap' | 'volume_24h' | 'variation_24h'
type SortDirection = 'asc' | 'desc'

const ITEMS_PER_PAGE = 50

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  
  // For prices >= 1, show 2 decimal places
  if (value >= 1) {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }
  
  // For prices < 1, show more decimals to ensure at least one significant digit
  // Find the first non-zero digit position
  if (value === 0) return '0,00'
  
  const absValue = Math.abs(value)
  let decimals = 2
  
  // Calculate how many decimals we need to show at least one significant digit
  if (absValue < 0.01) {
    // For very small numbers, show up to 8 decimal places
    const str = absValue.toFixed(8)
    // Find the first non-zero digit after the decimal point
    const match = str.match(/\.0*([1-9])/)
    if (match) {
      const firstNonZeroPos = match.index! + match[0].length - 1
      decimals = Math.min(8, firstNonZeroPos + 2) // Show 2 digits after first significant digit
    } else {
      decimals = 8
    }
  } else {
    decimals = 4 // For prices between 0.01 and 1, show 4 decimals
  }
  
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatLargeNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'standard',
  }).format(value)
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)} %`
}

export function CryptocurrencyTable() {
  const router = useRouter()
  const [allCryptocurrencies, setAllCryptocurrencies] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<SortColumn>('rank')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  useEffect(() => {
    async function fetchCryptocurrencies() {
      try {
        setLoading(true)
        setError(null)

        // Fetch all cryptocurrencies in batches using the cached API route
        // This reduces database load significantly compared to direct client-side queries
        const BATCH_SIZE = 1000
        const allData: Cryptocurrency[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const response = await fetch(
            `/api/cryptocurrencies/list?page=${page}&limit=${BATCH_SIZE}`
          )

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`)
          }

          const result = await response.json()

          if (result.data && result.data.length > 0) {
            allData.push(...result.data)
            
            // If we got fewer results than requested, we've reached the end
            if (result.data.length < BATCH_SIZE || page >= result.totalPages) {
              hasMore = false
            } else {
              page++
            }
          } else {
            hasMore = false
          }
        }

        setAllCryptocurrencies(allData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cryptocurrencies')
        console.error('Error fetching cryptocurrencies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptocurrencies()
  }, [])

  // Sort and paginate cryptocurrencies
  const { cryptocurrencies, totalCount } = useMemo(() => {
    const sorted = [...allCryptocurrencies].sort((a, b) => {
      let aValue: number | null = null
      let bValue: number | null = null

      switch (sortColumn) {
        case 'rank':
          aValue = a.cmc_rank
          bValue = b.cmc_rank
          break
        case 'price':
          aValue = a.quote?.EUR?.price ?? null
          bValue = b.quote?.EUR?.price ?? null
          break
        case 'market_cap':
          aValue = a.quote?.EUR?.market_cap ?? null
          bValue = b.quote?.EUR?.market_cap ?? null
          break
        case 'volume_24h':
          aValue = a.quote?.EUR?.volume_24h ?? null
          bValue = b.quote?.EUR?.volume_24h ?? null
          break
        case 'variation_24h':
          aValue = a.quote?.EUR?.percent_change_24h ?? null
          bValue = b.quote?.EUR?.percent_change_24h ?? null
          break
      }

      // Handle null values - put them at the end
      if (aValue === null && bValue === null) return 0
      if (aValue === null) return 1
      if (bValue === null) return -1

      // Compare values
      const comparison = aValue - bValue
      return sortDirection === 'asc' ? comparison : -comparison
    })

    const totalCount = sorted.length
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const paginated = sorted.slice(offset, offset + ITEMS_PER_PAGE)

    return { cryptocurrencies: paginated, totalCount }
  }, [allCryptocurrencies, sortColumn, sortDirection, currentPage])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection('asc')
    }
    // Reset to first page when sorting changes
    setCurrentPage(1)
  }

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return (
        <span className="ml-1 text-slate-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </span>
      )
    }
    return (
      <span className="ml-1 text-slate-700">
        {sortDirection === 'asc' ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    )
  }

  if (loading && cryptocurrencies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">Chargement...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="font-medium">Erreur</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (cryptocurrencies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">Aucune cryptomonnaie trouvée</div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('rank')}
                >
                  <div className="flex items-center">
                    Rang
                    <SortIcon column="rank" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Crypto-monnaie
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end">
                    Cours
                    <SortIcon column="price" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('market_cap')}
                >
                  <div className="flex items-center justify-end">
                    Market cap
                    <SortIcon column="market_cap" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('volume_24h')}
                >
                  <div className="flex items-center justify-end">
                    Volume (24h)
                    <SortIcon column="volume_24h" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('variation_24h')}
                >
                  <div className="flex items-center justify-end">
                    Variation (24h)
                    <SortIcon column="variation_24h" />
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Détails
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {cryptocurrencies.map((crypto) => {
                const eurQuote = crypto.quote?.EUR
                const price = eurQuote?.price
                const marketCap = eurQuote?.market_cap
                const volume24h = eurQuote?.volume_24h
                const change24h = eurQuote?.percent_change_24h

                return (
                  <tr
                    key={crypto.id}
                    className="cursor-pointer transition-colors hover:bg-slate-50"
                    onClick={() => {
                      router.push(`/${crypto.slug}`)
                    }}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {crypto.cmc_rank ?? '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {crypto.logo ? (
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={crypto.logo}
                              alt={crypto.name}
                              width={32}
                              height={32}
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200">
                            <span className="text-xs font-medium text-slate-600">
                              {crypto.symbol.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">
                            {crypto.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {crypto.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-slate-900">
                      {price ? `${formatNumber(price)} €` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-600">
                      {marketCap ? `${formatLargeNumber(marketCap)} €` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-600">
                      {volume24h ? `${formatLargeNumber(volume24h)} €` : '-'}
                    </td>
                    <td
                      className={clsx(
                        'whitespace-nowrap px-6 py-4 text-right text-sm font-medium',
                        change24h !== null && change24h !== undefined
                          ? change24h >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                          : 'text-slate-600'
                      )}
                    >
                      {formatPercent(change24h)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      <span className="text-blue-600 hover:text-blue-800">
                        Cours {crypto.symbol}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-700">
                Affichage de{' '}
                <span className="font-medium">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{' '}
                à{' '}
                <span className="font-medium">
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                </span>{' '}
                sur <span className="font-medium">{totalCount}</span> résultats
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={clsx(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    currentPage === 1
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'cursor-pointer bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50'
                  )}
                >
                  Précédent
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={clsx(
                          'cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50'
                        )}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={clsx(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    currentPage === totalPages
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'cursor-pointer bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50'
                  )}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

