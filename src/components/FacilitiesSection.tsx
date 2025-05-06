'use client'

import { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import type { FacilityContent } from '@/types/content'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

interface Props {
  facilities?: FacilityContent[]
}

export default function FacilitiesSection({ facilities: initialFacilities }: Props) {
  const [facilities, setFacilities] = useState<FacilityContent[]>(initialFacilities || [])
  const [isLoading, setIsLoading] = useState(!initialFacilities)

  useEffect(() => {
    if (!initialFacilities) {
      loadFacilities()
    }
  }, [initialFacilities])

  async function loadFacilities() {
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setFacilities(data || [])
    } catch (error) {
      console.error('Error loading facilities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show default content if no facilities are available
  if (facilities.length === 0) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src="/images/classroom.jpg"
                  alt="Language Lab"
                  fallbackSrc="/images/classroom.jpg"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">State-of-the-art Language Labs</h3>
                <p className="text-gray-600">Our digital language laboratories feature advanced audio-visual equipment, recording facilities, and interactive software to enhance language acquisition.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src="/images/chinese-class.jpg"
                  alt="Cultural Space"
                  fallbackSrc="/images/classroom.jpg"
                  fill
                  className="object-cover"
                  priority={facilities.some(f => f.image_url === '/images/chinese-class.jpg')}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Cultural Immersion Spaces</h3>
                <p className="text-gray-600">Dedicated areas designed to replicate authentic cultural environments where students can practice language skills in realistic contexts.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src="/images/chinese-kids.jpg"
                  alt="Resource Center"
                  fallbackSrc="/images/classroom.jpg"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Multimedia Resource Center</h3>
                <p className="text-gray-600">A comprehensive collection of books, films, music, and digital resources in multiple languages to support student learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div 
              key={facility.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-60 w-full">
                {typeof facility.image_url === 'string' ? (
                  <ImageWithFallback
                    src={facility.image_url}
                    fallbackSrc="/images/placeholder.png"
                    alt={facility.title || 'Facility image'}
                    fill
                    className="object-cover"
                    priority={facility.image_url === '/images/chinese-class.jpg'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 