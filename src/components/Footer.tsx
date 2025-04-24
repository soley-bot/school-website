'use client'

import Image from 'next/image'
import Link from 'next/link'

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

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>123 School Street, City, State 12345</li>
              <li>info@school.edu</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-lg overflow-hidden h-48 relative bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Click to view on Google Maps
              </div>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} STANFORD American School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 