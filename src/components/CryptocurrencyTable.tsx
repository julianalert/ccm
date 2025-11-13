'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import clsx from 'clsx'

interface Cryptocurrency {
  id: number
  cmc_id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number | null
  quote: {
    EUR?: {
      price?: number
      market_cap?: number
      volume_24h?: number
      percent_change_24h?: number
    }
  }
}

const ITEMS_PER_PAGE = 50

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function fetchCryptocurrencies() {
      try {
        setLoading(true)
        setError(null)

        // Calculate offset
        const offset = (currentPage - 1) * ITEMS_PER_PAGE

        // Fetch cryptocurrencies with pagination
        const { data, error: fetchError, count } = await supabase
          .from('cryptocurrencies')
          .select('*', { count: 'exact' })
          .order('cmc_rank', { ascending: true, nullsFirst: false })
          .range(offset, offset + ITEMS_PER_PAGE - 1)

        if (fetchError) {
          throw fetchError
        }

        setCryptocurrencies(data || [])
        setTotalCount(count || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cryptocurrencies')
        console.error('Error fetching cryptocurrencies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptocurrencies()
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

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
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Rang
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Crypto-monnaie
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Cours
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Market cap
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Volume (24h)
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Variation (24h)
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
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          {crypto.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {crypto.symbol}
                        </span>
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

