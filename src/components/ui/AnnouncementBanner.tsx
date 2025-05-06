'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface AnnouncementBannerProps {
  text?: string;
  showByDefault?: boolean;
}

export default function AnnouncementBanner({ 
  text = 'Sign up for our newsletter to get the latest updates.', 
  showByDefault = true 
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(showByDefault);

  if (!isVisible) return null;

  return (
    <div className="relative bg-indigo-600">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-white">
            <span>{text}</span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2 pt-1 sm:pt-0">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
} 