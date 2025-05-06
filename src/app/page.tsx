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
    <main>
      <TermBanner 
        text={content.termBanner?.text || ''} 
        is_active={content.termBanner?.is_active || false}
        variant={content.termBanner?.variant}
        icon={content.termBanner?.icon}
        button_text={content.termBanner?.button_text}
        button_link={content.termBanner?.button_link}
      />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
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
                <ImageWithFallback
                  src={imageUrl}
                  alt="Hero image"
                  fallbackSrc="/images/classroom.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {content.stats && content.stats.length > 0 && (
        <StatsSection stats={content.stats} title={content.statsTitle} />
      )}

      {/* Programs Section */}
      {content.programs && content.programs.length > 0 && (
        <ProgramsSection programs={content.programs} />
      )}

      {/* Upcoming Events Section */}
      {content.events && content.events.length > 0 && (
        <UpcomingEventsSection events={content.events} />
      )}

      {/* Why Choose Us Section */}
      {content.whyChooseUs && (
        <WhyChooseUsSection content={content.whyChooseUs} />
      )}

      {/* Facilities Section */}
      {content.facilities && content.facilities.length > 0 && (
        <FacilitiesSection facilities={content.facilities} />
      )}
    </main>
  )
}
