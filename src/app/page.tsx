export const dynamic = 'force-dynamic'

import ProgramsSection from '@/components/ProgramsSection'
import TermBanner from '@/components/ui/TermBanner'
import FacilitiesSection from '@/components/FacilitiesSection'
import UpcomingEventsSection from '@/components/UpcomingEventsSection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import StatsSection from '@/components/StatsSection'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { getPageContent } from '@/lib/content'
import { normalizeImageUrl } from '@/lib/content'

export default async function Home() {
  const content = await getPageContent()
  const imageUrl = normalizeImageUrl(content.hero.image_url)

  return (
    <main className="overflow-hidden">
      <TermBanner 
        text={content.termBanner?.text || ''} 
        is_active={content.termBanner?.is_active || false}
        variant="default"
        icon={content.termBanner?.icon}
        button_text={content.termBanner?.button_text}
        button_link={content.termBanner?.button_link}
      />
      
      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden">
        {/* Decorative dots pattern */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2596be 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        </div>
        
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 lg:text-left">
                <span className="inline-block text-lg font-semibold mb-4 text-[#2596be]">
                  {content.hero.tag}
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  {content.hero.title}
                </h1>
                <p className="text-lg mb-8 text-gray-600">
                  {content.hero.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={content.hero.primary_button_link}
                    className="bg-[#2596be] text-white hover:bg-[#1a7290] px-8 py-3 rounded-md font-semibold transition-colors"
                  >
                    {content.hero.primary_button_text}
                  </a>
                  <a
                    href={content.hero.secondary_button_link}
                    className="border-2 border-[#2596be] text-[#2596be] hover:bg-[#2596be]/5 px-8 py-3 rounded-md font-semibold transition-colors"
                  >
                    {content.hero.secondary_button_text}
                  </a>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative w-full aspect-[3/2]">
                  {/* Decorative border accent */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#2596be]/20 rounded-lg z-0"></div>
                  
                  <ImageWithFallback
                    src={imageUrl}
                    alt="Hero image"
                    fallbackSrc="/images/classroom.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg shadow-md relative z-10"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="h-full w-full translate-y-1 fill-gray-50">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      {content.stats && content.stats.length > 0 && (
        <div className="bg-gray-50 relative">
          <StatsSection stats={content.stats} title={content.statsTitle} />
          
          {/* Diagonal divider */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white">
              <polygon points="0,100 100,0 100,100"/>
            </svg>
          </div>
        </div>
      )}

      {/* Programs Section */}
      {content.programs && content.programs.length > 0 && (
        <div className="bg-white relative">
          <ProgramsSection programs={content.programs} />
          
          {/* Curved divider */}
          <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="h-full w-full fill-gray-50 translate-y-[1px]">
              <path d="M0,24L80,24C160,24,320,24,480,16C640,8,800,0,960,0C1120,0,1280,8,1360,12L1440,16L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      {content.events && content.events.length > 0 && (
        <div className="bg-gray-50 relative">
          {/* Decorative accent element */}
          <div className="absolute top-0 left-0 w-64 h-64 opacity-5 -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-black" strokeWidth="0.5">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          
          <UpcomingEventsSection events={content.events} />
          
          {/* Tilt divider */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full fill-white">
              <path d="M1200 120L0 16.48V0h1200v120z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      {content.whyChooseUs && (
        <div className="bg-white relative">
          {/* Decorative triangles */}
          <div className="absolute top-10 right-10 opacity-10">
            <div className="w-32 h-32 border-t-4 border-r-4 border-[#2596be]"></div>
          </div>
          
          <WhyChooseUsSection content={content.whyChooseUs} />
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="h-full w-full translate-y-1 fill-gray-50">
              <path d="M0,0L40,5.3C80,11,160,21,240,32C320,43,400,53,480,53.3C560,53,640,43,720,37.3C800,32,880,32,960,42.7C1040,53,1120,75,1200,74.7C1280,75,1360,53,1400,42.7L1440,32L1440,100L1400,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Facilities Section */}
      {content.facilities && content.facilities.length > 0 && (
        <div className="bg-gray-50 relative pt-1"> {/* Added pt-1 to fix the wave overlap */}
          {/* Decorative dots pattern */}
          <div className="absolute bottom-0 right-0 w-80 h-80 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2596be 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          </div>
          
          <FacilitiesSection facilities={content.facilities} />
        </div>
      )}
    </main>
  )
}
