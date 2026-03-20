import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { getCryptocurrencyBySlug } from '@/lib/db/cryptocurrencies'
import { getCryptoContent } from '@/lib/crypto-content'
import { getCryptoFaqs } from '@/lib/crypto-faqs'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CryptoDetailCards } from '@/components/CryptoDetailCards'
import { CryptoChartSection } from '@/components/CryptoChartSection'
import { CryptoDescription } from '@/components/CryptoDescription'
import { CryptoFaqs } from '@/components/CryptoFaqs'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CallToAction } from '@/components/CallToAction'
import { RelatedCryptos } from '@/components/RelatedCryptos'
import { LastUpdated } from '@/components/LastUpdated'
import { SocialShare } from '@/components/SocialShare'
import { FinancialProductSchema, FAQPageSchema, BreadcrumbSchema } from '@/components/StructuredData'
import thumbnailImage from '@/images/thumbnail.png'

// Slug validation schema - only lowercase letters, numbers, and hyphens
const slugSchema = z.string()
  .min(1, 'Slug cannot be empty')
  .max(100, 'Slug too long')
  .regex(/^[a-z0-9-]+$/, 'Invalid slug format - only lowercase letters, numbers, and hyphens allowed')

const metadataBase = new URL('https://www.courscryptomonnaies.com')

const fallbackSocialImage = metadataBase
  ? new URL(thumbnailImage.src, metadataBase).toString()
  : thumbnailImage.src

const siteName = 'Cours-Crypto'

// ISR: Revalidate pages every 5 minutes (300 seconds)
// This ensures pages are regenerated periodically with fresh data
// while still serving cached pages to reduce database load
export const revalidate = 300

function toAbsoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) {
    return fallbackSocialImage
  }

  try {
    return new URL(pathOrUrl).toString()
  } catch {
    if (metadataBase) {
      try {
        return new URL(pathOrUrl, metadataBase).toString()
      } catch {
        return fallbackSocialImage
      }
    }

    return pathOrUrl
  }
}

interface PageProps {
  params: Promise<{
    cryptoName: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cryptoName } = await params
  
  // Validate slug parameter to prevent injection attacks
  const slugValidation = slugSchema.safeParse(cryptoName)
  if (!slugValidation.success) {
    return {
      title: {
        absolute: 'Crypto introuvable | Cours-Crypto',
      },
      description:
        'La crypto-monnaie recherchée est introuvable ou a été retirée de la base Cours-Crypto.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }
  
  // Use the same cached query that the page component will use
  // Next.js will deduplicate these requests automatically
  let crypto = null
  try {
    crypto = await getCryptocurrencyBySlug(slugValidation.data)
  } catch (error) {
    // Log error but don't fail metadata generation
    console.error(`Error fetching crypto for metadata: ${slugValidation.data}`, error)
    crypto = null
  }

  if (!crypto) {
    return {
      title: {
        absolute: 'Crypto introuvable | Cours-Crypto',
      },
      description:
        'La crypto-monnaie recherchée est introuvable ou a été retirée de la base Cours-Crypto.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const pageTitle = `Cours ${crypto.name} (${crypto.symbol}) - Prix, Graphique et Convertisseur ${crypto.symbol}-EUR`
  const pageDescription = `${crypto.name} (${crypto.symbol}) en euros : prix en temps réel, graphique interactif, historique, volume 24h. Suivez l'évolution du ${crypto.symbol} et convertissez en EUR instantanément.` 
  const canonicalPath = `/${crypto.slug}`
  const canonicalUrl = new URL(canonicalPath, metadataBase).toString()
  const socialImage = toAbsoluteUrl(crypto.logo)

  return {
    metadataBase,
    title: {
      absolute: pageTitle,
    },
    description: pageDescription,
    keywords: [
      crypto.name.toLowerCase(),
      crypto.symbol.toLowerCase(),
      'cours crypto',
      'prix crypto',
      'crypto-monnaie',
      'cryptomonnaie',
      `${crypto.name.toLowerCase()} prix`,
      `${crypto.symbol.toLowerCase()} eur`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      siteName,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `Illustration ou logo de ${crypto.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [socialImage],
    },
  }
}

export default async function CryptoDetailPage({ params }: PageProps) {
  const { cryptoName } = await params
  
  // Validate slug parameter to prevent injection attacks
  const slugValidation = slugSchema.safeParse(cryptoName)
  if (!slugValidation.success) {
    notFound()
  }
  
  let crypto = null
  try {
    crypto = await getCryptocurrencyBySlug(slugValidation.data)
  } catch (error) {
    // Log the error for debugging
    console.error(`Error fetching cryptocurrency: ${slugValidation.data}`, error)
    // Return 404 if crypto not found
    notFound()
  }

  if (!crypto) {
    notFound()
  }

  // Get custom content from codebase
  const content = getCryptoContent(crypto.slug)
  const faqContent = getCryptoFaqs(crypto.slug)

  const eurQuote = crypto.quote?.EUR
  const price = eurQuote?.price
  const baseUrl = 'https://www.courscryptomonnaies.com'
  const cryptoUrl = `${baseUrl}/${crypto.slug}`

  // Prepare FAQ data for schema
  const faqSchemaData = faqContent?.faqs
    ? faqContent.faqs.flat().map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      }))
    : []

  return (
    <>
      {/* Structured Data */}
      <FinancialProductSchema
        name={crypto.name}
        symbol={crypto.symbol}
        description={`Consultez le cours ${crypto.name} (${crypto.symbol}) en euros : prix temps réel, historique des prix, graphique, volume 24h.`}
        price={price}
        priceCurrency="EUR"
        category="Cryptocurrency"
      />
      {faqSchemaData.length > 0 && <FAQPageSchema faqs={faqSchemaData} />}
      <BreadcrumbSchema
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: crypto.name, url: cryptoUrl },
        ]}
      />

      <Header />
      <main>
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { name: 'Accueil', href: '/' },
              { name: crypto.name, href: `/${crypto.slug}` },
            ]}
          />
          <CryptoDetailCards crypto={crypto} />
          <CryptoChartSection crypto={crypto} />
        </Container>
        <CryptoFaqs faqContent={faqContent} />
        <Container className="py-10">
          <CryptoDescription crypto={crypto} content={content} />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <LastUpdated date={crypto.updated_at || crypto.last_updated || new Date()} />
            <SocialShare
              title={`Cours ${crypto.name} (${crypto.symbol})`}
              description={`Consultez le cours ${crypto.name} en euros : prix en temps réel, graphique interactif, historique, volume 24h.`}
            />
          </div>
          <RelatedCryptos
            currentCryptoSlug={crypto.slug}
            currentCryptoRank={crypto.cmc_rank}
          />
        </Container>
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

