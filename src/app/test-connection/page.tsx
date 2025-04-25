import SupabaseConnectionTest from '@/components/SupabaseConnectionTest'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Supabase Connection Test
        </h1>
        <ErrorBoundary>
          <SupabaseConnectionTest />
        </ErrorBoundary>
      </div>
    </div>
  )
} 