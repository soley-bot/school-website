'use client'

import { 
  NewspaperIcon, 
  AcademicCapIcon, 
  Cog6ToothIcon,
  UsersIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const stats = [
  { name: 'Total News Articles', stat: '12', icon: NewspaperIcon },
  { name: 'Academic Programs', stat: '4', icon: AcademicCapIcon },
  { name: 'Total Students', stat: '250', icon: UsersIcon },
  { name: 'Upcoming Events', stat: '3', icon: CalendarIcon },
]

const quickActions = [
  {
    name: 'Add News Article',
    description: 'Create a new news article or announcement',
    href: '/admin/news/new',
    icon: NewspaperIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Update Academics',
    description: 'Modify academic program information',
    href: '/admin/academics',
    icon: AcademicCapIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Website Settings',
    description: 'Configure website settings and information',
    href: '/admin/settings',
    icon: Cog6ToothIcon,
    color: 'bg-purple-500'
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your website content and monitor key metrics
        </p>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Overview</h2>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="relative group rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div>
                <div className={`inline-flex rounded-lg p-3 ${action.color} ring-4 ring-white`}>
                  <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {action.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-5 bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              Activity feed coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 