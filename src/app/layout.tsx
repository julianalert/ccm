import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'

import '@/styles/tailwind.css'
import { GoogleAnalyticsTracker } from '@/components/GoogleAnalyticsTracker'

export const metadata: Metadata = {
  title: {
    template: '%s | Cours-Crypto',
    default: 'Cours-Crypto - Cours des crypto-monnaies en temps réel',
  },
  description:
    "Suivez plus de 2 000 crypto-monnaies en euros : prix en temps réel, variations et capitalisation pour Bitcoin, Ethereum et l'ensemble du marché.",
  metadataBase: new URL('https://courscryptomonnaies.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  manifest: '/manifest.json',
  other: {
    'cointraffic-verify': 'TicbuMvUhD3uL9Sceer6Tg9e',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
  preload: true,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html
        lang="fr"
        className={clsx(
          'h-full scroll-smooth bg-white antialiased',
          inter.variable,
          lexend.variable,
        )}
      >
      <body className="flex h-full flex-col bg-[#fafafa]">
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TKJWFRW3JH');
            `,
          }}
        />
        <Script
          id="gtag-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TKJWFRW3JH"
        />
        <GoogleAnalyticsTracker />
        {children}
      </body>
    </html>
  )
}
