import type { CryptoListItem } from './db/cryptocurrencies'

export interface MarketStats {
  totalMarketCap: number
  totalVolume24h: number
  topGainers: CryptoListItem[]
  topLosers: CryptoListItem[]
}

/**
 * A coin counts as still tracked if it was written within this window of the
 * most recent write in the table. Each sync only covers CoinMarketCap's
 * current top listing; coins that dropped out of it keep their last quote
 * forever, and those frozen values (some of them absurd) must not be added
 * into "today's" market figures.
 */
const TRACKED_WINDOW_MS = 24 * 60 * 60 * 1000

/**
 * A 24h move only counts as a top gainer/loser if at least this much (EUR)
 * was actually traded and the coin has a known market cap (CoinMarketCap
 * reports 0 when it has not verified the supply). Without this the cards
 * fill up with illiquid tokens showing moves of thousands of percent.
 */
const MIN_MOVER_VOLUME_24H = 50_000

/**
 * Keep the rows the sync is still updating.
 *
 * Measured against the newest `updated_at` in the table rather than the
 * clock, so a paused sync or a build with old data does not empty the stats.
 */
export function filterTrackedRows<T extends { updated_at?: string | null }>(rows: T[]): T[] {
  let newest = 0
  for (const row of rows) {
    const t = row.updated_at ? Date.parse(row.updated_at) : NaN
    if (t > newest) newest = t
  }

  // No usable timestamps at all: nothing to judge by, keep everything
  if (newest === 0) return rows

  const cutoff = newest - TRACKED_WINDOW_MS
  return rows.filter((row) => {
    const t = row.updated_at ? Date.parse(row.updated_at) : NaN
    return t >= cutoff
  })
}

/**
 * Totals and top movers for the homepage cards.
 * Computed on the server when the homepage is generated, so visitors do not
 * have to download the full coin list just to see six rows and two totals.
 *
 * Pass tracked coins only (see filterTrackedRows).
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

    if (
      change24h !== null &&
      change24h !== undefined &&
      (volume24h ?? 0) >= MIN_MOVER_VOLUME_24H &&
      (marketCap ?? 0) > 0
    ) {
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
