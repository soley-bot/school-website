'use client'

import { useState, useEffect } from 'react'
import { getBrowserClient } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { FooterContent } from '@/types/content'

export default function FooterSection() {
  const router = useRouter()
  const [footer, setFooter] = useState<FooterContent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    about_text: '',
    address_line1: '',
    address_line2: '',
    phone: '',
    email: '',
    copyright_text: ''
  })

  useEffect(() => {
    loadFooter()
  }, [])

  async function loadFooter() {
    setLoading(true)
    try {
      const supabase = getBrowserClient()
      const { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        console.log('Loaded footer data:', data)
        setFooter(data)
        setFormData({
          about_text: data.about_text,
          address_line1: data.address_line1,
          address_line2: data.address_line2,
          phone: data.phone,
          email: data.email,
          copyright_text: data.copyright_text
        })
      }
    } catch (error) {
      console.error('Error loading footer:', error)
      toast.error('Failed to load footer content')
    } finally {
      setLoading(false)
    }
  }

  async function saveFooter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = getBrowserClient()
      
      // Validate inputs
      const { about_text, address_line1, address_line2, phone, email, copyright_text } = formData
      if (!about_text.trim() || !address_line1.trim() || !email.trim()) {
        toast.error('About text, address, and email are required')
        setIsSaving(false)
        return
      }

      const footerData = {
        about_text: about_text.trim(),
        address_line1: address_line1.trim(),
        address_line2: address_line2.trim(),
        phone: phone.trim(),
        email: email.trim(),
        copyright_text: copyright_text.trim(),
        updated_at: new Date().toISOString()
      }

      if (footer?.id) {
        console.log('Updating footer with ID:', footer.id, 'Data:', footerData)
        // Update existing footer
        const { data, error } = await supabase
          .from('footer_content')
          .update(footerData)
          .eq('id', footer.id)
          .select()

        if (error) throw error
        console.log('Update response:', data)
        toast.success('Footer updated successfully')
      } else {
        // Create new footer
        const { data, error } = await supabase
          .from('footer_content')
          .insert([{
            ...footerData,
            created_at: new Date().toISOString()
          }])
          .select()

        if (error) throw error
        console.log('Insert response:', data)
        toast.success('Footer created successfully')
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
      await loadFooter()
      router.refresh() // Refresh the page to show updated content
    } catch (error: any) {
      console.error('Error saving footer:', error)
      toast.error(error?.message || 'Failed to save footer')
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {isEditing ? (
        <form onSubmit={saveFooter} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Text
            </label>
            <textarea
              value={formData.about_text}
              onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={formData.address_line2}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Copyright Text
            </label>
            <input
              type="text"
              value={formData.copyright_text}
              onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
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
                  about_text: footer?.about_text || '',
                  address_line1: footer?.address_line1 || '',
                  address_line2: footer?.address_line2 || '',
                  phone: footer?.phone || '',
                  email: footer?.email || '',
                  copyright_text: footer?.copyright_text || ''
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
          {footer ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Current Footer Information</h3>
                <div className="mt-3 space-y-2">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">About Text</h4>
                    <p className="mt-1">{footer.about_text}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Address</h4>
                    <p className="mt-1">{footer.address_line1}</p>
                    <p>{footer.address_line2}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Contact</h4>
                    <p className="mt-1">Phone: {footer.phone}</p>
                    <p>Email: {footer.email}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Copyright</h4>
                    <p className="mt-1">{footer.copyright_text}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
              >
                Edit Footer
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No footer information set</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
              >
                Create Footer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 