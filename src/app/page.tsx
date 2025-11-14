import type { Metadata } from 'next'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
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

const defaultSocialImage = metadataBase
  ? new URL(thumbnailImage.src, metadataBase).toString()
  : thumbnailImage.src

const siteName = 'CCM Crypto'
const pageTitle = 'Cours des crypto-monnaies en temps réel | CCM Crypto'
const pageDescription =
  'Suivez plus de 2 000 crypto-monnaies en euros : prix en temps réel, variations et capitalisation pour Bitcoin, Ethereum et l’ensemble du marché.'

export const metadata: Metadata = {
  metadataBase,
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  keywords: [
    'crypto-monnaies',
    'cours crypto',
    'prix bitcoin',
    'ethereum',
    'altcoins',
    'marché crypto',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: metadataBase?.origin ?? '/',
    title: pageTitle,
    description: pageDescription,
    siteName,
    images: [
      {
        url: defaultSocialImage,
        width: 1200,
        height: 630,
        alt: 'Interface CCM Crypto montrant le suivi en temps réel des cours de crypto-monnaies.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [defaultSocialImage],
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <PrimaryFeatures />*/}
        <SecondaryFeatures /> 
        <CallToAction />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}
