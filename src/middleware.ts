import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't need authentication
const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

export async function middleware(req: NextRequest) {
  try {
    // Early return for public paths
    if (PUBLIC_PATHS.some(path => req.nextUrl.pathname === path)) {
      return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    // If not authenticated and trying to access protected routes, redirect to login
    if (!session && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // If authenticated and on login page, redirect to admin dashboard
    if (session && req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to login unless it's a public path
    if (!PUBLIC_PATHS.some(path => req.nextUrl.pathname === path)) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/admin/:path*',
} 