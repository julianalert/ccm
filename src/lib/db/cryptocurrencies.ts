import { cache } from 'react'
import { createServerClient } from '../supabase'
import { createClient } from '@supabase/supabase-js'
import { getCachedValue, CacheTags } from '../cache'

/**
 * Check if Supabase environment variables are valid (not placeholders)
 * Used during build time to gracefully handle missing/invalid env vars
 */
function hasValidSupabaseConfig(requireServiceRole = false): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Check if env vars exist and are not placeholder values
  if (!supabaseUrl || !supabaseAnonKey) {
    return false
  }
  
  // Check for common placeholder patterns
  const isPlaceholder = 
    supabaseUrl.includes('placeholder') ||
    supabaseAnonKey === 'placeholder' ||
    supabaseAnonKey.length < 20 // Real keys are much longer
  
  if (isPlaceholder) {
    return false
  }
  
  // If service role key is required, check it too
  if (requireServiceRole) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey || serviceRoleKey === 'placeholder' || serviceRoleKey.length < 20) {
      return false
    }
  }
  
  return true
}

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
  logo: string | null
  description_text: string | null
  description_image: string | null
  description_list: string[] | null
  created_at: string
  updated_at: string
}

/**
 * Supabase client for public reads: service role when configured, anon key
 * otherwise (RLS allows public SELECT).
 */
function createReadClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set')
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceRoleKey && serviceRoleKey !== 'placeholder' && serviceRoleKey.length >= 20) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

/** A row as shown in the homepage table, stats cards and ticker. */
export interface CryptoListItem {
  id: number
  cmc_id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number | null
  logo: string | null
  quote: {
    EUR?: {
      price?: number | null
      market_cap?: number | null
      volume_24h?: number | null
      percent_change_24h?: number | null
      percent_change_7d?: number | null
    }
  }
}

/**
 * Projection for list views. Only the five EUR figures the UI displays are
 * pulled out of the `quote` JSON; shipping the whole object doubles the payload.
 */
export const LIST_PROJECTION =
  'id,cmc_id,name,symbol,slug,cmc_rank,logo,' +
  'price:quote->EUR->price,' +
  'market_cap:quote->EUR->market_cap,' +
  'volume_24h:quote->EUR->volume_24h,' +
  'percent_change_24h:quote->EUR->percent_change_24h,' +
  'percent_change_7d:quote->EUR->percent_change_7d'

/** Turn a LIST_PROJECTION row back into the `quote.EUR` shape the UI expects. */
export function toListItem(row: any): CryptoListItem {
  return {
    id: row.id,
    cmc_id: row.cmc_id,
    name: row.name,
    symbol: row.symbol,
    slug: row.slug,
    cmc_rank: row.cmc_rank,
    logo: row.logo,
    quote: {
      EUR: {
        price: row.price,
        market_cap: row.market_cap,
        volume_24h: row.volume_24h,
        percent_change_24h: row.percent_change_24h,
        percent_change_7d: row.percent_change_7d,
      },
    },
  }
}

const isBuildPhase = () =>
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build'

/**
 * Read every row of the table, ordered by rank, straight from the database.
 *
 * Deliberately NOT wrapped in getCachedValue: the callers (homepage, sitemap)
 * are statically cached pages, so the page itself is the cache and this only
 * runs when the page regenerates. Going through the data cache as well would
 * tie the page's lifetime to the shorter data-cache TTL and tags.
 *
 * PostgREST returns at most 1000 rows per request, so the table is read in
 * pages; the first request also returns the total so the rest run in parallel.
 */
export async function getAllCryptocurrencyRows<T = any>(projection: string): Promise<T[]> {
  // Placeholder env vars (CI builds): render with no data instead of failing
  if (!hasValidSupabaseConfig()) {
    return []
  }

  const PAGE_SIZE = 1000

  try {
    const supabase = createReadClient()
    const columns = projection.replace(/\s+/g, '')

    const fetchPage = (page: number, withCount: boolean) =>
      supabase
        .from('cryptocurrencies')
        .select(columns, withCount ? { count: 'exact' } : undefined)
        .order('cmc_rank', { ascending: true, nullsFirst: false })
        // Ranks are not unique (coins that left the listing keep their last
        // rank), so a tie-breaker is needed for pages not to overlap.
        .order('id', { ascending: true })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    const first = await fetchPage(0, true)
    if (first.error) {
      throw new Error(`Failed to fetch cryptocurrencies: ${first.error.message}`)
    }

    const rows = [...((first.data || []) as T[])]
    const totalPages = Math.ceil((first.count ?? rows.length) / PAGE_SIZE)

    if (totalPages > 1) {
      const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 1, false))
      )
      for (const page of rest) {
        if (page.error) {
          throw new Error(`Failed to fetch cryptocurrencies: ${page.error.message}`)
        }
        rows.push(...((page.data || []) as T[]))
      }
    }

    return rows
  } catch (error) {
    // A failed build-time prerender must not fail the deployment; the page
    // fills in on its first regeneration. At runtime, rethrow so the previous
    // good copy of the page keeps being served instead of an empty one.
    if (isBuildPhase()) {
      console.warn('Failed to fetch cryptocurrencies during build, rendering without data:', error)
      return []
    }
    throw error
  }
}

