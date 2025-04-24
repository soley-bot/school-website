'use client'

export function EnvTest() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Environment Configuration Test</h2>
      <div className="space-y-2">
        <p>
          Supabase URL configured: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}
        </p>
        <p>
          Supabase Anon Key configured: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}
        </p>
        <p>
          Site Name: {process.env.NEXT_PUBLIC_SITE_NAME || 'Not configured'}
        </p>
      </div>
    </div>
  )
} 