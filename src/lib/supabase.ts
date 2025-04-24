import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export type HeroContent = {
  id: string
  tag: string
  title: string
  description: string
  primary_button_text: string
  primary_button_link: string
  secondary_button_text: string
  secondary_button_link: string
  image_url: string
  created_at: string
  updated_at: string
}

export type StatsContent = {
  id: string
  title: string
  value: string
  icon: string
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      programs: {
        Row: {
          id: string
          name: string
          description: string
          tag: string
          price: number
          features: string[]
          button_text: string
          button_link: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          tag: string
          price: number
          features: string[]
          button_text: string
          button_link: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          tag?: string
          price?: number
          features?: string[]
          button_text?: string
          button_link?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type ProgramContent = Database['public']['Tables']['programs']['Row']
export type NewProgramContent = Database['public']['Tables']['programs']['Insert']
export type UpdateProgramContent = Database['public']['Tables']['programs']['Update']

export type WhyChooseUsContent = {
  id: string
  title: string
  description: string
  features: {
    title: string
    description: string
    icon: string
  }[]
  created_at: string
  updated_at: string
} 