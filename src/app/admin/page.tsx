'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalStudents: number
  activePrograms: number
  upcomingEvents: number
  recentNews: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    activePrograms: 0,
    upcomingEvents: 0,
    recentNews: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Get count of programs
      const { count: programCount } = await supabase
        .from('programs')
        .select('*', { count: 'exact' })

      // Get count of upcoming events
      const { count: eventCount } = await supabase
        .from('upcoming_events')
        .select('*', { count: 'exact' })
        .gte('date', new Date().toISOString().split('T')[0])

      // Get count of recent news
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact' })

      setStats({
        totalStudents: 1000, // Placeholder - implement actual student count
        activePrograms: programCount || 0,
        upcomingEvents: eventCount || 0,
        recentNews: newsCount || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your website content and monitor key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.totalStudents}+</h3>
          <p className="text-gray-600">Total Students</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.activePrograms}</h3>
          <p className="text-gray-600">Active Programs</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.upcomingEvents}</h3>
          <p className="text-gray-600">Upcoming Events</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-[#2596be] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">{stats.recentNews}</h3>
          <p className="text-gray-600">Recent News</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <p className="text-sm text-gray-600">Update content and layout</p>
            </div>
          </a>

          <a
            href="/admin/news/new"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="text-[#2596be] mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Add News</h3>
              <p className="text-sm text-gray-600">Create a news article</p>
            </div>
          </a>

          <a
            href="/admin/academics"
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
              <h3 className="font-medium">Manage Programs</h3>
              <p className="text-sm text-gray-600">Update academic offerings</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 