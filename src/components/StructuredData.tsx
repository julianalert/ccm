interface StructuredDataProps {
  data: object
}

/**
 * Component to inject JSON-LD structured data into the page
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Organization schema for homepage
 */
export function OrganizationSchema() {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cours-Crypto',
        url: 'https://courscryptomonnaies.com',
        logo: 'https://courscryptomonnaies.com/images/logo.svg',
        sameAs: ['https://x.com/juliendvr'],
        description:
          "Suivez plus de 2 000 crypto-monnaies en euros : prix en temps réel, variations et capitalisation pour Bitcoin, Ethereum et l'ensemble du marché.",
      }}
    />
  )
}

/**
 * WebSite schema with search functionality
 */
export function WebSiteSchema() {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CCM Crypto',
        url: 'https://courscryptomonnaies.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://courscryptomonnaies.com/?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}

/**
 * FinancialProduct schema for cryptocurrency pages
 */
interface FinancialProductSchemaProps {
  name: string
  symbol: string
  description: string
  price?: number
  priceCurrency?: string
  category?: string
}

export function FinancialProductSchema({
  name,
  symbol,
  description,
  price,
  priceCurrency = 'EUR',
  category = 'Cryptocurrency',
}: FinancialProductSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name,
    alternateName: symbol,
    description,
    category,
  }

  if (price !== undefined && price !== null) {
    schema.offers = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }
  }

  return <StructuredData data={schema} />
}

/**
 * FAQPage schema for pages with FAQs
 */
interface FAQPageSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

/**
 * BreadcrumbList schema
 */
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

