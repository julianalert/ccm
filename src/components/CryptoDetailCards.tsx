import Image from 'next/image'
import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'
import { CryptoPriceConverter } from '@/components/CryptoPriceConverter'
import { MiniPerformanceChart } from '@/components/MiniPerformanceChart'

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

interface CryptoDetailCardsProps {
  crypto: CryptocurrencyRow
}

export function CryptoDetailCards({ crypto }: CryptoDetailCardsProps) {
  const eurQuote = crypto.quote?.EUR
  const price = eurQuote?.price
  const change24h = eurQuote?.percent_change_24h
  const change7d = eurQuote?.percent_change_7d
  const change1h = eurQuote?.percent_change_1h
  const volume24h = eurQuote?.volume_24h

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-6">
        {/* Card 1: Logo, Name, Symbol, Price, Variation */}
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5">
          <div className="flex h-full">
            {/* Logo - takes full height */}
            <div className="flex shrink-0 items-center justify-center p-6">
              {crypto.logo ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={crypto.logo}
                    alt={`Logo ${crypto.name} (${crypto.symbol}) - Cryptomonnaie`}
                    width={80}
                    height={80}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
                  <span className="text-2xl text-slate-600">
                    {crypto.symbol.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col justify-center p-6">
              <div className="mb-1">
                <h1 className="text-base text-slate-700">
                  {crypto.name} ({crypto.symbol})
                </h1>
              </div>
              <div className="mb-1">
                <div className="text-3xl font-semibold text-slate-900">
                  {price ? `${formatNumber(price)}€` : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MiniPerformanceChart
          change1h={change1h}
          change24h={change24h}
          change7d={change7d}
          volume24h={volume24h}
        />
      </div>

      {/* Card 3: Converter */}
      <div>
        <CryptoPriceConverter
          price={price}
          symbol={crypto.symbol}
          name={crypto.name}
          logo={crypto.logo}
        />
      </div>
    </div>
  )
}

