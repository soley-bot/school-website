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
    <section className="py-20" id="programs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Our Programs
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#2596be]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Choose from our range of language programs designed to meet your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPrograms.map((program) => (
            <div 
              key={program.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] relative"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{program.name}</h3>
                  <span className="inline-block bg-[#2596be]/10 text-[#2596be] text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {program.tag}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-[#2596be] flex items-baseline">
                    From ${program.price}
                    <span className="text-base font-normal text-gray-600 ml-1">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="mr-2 text-[#2596be] flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <a
                  href={program.button_link}
                  className="block w-full text-center bg-[#2596be] text-white py-2.5 px-4 rounded-md hover:bg-[#1a7290] transition-colors"
                >
                  {program.button_text}
                </a>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={prevPage}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#2596be]/10 hover:text-[#2596be] transition-colors flex items-center justify-center"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${currentPage === idx ? 'bg-[#2596be]' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#2596be]/10 hover:text-[#2596be] transition-colors flex items-center justify-center"
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
} 