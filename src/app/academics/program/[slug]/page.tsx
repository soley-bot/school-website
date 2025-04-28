'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/auth'
import ProgramHero from '@/components/ui/ProgramHero'
import ProgramFeatures from '@/components/ui/ProgramFeatures'
import ProgramSchedule from '@/components/ui/ProgramSchedule'
import ProgramDetails from '@/components/ui/ProgramDetails'
import ProgramCTA from '@/components/ui/ProgramCTA'

interface Program {
  id: string
  name: string
  description: string
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

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const [program, setProgram] = useState<Program | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data, error } = await supabase
          .from('program_pages')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (error) throw error

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
          <p className="text-gray-600">The program you're looking for doesn't exist or has been removed.</p>
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{material.title}</h4>
                    <p className="text-sm text-blue-600 mb-3">{material.level}</p>
                    <p className="text-gray-600">{material.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule Section */}
          <ProgramSchedule
            scheduleTime={program.schedule.times}
            programType={program.theme === 'red' ? 'chinese' : 'english'}
            tuitionFees={[
              { price: 170, levels: ['Foundation Level'] },
              { price: 180, levels: ['Intermediate Level'] },
              { price: 190, levels: ['Advanced Level'] }
            ]}
          />
        </div>
      </main>

      {/* CTA Section */}
      <ProgramCTA
        title={`Ready to Join Our ${program.name}?`}
        description="Contact us to learn more about the program and start your learning journey."
        theme={program.theme}
      />
    </div>
  )
} 