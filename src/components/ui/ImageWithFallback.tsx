'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Props {
  src: string
  alt: string
  fallbackSrc: string
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  fill = false,
  sizes,
  className,
  priority = false,
  width,
  height
}: Props) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState<string | null>(null)
  const [imgKey, setImgKey] = useState<number>(1) // Used to force re-render on error

  useEffect(() => {
    // Reset image source if src prop changes
    setImgSrc(src)
    setError(null)
    setImgKey(prev => prev + 1) // Force re-render of the Image component
  }, [src])

  // Pre-check if the source is a Supabase URL (which may need special handling)
  const isSupabaseImage = imgSrc?.includes('supabase.co/storage')

  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`)
    setError(`Failed to load: ${imgSrc}`)

    // Only try the fallback if we're not already showing it
    if (imgSrc !== fallbackSrc) {
      console.log(`Attempting to load fallback image: ${fallbackSrc}`)
      setImgSrc(fallbackSrc)
      setImgKey(prev => prev + 1) // Force re-render
    }
  }

  // Use width/height if provided, otherwise rely on fill
  const imageProps = fill 
    ? { fill: true, sizes: sizes || '100vw' } 
    : { width: width || 400, height: height || 300 }

  return (
    <>
      <Image
        key={imgKey} // Force re-render when source changes
        src={imgSrc}
        alt={alt}
        className={className}
        priority={priority}
        onError={handleError}
        {...imageProps}
        unoptimized={isSupabaseImage} // Skip Next.js optimization for Supabase images
      />
      {error && process.env.NODE_ENV === 'development' && (
        <div className="hidden">{/* Error logged to console */}</div>
      )}
    </>
  )
} 