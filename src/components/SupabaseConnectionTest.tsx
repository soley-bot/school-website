'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function SupabaseConnectionTest() {
  const [status, setStatus] = useState<{
    env: boolean
    connection: boolean
    auth: boolean
    error?: string
    details: Record<string, any>
  }>({
    env: false,
    connection: false,
    auth: false,
    details: {}
  })

  useEffect(() => {
    async function testConnection() {
      try {
        // Test environment variables
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        const details: Record<string, any> = {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
        }
        
        setStatus(prev => ({ 
          ...prev, 
          env: hasUrl && hasKey,
          details
        }))

        if (!hasUrl || !hasKey) {
          throw new Error('Missing environment variables')
        }

        // Test Supabase connection
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Test authentication
        const { data: { session }, error: authError } = await supabase.auth.getSession()
        details.authStatus = session ? 'Authenticated' : 'Not authenticated'
        details.authError = authError?.message || null
        
        // Try a simple query
        const { error: queryError } = await supabase.from('hero_content').select('count').single()
        details.queryError = queryError?.message || null
        
        setStatus(prev => ({
          ...prev,
          connection: !queryError,
          auth: !!session,
          error: queryError?.message || authError?.message,
          details
        }))
      } catch (err) {
        console.error('Connection test error:', err)
        setStatus(prev => ({
          ...prev,
          connection: false,
          error: err instanceof Error ? err.message : 'Unknown error occurred',
          details: {
            ...prev.details,
            error: err instanceof Error ? {
              name: err.name,
              message: err.message,
              stack: err.stack
            } : String(err)
          }
        }))
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Supabase Connection Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${status.env ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>Environment Variables: {status.env ? 'Available' : 'Missing'}</span>
        </div>

        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${status.connection ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>Supabase Connection: {status.connection ? 'Connected' : 'Failed'}</span>
        </div>

        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${status.auth ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>Authentication: {status.auth ? 'Authenticated' : 'Not Authenticated'}</span>
        </div>

        {status.error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            <p className="font-semibold">Error:</p>
            <p className="mt-1">{status.error}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium mb-2">Debug Information:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(status.details, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
} 