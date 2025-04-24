'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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

export function Navigation() {
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
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="relative h-12 w-48">
                    <Image
                      src="/images/logo.png"
                      alt="School Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        isActive(item.href)
                          ? 'border-blue-600 text-blue-700 font-semibold'
                          : 'border-transparent text-blue-600 hover:text-blue-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Academics Dropdown */}
                  <Menu as="div" className="relative">
                    {({ open }) => (
                      <>
                        <Menu.Button
                          className={cn(
                            isAcademicsActive()
                              ? 'border-blue-600 text-blue-700 font-semibold'
                              : 'border-transparent text-blue-600 hover:text-blue-700',
                            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                          )}
                        >
                          Academics
                          <ChevronDownIcon
                            className={cn(
                              'ml-2 h-5 w-5 transition-transform duration-200',
                              open ? 'rotate-180' : ''
                            )}
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
                          <Menu.Items className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-2">
                              {academics.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        active ? 'bg-blue-50' : '',
                                        isActive(item.href) ? 'text-blue-700 bg-blue-50' : 'text-gray-900',
                                        'block px-4 py-2 hover:bg-blue-50'
                                      )}
                                    >
                                      <p className="text-sm font-medium">{item.name}</p>
                                      <p className="mt-1 text-xs text-gray-500">{item.description}</p>
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
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={cn(
                    isActive(item.href)
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Mobile Academics Menu */}
              <div className={cn(
                'border-l-4',
                isAcademicsActive()
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-transparent',
                'py-2 pl-3 pr-4'
              )}>
                <div className={cn(
                  'font-medium',
                  isAcademicsActive() ? 'text-blue-700' : 'text-blue-600'
                )}>
                  Academics
                </div>
                <div className="space-y-1 pl-4">
                  {academics.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={cn(
                        isActive(item.href)
                          ? 'text-blue-700 bg-blue-50 font-semibold'
                          : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
                        'block py-2 text-sm rounded-md'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 