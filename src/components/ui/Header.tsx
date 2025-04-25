'use client'

import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Program {
  name: string
  description: string
  slug: string
  theme: string
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('Fetching programs...')
        const { data, error } = await supabase
          .from('programs')
          .select('name, description, tag, theme')
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Error fetching programs:', error)
          throw error
        }
        
        const mappedPrograms = data?.map(program => ({
          name: program.name,
          description: program.description,
          slug: program.tag,
          theme: program.theme || 'blue'
        })) || []
        
        console.log('Fetched programs:', JSON.stringify(mappedPrograms, null, 2))
        setPrograms(mappedPrograms)
      } catch (error) {
        console.error('Error in fetchPrograms:', error)
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
            <div className="relative w-12 h-12">
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
              STANFORD American School
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
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    className={`${
                      isAcademicsActive()
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-900'
                    } group px-1 py-2 text-sm transition-colors duration-200 inline-flex items-center`}
                  >
                    Academics
                    <ChevronDownIcon
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      } ${isAcademicsActive() ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {programs.map((program) => (
                        <Menu.Item key={program.slug}>
                          {({ active }) => (
                            <Link
                              href={`/academics/${program.slug}`}
                              className={`${
                                active || isActive(`/academics/${program.slug}`)
                                  ? 'bg-gray-50'
                                  : ''
                              } block px-4 py-3 hover:bg-gray-50`}
                            >
                              <p className="text-sm font-medium text-gray-900">
                                {program.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {program.description}
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      {isAdminPage && (
                        <div className="border-t mt-2 pt-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin/academics/programs/new"
                                className={`${
                                  active ? 'bg-gray-50' : ''
                                } block px-4 py-2 text-sm font-medium text-gray-900`}
                              >
                                + Create New Program
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
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
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                } block px-3 py-2 text-base rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Academics Menu */}
            <div className="pt-4">
              <div className={`${
                isAcademicsActive()
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500'
              } px-3 text-base`}>
                Academics
              </div>
              <div className="mt-2 space-y-1">
                {programs.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/academics/${program.slug}`}
                    className={`${
                      isActive(`/academics/${program.slug}`)
                        ? 'bg-gray-50 text-gray-900 font-medium'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    } block px-3 py-2 text-sm rounded-md`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <p className="font-medium">{program.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{program.description}</p>
                  </Link>
                ))}
                {isAdminPage && (
                  <Link
                    href="/admin/academics/programs/new"
                    className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    + Create New Program
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}