import React from 'react'
import Image from 'next/image'
import ProgramHero from '@/components/ui/ProgramHero'
import ProgramFeatures from '@/components/ui/ProgramFeatures'
import ProgramSchedule from '@/components/ui/ProgramSchedule'
import ProgramDetails from '@/components/ui/ProgramDetails'
import ProgramCTA from '@/components/ui/ProgramCTA'

interface ProgramConfig {
  name: string;
  description: string;
  theme: 'red' | 'blue';
  introduction: {
    text: string;
    image: string;
    whyChooseTitle: string;
    whyChooseText: string[];
  };
  schedule: {
    times: {
      morning: string[];
      afternoon: string[];
      evening: string[];
    };
    duration: {
      weekday: {
        label: string;
        duration: string;
      };
      weekend: {
        label: string;
        duration: string;
      };
    };
  };
  tuition: Array<{
    price: number;
    levels: string[];
  }>;
  features: Array<{
    icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book';
    title: string;
    description: string;
  }>;
  courseMaterials: Array<{
    title: string;
    description: string;
    image: string;
    level: string;
  }>;
}

const programLevels = [
  {
    title: 'Foundation Level',
    badge: 'A1-A2',
    duration: '2.5 months',
    weeklyHours: '6 hours',
    prerequisites: 'No prior knowledge required',
    description: 'Build a strong foundation in English with essential vocabulary, basic grammar, and everyday communication skills.',
    outcomes: [
      'Master basic English pronunciation',
      'Hold simple conversations',
      'Understand basic grammar structures',
      'Read and write simple texts',
      'Navigate daily life situations',
      'Build essential vocabulary'
    ]
  },
  {
    title: 'Intermediate Level',
    badge: 'B1-B2',
    duration: '2.5 months',
    weeklyHours: '6 hours',
    prerequisites: 'Completion of Foundation Level or equivalent',
    description: 'Develop more complex language skills and fluency in various situations.',
    outcomes: [
      'Engage in detailed discussions',
      'Write clear, detailed texts',
      'Understand complex grammar',
      'Read intermediate literature',
      'Express opinions confidently',
      'Handle business situations'
    ]
  },
  {
    title: 'Advanced Level',
    badge: 'C1-C2',
    duration: '2.5 months',
    weeklyHours: '6 hours',
    prerequisites: 'Completion of Intermediate Level or equivalent',
    description: 'Master advanced English skills for academic and professional contexts.',
    outcomes: [
      'Communicate with native-like fluency',
      'Write academic papers',
      'Understand subtle meanings',
      'Give professional presentations',
      'Handle complex negotiations',
      'Master idiomatic expressions'
    ]
  }
];

// Program-specific configuration
const programConfig: ProgramConfig = {
  name: 'General English Program',
  description: 'Comprehensive English language courses for all proficiency levels',
  theme: 'blue',
  introduction: {
    text: "Whether you're learning English for academic purposes, professional development, or personal growth, our adult programs are tailored to help you achieve your specific language goals.",
    image: '/images/chinese-class.jpg',
    whyChooseTitle: 'Achieve Your Language Goals',
    whyChooseText: [
      "Whether you're learning English for academic purposes, professional development, or personal growth, our adult programs are tailored to help you achieve your specific language goals.",
      "With a focus on practical communication and real-world applications, you'll develop the confidence to use English effectively in any situation."
    ]
  },
  schedule: {
    times: {
      morning: ['8:00-9:30 A.M.', '9:30-11:00 A.M.'],
      afternoon: ['1:30-3:00 P.M.', '3:00-4:30 P.M.'],
      evening: ['5:15-6:45 P.M.', '6:45-8:15 P.M.']
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
    { price: 170, levels: ['Introductory Course'] },
    { price: 180, levels: ['Level 1', 'Level 2'] },
    { price: 195, levels: ['Level 3', 'Level 4'] },
    { price: 210, levels: ['Level 5', 'Level 6'] },
    { price: 225, levels: ['Level 7', '8', '9', '10'] },
    { price: 240, levels: ['Level 11', '12', '13', '14', 'IELTS Course'] }
  ],
  features: [
    {
      icon: 'chat',
      title: 'Conversation Focus',
      description: 'Emphasis on practical communication skills for real-world situations.'
    },
    {
      icon: 'academic',
      title: 'Expert Teachers',
      description: 'Learn from experienced native English speakers.'
    },
    {
      icon: 'users',
      title: 'Small Groups',
      description: 'Maximum 10 students per class for optimal learning.'
    },
    {
      icon: 'clock',
      title: 'Flexible Schedule',
      description: 'Morning, afternoon, and evening classes available.'
    },
    {
      icon: 'book',
      title: 'Business English',
      description: 'Special modules for professional and business communication.'
    },
    {
      icon: 'globe',
      title: 'Cultural Exchange',
      description: 'Regular events and activities with native speakers.'
    }
  ],
  courseMaterials: [
    {
      title: 'English File (4th Edition)',
      description: 'Comprehensive textbook series covering all aspects of English language learning with modern, engaging content.',
      image: '/images/course-materials/english-file.jpg',
      level: 'All Levels'
    },
    {
      title: 'Business English Handbook',
      description: 'Essential resource for professional English communication, including business vocabulary and formal writing.',
      image: '/images/course-materials/business-english.jpg',
      level: 'Intermediate & Advanced'
    },
    {
      title: 'Academic Writing Guide',
      description: 'Detailed guide for academic writing, covering essay structure, research papers, and academic vocabulary.',
      image: '/images/course-materials/academic-writing.jpg',
      level: 'Advanced'
    }
  ]
};

export default function GeneralEnglishPage() {
  const { 
    name, 
    description, 
    theme, 
    introduction, 
    schedule, 
    tuition, 
    features,
    courseMaterials
  } = programConfig;

  return (
    <div className="min-h-screen bg-white">
      <ProgramHero 
        title={name}
        description={description}
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
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={introduction.image}
                alt={`${name} class`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{introduction.whyChooseTitle}</h3>
              <div className="space-y-4">
                {introduction.whyChooseText.map((text, index) => (
                  <p key={index} className="text-gray-600">{text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <ProgramFeatures features={features} theme={theme} />

          {/* Program Details Section */}
          <ProgramDetails levels={programLevels} />

          {/* Course Materials Section */}
          <section className="my-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Course Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseMaterials.map((material, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={material.image}
                      alt={material.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{material.title}</h4>
                    <p className="text-sm text-blue-600 mb-3">{material.level}</p>
                    <p className="text-gray-600">{material.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule Section */}
          <ProgramSchedule
            isAdult
            scheduleTime={schedule.times}
            tuitionFees={tuition}
            programType="english"
          />
        </div>
      </main>

      {/* CTA Section */}
      <ProgramCTA
        title="Ready to Improve Your English?"
        description="Join our next class intake and start your journey to English fluency. Our expert teachers are here to guide you every step of the way."
      />
    </div>
  );
} 