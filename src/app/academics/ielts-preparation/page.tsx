import { AcademicCapIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function IELTSPreparationPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            IELTS Preparation Program
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Comprehensive preparation for the International English Language Testing System (IELTS) exam, designed to help you achieve your target score.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <AcademicCapIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Expert Instructors
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Learn from certified IELTS instructors with proven track records of student success.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Practice Tests
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Regular mock exams and detailed feedback to track your progress and improve your performance.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BookOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Complete Coverage
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Comprehensive preparation for all four IELTS modules: Listening, Reading, Writing, and Speaking.</p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="rounded-2xl bg-gray-50 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Course Structure</h2>
            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Duration</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">8 weeks intensive</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Class Size</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">Maximum 10 students</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Prerequisites</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">Intermediate English level</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Materials</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">All included</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ready to Achieve Your Target Score?</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Contact us to schedule a placement test and start your IELTS preparation journey.
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 