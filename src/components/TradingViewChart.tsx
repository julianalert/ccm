'use client'

import { useEffect, useRef, useState, useMemo } from 'react'

interface TradingViewChartProps {
  symbol: string
  height?: number
}

// TypeScript declaration for TradingView widget
declare global {
  interface Window {
    TradingView?: {
      widget: new (options: TradingViewWidgetOptions) => void
    }
  }
}

interface TradingViewWidgetOptions {
  autosize?: boolean
  symbol: string
  interval?: string
  timezone?: string
  theme?: 'light' | 'dark'
  style?: string
  locale?: string
  toolbar_bg?: string
  enable_publishing?: boolean
  allow_symbol_change?: boolean
  container_id: string
  height: number
  width: string
  hide_side_toolbar?: boolean
  save_image?: boolean
  studies?: string[]
  show_popup_button?: boolean
  popup_width?: string
  popup_height?: string
}

/**
 * Gets TradingView symbol options - tries EUR first, falls back to USDT
 * Uses direct pair format (e.g., REQEUR) which TradingView resolves automatically
 * Falls back to BINANCE:USDT if EUR not available
 */
function getTradingViewSymbols(symbol: string): string[] {
  const upperSymbol = symbol.toUpperCase()
  return [
    `${upperSymbol}EUR`,              // Direct EUR pair (e.g., REQEUR)
    `BINANCE:${upperSymbol}USDT`,     // Fallback to USDT (almost always available)
  ]
}

export function TradingViewChart({ symbol, height = 600 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)
  const symbolIndexRef = useRef(0)
  
  // Generate unique ID for the container (memoized to avoid regeneration on re-renders)
  const containerId = useMemo(
    () => `tradingview_${symbol.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`,
    [symbol]
  )

  const symbolOptions = useMemo(() => getTradingViewSymbols(symbol), [symbol])

  useEffect(() => {
    if (!containerRef.current) return

    symbolIndexRef.current = 0 // Reset symbol index when symbol changes

    function initializeWidget(symbolToTry: string, index: number) {
      if (!containerRef.current || !window.TradingView) {
        setError('TradingView n\'est pas disponible')
        return
      }

      // Clean up previous widget
      if (widgetRef.current) {
        try {
          // TradingView widgets don't have a direct destroy method, but we can clear the container
          if (containerRef.current) {
            containerRef.current.innerHTML = ''
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        widgetRef.current = null
      }

      try {
        widgetRef.current = new window.TradingView.widget({
          autosize: true,
          symbol: symbolToTry,
          interval: '60', // 1 hour candles
          timezone: 'Europe/Paris',
          theme: 'light',
          style: '1',
          locale: 'fr',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true, // Allow manual change if symbol doesn't work
          container_id: containerId,
          height: height,
          width: '100%',
          hide_side_toolbar: false,
          save_image: true,
          studies: [
            'Volume@tv-basicstudies',
          ],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
        })
        
        // Check if symbol is valid after a short delay
        // If widget shows error, try next symbol
        const checkTimeout = setTimeout(() => {
          if (containerRef.current) {
            // Check if there's an error message in the container
            const errorElements = containerRef.current.querySelectorAll('[class*="error"], [class*="Error"]')
            const hasErrorText = containerRef.current.textContent?.includes('n\'existe pas') || 
                                 containerRef.current.textContent?.includes('n\'est pas disponible') ||
                                 containerRef.current.textContent?.includes('does not exist')
            
            if (errorElements.length > 0 || hasErrorText) {
              // Symbol doesn't exist, try next option
              if (index < symbolOptions.length - 1) {
                console.log(`Symbol ${symbolToTry} not available, trying fallback...`)
                symbolIndexRef.current = index + 1
                initializeWidget(symbolOptions[index + 1], index + 1)
              } else {
                // All options tried, show error
                setError(`Symbole ${symbol} non disponible. Vous pouvez le changer manuellement dans le graphique.`)
              }
            } else {
              // Symbol works!
              setError(null)
            }
          }
        }, 2000) // Wait 2 seconds to see if widget loads successfully

        // Store timeout to clear if component unmounts
        return () => clearTimeout(checkTimeout)
      } catch (err) {
        console.error('Error initializing TradingView widget:', err)
        // Try next symbol if available
        if (index < symbolOptions.length - 1) {
          symbolIndexRef.current = index + 1
          initializeWidget(symbolOptions[index + 1], index + 1)
        } else {
          setError('Erreur lors de l\'initialisation du graphique')
        }
      }
    }

    function startInitialization() {
      // Start with first symbol option (EUR pair)
      initializeWidget(symbolOptions[0], 0)
    }

    // Check if TradingView is already loaded
    if (window.TradingView) {
      startInitialization()
      return
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')
    if (existingScript) {
      // Script exists - check if it's already loaded
      if (window.TradingView) {
        startInitialization()
      } else {
        // Script is loading, wait for it
        existingScript.addEventListener('load', startInitialization)
        return () => {
          existingScript.removeEventListener('load', startInitialization)
        }
      }
      return
    }

    // Load TradingView widget script
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = startInitialization
    script.onerror = () => {
      setError('Impossible de charger le graphique TradingView')
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup widget on unmount
      if (widgetRef.current) {
        widgetRef.current = null
      }
    }
  }, [symbol, height, containerId, symbolOptions])

  if (error) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-lg bg-slate-100">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-slate-500">Veuillez réessayer plus tard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tradingview-widget-container">
      <div
        id={containerId}
        ref={containerRef}
        style={{ height: `${height}px`, width: '100%' }}
        className="rounded-lg"
      />
    </div>
  )
}

