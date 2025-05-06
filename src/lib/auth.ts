import { getBrowserClient } from './supabase'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Database } from './database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

// Paths that don't need authentication
export const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<Database> | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const client = getBrowserClient()
    setSupabaseClient(client)

    let mounted = true

    // Set up auth state change listener
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return
      
      console.log('Auth state changed:', event, !!session)

      if (event === 'INITIAL_SESSION') {
        // Only update state, don't redirect
        if (session) {
          setIsAuthenticated(true)
        }
        setIsLoading(false)
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true)
        setIsLoading(false)
        
        // Handle redirect after sign in
        if (pathname === '/admin/login') {
          const params = new URLSearchParams(window.location.search)
          const redirectTo = params.get('redirectTo')
          const targetPath = redirectTo ? decodeURIComponent(redirectTo) : '/admin/homepage'
          
          if (targetPath === '/admin/login') {
            router.replace('/admin/homepage')
          } else {
            router.replace(targetPath)
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setIsLoading(false)
        if (!PUBLIC_PATHS.includes(pathname)) {
          router.replace('/admin/login')
        }
      }
    })

    // Initial auth check
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await client.auth.getSession()
        
        if (error) throw error

        if (session) {
          setIsAuthenticated(true)
          
          // If on login page and authenticated, handle redirect
          if (pathname === '/admin/login') {
            const params = new URLSearchParams(window.location.search)
            const redirectTo = params.get('redirectTo')
            const targetPath = redirectTo ? decodeURIComponent(redirectTo) : '/admin/homepage'
            
            if (targetPath === '/admin/login') {
              router.replace('/admin/homepage')
            } else {
              router.replace(targetPath)
            }
          }
        } else if (!PUBLIC_PATHS.includes(pathname)) {
          // If not authenticated and on protected route, redirect to login
          const loginUrl = new URL('/admin/login', window.location.origin)
          loginUrl.searchParams.set('redirectTo', pathname)
          router.replace(loginUrl.toString())
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        setIsLoading(false)
      }
    }

    checkAuth()

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [pathname, router])

  return {
    isLoading,
    isAuthenticated,
    supabase: supabaseClient
  }
} 