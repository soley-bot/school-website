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
  heroImage: string;
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
      weekend: {
        saturday: string;
        sunday: string;
      };
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
    icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock';
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
    title: 'Beginner Level',
    badge: 'A1-A2',
    duration: '3 months',
    weeklyHours: '6 hours',
    prerequisites: 'No prior knowledge required',
    description: 'Start your Chinese learning journey with essential vocabulary, basic grammar, and everyday conversations. Perfect for absolute beginners.',
    outcomes: [
      'Master pinyin and basic character writing',
      'Hold simple conversations',
      'Understand basic grammar structures',
      'Read and write common characters',
      'Navigate daily life situations',
      'Develop proper pronunciation'
    ]
  },
  {
    title: 'Intermediate Level',
    badge: 'B1-B2',
    duration: '3 months',
    weeklyHours: '6 hours',
    prerequisites: 'Completion of Beginner Level or equivalent',
    description: 'Build upon your foundation with more complex grammar, expanded vocabulary, and enhanced conversation skills.',
    outcomes: [
      'Engage in extended conversations',
      'Read intermediate texts',
      'Write short essays',
      'Understand native speakers',
      'Express opinions clearly',
      'Handle business situations'
    ]
  },
  {
    title: 'Advanced Level',
    badge: 'C1-C2',
    duration: '3 months',
    weeklyHours: '6 hours',
    prerequisites: 'Completion of Intermediate Level or equivalent',
    description: 'Perfect your Chinese language skills with advanced topics, business Chinese, and cultural understanding.',
    outcomes: [
      'Discuss complex topics fluently',
      'Read advanced literature',
      'Write academic papers',
      'Understand cultural nuances',
      'Give presentations',
      'Handle professional situations'
    ]
  }
];

// Program-specific configuration
const programConfig: ProgramConfig = {
  name: 'General Chinese Program',
  description: 'A comprehensive Chinese language program for students of all levels',
  heroImage: '/images/classroom.jpg',
  theme: 'red',
  introduction: {
    text: "Our General Chinese Program is designed to help students develop strong language skills through a balanced approach to reading, writing, listening, and speaking. Whether you're a beginner or looking to advance your Chinese proficiency, our program offers the perfect learning environment.",
    image: '/images/chinese-class.jpg',
    whyChooseTitle: 'Why Choose Our General Chinese Program?',
    whyChooseText: [
      'Our program caters to learners of all levels, from complete beginners to advanced students. We use a communicative approach that emphasizes practical language skills and real-world applications.',
      "With experienced native speakers as instructors and small class sizes, you'll receive personalized attention and plenty of opportunities to practice your Chinese language skills."
    ]
  },
  schedule: {
    times: {
      morning: ['8:00-9:30 A.M.', '9:30-11:00 A.M.'],
      afternoon: ['1:30-3:00 P.M.', '3:00-4:30 P.M.'],
      evening: ['5:15-6:45 P.M.', '7:00-8:30 P.M.'],
      weekend: {
        saturday: '8:30-11:30 A.M.',
        sunday: '8:30-11:30 A.M.'
      }
    },
    duration: {
      weekday: {
        label: 'Monday - Friday',
        duration: '3 Months'
      },
      weekend: {
        label: 'Saturday & Sunday',
        duration: '12 Weeks'
      }
    }
  },
  tuition: [
    { price: 175, levels: ['Beginner A1', 'Beginner A2'] },
    { price: 195, levels: ['Elementary B1', 'Elementary B2'] },
    { price: 215, levels: ['Intermediate C1', 'Intermediate C2'] },
    { price: 235, levels: ['Upper Intermediate D1', 'Upper Intermediate D2'] },
    { price: 255, levels: ['Advanced E1', 'Advanced E2'] },
    { price: 275, levels: ['Mastery F1', 'Mastery F2'] }
  ],
  features: [
    {
      icon: 'academic',
      title: 'Comprehensive Learning',
      description: 'Balanced focus on reading, writing, listening, and speaking skills.'
    },
    {
      icon: 'users',
      title: 'Small Class Sizes',
      description: 'Maximum 8 students per class for optimal learning experience.'
    },
    {
      icon: 'chat',
      title: 'Conversation Practice',
      description: 'Regular speaking exercises and language exchange opportunities.'
    },
    {
      icon: 'puzzle',
      title: 'Interactive Methods',
      description: 'Engaging activities and modern learning materials.'
    },
    {
      icon: 'globe',
      title: 'Cultural Integration',
      description: 'Learn about Chinese culture and customs while mastering the language.'
    },
    {
      icon: 'clock',
      title: 'Flexible Schedule',
      description: 'Multiple class times to fit your busy schedule.'
    }
  ],
  courseMaterials: [
    {
      title: 'HSK Standard Course 1',
      description: 'Comprehensive textbook for beginners, covering basic vocabulary, grammar, and everyday conversations. Includes workbook and audio materials.',
      image: '/images/course-materials/hsk-standard-1.jpg',
      level: 'Beginner A1-A2'
    },
    {
      title: 'Chinese Character Workbook',
      description: 'Practice writing Chinese characters with this structured workbook. Features stroke order guides and plenty of practice space.',
      image: '/images/course-materials/character-workbook.jpg',
      level: 'All Levels'
    },
    {
      title: 'Chinese Grammar in Use',
      description: 'A comprehensive guide to Chinese grammar with practical examples and exercises.',
      image: '/images/course-materials/grammar-guide.jpg',
      level: 'Intermediate B1-B2'
    }
  ]
};

export default function GeneralChinesePage() {
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
        theme={theme}
      />

      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Introduction Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Program Overview</h2>
            <p className="mt-4 text-lg text-gray-600">
              {introduction.text}
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-6">{introduction.whyChooseTitle}</h3>
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

          {/* Program Details Section */}
          <ProgramDetails levels={programLevels} theme={theme} />

          {/* Course Materials Section */}
          <section className="my-16">
            <h3 className="text-2xl font-bold text-red-600 text-center mb-8">Course Materials</h3>
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
                    <p className="text-sm text-red-600 mb-3">{material.level}</p>
                    <p className="text-gray-600">{material.description}</p>
                  </div>
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
        </div>
      </main>

      {/* CTA Section */}
      <ProgramCTA
        title="Ready to Start Your Chinese Learning Journey?"
        description="Join our next class intake and begin your path to Chinese language mastery. Our team is ready to help you achieve your language goals."
        theme={theme}
      />
    </div>
  );
} 