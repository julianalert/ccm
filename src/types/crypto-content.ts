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

