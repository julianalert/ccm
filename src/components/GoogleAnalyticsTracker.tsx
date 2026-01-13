'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

const GA_ID = 'G-TKJWFRW3JH'

export function GoogleAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || typeof window === 'undefined') return

    // Wait for gtag to be available
    const trackPageView = () => {
      if (window.gtag) {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
        
        window.gtag('config', GA_ID, {
          page_path: url,
        })
      } else {
        // Retry after a short delay if gtag isn't ready yet
        setTimeout(trackPageView, 100)
      }
    }

    // Small delay to ensure scripts are loaded
    const timeoutId = setTimeout(trackPageView, 150)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return null
}
