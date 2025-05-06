'use client'

import { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useAuth, AuthProvider } from '@/context/AuthContext'
import { PUBLIC_PATHS } from '@/lib/auth'
import { toast } from 'react-hot-toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Homepage', href: '/admin/homepage', icon: PencilSquareIcon },
  { name: 'Academics', href: '/admin/academics', icon: AcademicCapIcon },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { isLoading, isAuthenticated, supabase } = useAuth()

  const navigateTo = useCallback((path: string) => {
    if (path === pathname) return
    router.push(path)
  }, [router, pathname])

  const handleSignOut = async () => {
    if (!supabase) return
    
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out')
    }
  }

  if (isLoading || !supabase) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
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
            <button 
              onClick={() => navigateTo('/admin')} 
              className="flex items-center"
            >
              {isSidebarOpen ? (
                <div className="relative w-40 h-8">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    sizes="10rem"
                  />
                </div>
              ) : (
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    sizes="2rem"
                  />
                </div>
              )}
            </button>
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
                <button
                  key={item.name}
                  onClick={() => navigateTo(item.href)}
                  className={cn(
                    isActive
                      ? "bg-[#2596be]/10 text-[#2596be]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
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
                </button>
              )
            })}

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className={cn(
                "w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
              title={!isSidebarOpen ? "Sign Out" : undefined}
              disabled={!supabase}
            >
              <ArrowLeftOnRectangleIcon
                className={cn(
                  "text-gray-400 group-hover:text-gray-500",
                  "h-5 w-5",
                  isSidebarOpen ? "mr-3" : "mx-auto"
                )}
                aria-hidden="true"
              />
              {isSidebarOpen && "Sign Out"}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-200 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      {PUBLIC_PATHS.includes(pathname) ? (
        children
      ) : (
        <AdminLayoutContent>{children}</AdminLayoutContent>
      )}
    </AuthProvider>
  )
} 