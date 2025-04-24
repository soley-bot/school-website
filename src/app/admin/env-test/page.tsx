'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

type TestResult = {
  supabaseUrl: boolean
  supabaseAnonKey: boolean
  connection: boolean
  session: boolean
}

export default function EnvTestPage() {
  const [loading, setLoading] = useState(false)
  const [testResult, setTestResult] = useState<TestResult>({
    supabaseUrl: false,
    supabaseAnonKey: false,
    connection: false,
    session: false
  })
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function testSupabase() {
      setLoading(true)
      setError(null)
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        // Test environment variables
        const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        const hasSupabaseAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        // Test connection
        const { error: connectionError } = await supabase.from('test').select('*').limit(1)
        if (connectionError) throw connectionError

        // Test session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        setTestResult({
          supabaseUrl: hasSupabaseUrl,
          supabaseAnonKey: hasSupabaseAnonKey,
          connection: true,
          session: !!session
        })
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    testSupabase()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900">Environment Test</h1>
          
          {loading && (
            <div className="mt-4 text-gray-600">Testing configuration...</div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error.message}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-5">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Supabase URL</dt>
                    <dd className="mt-1 flex items-center">
                      <span className={`h-6 w-6 rounded-full ${testResult.supabaseUrl ? 'bg-green-100' : 'bg-red-100'}`} />
                      <span className="ml-2">{testResult.supabaseUrl ? 'Present' : 'Missing'}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Supabase Anon Key</dt>
                    <dd className="mt-1 flex items-center">
                      <span className={`h-6 w-6 rounded-full ${testResult.supabaseAnonKey ? 'bg-green-100' : 'bg-red-100'}`} />
                      <span className="ml-2">{testResult.supabaseAnonKey ? 'Present' : 'Missing'}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Database Connection</dt>
                    <dd className="mt-1 flex items-center">
                      <span className={`h-6 w-6 rounded-full ${testResult.connection ? 'bg-green-100' : 'bg-red-100'}`} />
                      <span className="ml-2">{testResult.connection ? 'Connected' : 'Failed'}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Session</dt>
                    <dd className="mt-1 flex items-center">
                      <span className={`h-6 w-6 rounded-full ${testResult.session ? 'bg-green-100' : 'bg-red-100'}`} />
                      <span className="ml-2">{testResult.session ? 'Active' : 'None'}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 