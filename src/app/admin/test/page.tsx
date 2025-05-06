'use client'

import { useEffect, useState } from 'react'
import { getBrowserClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export default function TestPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Current User Info:</h2>
        <pre className="bg-gray-100 p-4 rounded mb-4">
          {JSON.stringify(user, null, 2)}
        </pre>
        
        <div className="mt-4">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
} 