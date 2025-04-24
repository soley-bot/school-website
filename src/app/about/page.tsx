export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">About Our School</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Excellence in Education Since [Year]
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our school is committed to providing a comprehensive education that nurtures academic excellence,
              personal growth, and character development.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Our Mission
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    To provide an innovative and inspiring learning environment that empowers students
                    to achieve academic excellence and develop into responsible global citizens.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Our Vision
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    To be recognized as a leading educational institution that prepares students
                    for success in an ever-changing global society.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Our Values
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Excellence, Integrity, Innovation, Inclusivity, and Community are the core values
                    that guide our educational approach and school culture.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
} 