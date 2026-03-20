import { MetadataRoute } from 'next'
import { getCryptocurrencies } from '@/lib/db/cryptocurrencies'
import { getCachedValue, CacheTags } from '@/lib/cache'

// Revalidate sitemap once a day (86400 seconds)
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.courscryptomonnaies.com'
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
  ]
  
  try {
    // Cache sitemap generation for 24 hours to reduce database load
    // Sitemaps are requested frequently by bots, so caching is critical
    const cryptoPages = await getCachedValue(
      'sitemap:cryptos',
      async () => {
        // Supabase PostgREST has a maximum limit of 1000 rows per query
        // Fetch all cryptocurrencies in batches of 1000
        const BATCH_SIZE = 1000
        const allCryptos: any[] = []
        let offset = 0
        let hasMore = true
        
        while (hasMore) {
          const batch = await getCryptocurrencies(BATCH_SIZE, offset)
          
          if (!batch || batch.length === 0) {
            hasMore = false
            break
          }
          
          allCryptos.push(...batch)
          
          // If we got fewer than BATCH_SIZE, we've reached the end
          if (batch.length < BATCH_SIZE) {
            hasMore = false
          } else {
            offset += BATCH_SIZE
          }
        }
        
        // If cryptos is empty (e.g., during build with invalid env vars), return empty array
        if (allCryptos.length === 0) {
          return []
        }
        
        return allCryptos.map((crypto) => ({
          url: `${baseUrl}/${crypto.slug}`,
          lastModified: crypto.updated_at ? new Date(crypto.updated_at) : new Date(),
          changeFrequency: 'hourly' as const,
          priority: 0.8,
        }))
      },
      {
        tags: [CacheTags.SITEMAP],
        revalidate: 86400, // 24 hours (once a day)
      }
    )
    
    return [...routes, ...(cryptoPages || [])]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if there's an error
    return routes
  }
}

