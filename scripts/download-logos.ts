#!/usr/bin/env node
/**
 * Script to download cryptocurrency logos and upload them to Supabase Storage
 * 
 * This script:
 * 1. Fetches cryptocurrencies from the database (top 200 by default)
 * 2. Downloads logos from CoinMarketCap CDN
 * 3. Uploads them to Supabase Storage bucket 'crypto-logos'
 * 4. Updates the database with the new Supabase Storage URLs
 * 
 * Usage:
 *   npm run download-logos
 *   npm run download-logos -- --limit 200
 *   npm run download-logos -- --limit 300 --offset 200
 *   npm run download-logos -- --limit 500 --bucket crypto-logos
 */

// Verify required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  console.error('   Please make sure .env.local contains: NEXT_PUBLIC_SUPABASE_URL=your-url')
  process.exit(1)
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  console.error('   Please make sure .env.local contains: SUPABASE_SERVICE_ROLE_KEY=your-key')
  process.exit(1)
}

import { createServerClient } from '../src/lib/supabase'
import { getCryptocurrencies } from '../src/lib/db/cryptocurrencies'

// Parse command line arguments (supports both --key=value and --key value formats)
const args = process.argv.slice(2)
let limit = 200
let offset = 0
let bucketName = 'crypto-logos'

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  
  if (arg.startsWith('--limit=')) {
    limit = parseInt(arg.split('=')[1])
  } else if (arg === '--limit' && i + 1 < args.length) {
    limit = parseInt(args[i + 1])
    i++
  } else if (arg.startsWith('--offset=')) {
    offset = parseInt(arg.split('=')[1])
  } else if (arg === '--offset' && i + 1 < args.length) {
    offset = parseInt(args[i + 1])
    i++
  } else if (arg.startsWith('--bucket=')) {
    bucketName = arg.split('=')[1]
  } else if (arg === '--bucket' && i + 1 < args.length) {
    bucketName = args[i + 1]
    i++
  }
}

const COINMARKETCAP_LOGO_BASE_URL = 'https://s2.coinmarketcap.com/static/img/coins/64x64'

interface CryptoWithLogo {
  id: number
  cmc_id: number
  name: string
  symbol: string
  logo: string | null
}

/**
 * Download a logo from CoinMarketCap CDN
 */
async function downloadLogo(cmcId: number, symbol: string): Promise<Buffer | null> {
  const url = `${COINMARKETCAP_LOGO_BASE_URL}/${cmcId}.png`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`  ⚠️  Logo not found for ${symbol} (CMC ID: ${cmcId})`)
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error(`  ❌ Error downloading logo for ${symbol} (${url}):`, error)
    return null
  }
}

/**
 * Upload logo to Supabase Storage
 */
async function uploadLogoToSupabase(
  supabase: ReturnType<typeof createServerClient>,
  logoBuffer: Buffer,
  filename: string
): Promise<string | null> {
  try {
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, logoBuffer, {
        contentType: 'image/png',
        upsert: true, // Overwrite if exists
      })

    if (error) {
      // If bucket doesn't exist, try to create it
      if (error.message.includes('Bucket not found') || error.message.includes('not found')) {
        console.log(`  📦 Creating bucket '${bucketName}'...`)
        
        // Create the bucket (requires service role key)
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true, // Make bucket public so images can be accessed
          fileSizeLimit: 5242880, // 5MB limit
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
        })

        if (createError) {
          console.error(`  ❌ Error creating bucket:`, createError)
          return null
        }

        // Retry upload after creating bucket
        const { data: retryData, error: retryError } = await supabase.storage
          .from(bucketName)
          .upload(filename, logoBuffer, {
            contentType: 'image/png',
            upsert: true,
          })

        if (retryError) {
          console.error(`  ❌ Error uploading after bucket creation:`, retryError)
          return null
        }

        // Get public URL after successful retry
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filename)

        return urlData.publicUrl
      } else {
        console.error(`  ❌ Error uploading to Supabase Storage:`, error)
        return null
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename)

    return urlData.publicUrl
  } catch (error) {
    console.error(`  ❌ Unexpected error uploading logo:`, error)
    return null
  }
}

/**
 * Update logo URL in database
 */
async function updateLogoInDatabase(
  supabase: ReturnType<typeof createServerClient>,
  cryptoId: number,
  logoUrl: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('cryptocurrencies')
      .update({ logo: logoUrl })
      .eq('id', cryptoId)

    if (error) {
      console.error(`  ❌ Error updating database:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`  ❌ Unexpected error updating database:`, error)
    return false
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting logo download and upload process...\n')
  console.log(`📊 Configuration:`)
  console.log(`   - Limit: ${limit} cryptocurrencies`)
  console.log(`   - Offset: ${offset} (starting from rank ${offset + 1})`)
  console.log(`   - Bucket: ${bucketName}`)
  console.log(`   - Source: CoinMarketCap CDN\n`)

  const supabase = createServerClient()

  // Fetch cryptocurrencies from database
  console.log(`📥 Fetching cryptocurrencies from database (offset: ${offset}, limit: ${limit})...`)
  const cryptocurrencies = await getCryptocurrencies(limit, offset) as CryptoWithLogo[]
  
  if (!cryptocurrencies || cryptocurrencies.length === 0) {
    console.error('❌ No cryptocurrencies found in database')
    process.exit(1)
  }

  console.log(`✅ Found ${cryptocurrencies.length} cryptocurrencies\n`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  // Process each cryptocurrency
  for (let i = 0; i < cryptocurrencies.length; i++) {
    const crypto = cryptocurrencies[i]
    const progress = `[${i + 1}/${cryptocurrencies.length}]`
    
    console.log(`${progress} Processing ${crypto.name} (${crypto.symbol})...`)

    // Skip if logo already exists in Supabase Storage
    if (crypto.logo && crypto.logo.includes('supabase.co/storage')) {
      console.log(`  ⏭️  Logo already uploaded, skipping`)
      skipCount++
      continue
    }

    // Download logo
    const logoBuffer = await downloadLogo(crypto.cmc_id, crypto.symbol)
    
    if (!logoBuffer) {
      errorCount++
      continue
    }

    // Create filename: {cmc_id}-{symbol}.png
    // Sanitize symbol to remove special characters that might cause issues
    const sanitizedSymbol = crypto.symbol
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
      .substring(0, 20) // Limit length
    
    const filename = `${crypto.cmc_id}-${sanitizedSymbol || 'unknown'}.png`

    // Upload to Supabase Storage
    const logoUrl = await uploadLogoToSupabase(supabase, logoBuffer, filename)
    
    if (!logoUrl) {
      errorCount++
      continue
    }

    // Update database
    const updated = await updateLogoInDatabase(supabase, crypto.id, logoUrl)
    
    if (updated) {
      console.log(`  ✅ Successfully uploaded and updated: ${logoUrl}`)
      successCount++
    } else {
      errorCount++
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skipCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📦 Total: ${cryptocurrencies.length}`)
  console.log('='.repeat(50))
  
  if (errorCount > 0) {
    console.log('\n⚠️  Some logos failed to download/upload. Check the errors above.')
    process.exit(1)
  } else {
    console.log('\n🎉 All logos processed successfully!')
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})

