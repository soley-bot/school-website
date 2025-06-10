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
    let mounted = true
    const client = getBrowserClient()
    setSupabaseClient(client)

    // Initial auth check
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await client.auth.getSession()
        
        if (error) throw error

        if (mounted) {
          setIsAuthenticated(!!session)
          setIsLoading(false)
          
          // Handle redirects after initial auth check
          handleAuthRedirect(!!session)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        if (mounted) {
          setIsLoading(false)
          setIsAuthenticated(false)
        }
      }
    }

    // Set up auth state change listener after initial check
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return
      
      console.log('Auth state changed:', event, !!session)

      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        handleAuthRedirect(true)
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
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

  return {
    isLoading,
    isAuthenticated,
    supabase: supabaseClient
  }
}