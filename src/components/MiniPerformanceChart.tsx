'use client'

import clsx from 'clsx'

interface MiniPerformanceChartProps {
  change1h?: number | null
  change24h?: number | null
  change7d?: number | null
  volume24h?: number | null
}

export function MiniPerformanceChart({
  change1h,
  change24h,
  change7d,
  volume24h,
}: MiniPerformanceChartProps) {
  const timeframeStats = [
    { label: '1 h', value: change1h },
    { label: '24 h', value: change24h },
    { label: '7 j', value: change7d },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {timeframeStats.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-lg bg-slate-50 px-3 py-2 shadow ring-1 ring-slate-900/5"
        >
          <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
          <p
            className={clsx(
              'text-sm font-semibold',
              typeof value === 'number'
                ? value >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
                : 'text-slate-600',
            )}
          >
            {formatPercent(value)}
          </p>
        </div>
      ))}

      <div className="rounded-lg bg-slate-50 px-3 py-2 shadow ring-1 ring-slate-900/5">
        <p className="text-xs font-semibold uppercase text-slate-500">Volume 24h</p>
        <p className="text-sm font-semibold text-slate-900">
          {formatCurrency(volume24h)}
        </p>
      </div>
    </div>
  )
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') {
    return '—'
  }

  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)} %`
}

function formatCurrency(value?: number | null) {
  if (typeof value !== 'number') {
    return '—'
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}


