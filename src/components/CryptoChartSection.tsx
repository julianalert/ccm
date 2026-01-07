import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'
import { CryptoChartWrapper } from './CryptoChartWrapper'

interface CryptoChartSectionProps {
  crypto: CryptocurrencyRow
}

/**
 * Server Component wrapper for the TradingView chart
 * 
 * SEO Benefits:
 * - The heading and structure are server-rendered and visible to search engines
 * - All important text content (crypto name, symbol) is in the initial HTML
 * - The page metadata, title, and description are all server-rendered
 * - Only the interactive chart widget is client-side (charts aren't indexed anyway)
 * 
 * This minimizes the client-side JavaScript footprint while maintaining SEO.
 */
export function CryptoChartSection({ crypto }: CryptoChartSectionProps) {
  return (
    <div className="mt-16 mb-32">
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/5">
        <div className="p-6">
          {/* This heading is server-rendered and visible to search engines */}
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Cours {crypto.name} ({crypto.symbol} - EUR)
          </h2>
          {/* Only the chart widget is client-side - minimal SEO impact */}
          <CryptoChartWrapper symbol={crypto.symbol} />
        </div>
      </div>
    </div>
  )
}

