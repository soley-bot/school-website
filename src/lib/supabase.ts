import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { type Database } from './database.types'
import type { 
  HeroContent,
  StatsContent,
  ProgramContent,
  WhyChooseUsContent,
  FacilityContent,
  EventContent,
  TermBannerContent,
  PageContent
} from '@/types/content'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Check for required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    // Only log error on server-side to avoid console noise
    console.error('Missing required Supabase environment variables. Check your .env.local file.')
  }
}

// Create a single supabase client for server-side
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Create a single client for browser-side
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getBrowserClient() {
  if (typeof window === 'undefined') {
    throw new Error('getBrowserClient should only be called in the browser')
  }
  
  if (!browserClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables are missing. Check your .env.local file.')
    }
    
    browserClient = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey
    )
  }
  
  return browserClient
}

// Client component client - used for client components
export function getClientComponentClient() {
  return getBrowserClient()
}

// Admin client - BE CAREFUL WITH THIS - it bypasses RLS
// Only use temporarily while setting up proper RLS policies
export function getAdminClient() {
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set. Check your .env.local file.')
  }
  
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Falling back to authenticated client.')
    return getClientComponentClient()
  }
  
  // In production, this should only be accessible in secure admin contexts
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Export types
export type { 
  HeroContent,
  StatsContent,
  ProgramContent,
  WhyChooseUsContent,
  FacilityContent,
  EventContent,
  TermBannerContent,
  PageContent
} 