import React from 'react'
import {
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  GlobeAltIcon,
  PuzzlePieceIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'

interface Feature {
  title: string
  description: string
  icon: keyof typeof iconMap
}

interface ProgramFeaturesProps {
  features: Feature[]
  theme?: 'blue' | 'red'
}

const iconMap = {
  academic: AcademicCapIcon,
  users: UserGroupIcon,
  clock: ClockIcon,
  chat: ChatBubbleBottomCenterTextIcon,
  book: BookOpenIcon,
  globe: GlobeAltIcon,
  puzzle: PuzzlePieceIcon,
  trophy: TrophyIcon,
}

export default function ProgramFeatures({ features, theme = 'blue' }: ProgramFeaturesProps) {
  const themeColors = {
    blue: {
      iconBg: 'bg-brand-light',
      iconColor: 'text-brand-primary',
      titleColor: 'text-brand-dark',
      sectionTitle: 'text-brand-secondary'
    },
    red: {
      iconBg: 'bg-accent-light',
      iconColor: 'text-accent-primary',
      titleColor: 'text-accent-dark',
      sectionTitle: 'text-accent-secondary'
    },
  }

  const colors = themeColors[theme]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className={`${colors.sectionTitle} font-semibold mb-2 uppercase tracking-wide`}>
            Program Features
          </h3>
          <h2 className="text-3xl font-bold">Why Choose Our Program</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group card p-6 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${colors.iconBg} rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110`}>
                <span className={`${colors.iconColor}`}>
                  {feature.icon}
                </span>
              </div>
              <h3 className={`${colors.titleColor} text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors duration-200`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}