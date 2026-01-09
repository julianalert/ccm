import { MetadataRoute } from 'next'
import { getCryptocurrencies } from '@/lib/db/cryptocurrencies'
import { getCachedValue, CacheTags } from '@/lib/cache'

// Revalidate sitemap every hour (3600 seconds)
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://courscryptomonnaies.com'
  
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
    // Cache sitemap generation for 1 hour to reduce database load
    // Sitemaps are requested frequently by bots, so caching is critical
    const cryptoPages = await getCachedValue(
      'sitemap:cryptos',
      async () => {
        // Limit to top 10,000 cryptos for sitemap (still plenty)
        // This reduces the query size and improves performance
        const cryptos = await getCryptocurrencies(10000)
        
        return (cryptos || []).map((crypto) => ({
          url: `${baseUrl}/${crypto.slug}`,
          lastModified: crypto.updated_at ? new Date(crypto.updated_at) : new Date(),
          changeFrequency: 'hourly' as const,
          priority: 0.8,
        }))
      },
      {
        tags: [CacheTags.SITEMAP],
        revalidate: 3600, // 1 hour
      }
    )
    
    return [...routes, ...cryptoPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if there's an error
    return routes
  }
}

