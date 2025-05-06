import { createClient } from '@supabase/supabase-js'
import { handleErrorWithFallback } from '@/lib/utils'
import type { Database } from '@/lib/database.types'
import type {
  PageContent,
  HeroContent,
  StatsContent,
  StatItem,
  ProgramContent,
  WhyChooseUsContent,
  FacilityContent,
  EventContent,
  TermBannerContent,
  FooterContent
} from '@/types/content'
import { defaultContent } from '@/lib/defaults'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Image URL normalization
export function normalizeImageUrl(url: string): string {
  if (!url) {
    console.warn('Empty image URL provided, using default')
    return '/images/default.jpg'
  }
  
  // If already a full URL or relative path starting with /, return as is
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return url
  
  // Handle Supabase storage URLs
  try {
    console.log('Normalizing Supabase URL:', url)
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(url)
    
    if (!data || !data.publicUrl) {
      console.error('Failed to get public URL from Supabase for:', url)
      return '/images/default.jpg'
    }
    
    console.log('Normalized URL:', data.publicUrl)
    return data.publicUrl
  } catch (error) {
    return handleErrorWithFallback(error, '/images/default.jpg', 'normalizeImageUrl')
  }
}

// Content fetching functions
export async function getHeroContent(): Promise<HeroContent> {
  try {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create default
        const { data: newData, error: insertError } = await supabase
          .from('hero_content')
          .insert([defaultContent.hero])
          .select()
          .single()

        if (insertError) throw insertError
        return newData as HeroContent
      }
      throw error
    }
    return data as HeroContent
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.hero, 'getHeroContent')
  }
}

export async function getStatsContent(): Promise<StatItem[]> {
  try {
    // First check if stats section is enabled
    const { data: settingsData, error: settingsError } = await supabase
      .from('section_settings')
      .select('settings')
      .eq('section_name', 'stats')
      .single()
    
    // If we get settings and is_visible is explicitly false, return empty array
    // But if there's a 'not found' or 'doesn't exist' error, continue with the default behavior
    if (!settingsError && settingsData?.settings?.is_visible === false) {
      console.log('Stats section is disabled, returning empty array')
      return []
    }
    
    // Continue with normal stats fetching
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create defaults
        const { data: newData, error: insertError } = await supabase
          .from('stats')
          .insert(defaultContent.stats)
          .select()

        if (insertError) throw insertError
        return newData as StatItem[]
      }
      throw error
    }
    return data as StatItem[]
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.stats, 'getStatsContent')
  }
}

export async function getProgramsContent(): Promise<ProgramContent[]> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create defaults
        const { data: newData, error: insertError } = await supabase
          .from('programs')
          .insert(defaultContent.programs)
          .select()

        if (insertError) throw insertError
        return newData as ProgramContent[]
      }
      throw error
    }
    return data as ProgramContent[]
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.programs, 'getProgramsContent')
  }
}

export async function getWhyChooseUsContent(): Promise<WhyChooseUsContent> {
  try {
    const { data, error } = await supabase
      .from('why_choose_us')
      .select('*')
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create default
        const { data: newData, error: insertError } = await supabase
          .from('why_choose_us')
          .insert([defaultContent.whyChooseUs])
          .select()
          .single()

        if (insertError) throw insertError
        return newData as WhyChooseUsContent
      }
      throw error
    }
    return data as WhyChooseUsContent
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.whyChooseUs, 'getWhyChooseUsContent')
  }
}

export async function getFacilitiesContent(): Promise<FacilityContent[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create defaults
        const { data: newData, error: insertError } = await supabase
          .from('facilities')
          .insert(defaultContent.facilities)
          .select()

        if (insertError) throw insertError
        return newData as FacilityContent[]
      }
      throw error
    }
    return data as FacilityContent[]
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.facilities, 'getFacilitiesContent')
  }
}

export async function getEventsContent(): Promise<EventContent[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create defaults
        const { data: newData, error: insertError } = await supabase
          .from('events')
          .insert(defaultContent.events)
          .select()

        if (insertError) throw insertError
        return newData as EventContent[]
      }
      throw error
    }
    return data as EventContent[]
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.events, 'getEventsContent')
  }
}

export async function getTermBanner(): Promise<TermBannerContent> {
  try {
    const { data, error } = await supabase
      .from('term_banner')
      .select('*')
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create default
        const { data: newData, error: insertError } = await supabase
          .from('term_banner')
          .insert([defaultContent.termBanner])
          .select()
          .single()

        if (insertError) throw insertError
        return newData as TermBannerContent
      }
      throw error
    }
    return data as TermBannerContent
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.termBanner!, 'getTermBanner')
  }
}

export async function getFooterContent(): Promise<FooterContent> {
  try {
    const { data, error } = await supabase
      .from('footer_content')
      .select('*')
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No content exists, create default
        const { data: newData, error: insertError } = await supabase
          .from('footer_content')
          .insert([defaultContent.footer])
          .select()
          .single()

        if (insertError) throw insertError
        return newData as FooterContent
      }
      throw error
    }
    return data as FooterContent
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent.footer!, 'getFooterContent')
  }
}

// Main content fetching function
export async function getPageContent(): Promise<PageContent> {
  try {
    // Get section settings for stats - using proper Supabase error handling
    const { data: statsSettings, error: statsSettingsError } = await supabase
      .from('section_settings')
      .select('settings')
      .eq('section_name', 'stats')
      .single()
    
    // Default title if settings don't exist or there was an error
    const statsTitle = (!statsSettingsError && statsSettings?.settings?.title) 
      ? statsSettings.settings.title 
      : 'Our Numbers Speak for Themselves'
    
    const [hero, statsArray, programs, whyChooseUs, facilities, events, termBanner, footer] = await Promise.all([
      getHeroContent(),
      getStatsContent(),
      getProgramsContent(),
      getWhyChooseUsContent(),
      getFacilitiesContent(),
      getEventsContent(),
      getTermBanner(),
      getFooterContent()
    ])
    
    return {
      hero,
      stats: statsArray.flatMap(item => item), // Flatten any nested arrays
      statsTitle, // Add the stats title
      programs,
      whyChooseUs,
      facilities,
      events,
      termBanner,
      footer
    }
  } catch (error) {
    return handleErrorWithFallback(error, defaultContent, 'getPageContent')
  }
} 