import React from 'react'
import Image from 'next/image'
import { AcademicCapIcon, ClockIcon, UserGroupIcon, BookOpenIcon, PuzzlePieceIcon, ChatBubbleLeftRightIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import ProgramHero from '@/components/ui/ProgramHero';
import ProgramFeatures from '@/components/ui/ProgramFeatures';
import ProgramDetails from '@/components/ui/ProgramDetails';
import ProgramSchedule from '@/components/ui/ProgramSchedule';
import ProgramCTA from '@/components/ui/ProgramCTA';

// Program-specific configuration
const programConfig = {
  name: 'Chinese for Primary Students (CPS)',
  description: 'A specialized Chinese language program designed specifically for primary school students',
  heroImage: '/images/chinese-kids.jpg',
  theme: 'red' as const,
  introduction: {
    text: 'Our Chinese for Primary Students program offers a structured and engaging learning environment that helps young learners develop strong foundations in Mandarin Chinese through interactive methods and age-appropriate materials.',
    image: '/images/chinese-class.jpg',
    whyChooseTitle: 'Why Learn Chinese Early?',
    whyChooseText: [
      'Children have a natural ability to absorb languages, making early learning the perfect time to start with Chinese. Our program takes advantage of this critical period, using age-appropriate methods that make learning both effective and enjoyable.',
      'Through a combination of interactive activities, multimedia resources, and cultural experiences, students develop a strong foundation in Mandarin Chinese while fostering a lifelong love for learning.'
    ]
  },
  schedule: {
    times: {
      morning: ['8:00-9:30 A.M.', '9:30-11:00 A.M.'],
      afternoon: ['1:30-3:00 P.M.', '3:00-4:30 P.M.'],
      evening: ['5:15-6:45 P.M.'],
      weekend: {
        saturday: '8:30-11:30 A.M.',
        sunday: '8:30-11:30 A.M.'
      }
    },
    duration: {
      weekday: {
        label: 'Monday - Friday',
        duration: '2.5 Months'
      },
      weekend: {
        label: 'Saturday & Sunday',
        duration: '10 Weeks'
      }
    }
  },
  tuition: [
    { price: 165, levels: ['Level 1', 'Level 2', 'Level 3'] },
    { price: 185, levels: ['Level 4', 'Level 5', 'Level 6'] },
    { price: 205, levels: ['Level 7', 'Level 8A', 'Level 8B'] },
    { price: 225, levels: ['Level 9', 'Level 10A', 'Level 10B'] },
    { price: 245, levels: ['Level 11', 'Level 12A', 'Level 12B'] },
    { price: 255, levels: ['Level 13', 'Level 14A', 'Level 14B'] },
  ],
  features: [
    {
      icon: 'puzzle' as const,
      title: 'Interactive Learning',
      description: 'Engaging activities and games that make learning Chinese fun and natural for young learners.'
    },
    {
      icon: 'globe' as const,
      title: 'Cultural Immersion',
      description: 'Introduction to Chinese culture through stories, songs, and traditional activities.'
    },
    {
      icon: 'users' as const,
      title: 'Personalized Attention',
      description: 'Small class sizes ensure each student receives individual guidance and support.'
    },
    {
      icon: 'academic' as const,
      title: 'Academic Excellence',
      description: 'Structured curriculum aligned with international Chinese language standards.'
    },
    {
      icon: 'chat' as const,
      title: 'Language Practice',
      description: 'Regular conversation practice and language immersion activities.'
    },
    {
      icon: 'clock' as const,
      title: 'Flexible Schedule',
      description: 'Multiple time slots available to accommodate different schedules.'
    }
  ]
}

const learningMilestones = [
  {
    level: 'Foundation',
    skills: [
      'Basic conversation skills',
      'Essential characters recognition',
      'Simple sentence structures',
      'Numbers and counting',
      'Daily expressions'
    ]
  },
  {
    level: 'Intermediate',
    skills: [
      'Extended vocabulary',
      'Character writing',
      'Complex sentences',
      'Reading comprehension',
      'Cultural understanding'
    ]
  },
  {
    level: 'Advanced',
    skills: [
      'Fluent conversation',
      'Advanced character writing',
      'Essay composition',
      'Literature appreciation',
      'Cultural projects'
    ]
  }
]

export default function ChinesePrimaryPage() {
  const { name, description, heroImage, theme, introduction, schedule, tuition, features } = programConfig

  return (
    <div className="min-h-screen bg-white">
      <ProgramHero 
        title={name}
        description={description}
        theme={theme}
      />

      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Introduction Section */}
          <div className="text-center mb-12">
            <p className="mt-4 text-lg text-gray-600">
              {introduction.text}
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{introduction.whyChooseTitle}</h3>
              <div className="space-y-4">
                {introduction.whyChooseText.map((text, index) => (
                  <p key={index} className="text-gray-600">{text}</p>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={introduction.image}
                alt={`${name} class`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Features Section */}
          <ProgramFeatures features={features} theme={theme} />

          <section className="my-16">
            <h3 className="text-2xl font-bold text-red-600 text-center mb-8">Learning Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningMilestones.map((milestone, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-xl font-semibold text-red-600 mb-4">{milestone.level}</h4>
                  <ul className="space-y-2">
                    {milestone.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule Section */}
          <ProgramSchedule
            scheduleTime={schedule.times}
            tuitionFees={tuition}
            programType="chinese"
          />
          
          {/* Duration Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Duration</h3>
            <div className="inline-flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900">{schedule.duration.weekday.label}</p>
                <p className="text-gray-600">{schedule.duration.weekday.duration}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900">{schedule.duration.weekend.label}</p>
                <p className="text-gray-600">{schedule.duration.weekend.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <ProgramCTA
          title="Ready to Start Your Child's Chinese Learning Journey?"
          description="Join our next class intake and begin your child's path to Chinese language mastery. Our team is ready to help them achieve their language goals."
          theme={theme}
        />
      </main>
    </div>
  );
} 