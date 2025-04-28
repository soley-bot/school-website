import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Paths that don't need authentication
const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('Middleware executing for path:', pathname)
  
  // Skip middleware for non-admin routes and static files
  if (!pathname.startsWith('/admin') || 
      pathname.match(/\.(ico|png|jpg|jpeg|gif|svg)$/)) {
    return NextResponse.next()
  }

  // Create a response object that we can modify
  let response = NextResponse.next()

  // Create the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
            path: '/',
            secure: request.url.startsWith('https://'),
            sameSite: 'lax',
            httpOnly: true
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
            path: '/',
            expires: new Date(0),
            maxAge: 0
          })
        },
      }
    }
  )

  try {
    // Check auth status
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('Auth check - Session exists:', !!session, 'Path:', pathname)

    if (error) {
      console.error('Session error:', error)
      throw error
    }

    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

    // If authenticated and on the login page, redirect to original URL or admin homepage
    if (session && pathname === '/admin/login') {
      const params = new URLSearchParams(request.nextUrl.search)
      const redirectTo = params.get('redirectTo')
      const targetPath = redirectTo ? decodeURIComponent(redirectTo) : '/admin/homepage'
      console.log('Redirecting authenticated user from login to:', targetPath)
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
    
    // If not authenticated and trying to access protected route
    if (!session && !isPublicPath) {
      console.log('Unauthorized access attempt - redirecting to login')
      const redirectUrl = new URL('/admin/login', request.url)
      // Store the original URL to redirect back after login
      redirectUrl.searchParams.set('redirectTo', encodeURIComponent(pathname))
      return NextResponse.redirect(redirectUrl)
    }

    // Preserve all existing cookies
    const existingCookies = request.cookies.getAll()
    existingCookies.forEach(cookie => {
      const { name, value, ...cookieOptions } = cookie
      response.cookies.set({
        name,
        value,
        ...cookieOptions,
        path: '/',
      })
    })

    return response
  } catch (error) {
    console.error('Middleware auth error:', error)
    // Clear any existing session cookies on error
    const sessionCookies = request.cookies.getAll()
      .filter(cookie => cookie.name.includes('supabase.auth'))
    
    sessionCookies.forEach(cookie => {
      const { name } = cookie
      response.cookies.set({
        name,
        value: '',
        path: '/',
        expires: new Date(0),
        maxAge: 0
      })
    })

    if (!pathname.startsWith('/admin/login')) {
      const redirectUrl = new URL('/admin/login', request.url)
      redirectUrl.searchParams.set('redirectTo', encodeURIComponent(pathname))
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }
}

export const config = {
  matcher: [
    // Match all admin routes including the root /admin path
    '/admin',
    '/admin/:path*',
  ],
} 