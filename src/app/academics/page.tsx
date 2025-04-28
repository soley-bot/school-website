'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Program {
  id: string
  name: string
  description: string
  slug: string
  theme: 'red' | 'blue'
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}

export default function AcademicsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('program_pages')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setPrograms(data || [])
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2596be] to-[#1a7290] text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Language Programs at STANFORD
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover our comprehensive language programs designed to help you achieve fluency and cultural understanding. Choose from a variety of courses tailored to your learning goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#programs"
                className="bg-white text-[#1a7290] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              >
                Explore Programs
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#1a7290] transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Language Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/academics/program/${program.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className={`text-${program.theme === 'red' ? 'red' : 'blue'}-600 mb-4`}>
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2596be] transition-colors duration-200">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {program.description}
                  </p>
                  {program.features && program.features.length > 0 && (
                    <div className="space-y-3">
                      {program.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg
                            className={`h-5 w-5 text-${program.theme === 'red' ? 'red' : 'blue'}-600 mr-2 mt-0.5 flex-shrink-0`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{feature.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 flex items-center text-[#2596be] font-medium">
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert teachers are here to guide you every step of the way. Contact us to learn more about our programs or schedule a placement test.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-[#2596be] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1a7290] transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="bg-white text-[#2596be] border border-[#2596be] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 