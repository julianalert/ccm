import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCryptocurrencyBySlug } from '@/lib/db/cryptocurrencies'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CryptoDetailCards } from '@/components/CryptoDetailCards'
import { CryptoChartSection } from '@/components/CryptoChartSection'
import { CryptoDescription } from '@/components/CryptoDescription'
import thumbnailImage from '@/images/thumbnail.png'

const metadataBase = (() => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    return undefined
  }

  try {
    return new URL(baseUrl)
  } catch (error) {
    console.warn('NEXT_PUBLIC_SITE_URL must be a valid URL. Falling back to relative metadata URLs.')
    return undefined
  }
})()

const fallbackSocialImage = metadataBase
  ? new URL(thumbnailImage.src, metadataBase).toString()
  : thumbnailImage.src

const siteName = 'CCM Crypto'

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
  const crypto = await getCryptocurrencyBySlug(cryptoName).catch(() => null)

  if (!crypto) {
    return {
      title: {
        absolute: 'Crypto introuvable | CCM Crypto',
      },
      description:
        'La crypto-monnaie recherchée est introuvable ou a été retirée de la base CCM Crypto.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const pageTitle = `Cours ${crypto.name} (${crypto.symbol}) - Prix, Graphique et Convertisseur ${crypto.symbol}-EUR`
  const pageDescription = `Consultez le cours ${crypto.name} (${crypto.symbol}) en euros : prix temps réel, historique des prix, graphique, volume 24h.` 
  const canonicalPath = `/${crypto.slug}`
  const canonicalUrl = metadataBase
    ? new URL(canonicalPath, metadataBase).toString()
    : canonicalPath
  const socialImage = toAbsoluteUrl(crypto.logo)

  return {
    metadataBase,
    title: {
      absolute: pageTitle,
    },
    description: pageDescription,
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
  const crypto = await getCryptocurrencyBySlug(cryptoName).catch(() => null)

  if (!crypto) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <Container className="py-10">
          <CryptoDetailCards crypto={crypto} />
          <CryptoChartSection crypto={crypto} />
          <CryptoDescription crypto={crypto} />
        </Container>
      </main>
      <Footer />
    </>
  )
}

