'use client'

import Image from 'next/image'
import DOMPurify from 'dompurify'
import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'
import { CryptoContent, CryptoSection } from '@/types/crypto-content'

interface CryptoDescriptionProps {
  crypto: CryptocurrencyRow
  content?: CryptoContent | null
}

// Sanitize HTML using DOMPurify (client-side only)
function sanitizeHTML(html: string): string {
  // DOMPurify only works in browser, so this is safe in client components
  if (typeof window !== 'undefined' && DOMPurify) {
    return DOMPurify.sanitize(html, {
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
      ALLOWED_TAGS: ['a', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ADD_ATTR: ['target'], // Allow target attribute
    })
  }
  // Fallback: basic HTML escape for initial render
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// Component to render different section types
function renderSection(section: CryptoSection, index: number) {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: sanitizeHTML(section.content as string) }} />
      )
    
    case 'heading':
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
          {section.content}
        </h2>
      )
    
    case 'heading3':
      return (
        <h3 key={index} className="text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-3">
          {section.content}
        </h3>
      )
    
    case 'list':
      return (
        <div key={index}>
          {section.heading && (
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {section.heading}
            </h3>
          )}
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            {Array.isArray(section.content) && section.content.map((item, itemIndex) => (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: sanitizeHTML(item) }} />
            ))}
          </ul>
        </div>
      )
    
    case 'image':
      const imageSrc = section.content as string
      const isExternal = imageSrc.startsWith('http') || imageSrc.startsWith('//')
      const isLocal = imageSrc.startsWith('/images/')
      return (
        <div key={index} className="my-8">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            {isLocal ? (
              // Use img tag for local images to avoid Next.js Image issues
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={section.imageAlt || 'Crypto image'}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={imageSrc}
                alt={section.imageAlt || 'Crypto image'}
                fill
                className="object-cover"
                unoptimized={isExternal}
              />
            )}
          </div>
          {section.imageCaption && (
            <p className="text-sm text-gray-500 text-center mt-2 italic">
              {section.imageCaption}
            </p>
          )}
        </div>
      )
    
    default:
      return null
  }
}

export function CryptoDescription({ crypto, content }: CryptoDescriptionProps) {
  // If custom content exists, use it; otherwise fallback to default
  if (content && content.sections.length > 0) {
    return (
      <div className="mt-8 mb-16 w-full">
        <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          {content.title}
        </h2>
        
        {/* Hero Image */}
        {content.heroImage && (
          <div className="mt-6 mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
              {content.heroImage.startsWith('/images/') ? (
                // Use img tag for local images to avoid Next.js Image issues
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.heroImage}
                  alt={content.heroImageAlt || `Illustration de ${crypto.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={content.heroImage}
                  alt={content.heroImageAlt || `Illustration de ${crypto.name}`}
                  fill
                  className="object-cover"
                  unoptimized={content.heroImage.startsWith('http') || content.heroImage.startsWith('//')}
                />
              )}
            </div>
          </div>
        )}

        {/* Render sections */}
        <div className="prose prose-lg max-w-none [&_a]:underline [&_a]:text-gray-700 [&_a:hover]:text-gray-900">
          {content.sections.map((section, index) => renderSection(section, index))}
        </div>
      </div>
    )
  }

  // Fallback message when no custom content is available
  const comingSoonMessage = `Toutes les informations concernant ${crypto.name} arrivent bientôt.`

  return (
    <div className="mt-8 mb-16 w-full">
      <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
        À propos de {crypto.name}
      </h2>
      
      <div className="mt-6 prose prose-lg max-w-none">
        <p className="text-lg tracking-tight text-slate-700">
          {comingSoonMessage}
        </p>
      </div>
    </div>
  )
}

