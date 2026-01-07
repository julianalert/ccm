'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId?: string
}

/**
 * Google Analytics 4 component
 * 
 * Usage:
 * Add to your root layout:
 * <GoogleAnalytics gaId="G-XXXXXXXXXX" />
 * 
 * Get your GA4 ID from: https://analytics.google.com/
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) {
    return null
  }

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
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

