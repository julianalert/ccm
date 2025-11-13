import { createServerClient } from '../supabase'

// Type definitions for CoinMarketCap API response
export interface CryptocurrencyData {
  id: number // CoinMarketCap ID
  name: string
  symbol: string
  slug: string
  cmc_rank?: number
  num_market_pairs?: number
  circulating_supply?: number
  total_supply?: number
  market_cap_by_total_supply?: number
  max_supply?: number
  infinite_supply?: boolean
  last_updated?: string
  date_added?: string
  tags?: string[]
  self_reported_circulating_supply?: number
  self_reported_market_cap?: number
  tvl_ratio?: number
  platform?: {
    id?: number
    name?: string
    symbol?: string
    slug?: string
    token_address?: string
  } | null
  quote?: Record<string, {
    price?: number
    volume_24h?: number
    volume_7d?: number
    volume_30d?: number
    percent_change_1h?: number
    percent_change_24h?: number
    percent_change_7d?: number
    market_cap?: number
    last_updated?: string
  }>
}

export interface CryptocurrencyRow {
  id: number
  cmc_id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number | null
  num_market_pairs: number | null
  circulating_supply: string | null
  total_supply: string | null
  market_cap_by_total_supply: string | null
  max_supply: string | null
  infinite_supply: boolean
  last_updated: string | null
  date_added: string | null
  tags: any
  self_reported_circulating_supply: string | null
  self_reported_market_cap: string | null
  tvl_ratio: string | null
  platform: any
  quote: any
  created_at: string
  updated_at: string
}

/**
 * Upsert cryptocurrency data from CoinMarketCap API
 * Uses upsert to handle both inserts and updates
 */
export async function upsertCryptocurrencies(data: CryptocurrencyData[]) {
  const supabase = createServerClient()
  
  const rows = data.map((crypto) => ({
    cmc_id: crypto.id,
    name: crypto.name,
    symbol: crypto.symbol,
    slug: crypto.slug,
    cmc_rank: crypto.cmc_rank ?? null,
    num_market_pairs: crypto.num_market_pairs ?? null,
    circulating_supply: crypto.circulating_supply?.toString() ?? null,
    total_supply: crypto.total_supply?.toString() ?? null,
    market_cap_by_total_supply: crypto.market_cap_by_total_supply?.toString() ?? null,
    max_supply: crypto.max_supply?.toString() ?? null,
    infinite_supply: crypto.infinite_supply ?? false,
    last_updated: crypto.last_updated ?? null,
    date_added: crypto.date_added ?? null,
    tags: crypto.tags ?? [],
    self_reported_circulating_supply: crypto.self_reported_circulating_supply?.toString() ?? null,
    self_reported_market_cap: crypto.self_reported_market_cap?.toString() ?? null,
    tvl_ratio: crypto.tvl_ratio?.toString() ?? null,
    platform: crypto.platform ?? null,
    quote: crypto.quote ?? {},
  }))

  const { data: result, error } = await supabase
    .from('cryptocurrencies')
    .upsert(rows, {
      onConflict: 'cmc_id',
      ignoreDuplicates: false,
    })
    .select()

  if (error) {
    throw new Error(`Failed to upsert cryptocurrencies: ${error.message}`)
  }

  return result
}

/**
 * Get all cryptocurrencies from the database
 */
export async function getCryptocurrencies(limit?: number, offset?: number) {
  const supabase = createServerClient()
  
  let query = supabase
    .from('cryptocurrencies')
    .select('*')
    .order('cmc_rank', { ascending: true, nullsLast: true })

  if (limit) {
    query = query.limit(limit)
  }
  if (offset) {
    query = query.range(offset, offset + (limit || 100) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch cryptocurrencies: ${error.message}`)
  }

  return data
}

/**
 * Get a single cryptocurrency by CoinMarketCap ID
 */
export async function getCryptocurrencyByCmcId(cmcId: number) {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('cryptocurrencies')
    .select('*')
    .eq('cmc_id', cmcId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch cryptocurrency: ${error.message}`)
  }

  return data
}

/**
 * Upsert cryptocurrency data from CoinMarketCap API, checking by symbol
 * If a cryptocurrency with the same symbol exists, it will be updated
 * Otherwise, a new record will be created
 */
