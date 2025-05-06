import type { StatItem } from '@/types/content'

interface StatsDisplayProps {
  stats: StatItem[]
  className?: string
  title?: string
}

export default function StatsDisplay({ stats, className = '', title }: StatsDisplayProps) {
  return (
    <div className={`bg-gray-50 py-12 border-t border-gray-100 shadow-sm ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <div className="text-[#2596be] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">{item.stat}</div>
              <div className="text-sm text-gray-500">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 