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
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData'
import thumbnailImage from '@/images/thumbnail.png'

const metadataBase = new URL('https://www.courscryptomonnaies.com')

const defaultSocialImage = metadataBase
  ? new URL(thumbnailImage.src, metadataBase).toString()
  : thumbnailImage.src

const siteName = 'Cours-Crypto'
const pageTitle = 'Cours des crypto-monnaies en temps réel | Cours Crypto'
const pageDescription =
  'Suivez plus de 2 000 crypto-monnaies en euros : prix en temps réel, variations et capitalisation pour Bitcoin, Ethereum et l\'ensemble du marché.'

// ISR: Revalidate page every 5 minutes (300 seconds)
// This ensures the page is regenerated periodically with fresh data
export const revalidate = 300

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
    canonical: metadataBase.toString(),
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: metadataBase.toString(),
    title: pageTitle,
    description: pageDescription,
    siteName,
    images: [
      {
        url: defaultSocialImage,
        width: 1200,
        height: 630,
        alt: 'Interface Cours Crypto montrant le suivi en temps réel des cours de crypto-monnaies.',
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
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <main>
        <Hero />
        <Faqs />
        {/* <PrimaryFeatures />*/}
        <SecondaryFeatures /> 
        <CallToAction />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
      </main>
      <Footer />
    </>
  )
}
