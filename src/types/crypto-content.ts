export type CryptoSectionType = 'paragraph' | 'heading' | 'heading3' | 'list' | 'image'

export interface CryptoSection {
  type: CryptoSectionType
  content: string | string[]
  heading?: string
  imageAlt?: string
  imageCaption?: string
}

export interface CryptoContent {
  slug: string
  title: string
  heroImage?: string
  heroImageAlt?: string
  sections: CryptoSection[]
}

export interface CryptoFaq {
  question: string
  answer: string
}

export interface CryptoFaqContent {
  slug: string
  title?: string
  description?: string
  faqs: CryptoFaq[][]
}

