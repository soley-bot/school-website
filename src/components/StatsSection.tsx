import type { StatItem } from '@/types/content'
import StatsDisplay from '@/components/StatsDisplay'

interface StatsSectionProps {
  stats: StatItem[]
  title?: string
}

export default function StatsSection({ stats, title }: StatsSectionProps) {
  if (!stats || stats.length === 0) return null
  
  return (
    <section className="bg-white">
      <StatsDisplay stats={stats} title={title} />
    </section>
  )
} 