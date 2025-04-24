'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        setStatus('connected')
      } catch (e) {
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Failed to connect to Supabase')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="mt-4 text-center text-sm">
      <div className="space-y-2">
        <p>
          Supabase Status:{' '}
          {status === 'loading' && '🔄 Checking connection...'}
          {status === 'connected' && '✅ Connected'}
          {status === 'error' && '❌ Connection failed'}
        </p>
        {error && <p className="text-red-600">{error}</p>}
        <div className="text-xs text-gray-500">
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓' : '✗'}</p>
          <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓' : '✗'}</p>
        </div>
      </div>
    </div>
  )
} 