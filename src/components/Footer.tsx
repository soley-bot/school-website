'use client'

import Image from 'next/image'
import Link from 'next/link'

const campuses = [
  {
    name: 'Main Campus',
    address: '123 Education Street, District 1, Ho Chi Minh City',
    phone: '(028) 1234-5678',
    email: 'info@stanford.edu.vn'
  },
  {
    name: 'District 2 Campus',
    address: '456 Learning Road, District 2, Ho Chi Minh City',
    phone: '(028) 2345-6789',
    email: 'd2@stanford.edu.vn'
  },
  {
    name: 'District 7 Campus',
    address: '789 Knowledge Avenue, District 7, Ho Chi Minh City',
    phone: '(028) 3456-7890',
    email: 'd7@stanford.edu.vn'
  }
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="STANFORD American School"
                  fill
                  className="object-contain brightness-0 invert"
                  quality={100}
                />
              </div>
              <span className="text-lg font-semibold">
                STANFORD American School
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering minds through excellence in language education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-400 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Campuses */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Our Campuses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campuses.map((campus, index) => (
                <div key={index} className="text-gray-400">
                  <h4 className="font-medium text-white mb-2">{campus.name}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>{campus.address}</li>
                    <li>Tel: {campus.phone}</li>
                    <li>Email: {campus.email}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} STANFORD American School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 