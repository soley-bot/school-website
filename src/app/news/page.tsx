const news = [
  {
    id: 1,
    title: 'Annual Science Fair Winners Announced',
    date: 'March 15, 2024',
    excerpt:
      'Congratulations to all participants in this year&apos;s Science Fair. The projects demonstrated exceptional creativity and scientific thinking.',
    category: 'Academic',
  },
  {
    id: 2,
    title: 'New Sports Complex Opening Soon',
    date: 'March 10, 2024',
    excerpt:
      'We&apos;re excited to announce that our new state-of-the-art sports complex will be opening next month.',
    category: 'Facilities',
  },
  {
    id: 3,
    title: 'Student Art Exhibition',
    date: 'March 5, 2024',
    excerpt:
      'Join us for the opening of our student art exhibition, showcasing incredible works from students across all grades.',
    category: 'Arts',
  },
  {
    id: 4,
    title: 'Parent-Teacher Conference Schedule',
    date: 'March 1, 2024',
    excerpt:
      'The spring parent-teacher conferences are scheduled for next week. Please check the schedule and book your appointments.',
    category: 'Events',
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              School News & Updates
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Stay informed about the latest happenings at our school
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <div className="grid gap-8 sm:grid-cols-2">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col items-start justify-between rounded-lg bg-white p-6 shadow-lg"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={item.date} className="text-gray-500">
                      {item.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-indigo-50 px-3 py-1.5 font-medium text-indigo-600">
                      {item.category}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{item.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 