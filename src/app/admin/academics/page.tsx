'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import type { RealtimeChannel } from '@supabase/supabase-js'

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

// Helper function to get the correct program URL
const getProgramUrl = (slug: string) => {
  // Map database slugs to URL slugs
  const slugMap: Record<string, string> = {
    'english-general': 'general-english',
    'chinese-general': 'general-chinese',
    'english-ielts': 'ielts-preparation'
  }

  // Use the mapped slug if it exists, otherwise use the original slug
  return `/academics/${slugMap[slug] || slug}`
}

export default function AcademicsAdmin() {
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const { supabase } = useAuth()
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    if (!supabase) return

    loadPrograms()

    // Subscribe to changes in program_pages table
    const newChannel = supabase
      .channel('program_pages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'program_pages'
        },
        () => {
          // Reload programs when any change occurs
          loadPrograms()
        }
      )
      .subscribe()
    
    setChannel(newChannel)

    return () => {
      if (supabase && newChannel) {
         supabase.removeChannel(newChannel)
           .then(status => console.log('Unsubscribed from channel:', status))
           .catch(error => console.error('Error unsubscribing:', error));
      } else if (channel) {
        supabase?.removeChannel(channel)
          .then(status => console.log('Unsubscribed from channel (fallback):', status))
          .catch(error => console.error('Error unsubscribing (fallback):', error));
      }
    }
  }, [supabase])

  const loadPrograms = async () => {
    if (!supabase) return
    
    setIsLoading(true)
    try {
      console.log('Loading programs...')
      const { data, error } = await supabase
        .from('program_pages')
        .select(`
          id,
          name,
          description,
          slug,
          theme,
          introduction,
          created_at
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      console.log('Loaded programs:', data)
      setPrograms(data || [])
    } catch (error) {
      console.error('Error loading programs:', error)
      toast.error('Failed to load programs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProgram = (programId: string) => {
    console.log('Editing program:', programId)
    router.push(`/admin/academics/programs/${programId}`)
  }

  const handleViewProgram = (slug: string) => {
    const url = getProgramUrl(slug)
    // Open in new tab and ensure URL starts with origin
    window.open(`${window.location.origin}${url}`, '_blank')
  }

  const handleDeleteProgram = async (programId: string) => {
    if (!supabase) return
    
    if (!confirm('Are you sure you want to delete this program? This action cannot be undone.')) {
      return
    }

    setIsDeletingId(programId)

    try {
      // Delete all related records first
      const promises = [
        supabase.from('program_pages_features').delete().eq('program_id', programId),
        supabase.from('program_pages_levels').delete().eq('program_id', programId),
        supabase.from('program_pages_content').delete().eq('program_id', programId),
        supabase.from('program_schedule').delete().eq('program_id', programId),
        supabase.from('program_tuition').delete().eq('program_id', programId),
        supabase.from('course_materials').delete().eq('program_id', programId),
      ]

      await Promise.all(promises)

      // Then delete the program page
      const { error } = await supabase
        .from('program_pages')
        .delete()
        .eq('id', programId)

      if (error) throw error

      toast.success('Program deleted successfully')
    } catch (error) {
      console.error('Error deleting program:', error)
      toast.error('Failed to delete program')
    } finally {
      setIsDeletingId(null)
    }
  }

  if (isLoading || !supabase) {
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

      <div className="grid grid-cols-1 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex items-start p-6">
              <div className="relative w-48 h-32 flex-shrink-0">
                {program.introduction?.image ? (
                  <Image
                    src={program.introduction.image}
                    alt={program.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleEditProgram(program.id)}
                    className="inline-flex items-center text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Program
                  </button>
                  <button
                    onClick={() => handleViewProgram(program.slug)}
                    className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Page
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    disabled={isDeletingId === program.id}
                    className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                  >
                    {isDeletingId === program.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600 mr-1"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
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