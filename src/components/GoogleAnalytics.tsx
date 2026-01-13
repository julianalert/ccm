'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

interface GoogleAnalyticsProps {
  gaId?: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return

    // Check if already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
      return
    }

    // Load the gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script1)

    // Initialize gtag immediately
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    ;(window as any).gtag = gtag
    gtag('js', new Date())
    
    // Configure gtag
    gtag('config', gaId)
  }, [gaId])

  // Track page views on route change
  useEffect(() => {
    if (!gaId || typeof window.gtag === 'undefined' || !pathname) return

    window.gtag('config', gaId, {
      page_path: pathname,
    })
  }, [pathname, gaId])

  return null
}

