import { UserGroupIcon, FaceSmileIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function ChinesePrimaryPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Chinese for Primary Students
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A fun and interactive Chinese language program specially designed for young learners, making language learning an exciting adventure.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src="/images/chinese-kids.jpg"
              alt="Children learning Chinese"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Small Groups
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Small class sizes ensure each child receives personal attention and guidance.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <FaceSmileIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Fun Learning
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Interactive activities, games, and songs make learning Chinese enjoyable.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BookOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Age-Appropriate
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Curriculum specially designed for young learners with engaging materials.</p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="rounded-2xl bg-gray-50 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Program Details</h2>
            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Duration</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">10 weeks per term</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Class Size</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">4-6 students</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Age Group</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">6-12 years old</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Materials</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">All included</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Give Your Child the Gift of Language</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Contact us to schedule a trial class and see how your child can benefit from our program.
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