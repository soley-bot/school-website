'use client'

import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type ProgramPage = Database['public']['Tables']['program_pages']['Row']

// Define only the program fields we need for the header
interface HeaderProgram {
  id: string;
  name: string;
  slug: string;
  type: 'english' | 'chinese' | 'ielts';
}

interface GroupedPrograms {
  [key: string]: HeaderProgram[]
}

// Define program categories
const PROGRAM_TYPES = {
  'english': 'English Programs',
  'chinese': 'Chinese Programs',
  'ielts': 'IELTS Programs'
} as const

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [groupedPrograms, setGroupedPrograms] = useState<GroupedPrograms>({})
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('Fetching programs...')
        const { data: programData, error: programError } = await supabase
          .from('program_pages')
          .select('id, name, slug, type')
          .order('name')

        if (programError) {
          console.error('Error fetching programs:', programError)
          throw programError
        }

        if (!programData) {
          console.log('No programs found')
          setGroupedPrograms({})
          return
        }

        console.log('Programs fetched:', programData)

        // Group programs by type
        const grouped = (programData as HeaderProgram[]).reduce<GroupedPrograms>((acc, program) => {
          // Get the display name for the type
          const displayType = PROGRAM_TYPES[program.type] || 'Other Programs'

          if (!acc[displayType]) {
            acc[displayType] = []
          }
          acc[displayType].push(program)
          return acc
        }, {})

        console.log('Grouped programs:', grouped)
        setGroupedPrograms(grouped)
      } catch (error) {
        console.error('Error in fetchPrograms:', error)
        setGroupedPrograms({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const isAcademicsActive = () => {
    return pathname.startsWith('/academics')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12  h-12">
              <Image
                src="/images/logo.png"
                alt="STANFORD American School"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              STANFORD AMERICAN SCHOOL
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } px-1 py-2 text-sm transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            {/* Academics Dropdown */}
            <div className="relative inline-block text-left">
              <Menu>
                <Menu.Button className={`${
                  isAcademicsActive()
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } group px-1 py-2 text-sm transition-colors duration-200 inline-flex items-center focus:outline-none`}>
                  Academics
                  <ChevronDownIcon
                    className="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-600"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-50 mt-2 w-72 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {isLoading ? (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          Loading programs...
                        </div>
                      ) : Object.keys(groupedPrograms).length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No programs available
                        </div>
                      ) : (
                        <>
                          {Object.entries(groupedPrograms).map(([type, programs]) => (
                            <div key={type}>
                              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                                {type}
                              </div>
                              {programs.map((program) => (
                                <Menu.Item key={program.id}>
                                  {({ active }) => (
                                    <Link
                                      href={`/academics/${program.slug}`}
                                      className={`${
                                        active ? 'bg-gray-100' : ''
                                      } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50`}
                                    >
                                      {program.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          ))}
                          {isAdminPage && (
                            <div className="border-t">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/admin/academics/programs/new"
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50`}
                                  >
                                    + Create New Program
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Academics Menu */}
            <div className="border-t border-gray-200 pt-4">
              <div className="px-3 text-base font-medium text-gray-500">
                Academic Programs
              </div>
              {!isLoading && Object.keys(groupedPrograms).map((type) => (
                <div key={type}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    {type}
                  </div>
                  {groupedPrograms[type].map((program) => (
                    <Link
                      key={program.id}
                      href={`/academics/${program.slug}`}
                      className="block px-3 py-2 text-base text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {program.name}
                    </Link>
                  ))}
                </div>
              ))}
              {isAdminPage && (
                <Link
                  href="/admin/academics/programs/new"
                  className="block px-3 py-2 mt-2 text-base text-[#2596be] hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  + Create New Program
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}