export interface UpsertResult {
  /** Rows sent to the database after de-duplication */
  received: number
  /** Rows actually inserted or updated (unchanged rows are skipped by the RPC path) */
  written: number
}

/**
 * Upsert cryptocurrency data from CoinMarketCap API.
 *
 * Preferred path: the `upsert_cryptocurrencies` SQL function from migration 007.
 * It only rewrites rows whose ingested values changed, which avoids dead tuples,
 * index maintenance and the updated_at trigger for unchanged rows.
 *
 * Fallback path (function not deployed yet): plain PostgREST upsert, without
 * echoing the written rows back over the wire.
 */
export async function upsertCryptocurrencies(data: CryptocurrencyData[]): Promise<UpsertResult> {
  const supabase = createServerClient()
  
  // Deduplicate by cmc_id, keeping the last occurrence of each
  const uniqueDataMap = new Map<number, CryptocurrencyData>()
  for (const crypto of data) {
    uniqueDataMap.set(crypto.id, crypto)
  }
  const uniqueData = Array.from(uniqueDataMap.values())
  
  const rows = uniqueData.map((crypto) => ({
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

  console.log(`[UPSERT] Attempting to upsert ${rows.length} rows (${data.length - uniqueData.length} duplicates removed) in batches...`)
  
  // Process in batches to avoid timeout (500 rows per batch)
  const BATCH_SIZE = 500
  const totalBatches = Math.ceil(rows.length / BATCH_SIZE)
  let written = 0
  let useRpc = true
  
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    
    console.log(`[UPSERT] Processing batch ${batchNum}/${totalBatches} (${batch.length} rows)...`)

    if (useRpc) {
      const { data: affected, error } = await supabase.rpc('upsert_cryptocurrencies', { rows: batch })

      if (!error) {
        written += typeof affected === 'number' ? affected : 0
        continue
      }

      // PGRST202: function not found in the schema cache (migration 007 not applied yet)
      if (error.code === 'PGRST202') {
        console.warn('[UPSERT] upsert_cryptocurrencies() is not deployed; falling back to plain upsert. Apply supabase/migrations/007_optimize_cryptocurrencies_writes.sql.')
        useRpc = false
      } else {
        console.error(`[UPSERT] RPC error in batch ${batchNum}:`, error.message, error.details, error.hint)
        throw new Error(`Failed to upsert cryptocurrencies batch ${batchNum}: ${error.message}`)
      }
    }

    // Legacy path: rewrites every row, but at least do not ship 500 full rows back
    const { error, count } = await supabase
      .from('cryptocurrencies')
      .upsert(batch, {
        onConflict: 'cmc_id',
        ignoreDuplicates: false,
        count: 'exact',
      })

    if (error) {
      console.error(`[UPSERT] Error in batch ${batchNum}:`, error.message, error.details, error.hint)
      throw new Error(`Failed to upsert cryptocurrencies batch ${batchNum}: ${error.message}`)
    }

    written += count ?? batch.length
  }

  console.log(`[UPSERT] Done: ${written}/${rows.length} rows written in ${totalBatches} batches (${useRpc ? 'change-aware RPC' : 'plain upsert'})`)
  return { received: rows.length, written }
}

/**
 * Get all cryptocurrencies from the database
 * Uses service role if available, falls back to anon key for public reads
 * Results are cached for 5 minutes to reduce database load
 * Returns empty array if Supabase config is invalid (e.g., during build with placeholders)
 */
export async function getCryptocurrencies(limit?: number, offset?: number, columns: string = '*') {
  // During build time, if env vars are placeholders, return empty array
  if (!hasValidSupabaseConfig()) {
    return []
  }
  
  // Normalise the projection so equivalent column lists share a cache entry
  const projection = columns.replace(/\s+/g, '')
  const cacheKey = `cryptocurrencies:${projection}:${limit || 'all'}:${offset || 0}`
  
  try {
    return await getCachedValue(
      cacheKey,
      async () => {
        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          
          if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase configuration: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set')
          }

          let supabase
          
          // Try to use service role key if available (for admin operations)
          const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
          if (serviceRoleKey && serviceRoleKey !== 'placeholder' && serviceRoleKey.length >= 20) {
            try {
              supabase = createClient(supabaseUrl, serviceRoleKey, {
                auth: {
                  autoRefreshToken: false,
                  persistSession: false
                }
              })
            } catch (error) {
              // If service role fails, fall back to anon key
              supabase = createClient(supabaseUrl, supabaseAnonKey)
            }
          } else {
            // Use anon key for public reads (RLS allows public SELECT)
            supabase = createClient(supabaseUrl, supabaseAnonKey)
          }
          
          let query = supabase
            .from('cryptocurrencies')
            .select(projection)
            .order('cmc_rank', { ascending: true, nullsFirst: false })

          if (limit) {
            query = query.limit(limit)
          }
          if (offset) {
            query = query.range(offset, offset + (limit || 100) - 1)
          }

          const { data, error } = await query

          if (error) {
            // During build time, if database is unavailable, return empty array
            if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
              console.warn('Failed to fetch cryptocurrencies during build, returning empty array:', error.message)
              return []
            }
            throw new Error(`Failed to fetch cryptocurrencies: ${error.message}`)
          }

          return (data || []) as any[]
        } catch (error) {
          // During build time, if database connection fails (e.g., invalid URL, network error), return empty array
          if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
            console.warn('Failed to fetch cryptocurrencies during build (connection error), returning empty array:', error)
            return []
          }
          // Also handle fetch failures and invalid URLs
          if (error instanceof Error && (
            error.message.includes('fetch failed') ||
            error.message.includes('Invalid URL') ||
            error.message.includes('Missing Supabase')
          )) {
            console.warn('Failed to fetch cryptocurrencies (invalid config), returning empty array:', error.message)
            return []
          }
          // Re-throw other errors
          throw error
        }
      },
      {
        tags: [CacheTags.CRYPTO_LIST],
        revalidate: 300, // 5 minutes
      }
    )
  } catch (error) {
    // Final fallback - if getCachedValue itself fails, return empty array during build
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn('Failed to get cached cryptocurrencies during build, returning empty array:', error)
      return []
    }
    // Re-throw in other contexts
    throw error
  }
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
 * Get a single cryptocurrency by slug, or null when it does not exist.
 *
 * Not wrapped in getCachedValue: the coin page is statically cached (ISR), so
 * this only runs when a page regenerates and must then see current data.
 * React `cache` dedupes the generateMetadata + page calls within one render.
 */
