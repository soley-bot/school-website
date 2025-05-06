'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'

interface TermBannerProps {
  text: string
  is_active: boolean
  variant?: 'default' | 'gradient' | 'accent' | 'dark'
  icon?: string
  button_text?: string
  button_link?: string
  isAdmin?: boolean
  onTextChange?: (text: string) => void
}

export default function TermBanner({ 
  text, 
  is_active, 
  variant = 'default',
  icon,
  button_text,
  button_link,
  isAdmin = false, 
  onTextChange 
}: TermBannerProps) {
  const [isVisible, setIsVisible] = useState(is_active)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  if (!isVisible || !is_active) return null

  // Get classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white';
      case 'accent':
        return 'bg-amber-500 text-white';
      case 'dark':
        return 'bg-gray-900 text-white';
      default:
        return 'bg-[#2596be] text-white';
    }
  };

  // Render SVG icon if present
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className="inline-block mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </span>
    );
  };

  return (
    <div className={`${getVariantClasses()} transition-all duration-300 shadow-md`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center justify-center">
            {isAdmin && isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => {
                  setIsEditing(false)
                  onTextChange?.(editText)
                }}
                className="w-full bg-white text-gray-900 px-3 py-1 rounded"
                placeholder="Enter announcement text"
                autoFocus
              />
            ) : (
              <div className="flex items-center space-x-4">
                {renderIcon()}
                <p className="text-sm md:text-base font-medium">
                  <span 
                    className={isAdmin ? 'cursor-pointer hover:underline' : ''}
                    onClick={() => isAdmin && setIsEditing(true)}
                  >
                    {text}
                  </span>
                </p>
                
                {button_text && button_link && (
                  <Link 
                    href={button_link}
                    className="ml-4 inline-flex items-center px-3 py-1 rounded-full border border-white text-xs font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
                  >
                    {button_text}
                  </Link>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none transition-transform duration-200 hover:scale-110"
            aria-label="Close banner"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 