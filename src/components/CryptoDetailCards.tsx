import clsx from 'clsx'
import Image from 'next/image'
import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'

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

function formatSupply(value: string | null | undefined, symbol: string): string {
  if (value === null || value === undefined) return '-'
  const numValue = parseFloat(value)
  if (isNaN(numValue)) return '-'
  return `${formatLargeNumber(numValue)} ${symbol}`
}

interface CryptoDetailCardsProps {
  crypto: CryptocurrencyRow
}

export function CryptoDetailCards({ crypto }: CryptoDetailCardsProps) {
  const eurQuote = crypto.quote?.EUR
  const price = eurQuote?.price
  const marketCap = eurQuote?.market_cap
  const volume24h = eurQuote?.volume_24h
  const change24h = eurQuote?.percent_change_24h

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Card 1: Logo, Name, Symbol, Price, Variation */}
      <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
        <div className="flex h-full">
          {/* Logo - takes full height */}
          <div className="flex shrink-0 items-center justify-center p-6">
            {crypto.logo ? (
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={crypto.logo}
                  alt={crypto.name}
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
            <div
              className={clsx(
                'flex items-center gap-1 text-base',
                change24h !== null && change24h !== undefined
                  ? change24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                  : 'text-slate-600'
              )}
            >
              <span>{formatPercent(change24h)}</span>
              {change24h !== null && change24h !== undefined && (
                <span>
                  {change24h >= 0 ? (
                    <span className="text-green-600">▲</span>
                  ) : (
                    <span className="text-red-600">▼</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Market Data */}
      <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700">Market cap</div>
              <div className="text-sm text-slate-900">
                {marketCap ? `${formatLargeNumber(marketCap)} €` : '-'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700">Volume (24h)</div>
              <div className="text-sm text-slate-900">
                {volume24h ? `${formatLargeNumber(volume24h)} €` : '-'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700">En circulation</div>
              <div className="text-sm text-slate-900">
                {formatSupply(crypto.circulating_supply, crypto.symbol)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700">Liquidité max.</div>
              <div className="text-sm text-slate-900">
                {crypto.max_supply
                  ? formatSupply(crypto.max_supply, crypto.symbol)
                  : crypto.infinite_supply
                    ? '∞'
                    : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Ad Placeholder */}
      <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
        <div className="flex h-full items-center justify-center bg-slate-100 p-6">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-lg bg-slate-300"></div>
            <p className="mt-4 text-sm text-slate-500">Publicité</p>
          </div>
        </div>
      </div>
    </div>
  )
}

