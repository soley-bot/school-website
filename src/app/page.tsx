import { AnnouncementBanner } from '@/components/ui/AnnouncementBanner'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <AnnouncementBanner />
      
      {/* White spacing */}
      <div className="h-8 bg-white" />
      
      {/* Hero Section */}
      <section className="text-gray-900 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 lg:text-left">
              <span className="inline-block text-lg font-semibold mb-4 text-[#2596be]">
                Classes Enrolling Now
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Master Languages with Confidence
              </h1>
              <p className="text-lg mb-8 text-gray-600">
                Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#programs" 
                  className="bg-[#2596be] text-white hover:bg-[#1a7290] px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  Explore Courses
                </Link>
                <Link 
                  href="#" 
                  className="border-2 border-[#2596be] text-[#2596be] hover:bg-[#2596be]/5 px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  Free Trial Class
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-xl aspect-[3/2]">
              <Image
                src="/images/facilities/students-learning.jpg"
                alt="Students learning in classroom"
                fill
                className="object-cover rounded-lg shadow-xl"
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 border-t border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[#2596be] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div className="font-bold text-gray-900">All Levels</div>
              <div className="text-sm text-gray-500">From Beginner to Advanced</div>
            </div>
            <div>
              <div className="text-[#2596be] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="font-bold text-gray-900">10+ Locations</div>
              <div className="text-sm text-gray-500">Convenient Centers</div>
            </div>
            <div>
              <div className="text-[#2596be] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div className="font-bold text-gray-900">98% Success</div>
              <div className="text-sm text-gray-500">Student Achievement Rate</div>
            </div>
            <div>
              <div className="text-[#2596be] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="font-bold text-gray-900">15+ Years</div>
              <div className="text-sm text-gray-500">Teaching Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Language Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our specialized language courses designed to help you achieve your communication goals through proven methodologies and expert instruction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* General English Program */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="p-8">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600 mb-4">
                  Most Popular
                </span>
                <h3 className="text-2xl font-bold mb-4">General English Program</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training covering speaking, listening, reading, and writing skills for everyday communication.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Native English teachers
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Weekly tests
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Modern study materials
                  </li>
                </ul>
                <div className="text-3xl font-bold text-gray-900 mb-6">$299</div>
                <Link href="/academics/general-english" className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Learn More
                </Link>
              </div>
            </div>

            {/* General Chinese Program */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="p-8">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600 mb-4">
                  Comprehensive
                </span>
                <h3 className="text-2xl font-bold mb-4">General Chinese Program</h3>
                <p className="text-gray-600 mb-6">
                  Master Mandarin Chinese with our structured curriculum designed for real-world applications.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Native Chinese teachers
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Character writing practice
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Cultural immersion
                  </li>
                </ul>
                <div className="text-3xl font-bold text-gray-900 mb-6">$349</div>
                <Link href="/academics/general-chinese" className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Chinese for Primary Students */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="p-8">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600 mb-4">
                  For Kids
                </span>
                <h3 className="text-2xl font-bold mb-4">Chinese for Primary Students</h3>
                <p className="text-gray-600 mb-6">
                  Fun and engaging Mandarin program specially designed for young learners ages 6-12.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Age-appropriate methods
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Interactive activities
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Regular parent updates
                  </li>
                </ul>
                <div className="text-3xl font-bold text-gray-900 mb-6">$249</div>
                <Link href="/academics/chinese-primary" className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Learn Languages The Smart Way</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative approach combines proven teaching methods and modern methodologies to help you reach fluency faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Native Teachers</h3>
              <p className="text-gray-600">Learn from certified native speakers with years of teaching experience</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Small Class Sizes</h3>
              <p className="text-gray-600">Personalized attention with maximum 8 students per class</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Flexible Schedule</h3>
              <p className="text-gray-600">Morning, afternoon, and evening classes available</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Conversation Focus</h3>
              <p className="text-gray-600">Emphasis on practical speaking skills from day one</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2596be] to-[#1a7290] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Language Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our language learning community and transform your future through effective language education
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-[#2596be] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  )
}
