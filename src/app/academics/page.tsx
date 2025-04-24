interface Program {
  name: string
  description: string
  href: string
  features: string[]
}

const programs: Program[] = [
  {
    name: 'General English Program',
    description: 'Comprehensive English language course designed for learners at all levels, from beginners to advanced students.',
    href: '/academics/general-english',
    features: [
      'Small class sizes for personalized attention',
      'Native English-speaking teachers',
      'Focus on all language skills',
      'Regular progress assessments',
    ],
  },
  {
    name: 'IELTS Preparation',
    description: 'Specialized program to help students achieve their target scores in the IELTS examination.',
    href: '/academics/ielts-preparation',
    features: [
      'Expert IELTS instructors',
      'Practice tests and feedback',
      'Comprehensive test strategies',
      'Small group tutorials',
    ],
  },
  {
    name: 'General Chinese Program',
    description: 'Learn Mandarin Chinese from basics to advanced levels with our comprehensive language program.',
    href: '/academics/general-chinese',
    features: [
      'Native Chinese teachers',
      'Character writing workshops',
      'Cultural immersion activities',
      'Flexible class schedules',
    ],
  },
  {
    name: 'Chinese for Primary Students',
    description: 'Fun and interactive Chinese language program specially designed for young learners aged 6-12.',
    href: '/academics/chinese-primary',
    features: [
      'Age-appropriate curriculum',
      'Interactive learning activities',
      'Small class sizes',
      'Regular progress reports',
    ],
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-r from-[#2596be] to-[#1a7290] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Language Programs</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our comprehensive language programs designed to help you achieve your learning goals
          </p>
        </div>
      </section>

      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <a
                key={program.name}
                href={program.href}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{program.name}</h2>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-[#2596be] mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 