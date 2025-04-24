interface Program {
  name: string
  description: string
  grades: string
  features: string[]
}

const programs: Program[] = [
  {
    name: 'Elementary Education',
    description: 'A strong foundation in core subjects with emphasis on creativity and critical thinking.',
    grades: 'Grades K-5',
    features: [
      'Small class sizes',
      'Experienced teachers',
      'Hands-on learning',
      'Regular progress assessments',
    ],
  },
  {
    name: 'Middle School',
    description: 'Comprehensive curriculum preparing students for high school success.',
    grades: 'Grades 6-8',
    features: [
      'Advanced math and science',
      'Language arts and literature',
      'Social studies and history',
      'Arts and music programs',
    ],
  },
  {
    name: 'High School',
    description: 'College preparatory program with diverse academic and extracurricular opportunities.',
    grades: 'Grades 9-12',
    features: [
      'AP and Honors courses',
      'College counseling',
      'STEM programs',
      'Athletics and clubs',
    ],
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Academic Programs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Education for Every Student
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our academic programs are designed to challenge and inspire students at every level,
              preparing them for success in college and beyond.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {programs.map((program) => (
                <div key={program.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {program.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{program.description}</p>
                    <p className="mt-4 font-semibold">{program.grades}</p>
                    <ul className="mt-4 space-y-2">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <svg
                            className="h-6 w-5 flex-none text-indigo-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
} 