export async function upsertCryptocurrenciesBySymbol(data: CryptocurrencyData[]) {
  const supabase = createServerClient()
  
  // Get all existing cryptocurrencies (we'll do case-insensitive matching in JS)
  // Fetch all records since we need case-insensitive matching
  const { data: existingCryptos, error: fetchError } = await supabase
    .from('cryptocurrencies')
    .select('id, symbol, cmc_id')

  if (fetchError) {
    throw new Error(`Failed to fetch existing cryptocurrencies: ${fetchError.message}`)
  }

  // Create a map of uppercase symbol -> existing record for case-insensitive matching
  const symbolMap = new Map(
    (existingCryptos || []).map((crypto) => [crypto.symbol.toUpperCase(), crypto])
  )

  // Also create a set of existing cmc_ids to check for conflicts
  const existingCmcIds = new Set((existingCryptos || []).map((c) => c.cmc_id))

  // Separate into updates and inserts
  const toUpdate: Array<{ id: number; data: any }> = []
  const toInsert: any[] = []

  for (const crypto of data) {
    const symbolUpper = crypto.symbol.toUpperCase()
    const existing = symbolMap.get(symbolUpper)

    // Prepare row data, but handle cmc_id carefully to avoid conflicts
    const rowData: any = {
      name: crypto.name,
      symbol: crypto.symbol,
      slug: crypto.slug,
      cmc_rank: crypto.cmc_rank ?? null,
      num_market_pairs: crypto.num_market_pairs ?? null,
      circulating_supply: crypto.circulating_supply?.toString() ?? null,
      total_supply: crypto.total_supply?.toString() ?? null,
      market_cap_by_total_supply: crypto.market_cap_by_total_supply?.toString() ?? null,
      max_supply: crypto.max_supply?.toString() ?? null,
      infinite_supply: crypto.infinite_supply ?? false,
      last_updated: crypto.last_updated ?? null,
      date_added: crypto.date_added ?? null,
      tags: crypto.tags ?? [],
      self_reported_circulating_supply: crypto.self_reported_circulating_supply?.toString() ?? null,
      self_reported_market_cap: crypto.self_reported_market_cap?.toString() ?? null,
      tvl_ratio: crypto.tvl_ratio?.toString() ?? null,
      platform: crypto.platform ?? null,
      quote: crypto.quote ?? {},
    }

    if (existing) {
      // Update existing record
      // Only update cmc_id if:
      // 1. It's the same as the existing one, OR
      // 2. The new cmc_id doesn't exist in any other record (excluding current record)
      const newCmcIdExistsElsewhere = 
        crypto.id !== existing.cmc_id && 
        existingCmcIds.has(crypto.id)
      
      if (!newCmcIdExistsElsewhere) {
        // Safe to update cmc_id
        rowData.cmc_id = crypto.id
      }
      // If cmc_id would conflict with another record, we skip updating it but update everything else
      
      toUpdate.push({ id: existing.id, data: rowData })
    } else {
      // Insert new record - check if cmc_id already exists
      if (existingCmcIds.has(crypto.id)) {
        // cmc_id already exists in another record, skip this one
        console.warn(
          `Skipping ${crypto.symbol}: cmc_id ${crypto.id} already exists in database`
        )
        continue
      }
      
      rowData.cmc_id = crypto.id
      toInsert.push(rowData)
    }
  }

  const results: any[] = []

  // Perform updates
  for (const { id, data: rowData } of toUpdate) {
    const { data: updated, error: updateError } = await supabase
      .from('cryptocurrencies')
      .update(rowData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error(`Failed to update cryptocurrency ${rowData.symbol}:`, updateError)
      throw new Error(`Failed to update cryptocurrency ${rowData.symbol}: ${updateError.message}`)
    }

    if (updated) {
      results.push(updated)
    }
  }

  // Perform inserts
  if (toInsert.length > 0) {
    const { data: inserted, error: insertError } = await supabase
      .from('cryptocurrencies')
      .insert(toInsert)
      .select()

    if (insertError) {
      throw new Error(`Failed to insert cryptocurrencies: ${insertError.message}`)
    }

    if (inserted) {
      results.push(...inserted)
    }
  }

  return results
}

