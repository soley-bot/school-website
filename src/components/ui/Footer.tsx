import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.png"
                  alt="STANFORD American School"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
            <p className="text-sm">
              Empowering minds through excellence in language education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-sm hover:text-gray-900 transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm hover:text-gray-900 transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>123 School Street, City, State 12345</li>
              <li>
                <a href="mailto:info@school.edu" className="hover:text-gray-900 transition-colors">
                  info@school.edu
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="hover:text-gray-900 transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Location</h3>
            <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7270791764607!2d-122.41941708468204!3d37.77492997975939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjgiTiAxMjLCsDI1JzA3LjQiVw!5e0!3m2!1sen!2sus!4v1635959562000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} STANFORD American School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 