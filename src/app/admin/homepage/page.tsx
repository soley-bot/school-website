'use client'

import HeroSection from './components/HeroSection'
import ProgramsSection from './components/ProgramsSection'
import TermBannerSection from './components/TermBannerSection'
import UpcomingEventsSection from './components/UpcomingEventsSection'
import FacilitiesSection from './components/FacilitiesSection'
import StatsSection from './components/StatsSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import FooterSection from './components/FooterSection'

export default function HomepageAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Homepage Content Management</h1>
      </div>

      <div className="space-y-8">
        {/* Term Banner Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Term Banner</h2>
          <TermBannerSection />
        </div>

        {/* Hero Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Hero Section</h2>
          <HeroSection />
        </div>

        {/* Programs Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Programs Section</h2>
          <ProgramsSection />
        </div>

        {/* Upcoming Events Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Upcoming Events Section</h2>
          <UpcomingEventsSection />
        </div>

        {/* Facilities Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Facilities Section</h2>
          <FacilitiesSection />
        </div>

        {/* Stats Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Stats Section</h2>
          <StatsSection />
        </div>

        {/* Why Choose Us Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Why Choose Us Section</h2>
          <WhyChooseUsSection />
        </div>

        {/* Footer Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Footer Information</h2>
          <FooterSection />
        </div>
      </div>
    </div>
  )
} 