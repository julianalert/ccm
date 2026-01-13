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
 * Upsert cryptocurrency data from CoinMarketCap API
 * Uses upsert to handle both inserts and updates
 */
export async function upsertCryptocurrencies(data: CryptocurrencyData[]) {
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
  const allResults: any[] = []
  
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(rows.length / BATCH_SIZE)
    
    console.log(`[UPSERT] Processing batch ${batchNum}/${totalBatches} (${batch.length} rows)...`)
    
    const { data: result, error } = await supabase
      .from('cryptocurrencies')
      .upsert(batch, {
        onConflict: 'cmc_id',
        ignoreDuplicates: false,
      })
      .select()

    if (error) {
      console.error(`[UPSERT] Error in batch ${batchNum}:`, error.message, error.details, error.hint)
      throw new Error(`Failed to upsert cryptocurrencies batch ${batchNum}: ${error.message}`)
    }

    if (result) {
      allResults.push(...result)
    }
  }

  console.log(`[UPSERT] Successfully upserted ${allResults.length} records in ${Math.ceil(rows.length / BATCH_SIZE)} batches`)
  return allResults
}

/**
 * Get all cryptocurrencies from the database
 * Uses service role if available, falls back to anon key for public reads
 * Results are cached for 5 minutes to reduce database load
 * Returns empty array if Supabase config is invalid (e.g., during build with placeholders)
 */
export async function getCryptocurrencies(limit?: number, offset?: number) {
  // During build time, if env vars are placeholders, return empty array
  if (!hasValidSupabaseConfig()) {
    return []
  }
  
  const cacheKey = `cryptocurrencies:${limit || 'all'}:${offset || 0}`
  
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
            .select('*')
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

          return data || []
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
 * Get a single cryptocurrency by slug
 * Uses service role if available, falls back to anon key for public reads
 * Results are cached for 5 minutes to reduce database load
 */
export async function getCryptocurrencyBySlug(slug: string) {
  const normalizedSlug = slug.toLowerCase()
  const cacheKey = `crypto:slug:${normalizedSlug}`
  
  return getCachedValue(
    cacheKey,
    async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase configuration: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set')
      }

      let supabase
      
      // Try to use service role key if available (for admin operations)
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (serviceRoleKey) {
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
      
      const { data, error } = await supabase
        .from('cryptocurrencies')
        .select('*')
        .eq('slug', normalizedSlug)
        .single()

      if (error) {
        throw new Error(`Failed to fetch cryptocurrency: ${error.message}`)
      }

      if (!data) {
        throw new Error(`Cryptocurrency with slug "${slug}" not found`)
      }

      return data
    },
    {
      tags: [CacheTags.CRYPTO_DETAIL, `crypto-${normalizedSlug}`],
      revalidate: 300, // 5 minutes
    }
  )
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
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return null
    }

    return data.updated_at ? new Date(data.updated_at) : null
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

