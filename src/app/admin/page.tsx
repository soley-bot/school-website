'use client'

import { useEffect, useState } from 'react'
// Update import path for useAuth
import { useAuth } from '@/context/AuthContext' 

interface Stats {
  totalPrograms: number
  activePrograms: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPrograms: 0,
    activePrograms: 0
  })
  const { supabase } = useAuth() // Get supabase client from CONTEXT hook

  useEffect(() => {
    if (supabase) {
      loadStats()
    }
  }, [supabase]) 

  const loadStats = async () => {
    if (!supabase) return
    
    try {
      const { count: programPagesCount } = await supabase
        .from('program_pages')
        .select('*', { count: 'exact' })

      setStats({
        totalPrograms: programPagesCount || 0,
        activePrograms: programPagesCount || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your website content and academic programs</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.totalPrograms}</h3>
          <p className="text-gray-600">Total Programs</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.activePrograms}</h3>
          <p className="text-gray-600">Active Programs</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/homepage"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="text-[#2596be] mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Edit Homepage</h3>
              <p className="text-sm text-gray-600">Update hero section and content</p>
            </div>
          </a>

          <a
            href="/admin/academics/programs/new"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="text-[#2596be] mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Create New Program</h3>
              <p className="text-sm text-gray-600">Add a new academic program</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 