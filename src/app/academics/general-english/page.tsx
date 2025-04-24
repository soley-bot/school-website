import { AcademicCapIcon, ClockIcon, UserGroupIcon, BookOpenIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import ProgramHero from '@/components/ui/ProgramHero';
import ProgramFeatures from '@/components/ui/ProgramFeatures';
import ProgramDetails from '@/components/ui/ProgramDetails';
import ProgramSchedule from '@/components/ui/ProgramSchedule';
import ProgramCTA from '@/components/ui/ProgramCTA';

export default function GeneralEnglishPage() {
  const features = [
    {
      icon: <UserGroupIcon />,
      title: 'Small Class Sizes',
      description: 'Maximum 12 students per class for personalized attention and optimal learning environment.'
    },
    {
      icon: <AcademicCapIcon />,
      title: 'Native Teachers',
      description: 'Learn from experienced native English speakers with specialized training in language education.'
    },
    {
      icon: <ClockIcon />,
      title: 'Flexible Schedule',
      description: 'Morning and evening classes available to accommodate your busy lifestyle.'
    },
    {
      icon: <BookOpenIcon />,
      title: 'Comprehensive Curriculum',
      description: 'A balanced approach focusing on all language skills: speaking, listening, reading, and writing.'
    },
    {
      icon: <GlobeAltIcon />,
      title: 'Cultural Immersion',
      description: 'Learn more than just language—understand cultural contexts, idioms, and real-world usage.'
    },
    {
      icon: <ChartBarIcon />,
      title: 'Regular Assessment',
      description: 'Track your progress with continuous assessment and detailed feedback from instructors.'
    }
  ];

  const levels = [
    {
      title: 'Beginner Level',
      badge: 'A1-A2',
      duration: '12 weeks',
      weeklyHours: '15 hours',
      prerequisites: 'None',
      description: 'Perfect for students with little to no previous knowledge of English. This level establishes foundational language skills with a focus on basic communication needs.',
      outcomes: [
        'Understand and use familiar everyday expressions',
        'Introduce yourself and ask basic personal questions',
        'Interact in a simple way with native speakers',
        'Read and understand simple texts',
        'Write short, simple messages and notes',
        'Develop basic vocabulary for everyday situations'
      ]
    },
    {
      title: 'Intermediate Level',
      badge: 'B1-B2',
      duration: '12 weeks',
      weeklyHours: '15 hours',
      prerequisites: 'A2 level or placement test',
      description: 'Designed for students who can communicate in English with some confidence. This level expands language skills to handle a wider range of situations with increased fluency and accuracy.',
      outcomes: [
        'Understand main points of clear speech on familiar matters',
        'Engage in conversation on topics of personal interest',
        'Describe experiences, events, and ambitions',
        'Read articles and reports on contemporary issues',
        'Write clear, detailed text on various subjects',
        'Express opinions and explain advantages/disadvantages'
      ]
    },
    {
      title: 'Advanced Level',
      badge: 'C1-C2',
      duration: '12 weeks',
      weeklyHours: '15 hours',
      prerequisites: 'B2 level or placement test',
      description: 'For students approaching native-like proficiency who wish to refine their language skills. This level focuses on nuanced expression, academic and professional English, and cultural fluency.',
      outcomes: [
        'Understand extended, complex speech on various topics',
        'Express yourself fluently and spontaneously',
        'Use language flexibly for social, academic, and professional purposes',
        'Comprehend demanding, longer texts and recognize implicit meaning',
        'Produce clear, well-structured, detailed text on complex subjects',
        'Master idiomatic expressions and colloquialisms'
      ]
    }
  ];

  const scheduleOptions = [
    {
      title: 'Morning Classes',
      time: '9:00 AM - 12:00 PM',
      days: 'Monday through Friday',
      features: [
        'Perfect for early risers',
        'Energetic learning environment',
        'Free afternoons for study or work',
        'Coffee and light refreshments provided',
        'Access to afternoon study groups'
      ]
    },
    {
      title: 'Evening Classes',
      time: '6:00 PM - 9:00 PM',
      days: 'Monday through Friday',
      features: [
        'Ideal for working professionals',
        'Relaxed learning atmosphere',
        'Keep your daytime schedule open',
        'Light dinner options available',
        'Weekend conversation clubs included'
      ]
    },
    {
      title: 'Weekend Intensive',
      time: '10:00 AM - 4:00 PM',
      days: 'Saturdays and Sundays',
      features: [
        'Concentrated learning experience',
        'Perfect for busy weekday schedules',
        'Lunch and refreshments included',
        'Extra conversation practice sessions',
        'Online support throughout the week'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <ProgramHero
        title="General English Program"
        description="Master the world's most widely spoken language with our comprehensive General English curriculum designed for real-world communication"
      />
      
      <ProgramFeatures features={features} />
      
      <ProgramDetails levels={levels} />
      
      <ProgramSchedule scheduleOptions={scheduleOptions} />
      
      <ProgramCTA />
    </main>
  );
} 