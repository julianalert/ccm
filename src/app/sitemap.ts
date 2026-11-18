import { MetadataRoute } from 'next'
import { getAllCryptocurrencyRows } from '@/lib/db/cryptocurrencies'

// Regenerate the sitemap once a day (86400 seconds). The route itself is the
// cache: the database is only read when it regenerates.
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
    const allCryptos = await getAllCryptocurrencyRows<{ slug: string; updated_at: string | null }>(
      'slug, updated_at'
    )

    const cryptoPages: MetadataRoute.Sitemap = allCryptos.map((crypto) => ({
      url: `${baseUrl}/${crypto.slug}`,
      lastModified: crypto.updated_at ? new Date(crypto.updated_at) : new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    }))
    
    return [...routes, ...cryptoPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if there's an error
    return routes
  }
}
