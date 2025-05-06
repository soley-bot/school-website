'use client'

import { useState, useEffect } from 'react'
// import { createBrowserClient } from '@supabase/ssr'
import { getBrowserClient } from '@/lib/supabase' // Import our function

export default function EnvTest() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only show public environment variables
    setEnvVars({
      NEXT_PUBLIC_REVALIDATION_SECRET: process.env.NEXT_PUBLIC_REVALIDATION_SECRET 
        ? 'Set (value hidden)' 
        : 'Not set',
      // Add other public env vars you want to check
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL 
        ? 'Set (value hidden)' 
        : 'Not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
        ? 'Set (value hidden)' 
        : 'Not set',
    })
  }, [])

  const testRevalidation = async () => {
    try {
      const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET
      if (!revalidationSecret) {
        setError('NEXT_PUBLIC_REVALIDATION_SECRET is not set')
        return
      }
      
      const response = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=/`)
      const result = await response.json()
      
      if (response.ok) {
        setError(null)
        alert(`Revalidation successful: ${JSON.stringify(result)}`)
      } else {
        setError(`Revalidation failed: ${JSON.stringify(result)}`)
      }
    } catch (err: any) {
      setError(`Error testing revalidation: ${err.message}`)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Environment Variables</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Public Environment Variables</h2>
          <p className="mt-1 text-sm text-gray-500">Only NEXT_PUBLIC_* variables are available in the browser</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      <button
        onClick={testRevalidation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Revalidation API
      </button>
    </div>
  )
} 