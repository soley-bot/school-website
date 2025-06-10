import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Paths that don't need authentication
const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// Session configuration
const SESSION_TIMEOUT_MINUTES = 60 // 1 hour
const MAX_CONCURRENT_SESSIONS = 3
const activeSessions = new Map<string, Set<string>>() // userId -> Set of sessionIds

// Clean up expired entries every hour
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetTime) {
      rateLimit.delete(key)
    }
  }
}, 60 * 60 * 1000)

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
            httpOnly: true,
            maxAge: SESSION_TIMEOUT_MINUTES * 60 // Convert minutes to seconds
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
        }
      }
    }
  )

  try {
    // Apply rate limiting for login attempts
    if (pathname === '/admin/login' && request.method === 'POST') {
      const ip = request.ip || 'unknown'
      const now = Date.now()
      const rateLimitInfo = rateLimit.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS }

      if (now > rateLimitInfo.resetTime) {
        rateLimitInfo.count = 0
        rateLimitInfo.resetTime = now + RATE_LIMIT_WINDOW_MS
      }

      rateLimitInfo.count++
      rateLimit.set(ip, rateLimitInfo)

      if (rateLimitInfo.count > RATE_LIMIT_MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        )
      }
    }

    // Check auth status
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('Auth check - Session exists:', !!session, 'Path:', pathname)

    if (error) {
      console.error('Session error:', error)
      throw error
    }

    // Handle session management
    if (session?.user) {
      const userId = session.user.id
      const sessionId = session.access_token

      // Initialize user's sessions if not exists
      if (!activeSessions.has(userId)) {
        activeSessions.set(userId, new Set())
      }

      const userSessions = activeSessions.get(userId)!

      // Check concurrent sessions limit
      if (!userSessions.has(sessionId) && userSessions.size >= MAX_CONCURRENT_SESSIONS) {
        // Remove oldest session
        const oldestSession = Array.from(userSessions)[0]
        userSessions.delete(oldestSession)
      }

      // Add current session
      userSessions.add(sessionId)

      // Update session timestamp
      const sessionCookie = request.cookies.get('supabase-auth-token')
      if (sessionCookie) {
        response.cookies.set({
          name: 'supabase-auth-token',
          value: sessionCookie.value,
          path: '/',
          secure: request.url.startsWith('https://'),
          sameSite: 'lax',
          httpOnly: true,
          maxAge: SESSION_TIMEOUT_MINUTES * 60
        })
      }
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
      redirectUrl.searchParams.set('redirectTo', encodeURIComponent(pathname))
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware auth error:', error)
    // Clear any existing session cookies on error
    const sessionCookies = request.cookies.getAll()
      .filter(cookie => cookie.name.includes('supabase.auth'))
    
    sessionCookies.forEach(cookie => {
      response.cookies.set({
        name: cookie.name,
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