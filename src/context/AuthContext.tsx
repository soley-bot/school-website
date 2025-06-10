'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'
import { generateToken } from '@/lib/csrf'

export const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

type Role = 'admin' | 'editor' | 'viewer'

interface AuthContextType {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  userRole: Role | null
  supabase: SupabaseClient<Database> | null
  checkPermission: (requiredRole: Role | Role[]) => boolean
  getCsrfToken: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<Role | null>(null)
  const [csrfToken, setCsrfToken] = useState('')
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<Database> | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true
    const client = getBrowserClient()
    setSupabaseClient(client)

    // Generate new CSRF token
    const { token } = generateToken()
    setCsrfToken(token)

    const fetchUserRole = async (userId: string) => {
      try {
        const { data, error } = await client
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .single()

        if (error) throw error
        if (mounted && data) {
          setUserRole(data.role as Role)
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
        setUserRole(null)
      }
    }

    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await client.auth.getSession()
        
        if (error) throw error

        if (mounted) {
          const isAuthed = !!session
          setIsAuthenticated(isAuthed)
          setUser(session?.user || null)
          
          if (session?.user) {
            await fetchUserRole(session.user.id)
          }
          
          setIsLoading(false)
          handleAuthRedirect(isAuthed)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        if (mounted) {
          setIsLoading(false)
          setIsAuthenticated(false)
          setUser(null)
          setUserRole(null)
        }
      }
    }

    const { subscription } = client.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return
      
      console.log('Auth state changed:', event, !!session)

      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        setUser(session?.user || null)
        if (session?.user) {
          await fetchUserRole(session.user.id)
        }
        handleAuthRedirect(true)
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setUser(null)
        setUserRole(null)
        if (!PUBLIC_PATHS.includes(pathname)) {
          router.replace('/admin/login')
        }
      }
    })

    checkAuth()

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [pathname, router])

  const handleAuthRedirect = (isAuthed: boolean) => {
    if (isAuthed && pathname === '/admin/login') {
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get('redirectTo')
      const targetPath = redirectTo ? decodeURIComponent(redirectTo) : '/admin/homepage'
      if (targetPath === '/admin/login') {
        router.replace('/admin/homepage')
      } else {
        router.replace(targetPath)
      }
    } else if (!isAuthed && !PUBLIC_PATHS.includes(pathname)) {
      const loginUrl = new URL('/admin/login', window.location.origin)
      loginUrl.searchParams.set('redirectTo', pathname)
      router.replace(loginUrl.toString())
    }
  }

  const getCsrfToken = () => csrfToken

  const checkPermission = (requiredRole: Role | Role[]): boolean => {
    if (!userRole) return false
    if (userRole === 'admin') return true
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole)
    }
    return userRole === requiredRole
  }

  return (
    <AuthContext.Provider value={{
      isLoading,
      isAuthenticated,
      user,
      userRole,
      supabase: supabaseClient,
      checkPermission,
      getCsrfToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}