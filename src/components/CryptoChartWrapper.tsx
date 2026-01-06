'use client'

import dynamic from 'next/dynamic'

// Dynamically import TradingView chart with no SSR for optimal performance
const TradingViewChart = dynamic(
  () => import('./TradingViewChart').then((mod) => ({ default: mod.TradingViewChart })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] items-center justify-center rounded-lg bg-slate-100">
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600 mx-auto"></div>
          <p className="text-slate-500">Chargement du graphique...</p>
        </div>
      </div>
    ),
  }
)

interface CryptoChartWrapperProps {
  symbol: string
}

/**
 * Client Component wrapper for the TradingView chart
 * This is the minimal client-side boundary needed for the dynamic import
 */
export function CryptoChartWrapper({ symbol }: CryptoChartWrapperProps) {
  return <TradingViewChart symbol={symbol} height={600} />
}

