'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import {
  HomeIcon,
  NewspaperIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'News', href: '/admin/news', icon: NewspaperIcon },
  { name: 'Academics', href: '/admin/academics', icon: AcademicCapIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  { name: 'Test Page', href: '/admin/test', icon: BeakerIcon },
]

// Paths that don't need authentication or the admin layout
const PUBLIC_PATHS = ['/admin/login', '/admin/env-test']

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathname)) {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        router.push('/admin/login')
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase, pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // If it's a public path, render without the admin layout
  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <Link href="/admin" className="text-xl font-bold text-white">
              Admin Panel
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-margin duration-200 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-0"
      )}>
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg md:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  )
} 