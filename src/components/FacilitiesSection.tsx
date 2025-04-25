'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'

interface Facility {
  id: number
  title: string
  description: string
  image_url: string | null
}

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFacilities()
  }, [])

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
                <Image
                  src="/images/facilities/language-lab.jpg"
                  alt="State-of-the-art Language Labs"
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
                <Image
                  src="/images/facilities/cultural-space.jpg"
                  alt="Cultural Immersion Spaces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Cultural Immersion Spaces</h3>
                <p className="text-gray-600">Dedicated areas designed to replicate authentic cultural environments where students can practice language skills in realistic contexts.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/facilities/resource-center.jpg"
                  alt="Multimedia Resource Center"
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
            <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                {facility.image_url ? (
                  <Image
                    src={facility.image_url}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/schoolbuildingplaceholder.jpg';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{facility.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 