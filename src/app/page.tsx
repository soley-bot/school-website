import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'
import { CalendarIcon, AcademicCapIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const quickLinks = [
  { name: 'Undergraduate Programs', href: '/academics/undergraduate', icon: AcademicCapIcon },
  { name: 'Admissions', href: '/admissions', icon: UserGroupIcon },
  { name: 'Student Life', href: '/student-life', icon: CalendarIcon },
  { name: 'Library Resources', href: '/library', icon: BookOpenIcon },
]

const latestNews = [
  {
    id: 1,
    title: 'Annual Science Fair Winners Announced',
    description: 'Congratulations to all participants in this year\'s Science Fair. The projects demonstrated exceptional creativity and scientific thinking.',
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: 'Academic',
    imageUrl: '/images/classroomplaceholder.jpg'
  },
  {
    id: 2,
    title: 'New Sports Complex Opening Soon',
    description: 'We\'re excited to announce that our new state-of-the-art sports complex will be opening next month.',
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    category: 'Facilities',
    imageUrl: '/images/schoolbuildingplaceholder.jpg'
  },
  {
    id: 3,
    title: 'Student Art Exhibition',
    description: 'Join us for the opening of our student art exhibition, showcasing incredible works from students across all grades.',
    date: 'Mar 5, 2024',
    datetime: '2024-03-05',
    category: 'Arts',
    imageUrl: '/images/studentsplaceholder.jpg'
  },
]

const academicPrograms = [
  {
    name: 'Science & Technology',
    description: 'Cutting-edge programs in Computer Science, Engineering, and Natural Sciences.',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    name: 'Business & Economics',
    description: 'Comprehensive business education with focus on global markets and entrepreneurship.',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
  {
    name: 'Arts & Humanities',
    description: 'Rich programs in Literature, Fine Arts, and Cultural Studies.',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white">
        <Container>
          <div className="mx-auto max-w-7xl py-20 lg:py-32 lg:grid lg:grid-cols-5 lg:gap-x-16">
            <div className="relative px-6 lg:px-0 lg:pt-8 lg:col-span-2">
              <div className="mx-auto">
                <div>
                  <div className="mb-8">
                    <a href="#" className="inline-flex">
                      <span className="rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                        Latest News
                      </span>
                    </a>
                  </div>
                  <h1 className="text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl mb-8">
                    Empowering Minds, Shaping Futures
                  </h1>
                  <p className="text-xl leading-8 text-gray-600 mb-12">
                    Welcome to our school where we nurture curiosity, foster creativity, and build tomorrow&apos;s leaders through excellence in education.
                  </p>
                  <div className="flex items-center gap-x-8">
                    <Link
                      href="/admissions"
                      className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Apply Now
                    </Link>
                    <Link href="/about" className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-600">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-3 px-6 lg:px-0">
              <div className="shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-white">
                  <div className="relative">
                    <div>
                      <div className="overflow-hidden">
                        <ImagePlaceholder
                          title="School Campus"
                          subtitle="Modern facilities and beautiful grounds"
                          aspectRatio="video"
                          className="shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick Links Section */}
      <Section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-primary-600">
                    <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      {link.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Academic Programs Section */}
      <Section
        title="Academic Excellence"
        description="Discover our comprehensive range of academic programs designed to nurture talent and inspire innovation."
        className="bg-gray-50"
      >
        <Container>
          <div className="mx-auto mt-20 max-w-2xl lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {academicPrograms.map((program) => (
                <div key={program.name} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                      <program.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    {program.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{program.description}</p>
                    <p className="mt-6">
                      <Link href="/academics" className="text-sm font-semibold text-primary-600 hover:text-primary-500">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Latest News Section */}
      <Section
        title="Latest News & Events"
        description="Stay updated with the latest happenings at our school"
        className="bg-white"
      >
        <Container>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {latestNews.map((article) => (
              <article key={article.id} className="flex flex-col items-start">
                <div className="relative w-full">
                  <div className="aspect-video w-full rounded-2xl bg-gray-100 object-cover">
                    <ImagePlaceholder
                      title={article.title}
                      subtitle={article.category}
                      aspectRatio="video"
                      customImage={article.imageUrl}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="flex items-center gap-x-4 text-sm">
                      <time dateTime={article.datetime} className="text-white">
                        {article.date}
                      </time>
                      <span className="relative z-10 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-6 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href="#">
                      <span className="absolute inset-0" />
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base leading-7 text-gray-600">{article.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/news"
              className="rounded-md bg-white px-5 py-3 text-base font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-600 hover:bg-primary-50"
            >
              View All News
            </Link>
          </div>
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section className="bg-primary-600">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Take the first step towards an exceptional education. Apply now or contact us to learn more about our programs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-8">
              <Link
                href="/admissions"
                className="rounded-md bg-white px-5 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-white hover:text-primary-100"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
