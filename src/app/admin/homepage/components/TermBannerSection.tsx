'use client'

import { useState, useEffect } from 'react'
import { getBrowserClient } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface TermBanner {
  id: number
  text: string
  is_active: boolean
  variant?: string
  icon?: string
  button_text?: string
  button_link?: string
}

// SVG Icon options
const ICON_OPTIONS = [
  { value: '', label: 'None' },
  { 
    value: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />', 
    label: 'Alert' 
  },
  { 
    value: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />', 
    label: 'Info' 
  },
  { 
    value: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />', 
    label: 'Announcement' 
  },
  { 
    value: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />', 
    label: 'Special Event' 
  },
  { 
    value: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />', 
    label: 'Tag' 
  }
];

export default function TermBannerSection() {
  const router = useRouter()
  const [banner, setBanner] = useState<TermBanner | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    text: '',
    is_active: false,
    variant: 'default',
    icon: '',
    button_text: '',
    button_link: ''
  })

  useEffect(() => {
    loadBanner()
  }, [])

  async function loadBanner() {
    setLoading(true)
    try {
      const supabase = getBrowserClient()
      const { data, error } = await supabase
        .from('term_banner')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        console.log('Loaded banner data:', data)
        setBanner(data)
        setFormData({
          text: data.text,
          is_active: data.is_active,
          variant: data.variant || 'default',
          icon: data.icon || '',
          button_text: data.button_text || '',
          button_link: data.button_link || ''
        })
      }
    } catch (error) {
      console.error('Error loading banner:', error)
      toast.error('Failed to load banner')
    } finally {
      setLoading(false)
    }
  }

  async function saveBanner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = getBrowserClient()
      const { text, is_active, variant, icon, button_text, button_link } = formData

      // Validate input
      if (!text.trim()) {
        toast.error('Banner text is required')
        setIsSaving(false)
        return
      }

      // Validate button link if button text is provided
      if (button_text && !button_link) {
        toast.error('Button link is required when button text is provided')
        setIsSaving(false)
        return
      }

      const bannerData = {
        text: text.trim(),
        is_active,
        variant,
        icon,
        button_text: button_text.trim(),
        button_link: button_link.trim(),
        updated_at: new Date().toISOString()
      }

      if (banner?.id) {
        console.log('Updating banner with ID:', banner.id, 'Data:', bannerData)
        // Update existing banner
        const { data, error } = await supabase
          .from('term_banner')
          .update(bannerData)
          .eq('id', banner.id)
          .select()

        if (error) throw error
        console.log('Update response:', data)
        toast.success('Banner updated successfully')
      } else {
        // Create new banner
        const { data, error } = await supabase
          .from('term_banner')
          .insert([{
            ...bannerData,
            created_at: new Date().toISOString()
          }])
          .select()

        if (error) throw error
        console.log('Insert response:', data)
        toast.success('Banner created successfully')
      }

      // Revalidate the homepage to clear cache
      try {
        const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET
        if (revalidationSecret) {
          const response = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=/`)
          const result = await response.json()
          console.log('Revalidation result:', result)
        }
      } catch (revalidateError) {
        console.error('Error revalidating page:', revalidateError)
      }

      setIsEditing(false)
      await loadBanner()
      router.refresh() // Refresh the page to show updated content
    } catch (error: any) {
      console.error('Error saving banner:', error)
      toast.error(error?.message || 'Failed to save banner')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  // Banner preview with current settings
  const BannerPreview = () => {
    if (!banner?.is_active) return null;
    
    const getPreviewBgClass = () => {
      switch (formData.variant) {
        case 'gradient':
          return 'bg-gradient-to-r from-blue-600 to-indigo-600';
        case 'accent':
          return 'bg-amber-500';
        case 'dark':
          return 'bg-gray-900';
        default:
          return 'bg-[#2596be]';
      }
    };
    
    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
        <div className={`${getPreviewBgClass()} text-white rounded p-3 flex items-center justify-between`}>
          <div className="flex items-center">
            {formData.icon && (
              <span className="inline-block mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  dangerouslySetInnerHTML={{ __html: formData.icon }}
                />
              </span>
            )}
            <span>{formData.text}</span>
            {formData.button_text && (
              <span className="ml-3 inline-flex items-center px-2 py-1 text-xs border border-white rounded-full">
                {formData.button_text}
              </span>
            )}
          </div>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {isEditing ? (
        <form onSubmit={saveBanner} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Text
            </label>
            <input
              type="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style Variant
              </label>
              <select
                value={formData.variant}
                onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="default">Default (Blue)</option>
                <option value="gradient">Gradient (Blue to Indigo)</option>
                <option value="accent">Accent (Amber)</option>
                <option value="dark">Dark (Black)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {ICON_OPTIONS.map((icon, index) => (
                  <option key={index} value={icon.value}>{icon.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text (Optional)
              </label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Learn More"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Link (Required if button text is provided)
              </label>
              <input
                type="text"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., /contact"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
              Show banner
            </label>
          </div>
          
          <BannerPreview />
          
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290] disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  text: banner?.text || '',
                  is_active: banner?.is_active || false,
                  variant: banner?.variant || 'default',
                  icon: banner?.icon || '',
                  button_text: banner?.button_text || '',
                  button_link: banner?.button_link || ''
                })
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          {banner ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Current Banner</h3>
                <p className="mt-1 text-lg">{banner.text}</p>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <p>Status: <span className={banner.is_active ? "text-green-600" : "text-red-600"}>
                    {banner.is_active ? 'Active' : 'Hidden'}
                  </span></p>
                  <p>Style: {banner.variant || 'Default'}</p>
                  {banner.icon && <p>Icon: Present</p>}
                  {banner.button_text && <p>Button: {banner.button_text}</p>}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
              >
                Edit Banner
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No banner set</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
              >
                Create Banner
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 