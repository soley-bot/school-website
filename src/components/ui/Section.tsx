interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export function Section({ children, className = '', title, description }: SectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      {(title || description) && (
        <div className="mx-auto max-w-2xl lg:text-center mb-12 sm:mb-16">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
} 