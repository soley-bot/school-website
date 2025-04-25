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
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      sectionTitle: 'text-indigo-800'
    },
    red: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      sectionTitle: 'text-red-600'
    },
  }

  const colors = themeColors[theme]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className={`${colors.sectionTitle} font-semibold mb-2`}>Program Features</h3>
          <h2 className="text-3xl font-bold">Why Choose Our Program</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon]
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${colors.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                </div>
                <h3 className={`text-lg font-semibold ${colors.titleColor} mb-2`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 