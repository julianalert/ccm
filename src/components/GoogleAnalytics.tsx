'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

interface GoogleAnalyticsProps {
  gaId?: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!gaId || typeof window.gtag === 'undefined') return
    
    window.gtag('config', gaId, {
      page_path: pathname,
    })
  }, [pathname, gaId])

  if (!gaId) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  )
}

