import { notFound } from 'next/navigation'
import { getCryptocurrencyBySlug } from '@/lib/db/cryptocurrencies'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CryptoDetailCards } from '@/components/CryptoDetailCards'
import { CryptoChartSection } from '@/components/CryptoChartSection'
import { CryptoDescription } from '@/components/CryptoDescription'

interface PageProps {
  params: Promise<{
    cryptoName: string
  }>
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

