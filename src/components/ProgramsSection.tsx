'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ProgramContent } from '@/lib/supabase'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<ProgramContent[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const programsPerPage = 3

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      if (data) setPrograms(data)
    } catch (error) {
      console.error('Error loading programs:', error)
    }
  }

  const totalPages = Math.ceil(programs.length / programsPerPage)
  const displayedPrograms = programs.slice(
    currentPage * programsPerPage,
    (currentPage + 1) * programsPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="programs" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Language Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our specialized language courses designed to help you achieve your communication goals through proven methodologies and expert instruction.
          </p>
        </div>

        <div className="relative">
          {programs.length > 3 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-[#2596be] font-semibold mb-2">{program.tag}</div>
                <h3 className="text-xl font-bold mb-4">{program.name}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-[#2596be] mr-2 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-2xl font-bold text-[#2596be] mb-6">
                  ${program.price}
                </div>
                <a
                  href={program.button_link}
                  className="block w-full bg-[#2596be] text-white text-center py-2 px-4 rounded-md hover:bg-[#1a7290] transition-colors"
                >
                  {program.button_text}
                </a>
              </div>
            ))}
          </div>

          {programs.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentPage === index ? 'bg-[#2596be]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 