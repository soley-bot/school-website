'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useActualAuth } from '@/lib/auth' // Rename import to avoid naming conflict
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

interface AuthContextType {
  isLoading: boolean
  isAuthenticated: boolean
  supabase: SupabaseClient<Database> | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useActualAuth() // Use the renamed hook
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 