export const getCryptocurrencyBySlug = cache(async function getCryptocurrencyBySlug(
  slug: string
): Promise<CryptocurrencyRow | null> {
  const normalizedSlug = slug.toLowerCase()
  const supabase = createReadClient()

  const { data, error } = await supabase
    .from('cryptocurrencies')
    .select('*')
    .eq('slug', normalizedSlug)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch cryptocurrency: ${error.message}`)
  }

  return (data as CryptocurrencyRow | null) ?? null
})

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

/**
 * Get the latest updated_at date from the cryptocurrencies table
 * Returns null if Supabase config is invalid (e.g., during build with placeholders)
 */
export async function getLatestUpdateDate(): Promise<Date | null> {
  // During build time, if env vars are placeholders, return null
  // This function requires service role key, so check for it too
  if (!hasValidSupabaseConfig(true)) {
    return null
  }
  
  try {
    // Cached: there is no index on updated_at, so this is a full scan otherwise
    const iso = await getCachedValue<string | null>(
      'cryptocurrencies:latest-updated-at',
      async () => {
        const supabase = createServerClient()

        const { data, error } = await supabase
          .from('cryptocurrencies')
          .select('updated_at')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (error) {
          throw new Error(`Failed to fetch latest update date: ${error.message}`)
        }

        return data?.updated_at ?? null
      },
      {
        tags: [CacheTags.CRYPTO_LIST],
        revalidate: 300, // 5 minutes
      }
    )

    return iso ? new Date(iso) : null
  } catch (error) {
    // During build time or if database is unavailable, return null gracefully
    // This is expected during CI/CD builds with placeholder env vars
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      return null
    }
    // Also handle the case where createServerClient throws (e.g., missing service role key)
    // or when Supabase URL is invalid
    if (error instanceof Error && (
      error.message.includes('Missing') ||
      error.message.includes('SUPABASE') ||
      error.message.includes('fetch failed')
    )) {
      return null
    }
    // For other unexpected errors, log and return null rather than crashing
    console.warn('Failed to fetch latest update date, returning null:', error)
    return null
  }
}

