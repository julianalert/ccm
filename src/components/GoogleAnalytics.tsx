'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// TypeScript declaration for gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

interface GoogleAnalyticsProps {
  gaId?: string
}

/**
 * Google Analytics 4 component with proper Next.js App Router support
 * 
 * Usage:
 * Add to your root layout:
 * <GoogleAnalytics gaId="G-XXXXXXXXXX" />
 * 
 * Get your GA4 ID from: https://analytics.google.com/
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') {
      return
    }

    // Wait for gtag to be available (scripts load asynchronously)
    const checkGtag = () => {
      if (typeof window.gtag === 'undefined') {
        // Retry after a short delay if gtag isn't loaded yet
        setTimeout(checkGtag, 100)
        return
      }

      // Track page view on route change
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      try {
        window.gtag('config', gaId, {
          page_path: url,
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    checkGtag()
  }, [pathname, searchParams, gaId])

  if (!gaId) {
    return null
  }

  // Validate and sanitize GA ID to prevent XSS
  // GA4 IDs format: G-XXXXXXXXXX (G- followed by alphanumeric characters)
  // Allow G- prefix and alphanumeric characters/hyphens
  const sanitizedGaId = gaId.trim()
  const gaIdPattern = /^G-[A-Z0-9]+$/i
  
  if (!gaIdPattern.test(sanitizedGaId)) {
    // Invalid GA ID format, don't render
    console.warn('Invalid Google Analytics ID format. Expected format: G-XXXXXXXXXX')
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
            gtag('config', '${sanitizedGaId}');
          `,
        }}
      />
    </>
  )
}

