'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/auth'
import Image from 'next/image'

interface Program {
  id: string
  name: string
  description: string
  slug: string
  theme: 'red' | 'blue'
  introduction: {
    text: string
    image: string
  }
  created_at: string
}

export default function AcademicsAdmin() {
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('program_pages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setPrograms(data || [])
    } catch (error) {
      console.error('Error loading programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Programs</h1>
          <p className="mt-2 text-gray-600">Manage your academic program pages</p>
        </div>
        <button
          onClick={() => router.push('/admin/academics/programs/new')}
          className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
        >
          Create New Program
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex items-start p-6">
              <div className="relative w-48 h-32 flex-shrink-0">
                {program.introduction.image ? (
                  <Image
                    src={program.introduction.image}
                    alt={program.name}
                    fill
                    className="object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
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
              <div className="ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{program.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">/{program.slug}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      program.theme === 'blue'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {program.theme} theme
                  </span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{program.description}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => router.push(`/admin/academics/programs/${program.id}`)}
                    className="text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
                  >
                    Edit Program
                  </button>
                  <a
                    href={`/academics/${program.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    View Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {programs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No programs</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new program.</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/admin/academics/programs/new')}
                className="inline-flex items-center px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Program
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 