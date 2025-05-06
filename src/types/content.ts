import { Database } from '@/lib/database.types'

export interface StatItem {
  id?: string
  name: string
  stat: string
  icon: string
  created_at?: string
  updated_at?: string
}

export type StatsContent = StatItem[]

export interface HeroContent {
  id?: string
  tag: string
  title: string
  description: string
  image_url: string
  primary_button_text: string
  primary_button_link: string
  secondary_button_text: string
  secondary_button_link: string
  created_at?: string
  updated_at?: string
}

export interface ProgramContent {
  id: string
  name: string
  description: string
  tag: string
  price: number
  features: string[]
  button_text: string
  button_link: string
  created_at: string
  updated_at?: string
}

export interface WhyChooseUsContent {
  id?: string
  title: string
  description: string
  features: {
    title: string
    description: string
    icon: string
  }[]
  created_at?: string
  updated_at?: string
}

export interface FacilityContent {
  id: number
  title: string
  description: string
  image_url: string | null
  created_at?: string
  updated_at?: string
}

export interface EventContent {
  id: number
  title: string
  description: string
  date: string
  image_url: string | null
  created_at?: string
  updated_at?: string
}

export interface TermBannerContent {
  id?: number
  text: string
  is_active: boolean
  variant?: 'default' | 'gradient' | 'accent' | 'dark'
  icon?: string
  button_text?: string
  button_link?: string
  created_at?: string
  updated_at?: string
}

export interface FooterContent {
  id?: number
  about_text: string
  address_line1: string
  address_line2: string
  phone: string
  email: string
  copyright_text: string
  created_at?: string
  updated_at?: string
}

export interface PageContent {
  hero: HeroContent
  stats: StatItem[]
  statsTitle?: string
  whyChooseUs: WhyChooseUsContent
  termBanner?: TermBannerContent
  programs: ProgramContent[]
  facilities: FacilityContent[]
  events: EventContent[]
  footer?: FooterContent
}

// Type guard functions
export function isHeroContent(content: any): content is HeroContent {
  return (
    content &&
    typeof content.tag === 'string' &&
    typeof content.title === 'string' &&
    typeof content.description === 'string' &&
    typeof content.image_url === 'string'
  )
}

export function isProgramContent(content: any): content is ProgramContent {
  return (
    content &&
    typeof content.name === 'string' &&
    typeof content.description === 'string' &&
    Array.isArray(content.features)
  )
}

export function isEventContent(content: any): content is EventContent {
  return (
    content &&
    typeof content.title === 'string' &&
    typeof content.description === 'string' &&
    typeof content.date === 'string'
  )
} 