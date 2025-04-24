import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname)
  
  // Create a response object that we can modify
  const response = NextResponse.next()

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
          if (request.url.startsWith('https://')) {
            options.secure = true
          }
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    // Check auth status
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Auth check - Session exists:', !!session)

    // Handle authentication for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      console.log('Processing admin route:', request.nextUrl.pathname)
      
      // If authenticated and trying to access login page, redirect to admin dashboard
      if (request.nextUrl.pathname === '/admin/login' && session) {
        console.log('Redirecting authenticated user from login to admin dashboard')
        return NextResponse.redirect(new URL('/admin/homepage', request.url))
      }

      // If not authenticated and trying to access any admin page except login, redirect to login
      if (!session && request.nextUrl.pathname !== '/admin/login') {
        console.log('Unauthorized access attempt - redirecting to login')
        const redirectUrl = new URL('/admin/login', request.url)
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }

      // If authenticated and accessing any admin route (except login which was handled above), allow access
      if (session) {
        console.log('Authenticated user accessing admin route - allowing access')
        return response
      }
    }

    return response
  } catch (error) {
    console.error('Middleware auth error:', error)
    if (request.nextUrl.pathname.startsWith('/admin') && 
        request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
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