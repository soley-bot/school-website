import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export default function Section({ children, className = '', title, description }: SectionProps) {
  return (
    <section className={cn('py-12 md:py-16 lg:py-20', className)}>
      {(title || description) && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
} 