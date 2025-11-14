'use client'

import Image from 'next/image'
import { useId, useState } from 'react'

import { Button } from '@/components/Button'
import eurIcon from '@/images/eur.png'

interface CryptoPriceConverterProps {
  price?: number | null
  symbol: string
  name: string
  logo?: string | null
}

const inputClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-blue-500 sm:text-sm'

function parseInput(value: string) {
  if (!value) return NaN
  const normalized = value.replace(',', '.')
  return Number(normalized)
}

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!isFinite(value)) {
    return ''
  }

  const fixed = value.toFixed(maximumFractionDigits)
  return fixed.replace(/\.?0+$/, '')
}

export function CryptoPriceConverter({
  price,
  symbol,
  name,
  logo,
}: CryptoPriceConverterProps) {
  const safePrice = typeof price === 'number' ? price : null

  const [cryptoAmount, setCryptoAmount] = useState('1')
  const [eurAmount, setEurAmount] = useState(() =>
    safePrice ? formatNumber(safePrice, 2) : '',
  )

  const handleCryptoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCryptoAmount(value)

    if (!safePrice) {
      setEurAmount('')
      return
    }

    const parsed = parseInput(value)
    if (isNaN(parsed)) {
      setEurAmount('')
      return
    }

    setEurAmount(formatNumber(parsed * safePrice, 2))
  }

  const handleEurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEurAmount(value)

    if (!safePrice) {
      setCryptoAmount('')
      return
    }

    const parsed = parseInput(value)
    if (isNaN(parsed)) {
      setCryptoAmount('')
      return
    }

    setCryptoAmount(formatNumber(parsed / safePrice))
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
      <div className="p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Convertisseur {symbol}/EUR
          </p>
        </div>

        {safePrice ? (
          <div className="mt-6 space-y-6">
            <div className="flex items-end gap-3">
              <ConverterInput
                className="flex-1"
                label={`Montant en ${symbol}`}
                inputMode="decimal"
                value={cryptoAmount}
                onChange={handleCryptoChange}
                placeholder="1"
                suffix={
                  <SuffixContent
                    label={symbol}
                    icon={<TokenLogo symbol={symbol} logo={logo} />}
                  />
                }
                aria-label={`Montant en ${symbol}`}
              />

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500">
                ⇄
              </div>

              <ConverterInput
                className="flex-1"
                label="Montant en EUR"
                inputMode="decimal"
                value={eurAmount}
                onChange={handleEurChange}
                placeholder="0"
                suffix={
                  <SuffixContent
                    label="EUR"
                    icon={
                      <Image
                        src={eurIcon}
                        alt="Drapeau de l'Union européenne"
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    }
                  />
                }
                aria-label="Montant en euros"
              />
            </div>
            <div className="flex justify-end">
              <Button
                href="https://www.binance.com/fr/register?ref=16287317"
                color="blue"
                className="w-full sm:w-auto"
              >
                Acheter des {name} ({symbol})
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            Prix indisponible pour cette crypto-monnaie.
          </p>
        )}
      </div>
    </div>
  )
}

function ConverterInput({
  label,
  suffix,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  suffix: React.ReactNode
}) {
  const id = useId()

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={`${inputClasses} pr-24`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
          {suffix}
        </span>
      </div>
    </div>
  )
}

function SuffixContent({
  label,
  icon,
}: {
  label: string
  icon: React.ReactNode
}) {
  return (
    <>
      {icon}
      <span>{label}</span>
    </>
  )
}

function TokenLogo({ symbol, logo }: { symbol: string; logo?: string | null }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`Logo ${symbol}`}
        width={24}
        height={24}
        className="h-6 w-6 rounded-full object-cover"
        unoptimized
      />
    )
  }

  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
      {symbol.slice(0, 1).toUpperCase()}
    </span>
  )
}
