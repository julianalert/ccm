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
 * Maps cryptocurrency symbol to TradingView symbol format
 * TradingView uses formats like "BINANCE:BTCUSDT" or "COINBASE:BTCUSD"
 * For EUR pairs, we'll use BINANCE which is the most liquid exchange
 */
function getTradingViewSymbol(symbol: string): string {
  const upperSymbol = symbol.toUpperCase()
  // TradingView format: EXCHANGE:SYMBOLPAIR
  // Using BINANCE as it's the most liquid and widely supported
  // For EUR pairs, we'll use USDT as base (most common) or try to find EUR pair
  // TradingView will automatically handle the conversion
  return `BINANCE:${upperSymbol}USDT`
}

export function TradingViewChart({ symbol, height = 600 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Generate unique ID for the container (memoized to avoid regeneration on re-renders)
  const containerId = useMemo(
    () => `tradingview_${symbol.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`,
    [symbol]
  )

  useEffect(() => {
    if (!containerRef.current) return

    const tradingViewSymbol = getTradingViewSymbol(symbol)

    function initializeWidget() {
      if (!containerRef.current || !window.TradingView) {
        setError('TradingView n\'est pas disponible')
        return
      }

      try {
        widgetRef.current = new window.TradingView.widget({
          autosize: true,
          symbol: tradingViewSymbol,
          interval: 'D',
          timezone: 'Europe/Paris',
          theme: 'light',
          style: '1',
          locale: 'fr',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: false,
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
        setError(null)
      } catch (err) {
        console.error('Error initializing TradingView widget:', err)
        setError('Erreur lors de l\'initialisation du graphique')
      }
    }

    // Check if TradingView is already loaded
    if (window.TradingView) {
      initializeWidget()
      return
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')
    if (existingScript) {
      // Script exists - check if it's already loaded
      if (window.TradingView) {
        initializeWidget()
      } else {
        // Script is loading, wait for it
        existingScript.addEventListener('load', initializeWidget)
        return () => {
          existingScript.removeEventListener('load', initializeWidget)
        }
      }
      return
    }

    // Load TradingView widget script
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = initializeWidget
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
  }, [symbol, height, containerId])

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

