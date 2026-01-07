import { MetadataRoute } from 'next'
import { getCryptocurrencies } from '@/lib/db/cryptocurrencies'

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
    // Get all cryptocurrencies (limit to reasonable number for sitemap)
    // Google recommends max 50,000 URLs per sitemap
    const cryptos = await getCryptocurrencies(50000)
    
    // Crypto detail pages
    const cryptoPages: MetadataRoute.Sitemap = (cryptos || []).map((crypto) => ({
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

