'use client'

import { useState } from 'react'
import type { ProgramContent } from '@/types/content'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface ProgramsSectionProps {
  programs: ProgramContent[]
}

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const programsPerPage = 3

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
    <section className="bg-white py-20" id="programs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of language programs designed to meet your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{program.name}</h3>
                  <span className="inline-block bg-[#2596be]/10 text-[#2596be] text-sm font-medium px-2.5 py-0.5 rounded">
                    {program.tag}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-[#2596be]">
                    From ${program.price}
                    <span className="text-base font-normal text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-[#2596be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <a
                  href={program.button_link}
                  className="block w-full text-center bg-[#2596be] text-white py-2 px-4 rounded-md hover:bg-[#1a7290] transition-colors"
                >
                  {program.button_text}
                </a>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
} 