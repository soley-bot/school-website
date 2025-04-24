import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import Link from 'next/link'
import { 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const features = [
  {
    name: 'Expert Native Teachers',
    description: 'Learn from certified native speakers with years of teaching experience.',
    icon: UserIcon,
  },
  {
    name: 'Small Class Sizes',
    description: 'Personalized attention with maximum 8 students per class.',
    icon: UserGroupIcon,
  },
  {
    name: 'Flexible Schedule',
    description: 'Morning, afternoon, and evening classes to fit your schedule.',
    icon: ClockIcon,
  },
  {
    name: 'Conversation Focus',
    description: 'Emphasis on practical speaking skills from day one.',
    icon: ChatBubbleLeftRightIcon,
  },
]

const programs = [
  {
    name: 'General English Program',
    description: 'Comprehensive English course covering speaking, listening, reading, and writing skills for all levels.',
    features: [
      'Native English teachers',
      'Small class sizes (max 8 students)',
      'Flexible scheduling options',
      'Regular progress assessments'
    ],
    level: 'All Levels',
    duration: '12 weeks',
    price: '$299',
    href: '/courses/english',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    name: 'General Chinese Program',
    description: 'Master Mandarin Chinese with our structured curriculum designed for adult learners.',
    features: [
      'Native Chinese teachers',
      'Focus on practical communication',
      'Character writing practice',
      'Cultural immersion activities'
    ],
    level: 'Beginner to Advanced',
    duration: '16 weeks',
    price: '$349',
    href: '/courses/chinese',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    name: 'Chinese for Primary Students',
    description: 'Fun and interactive Chinese language program specially designed for young learners.',
    features: [
      'Age-appropriate teaching methods',
      'Interactive learning activities',
      'Regular parent updates',
      'Homework support'
    ],
    level: 'Primary Students',
    duration: '10 weeks',
    price: '$249',
    href: '/courses/chinese-kids',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    content: 'The English program helped me improve my communication skills significantly. The teachers are very supportive.',
    author: 'Sophea Chen',
    role: 'English Program Student'
  },
  {
    content: 'My child loves the Chinese primary program. The teaching methods are engaging and effective.',
    author: 'Linda Thompson',
    role: 'Parent of Primary Student'
  },
  {
    content: 'The language immersion environment really helped me become fluent quickly.',
    author: 'David Kim',
    role: 'Former Student'
  }
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="mb-8 inline-flex rounded-full bg-[#2596be]/10 px-4 py-1.5">
                <span className="text-sm font-semibold leading-6 text-[#2596be] ring-1 ring-inset ring-[#2596be]/20">
                  New Classes Starting Soon
                </span>
              </div>
              <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Master Languages with Confidence
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/contact"
                  className="rounded-md bg-[#2596be] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#2596be]/90 transition-colors"
                >
                  Explore Courses
                </Link>
                <Link 
                  href="/contact" 
                  className="text-lg font-semibold leading-6 text-[#2596be] hover:text-[#2596be]/90 transition-colors"
                >
                  Free Trial Class <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src="/images/classroom.jpg"
                  alt="Language classroom"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Showcase Section */}
      <Section className="relative -mt-8 pb-20 pt-16">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {programs.map((program) => (
                <div
                  key={program.name}
                  className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white opacity-50" />
                  <div className="relative p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                        <program.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-600">{program.level}</p>
                        <p className="text-sm text-gray-500">{program.duration}</p>
                      </div>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">{program.name}</h3>
                    <p className="mt-2 text-gray-600">{program.description}</p>
                    <div className="mt-6">
                      <ul className="space-y-3">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-x-3 text-sm text-gray-600">
                            <svg className="h-5 w-5 flex-none text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{program.price}</span>
                      <Link
                        href={program.href}
                        className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Learn Languages The Smart Way
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our innovative approach combines expert instruction and proven methodologies to help you achieve fluency faster.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600/10">
                      <feature.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                    </div>
                    <dt className="text-xl font-semibold leading-7 text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                What Our Students Say
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="relative bg-primary-50/50 shadow-sm rounded-2xl p-8">
                    <figure className="h-full flex flex-col justify-between">
                      <blockquote className="text-gray-900">
                        <p className="text-lg leading-8">&ldquo;{testimonial.content}&rdquo;</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.author}</div>
                          <div className="text-primary-600">{testimonial.role}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary-900 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to Start Your Language Journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join our language learning community and transform your future through effective language education.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-primary-400 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-300 transition-colors"
              >
                Get Started Today
              </Link>
              <Link href="/courses" className="text-lg font-semibold leading-6 text-primary-200 hover:text-primary-300 transition-colors">
                View All Courses <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
