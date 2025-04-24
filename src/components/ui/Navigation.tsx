'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Language School Logo"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-[#2596be]">Language School</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item, index) => (
              <Fragment key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-[#2596be] transition-colors"
                >
                  {item.name}
                </Link>
                {index === 1 && (
                  <Menu as="div" className="relative">
                    {({ open }) => (
                      <>
                        <Menu.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-[#2596be] transition-colors focus:outline-none">
                          Academics
                          <ChevronDownIcon 
                            className={`ml-2 h-5 w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
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
                          <Menu.Items className="absolute left-1/2 z-10 mt-2 w-64 -translate-x-1/2 transform rounded-lg bg-white shadow-lg focus:outline-none">
                            <div className="py-2">
                              {academics.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={`block px-4 py-2 transition-colors ${
                                        active ? 'bg-[#2596be]/5 text-[#2596be]' : 'text-gray-900'
                                      }`}
                                    >
                                      <p className="text-sm font-medium">
                                        {item.name}
                                      </p>
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
                )}
              </Fragment>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#2596be] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-[#2596be]/5 hover:text-[#2596be] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <div className="text-base font-medium text-gray-500">Academics</div>
            <div className="mt-2 space-y-1">
              {academics.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block pl-3 pr-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#2596be]/5 hover:text-[#2596be] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 