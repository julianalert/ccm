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
      // Script already exists, just ensure gtag is initialized
      if (typeof window.gtag === 'undefined') {
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          window.dataLayer.push(args)
        }
        ;(window as any).gtag = gtag
      }
      return
    }

    // Initialize dataLayer and gtag function BEFORE loading script
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    ;(window as any).gtag = gtag
    gtag('js', new Date())

    // Load the gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    
    // Wait for script to load before configuring
    script1.onload = () => {
      gtag('config', gaId, {
        send_page_view: true,
      })
    }
    
    script1.onerror = () => {
      console.error('Failed to load Google Analytics script')
    }
    
    document.head.appendChild(script1)
  }, [gaId])

  // Track page views on route change
  useEffect(() => {
    if (!gaId || !pathname || typeof window === 'undefined') return

    // Wait a bit for gtag to be available
    const trackPageView = () => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', gaId, {
          page_path: pathname,
          page_title: document.title,
        })
      } else {
        // Retry after a short delay if gtag isn't ready yet
        setTimeout(trackPageView, 100)
      }
    }

    trackPageView()
  }, [pathname, gaId])

  return null
}

