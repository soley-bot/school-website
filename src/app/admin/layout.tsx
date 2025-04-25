'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/database.types'
import {
  HomeIcon,
  NewspaperIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BeakerIcon,
  PencilSquareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Homepage', href: '/admin/homepage', icon: PencilSquareIcon },
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
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      if (!session) {
        router.push('/admin/login')
        return
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error checking auth status:', error)
      toast.error('Authentication error')
      router.push('/admin/login')
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
      router.refresh()
      // Force a hard refresh to clear all client state
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // If it's a public path, render without the admin layout
  if (PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-200 ease-in-out",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-[#2596be]">
            <Link href="/admin" className="flex items-center">
              {isSidebarOpen ? (
                <div className="relative w-40 h-8">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-gray-200"
            >
              {isSidebarOpen ? (
                <ChevronDoubleLeftIcon className="w-5 h-5" />
              ) : (
                <ChevronDoubleRightIcon className="w-5 h-5" />
              )}
            </button>
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
                      ? "bg-[#2596be]/10 text-[#2596be]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <item.icon
                    className={cn(
                      isActive ? "text-[#2596be]" : "text-gray-400 group-hover:text-gray-500",
                      "h-5 w-5",
                      isSidebarOpen ? "mr-3" : "mx-auto"
                    )}
                    aria-hidden="true"
                  />
                  {isSidebarOpen && item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className={cn(
                "flex items-center text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                isSidebarOpen ? "w-full px-4 py-2 justify-center" : "w-12 h-12 mx-auto justify-center"
              )}
              title={!isSidebarOpen ? "Sign out" : undefined}
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-2 text-sm font-medium">Sign out</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-200 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-20"
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
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-[#2596be] text-white shadow-lg md:hidden"
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