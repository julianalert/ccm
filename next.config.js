/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.coinmarketcap.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Note: 'unsafe-eval' is required for TradingView widgets to function
              // This is a known limitation when using TradingView's widget library
              // Security is maintained by restricting script sources to trusted domains only
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://s3.tradingview.com https://*.tradingview.com https://www.googletagmanager.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://*.tradingview.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://*.tradingview.com",
              "connect-src 'self' https://*.supabase.co https://pro-api.coinmarketcap.com https://*.tradingview.com wss://*.tradingview.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.google.com https://*.google.com",
              "frame-src 'self' https://s3.tradingview.com https://*.tradingview.com",
              "child-src 'self' https://*.tradingview.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
