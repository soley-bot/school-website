'use client'

import { useEffect, useState } from 'react'
import { Program } from '@/types/database'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default function ProgramsList() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select(`
            *,
            features:program_features(id, title, description, icon, sort_order),
            levels:program_levels(id, title, badge, duration, weekly_hours, prerequisites, description, outcomes, sort_order),
            schedule:program_schedule(id, times, duration),
            tuition:program_tuition(id, price, levels, sort_order)
          `)
          .order('name')

        if (error) throw error

        setPrograms(data || [])
      } catch (err) {
        console.error('Error fetching programs:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch programs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-100 rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {programs.map((program) => (
        <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {program.hero_image && typeof program.hero_image === 'string' && (
            <div className="relative h-48">
              <Image
                src={program.hero_image}
                alt={program.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {program.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {program.description}
            </p>
            <div className="space-y-4">
              {program.features && program.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {program.features.slice(0, 3).map((feature) => (
                      <li key={feature.id} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {feature.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {program.levels && program.levels.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Available Levels</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.levels.map((level) => (
                      <span
                        key={level.id}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {level.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Link
                href={`/programs/${program.slug}`}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 