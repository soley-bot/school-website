'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-[#2596be] to-[#1a7290] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">New Classes Starting Soon</span>
            <a href="/contact" className="ml-4 font-semibold underline">
              Enroll Now
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <button
            type="button"
            className="flex rounded-md p-1 hover:bg-white/10"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
} 