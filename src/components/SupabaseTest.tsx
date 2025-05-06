'use client'

import { useEffect, useState } from 'react'
// import { createBrowserClient } from '@supabase/ssr'
import { getBrowserClient } from '@/lib/supabase' // Import our function
import type { User } from '@supabase/supabase-js'

export default function SupabaseTest() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Use our shared client function
  const supabase = getBrowserClient()

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUserData()
  }, [supabase]) // Add supabase as dependency if needed

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <p>User not logged in.</p>
  }

  return (
    <div>
      <h2>Supabase Test Component</h2>
      <p>User ID: {user.id}</p>
      <p>User Email: {user.email}</p>
    </div>
  )
} 