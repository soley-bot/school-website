'use client'

import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

const academics = [
  {
    name: 'General English Program',
    description: 'Comprehensive English course for all levels',
    href: '/academics/general-english',
  },
  {
    name: 'IELTS Preparation',
    description: 'Specialized training for IELTS exam',
    href: '/academics/ielts-preparation',
  },
  {
    name: 'General Chinese Program',
    description: 'Learn Mandarin Chinese from basics to advanced',
    href: '/academics/general-chinese',
  },
  {
    name: 'Chinese for Primary Students',
    description: 'Fun and interactive Chinese learning for kids',
    href: '/academics/chinese-primary',
  },
]

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-16 h-16">
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
            <Link
              href="/"
              className={`${
                isActive('/')
                  ? 'text-[#2596be] border-b-2 border-[#2596be]'
                  : 'text-gray-700 hover:text-[#2596be] hover:border-b-2 hover:border-[#2596be]'
              } px-1 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                isActive('/about')
                  ? 'text-[#2596be] border-b-2 border-[#2596be]'
                  : 'text-gray-700 hover:text-[#2596be] hover:border-b-2 hover:border-[#2596be]'
              } px-1 py-2 text-sm font-medium transition-colors duration-200`}
            >
              About
            </Link>
            {/* Academics Dropdown */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    className={`${
                      isAcademicsActive()
                        ? 'text-[#2596be] border-b-2 border-[#2596be]'
                        : 'text-gray-700 hover:text-[#2596be] hover:border-b-2 hover:border-[#2596be]'
                    } px-1 py-2 text-sm font-medium transition-colors duration-200 inline-flex items-center`}
                  >
                    Academics
                    <ChevronDownIcon
                      className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
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
                    <Menu.Items className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 transform rounded-lg bg-white shadow-md focus:outline-none">
                      <div className="py-2">
                        {academics.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={`${
                                  active || isActive(item.href)
                                    ? 'bg-[#2596be]/5 text-[#2596be]'
                                    : 'text-gray-900'
                                } block px-4 py-2 transition-colors`}
                              >
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {item.description}
                                </p>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            <Link
              href="/news"
              className={`${
                isActive('/news')
                  ? 'text-[#2596be] border-b-2 border-[#2596be]'
                  : 'text-gray-700 hover:text-[#2596be] hover:border-b-2 hover:border-[#2596be]'
              } px-1 py-2 text-sm font-medium transition-colors duration-200`}
            >
              News
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive('/contact')
                  ? 'text-[#2596be] border-b-2 border-[#2596be]'
                  : 'text-gray-700 hover:text-[#2596be] hover:border-b-2 hover:border-[#2596be]'
              } px-1 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-[#2596be]"
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
                    ? 'text-[#2596be] bg-[#2596be]/5'
                    : 'text-gray-700 hover:text-[#2596be] hover:bg-[#2596be]/5'
                } block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Academics Menu */}
            <div className={`${
              isAcademicsActive()
                ? 'text-[#2596be] bg-[#2596be]/5'
                : 'text-gray-700'
            } px-3 py-2`}>
              <div className="text-base font-medium">Academics</div>
              <div className="mt-2 space-y-1">
                {academics.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'text-[#2596be] bg-[#2596be]/5'
                        : 'text-gray-700 hover:text-[#2596be] hover:bg-[#2596be]/5'
                    } block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 