'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { HeroContent } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const [heroContent, setHeroContent] = useState<HeroContent>({
    id: '1',
    tag: 'Classes Enrolling Now',
    title: 'Master Languages with Confidence',
    description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
    primary_button_text: 'Explore Courses',
    primary_button_link: '#programs',
    secondary_button_text: 'Free Trial Class',
    secondary_button_link: '#',
    image_url: '/images/facilities/students-learning.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(heroContent.image_url)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    checkAuth()
    loadHeroContent()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      if (authError) throw authError
      if (!session) {
        router.push('/admin/login')
        return
      }
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/admin/login')
    }
  }

  const loadHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No content exists yet, create default content
          const { data: newData, error: insertError } = await supabase
            .from('hero_content')
            .upsert({
              id: '1',
              tag: 'Classes Enrolling Now',
              title: 'Master Languages with Confidence',
              description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
              primary_button_text: 'Explore Courses',
              primary_button_link: '#programs',
              secondary_button_text: 'Free Trial Class',
              secondary_button_link: '#',
              image_url: '/images/facilities/students-learning.jpg',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single()

          if (insertError) throw insertError
          if (newData) {
            setHeroContent(newData)
            setPreviewUrl(newData.image_url)
          }
        } else {
          throw error
        }
      } else if (data) {
        setHeroContent(data)
        setPreviewUrl(data.image_url)
      }
    } catch (error) {
      console.error('Error loading hero content:', error)
      setError(error instanceof Error ? error.message : 'Failed to load content. Please try again.')
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      // Check authentication
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      if (authError) throw authError
      if (!session) {
        router.push('/admin/login')
        return
      }

      let newImageUrl = heroContent.image_url

      // Upload new image if selected
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        console.log('Uploading image to hero-images bucket:', fileName)

        // Upload the image to the hero-images bucket
        const { error: uploadError } = await supabase.storage
          .from('hero-images')
          .upload(fileName, selectedImage, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw new Error(`Failed to upload image: ${uploadError.message}`)
        }

        // Get public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('hero-images')
          .getPublicUrl(fileName)

        console.log('Image uploaded successfully, public URL:', publicUrl)
        newImageUrl = publicUrl
      }

      const heroData = {
        tag: heroContent.tag,
        title: heroContent.title,
        description: heroContent.description,
        primary_button_text: heroContent.primary_button_text,
        primary_button_link: heroContent.primary_button_link,
        secondary_button_text: heroContent.secondary_button_text,
        secondary_button_link: heroContent.secondary_button_link,
        image_url: newImageUrl,
        updated_at: new Date().toISOString()
      }

      console.log('Saving hero content with data:', heroData)

      // First check if we have an existing record
      const { data: existingContent, error: fetchError } = await supabase
        .from('hero_content')
        .select()
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      let result
      if (existingContent) {
        // Update existing record
        result = await supabase
          .from('hero_content')
          .update(heroData)
          .eq('id', existingContent.id)
          .select()
          .single()
      } else {
        // Insert new record with id '1'
        result = await supabase
          .from('hero_content')
          .insert([{ id: '1', ...heroData }])
          .select()
          .single()
      }

      if (result.error) {
        throw result.error
      }

      // Update local state with new data
      if (result.data) {
        setHeroContent(result.data)
        setPreviewUrl(result.data.image_url)
        setSaveSuccess(true)
        toast.success('Changes saved successfully!')
        // Refresh the page to ensure we have the latest data
        router.refresh()
      }
    } catch (error) {
      console.error('Save error:', error)
      setError(error instanceof Error ? error.message : 'Failed to save changes. Please try again.')
      toast.error('Failed to save changes')
      setSaveSuccess(false)
    } finally {
      setIsSaving(false)
      setSelectedImage(null)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Hero Section Content</h2>
          {saveSuccess && (
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Saved successfully!</span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag Line
              </label>
              <input
                type="text"
                value={heroContent.tag}
                onChange={(e) => setHeroContent({...heroContent, tag: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={heroContent.title}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={heroContent.description}
                onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.primary_button_text}
                  onChange={(e) => setHeroContent({...heroContent, primary_button_text: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={heroContent.primary_button_link}
                  onChange={(e) => setHeroContent({...heroContent, primary_button_link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.secondary_button_text}
                  onChange={(e) => setHeroContent({...heroContent, secondary_button_text: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={heroContent.secondary_button_link}
                  onChange={(e) => setHeroContent({...heroContent, secondary_button_link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="relative w-full aspect-[3/2] mb-4">
                    <Image
                      src={previewUrl}
                      alt="Hero image preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#2596be] hover:text-[#1a7290] focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setHeroContent({
                id: '1',
                tag: 'Classes Enrolling Now',
                title: 'Master Languages with Confidence',
                description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
                primary_button_text: 'Explore Courses',
                primary_button_link: '#programs',
                secondary_button_text: 'Free Trial Class',
                secondary_button_link: '#',
                image_url: '/images/facilities/students-learning.jpg',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              setPreviewUrl('/images/facilities/students-learning.jpg')
              setSaveSuccess(false)
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Reset to Default
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 text-white rounded-md flex items-center ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2596be] hover:bg-[#1a7290]'
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </form>
  )
} 