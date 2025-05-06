'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getClientComponentClient } from '@/lib/supabase'
import ProgramHero from '@/components/ui/ProgramHero'
import ProgramFeatures from '@/components/ui/ProgramFeatures'
import ProgramSchedule from '@/components/ui/ProgramSchedule'
import ProgramDetails from '@/components/ui/ProgramDetails'
import ProgramCTA from '@/components/ui/ProgramCTA'

interface Program {
  id: string
  name: string
  description: string
  slug: string
  type: 'english' | 'chinese' | 'ielts'
  theme: 'red' | 'blue'
  introduction: {
    text: string
    image: string
    whyChooseTitle: string
    whyChooseText: string[]
  }
  schedule: {
    times: {
      morning: string[]
      afternoon: string[]
      evening: string[]
    }
    duration: {
      weekday: {
        label: string
        duration: string
      }
      weekend: {
        label: string
        duration: string
      }
    }
  }
  levels: Array<{
    title: string
    badge: string
    duration: string
    weeklyHours: string
    prerequisites: string
    description: string
    outcomes: string[]
  }>
  features: Array<{
    icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book'
    title: string
    description: string
  }>
  course_materials: Array<{
    title: string
    description: string
    image: string
    level: string
  }>
}

// Map URL slugs to database slugs
const urlToDbSlug: Record<string, string> = {
  'general-english': 'english-general',
  'general-chinese': 'chinese-general',
  'ielts-preparation': 'english-ielts'
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const [program, setProgram] = useState<Program | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const supabase = getClientComponentClient()
        // Convert URL slug to database slug
        const dbSlug = urlToDbSlug[params.slug] || params.slug

        // First try to find by slug
        let { data, error } = await supabase
          .from('program_pages')
          .select('*')
          .eq('slug', dbSlug)
          .single()

        if (error) {
          // If not found by slug, try to find by type
          const typeMap: Record<string, string> = {
            'general-english': 'english',
            'general-chinese': 'chinese',
            'ielts-preparation': 'ielts'
          }

          const type = typeMap[params.slug]
          if (type) {
            const { data: typeData, error: typeError } = await supabase
              .from('program_pages')
              .select('*')
              .eq('type', type)
              .single()

            if (typeError) throw typeError
            data = typeData
          } else {
            throw error
          }
        }

        setProgram(data)
      } catch (error: any) {
        console.error('Error fetching program:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgram()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600">The program you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <a
            href="/academics"
            className="mt-6 inline-block text-[#2596be] hover:text-[#1a7290]"
          >
            View All Programs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ProgramHero 
        title={program.name}
        description={program.description}
        theme={program.theme}
      />

      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Introduction Section */}
          <div className="text-center mb-12">
            <p className="mt-4 text-lg text-gray-600">
              {program.introduction.text}
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {program.introduction.whyChooseTitle}
              </h3>
              <div className="space-y-4">
                {program.introduction.whyChooseText.map((text, index) => (
                  <p key={index} className="text-gray-600">{text}</p>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              {program.introduction.image ? (
                <Image
                  src={program.introduction.image}
                  alt={`${program.name} class`}
                  fill
                  className="object-cover"
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
          </div>

          {/* Features Section */}
          <ProgramFeatures features={program.features} theme={program.theme} />

          {/* Program Details Section */}
          <ProgramDetails levels={program.levels} theme={program.theme} />

          {/* Schedule Section */}
          <ProgramSchedule
            scheduleTime={{
              morning: program.schedule.times.morning.join(' | '),
              afternoon: program.schedule.times.afternoon.join(' | '),
              evening: program.schedule.times.evening.join(' | ')
            }}
            duration={{
              weekday: {
                hours: parseInt(program.schedule.duration.weekday.duration.split(':')[0]),
                minutes: parseInt(program.schedule.duration.weekday.duration.split(':')[1])
              },
              weekend: {
                hours: parseInt(program.schedule.duration.weekend.duration.split(':')[0]),
                minutes: parseInt(program.schedule.duration.weekend.duration.split(':')[1])
              }
            }}
            programType={program.type === 'chinese' ? 'chinese' : 'english'}
            tuitionFees={program.levels.map(level => ({
              price: parseInt(level.duration.replace(/[^0-9]/g, '')),
              levels: [level.title]
            }))}
          />

          {/* Course Materials Section */}
          <section className="my-16">
            <h3 className="text-2xl font-bold text-center mb-8">Course Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.course_materials.map((material, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    {material.image ? (
                      <Image
                        src={material.image}
                        alt={material.title}
                        fill
                        className="object-cover"
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{material.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                    <span className="inline-block mt-2 text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {material.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <ProgramCTA />
        </div>
      </main>
    </div>
  )
} 