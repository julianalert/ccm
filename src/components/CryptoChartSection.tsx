import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'

interface CryptoChartSectionProps {
  crypto: CryptocurrencyRow
}

export function CryptoChartSection({ crypto }: CryptoChartSectionProps) {
  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Cours {crypto.name} ({crypto.symbol} - EUR)
          </h2>
          <div className="flex h-96 items-center justify-center rounded-lg bg-slate-100">
            <p className="text-slate-500">Graphique à venir</p>
          </div>
        </div>
      </div>
    </div>
  )
}

