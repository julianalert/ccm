import type { CryptoListItem } from './db/cryptocurrencies'

export interface MarketStats {
  totalMarketCap: number
  totalVolume24h: number
  topGainers: CryptoListItem[]
  topLosers: CryptoListItem[]
}

/**
 * Totals and top movers for the homepage cards.
 * Computed on the server when the homepage is generated, so visitors do not
 * have to download the full coin list just to see six rows and two totals.
 */
export function computeMarketStats(cryptos: CryptoListItem[], topCount = 3): MarketStats {
  let totalMarketCap = 0
  let totalVolume24h = 0
  const gainers: CryptoListItem[] = []
  const losers: CryptoListItem[] = []

  for (const crypto of cryptos) {
    const eurQuote = crypto.quote?.EUR
    const marketCap = eurQuote?.market_cap
    const volume24h = eurQuote?.volume_24h
    const change24h = eurQuote?.percent_change_24h

    if (marketCap) {
      totalMarketCap += marketCap
    }
    if (volume24h) {
      totalVolume24h += volume24h
    }

    if (change24h !== null && change24h !== undefined) {
      if (change24h > 0) {
        gainers.push(crypto)
      } else if (change24h < 0) {
        losers.push(crypto)
      }
    }
  }

  const change = (c: CryptoListItem) => c.quote?.EUR?.percent_change_24h ?? 0

  // Biggest rise first / biggest fall first
  gainers.sort((a, b) => change(b) - change(a))
  losers.sort((a, b) => change(a) - change(b))

  return {
    totalMarketCap,
    totalVolume24h,
    topGainers: gainers.slice(0, topCount),
    topLosers: losers.slice(0, topCount),
  }
}
