import Link from 'next/link'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase'
import { getCachedValue, CacheTags } from '@/lib/cache'

interface Cryptocurrency {
  id: number
  name: string
  symbol: string
  slug: string
  logo: string | null
  quote?: {
    EUR?: {
      price?: number
      percent_change_24h?: number
    }
  }
}

interface RelatedCryptosProps {
  currentCryptoSlug: string
  currentCryptoRank?: number | null
  limit?: number
}

export async function RelatedCryptos({
  currentCryptoSlug,
  currentCryptoRank,
  limit = 6,
}: RelatedCryptosProps) {
  // Cache related cryptos query to reduce database load
  const cacheKey = `related-cryptos:${currentCryptoSlug}:${currentCryptoRank || 'none'}:${limit}`
  
  const relatedCryptos = await getCachedValue(
    cacheKey,
    async () => {
      const supabase = createServerClient()
      
      try {
        // Get cryptos near the current one's rank, or top cryptos if no rank
        let query = supabase
          .from('cryptocurrencies')
          .select('id, name, symbol, slug, logo, cmc_rank, quote')
          .neq('slug', currentCryptoSlug.toLowerCase())
          .order('cmc_rank', { ascending: true, nullsFirst: false })
          .limit(limit)

        // If we have a rank, try to get cryptos around that rank
        if (currentCryptoRank) {
          const rankRange = Math.max(10, Math.floor(currentCryptoRank * 0.5))
          query = query
            .gte('cmc_rank', Math.max(1, currentCryptoRank - rankRange))
            .lte('cmc_rank', currentCryptoRank + rankRange)
        }

        const { data, error } = await query

        if (error) {
          console.error('Error fetching related cryptos:', error)
          // Fallback to top cryptos
          const { data: fallbackData } = await supabase
            .from('cryptocurrencies')
            .select('id, name, symbol, slug, logo, cmc_rank, quote')
            .neq('slug', currentCryptoSlug.toLowerCase())
            .order('cmc_rank', { ascending: true, nullsFirst: false })
            .limit(limit)

          return fallbackData || []
        }
        
        return data || []
      } catch (error) {
        console.error('Error fetching related cryptos:', error)
        return []
      }
    },
    {
      tags: [CacheTags.CRYPTO_LIST, `crypto-related-${currentCryptoSlug}`],
      revalidate: 300, // 5 minutes
    }
  )

  if (!relatedCryptos || relatedCryptos.length === 0) {
    return null
  }

  function formatPrice(price: number | null | undefined): string {
    if (price === null || price === undefined) return '-'
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  function formatPercent(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-'
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Crypto-monnaies similaires
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedCryptos.map((crypto) => {
          const price = crypto.quote?.EUR?.price
          const change24h = crypto.quote?.EUR?.percent_change_24h

          return (
            <Link
              key={crypto.id}
              href={`/${crypto.slug}`}
              className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
            >
              {crypto.logo ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={crypto.logo}
                    alt={`Logo ${crypto.name} (${crypto.symbol})`}
                    width={56}
                    height={56}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200">
                  <span className="text-base font-medium text-slate-600">
                    {crypto.symbol.charAt(0)}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900">
                  {crypto.name}
                </div>
                <div className="text-sm text-slate-500">{crypto.symbol}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900">
                    {price ? `${formatPrice(price)} €` : '-'}
                  </span>
                  {change24h !== null && change24h !== undefined && (
                    <span
                      className={`text-xs font-medium ${
                        change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatPercent(change24h)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

