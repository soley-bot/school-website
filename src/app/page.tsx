import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Image from 'next/image'
import type { HeroContent } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import ProgramsSection from '../components/ProgramsSection'

interface Cookie {
  name: string
  value: string
  options?: CookieOptions
}

const defaultHeroContent: HeroContent = {
  id: uuidv4(),
  tag: 'Classes Enrolling Now',
  title: 'Master Languages with Confidence',
  description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
  primary_button_text: 'Explore Courses',
  primary_button_link: '#programs',
  secondary_button_text: 'Free Trial Class',
  secondary_button_link: '#',
  image_url: '/images/facilities/students-learning.jpg',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

async function getHeroContent() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return cookieStore.getAll().map((cookie): Cookie => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        setAll: (cookies: Cookie[]) => {
          cookies.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie.options)
          })
        },
      }
    }
  )
  const { data, error } = await supabase.from('hero_content').select('*').single()
  
  if (error || !data) {
    // If no content exists, create default content
    const { data: newData, error: insertError } = await supabase
      .from('hero_content')
      .upsert(defaultHeroContent)
      .select()
      .single()

    if (insertError) {
      console.error('Error creating default hero content:', insertError)
      return defaultHeroContent
    }

    return newData as HeroContent
  }

  return data as HeroContent
}

export default async function Home() {
  const heroContent = await getHeroContent()

  // Ensure we have a valid image URL
  const imageUrl = heroContent.image_url || defaultHeroContent.image_url

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 lg:text-left">
              <span className="inline-block text-lg font-semibold mb-4 text-[#2596be]">
                {heroContent.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {heroContent.title}
              </h1>
              <p className="text-lg mb-8 text-gray-600">
                {heroContent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={heroContent.primary_button_link}
                  className="bg-[#2596be] text-white hover:bg-[#1a7290] px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  {heroContent.primary_button_text}
                </a>
                <a
                  href={heroContent.secondary_button_link}
                  className="border-2 border-[#2596be] text-[#2596be] hover:bg-[#2596be]/5 px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  {heroContent.secondary_button_text}
                </a>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-xl aspect-[3/2]">
              <Image
                src={imageUrl}
                alt="Hero image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2596be] mb-2">1000+</div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2596be] mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2596be] mb-2">20+</div>
              <div className="text-gray-600">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2596be] mb-2">10</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our proven teaching methods and dedicated instructors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8">
              <div className="text-[#2596be] mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Teachers</h3>
              <p className="text-gray-600">
                Learn from qualified native speakers with years of teaching experience.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <div className="text-[#2596be] mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art classrooms equipped with the latest learning technology.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <div className="text-[#2596be] mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-gray-600">
                95% of our students achieve their language learning goals within their target timeframe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
