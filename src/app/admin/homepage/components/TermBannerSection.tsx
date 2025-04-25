'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface TermBanner {
  id: number
  text: string
  is_active: boolean
}

export default function TermBannerSection() {
  const [banner, setBanner] = useState<TermBanner | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    is_active: false
  })

  useEffect(() => {
    loadBanner()
  }, [])

  async function loadBanner() {
    try {
      const { data, error } = await supabase
        .from('term_banner')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setBanner(data)
        setFormData({
          text: data.text,
          is_active: data.is_active
        })
      }
    } catch (error) {
      console.error('Error loading banner:', error)
      toast.error('Failed to load banner')
    }
  }

  async function saveBanner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const { text, is_active } = formData

      // Validate input
      if (!text.trim()) {
        toast.error('Banner text is required')
        return
      }

      const bannerData = {
        text: text.trim(),
        is_active
      }

      if (banner?.id) {
        // Update existing banner
        const { error } = await supabase
          .from('term_banner')
          .update(bannerData)
          .eq('id', banner.id)

        if (error) throw error
        toast.success('Banner updated successfully')
      } else {
        // Create new banner
        const { error } = await supabase
          .from('term_banner')
          .insert([bannerData])

        if (error) throw error
        toast.success('Banner created successfully')
      }

      setIsEditing(false)
      loadBanner()
    } catch (error: any) {
      console.error('Error saving banner:', error)
      toast.error(error?.message || 'Failed to save banner')
    } finally {
      setIsSaving(false)
    }
  }

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
                  is_active: banner?.is_active || false
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
                <p className="mt-2 text-sm text-gray-600">
                  Status: {banner.is_active ? 'Active' : 'Hidden'}
                </p>
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