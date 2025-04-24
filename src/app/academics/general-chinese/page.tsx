import { AcademicCapIcon, ClockIcon, UserGroupIcon, BookOpenIcon, GlobeAltIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import ProgramHero from '@/components/ui/ProgramHero';
import ProgramFeatures from '@/components/ui/ProgramFeatures';
import ProgramDetails from '@/components/ui/ProgramDetails';
import ProgramSchedule from '@/components/ui/ProgramSchedule';
import ProgramCTA from '@/components/ui/ProgramCTA';

export default function GeneralChinesePage() {
  const features = [
    {
      icon: <UserGroupIcon />,
      title: 'Small Class Sizes',
      description: 'Maximum 8 students per class for optimal learning and individual attention.'
    },
    {
      icon: <AcademicCapIcon />,
      title: 'Native Teachers',
      description: 'Learn from experienced native Chinese speakers with professional teaching qualifications.'
    },
    {
      icon: <ClockIcon />,
      title: 'Flexible Schedule',
      description: 'Choose from morning, evening, or weekend classes to suit your availability.'
    },
    {
      icon: <BookOpenIcon />,
      title: 'Character Mastery',
      description: 'Systematic approach to learning Chinese characters through writing and recognition.'
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon />,
      title: 'Pronunciation Focus',
      description: 'Special attention to tones and pronunciation with audio-visual learning tools.'
    },
    {
      icon: <GlobeAltIcon />,
      title: 'Cultural Integration',
      description: 'Learn about Chinese culture, customs, and traditions as part of the curriculum.'
    }
  ];

  const levels = [
    {
      title: 'Beginner Chinese',
      badge: 'HSK 1-2',
      duration: '12 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'None',
      description: 'Start your journey in Chinese language with our foundational course. Learn basic communication skills, essential characters, and proper pronunciation.',
      outcomes: [
        'Master Pinyin and basic tones',
        'Learn 150+ common characters',
        'Handle basic daily conversations',
        'Understand simple written texts',
        'Write basic Chinese characters',
        'Grasp fundamental grammar patterns'
      ]
    },
    {
      title: 'Intermediate Chinese',
      badge: 'HSK 3-4',
      duration: '12 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'HSK 2 or equivalent',
      description: 'Build on your foundation with more complex language skills. Expand your vocabulary and improve your fluency in various situations.',
      outcomes: [
        'Master 300+ new characters',
        'Handle everyday conversations fluently',
        'Read intermediate texts',
        'Write short essays and messages',
        'Understand Chinese media',
        'Express opinions and emotions'
      ]
    },
    {
      title: 'Advanced Chinese',
      badge: 'HSK 5-6',
      duration: '12 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'HSK 4 or equivalent',
      description: 'Achieve professional proficiency in Chinese. Focus on advanced grammar, business Chinese, and literary appreciation.',
      outcomes: [
        'Master 500+ advanced characters',
        'Engage in complex discussions',
        'Read newspapers and literature',
        'Write professional documents',
        'Understand various dialects',
        'Navigate business contexts'
      ]
    }
  ];

  const scheduleOptions = [
    {
      title: 'Morning Classes',
      time: '9:00 AM - 12:00 PM',
      days: 'Monday through Friday',
      features: [
        'Start your day with immersive learning',
        'Character writing workshops',
        'Conversation practice sessions',
        'Cultural activities included',
        'Online review materials'
      ]
    },
    {
      title: 'Evening Classes',
      time: '6:30 PM - 9:30 PM',
      days: 'Monday through Friday',
      features: [
        'Perfect for working professionals',
        'Focus on practical communication',
        'Interactive learning activities',
        'Homework support available',
        'Weekend cultural events'
      ]
    },
    {
      title: 'Weekend Program',
      time: '10:00 AM - 4:00 PM',
      days: 'Saturdays and Sundays',
      features: [
        'Intensive weekend learning',
        'Extended practice time',
        'Cultural immersion activities',
        'Group projects and presentations',
        'Online weekday support'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <ProgramHero
        title="General Chinese Program"
        description="Master Mandarin Chinese with our comprehensive program designed for effective communication and cultural understanding"
      />
      
      <ProgramFeatures features={features} />
      
      <ProgramDetails levels={levels} />
      
      <ProgramSchedule scheduleOptions={scheduleOptions} />
      
      <ProgramCTA
        title="Start Your Chinese Journey"
        description="Join our Chinese language program and open doors to new opportunities. Our experienced teachers are ready to guide you on your learning journey."
      />
    </main>
  );
} 