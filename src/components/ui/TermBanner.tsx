'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface TermBannerProps {
  text: string
  is_active: boolean
  isAdmin?: boolean
  onTextChange?: (text: string) => void
}

export default function TermBanner({ text, is_active, isAdmin = false, onTextChange }: TermBannerProps) {
  const [isVisible, setIsVisible] = useState(is_active)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  if (!isVisible || !is_active) return null

  return (
    <div className="bg-[#2596be] text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            {isAdmin && isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => {
                  setIsEditing(false)
                  onTextChange?.(editText)
                }}
                className="w-full bg-white text-gray-900 px-2 py-1 rounded"
                placeholder="Enter announcement text"
                autoFocus
              />
            ) : (
              <p className="text-sm font-medium">
                <span 
                  className={isAdmin ? 'cursor-pointer hover:underline' : ''}
                  onClick={() => isAdmin && setIsEditing(true)}
                >
                  {text}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 