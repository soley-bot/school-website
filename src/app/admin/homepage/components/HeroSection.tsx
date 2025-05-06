'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getBrowserClient } from '@/lib/supabase'
import type { HeroContent } from '@/types/content'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_IMAGE = '/images/classroom.jpg'

export default function HeroSection() {
  const router = useRouter()
  const defaultId = uuidv4()
  const [heroContent, setHeroContent] = useState<HeroContent>({
    id: defaultId,
    tag: 'Classes Enrolling Now',
    title: 'Master Languages with Confidence',
    description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
    primary_button_text: 'Explore Courses',
    primary_button_link: '#programs',
    secondary_button_text: 'Free Trial Class',
    secondary_button_link: '#',
    image_url: DEFAULT_IMAGE,
    created_at: new Date().toISOString()
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_IMAGE)
  const [imageError, setImageError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const normalizeImageUrl = (url: string): string => {
    if (!url) return DEFAULT_IMAGE
    if (url.startsWith('blob:')) return url // Blob URL for preview
    if (url.startsWith('https://saxtzxbapytdpgmmpiwu.supabase.co')) {
      // Validate Supabase URL format
      const urlParts = url.split('/')
      const fileName = urlParts[urlParts.length - 1]
      if (!fileName || fileName === '') return DEFAULT_IMAGE
      return url
    }
    return DEFAULT_IMAGE
  }

  const loadHeroContent = async () => {
    try {
      console.log('Loading hero content...')
      const supabase = getBrowserClient()
      const { data, error } = await supabase
        .from('hero_content')
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No content exists, create default content
          console.log('No existing content found, creating default...')
          const newId = uuidv4()
          const defaultContent = {
            id: newId,
            tag: 'Classes Enrolling Now',
            title: 'Master Languages with Confidence',
            description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
            primary_button_text: 'Explore Courses',
            primary_button_link: '#programs',
            secondary_button_text: 'Free Trial Class',
            secondary_button_link: '#',
            image_url: DEFAULT_IMAGE,
            created_at: new Date().toISOString()
          }

          const { data: newData, error: insertError } = await supabase
            .from('hero_content')
            .insert([defaultContent])
            .select()
            .single()

          if (insertError) {
            console.error('Error inserting default content:', insertError)
            throw insertError
          }

          if (!newData) {
            throw new Error('No data returned after creating default content')
          }

          console.log('Default content created successfully:', newData)
          setHeroContent(newData)
          setPreviewUrl(normalizeImageUrl(newData.image_url))
          setImageError(false)
        } else {
          console.error('Error loading content:', error)
          throw error
        }
      } else if (data) {
        console.log('Existing content loaded:', data)
        setHeroContent(data)
        setPreviewUrl(normalizeImageUrl(data.image_url))
        setImageError(false)
      }
    } catch (error) {
      console.error('Error in loadHeroContent:', error)
      setError(error instanceof Error ? error.message : 'Failed to load content. Please try again.')
      setPreviewUrl(DEFAULT_IMAGE)
    }
  }

  useEffect(() => {
    loadHeroContent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      
      // Cleanup previous preview URL if it's a blob
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
      
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setImageError(false) // Reset image error state when new image is selected
    }
  }

  const handleImageError = () => {
    console.log('Image failed to load, falling back to default')
    setImageError(true)
    setPreviewUrl(DEFAULT_IMAGE)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      const supabase = getBrowserClient()
      let newImageUrl = heroContent.image_url

      // Upload new image if selected
      if (selectedImage) {
        // Delete the old image if it's from Supabase storage
        if (heroContent.image_url.includes('supabase.co')) {
          const oldImagePath = heroContent.image_url.split('/').pop()
          if (oldImagePath) {
            const { error: deleteError } = await supabase.storage
              .from('hero-images')
              .remove([oldImagePath])
            
            if (deleteError) {
              console.warn('Failed to delete old image:', deleteError)
            }
          }
        }

        // Generate a unique filename with timestamp and random string
        const fileExt = selectedImage.name.split('.').pop()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileName = `hero-${Date.now()}-${randomString}.${fileExt}`

        console.log('Uploading new image to hero-images bucket:', fileName)

        // Upload the new image
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
        image_url: newImageUrl
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
        console.log('Updating existing record with ID:', existingContent.id)
        
        const { error: updateError } = await supabase
          .from('hero_content')
          .update({
            ...heroData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingContent.id)

        if (updateError) {
          console.error('Update error:', updateError)
          throw updateError
        }

        result = await supabase
          .from('hero_content')
          .select()
          .eq('id', existingContent.id)
          .single()
      } else {
        // Insert new record with a UUID
        const newId = uuidv4()
        result = await supabase
          .from('hero_content')
          .insert([{
            id: newId,
            ...heroData,
            created_at: new Date().toISOString()
          }])
          .select()
          .single()
      }

      if (result.error) {
        throw result.error
      }

      if (!result.data) {
        throw new Error('No data returned after save')
      }

      setHeroContent(result.data)
      setSelectedImage(null) // Clear the selected image after successful upload
      setSaveSuccess(true)
      toast.success('Hero section updated successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error in handleSave:', error)
      setError(error instanceof Error ? error.message : 'Failed to save content. Please try again.')
      toast.error('Failed to save hero section')
    } finally {
      setIsSaving(false)
    }
  }

  // Add cleanup function for image preview URL
  useEffect(() => {
    return () => {
      // Cleanup any object URLs when component unmounts
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

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
                      src={imageError ? DEFAULT_IMAGE : normalizeImageUrl(previewUrl)}
                      alt="Hero image preview"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-md"
                      priority
                      onError={handleImageError}
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
                id: defaultId,
                tag: 'Classes Enrolling Now',
                title: 'Master Languages with Confidence',
                description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
                primary_button_text: 'Explore Courses',
                primary_button_link: '#programs',
                secondary_button_text: 'Free Trial Class',
                secondary_button_link: '#',
                image_url: DEFAULT_IMAGE,
                created_at: new Date().toISOString()
              })
              setPreviewUrl(DEFAULT_IMAGE)
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