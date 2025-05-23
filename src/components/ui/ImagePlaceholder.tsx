'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  title: string
  subtitle?: string
  aspectRatio?: 'square' | 'video' | 'banner'
  className?: string
  customImage?: string
}

export default function ImagePlaceholder({ 
  title, 
  subtitle, 
  aspectRatio = 'video',
  className = '',
  customImage
}: ImagePlaceholderProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-[4/3]',
    banner: 'aspect-[2/1]'
  }

  const defaultImages = {
    square: '/images/classroomplaceholder.jpg',
    video: '/images/schoolbuildingplaceholder.jpg',
    banner: '/images/studentsplaceholder.jpg'
  }

  const imageSrc = customImage || defaultImages[aspectRatio]

  return (
    <div className={cn(`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-xl bg-white`, className)}>
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 p-4 text-center">
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        {subtitle && (
          <div className="text-sm text-gray-700 mt-1">{subtitle}</div>
        )}
      </div>
    </div>
  )
} 