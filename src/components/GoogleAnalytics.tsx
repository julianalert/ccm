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

  // Validate and sanitize GA ID to prevent XSS
  // GA IDs should only contain alphanumeric characters and hyphens, max 20 chars
  const sanitizedGaId = gaId.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 20)
  
  if (!sanitizedGaId || sanitizedGaId.length === 0) {
    // Invalid GA ID, don't render
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${sanitizedGaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${sanitizedGaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

