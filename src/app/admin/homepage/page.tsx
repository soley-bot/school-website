'use client'

import HeroSection from './components/HeroSection'
import ProgramsSection from './components/ProgramsSection'

export default function HomepageAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Homepage Content Management</h1>
      </div>

      <div className="space-y-8">
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
      </div>
    </div>
  )
} 