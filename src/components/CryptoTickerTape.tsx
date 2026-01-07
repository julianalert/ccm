'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import clsx from 'clsx'

interface Cryptocurrency {
  id: number
  cmc_id: number
  name: string
  symbol: string
  logo: string | null
  quote: {
    EUR?: {
      price?: number
      percent_change_24h?: number
    }
  }
}

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

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function CryptoTickerTape() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCryptocurrencies() {
      try {
        const { data, error } = await supabase
          .from('cryptocurrencies')
          .select('id, cmc_id, name, symbol, logo, quote')
          .order('cmc_rank', { ascending: true, nullsFirst: false })
          .limit(50)

        if (error) {
          console.error('Error fetching cryptocurrencies:', error)
          return
        }

        setCryptocurrencies(data || [])
      } catch (err) {
        console.error('Error fetching cryptocurrencies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptocurrencies()
  }, [])

  if (loading || cryptocurrencies.length === 0) {
    return null
  }

  // Duplicate the array for seamless infinite scroll
  const duplicatedCryptos = [...cryptocurrencies, ...cryptocurrencies]

  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white">
      <div className="flex animate-scroll whitespace-nowrap">
        {duplicatedCryptos.map((crypto, index) => {
          const price = crypto.quote?.EUR?.price
          const change24h = crypto.quote?.EUR?.percent_change_24h

          return (
            <div
              key={`${crypto.id}-${index}`}
              className="flex shrink-0 items-center gap-3 px-6 py-3"
            >
              {crypto.logo ? (
                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={crypto.logo}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200">
                  <span className="text-xs text-slate-600">
                    {crypto.symbol.charAt(0)}
                  </span>
                </div>
              )}
              <span className="whitespace-nowrap text-sm font-medium text-slate-900">
                {crypto.name}
              </span>
              <span className="whitespace-nowrap text-sm text-slate-600">
                {price ? `${formatNumber(price)}€` : '-'}
              </span>
              <span
                className={clsx(
                  'whitespace-nowrap text-xs',
                  change24h !== null && change24h !== undefined
                    ? change24h >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                    : 'text-slate-500'
                )}
              >
                {formatPercent(change24h)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

