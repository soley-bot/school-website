import { AcademicCapIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function GeneralEnglishPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              General English Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Develop your English language skills with our comprehensive General English program. 
              Perfect for students looking to improve their everyday English communication abilities.
            </p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Program Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Program
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Small Class Sizes
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Maximum 12 students per class for personalized attention
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <AcademicCapIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Native Teachers
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Learn from experienced native English speakers
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Flexible Schedule
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Morning and evening classes available
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Program details section */}
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Program Details
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              <li className="flex gap-x-3">
                <span className="font-semibold text-gray-900">Duration:</span>
                12 weeks per level
              </li>
              <li className="flex gap-x-3">
                <span className="font-semibold text-gray-900">Class Size:</span>
                8-12 students
              </li>
              <li className="flex gap-x-3">
                <span className="font-semibold text-gray-900">Levels:</span>
                Beginner to Advanced
              </li>
              <li className="flex gap-x-3">
                <span className="font-semibold text-gray-900">Schedule:</span>
                Flexible timing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto mt-12 max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Start?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Contact us to schedule a placement test and begin your English learning journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
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
  );
} 