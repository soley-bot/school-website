import { AcademicCapIcon, ClockIcon, UserGroupIcon, BookOpenIcon, PuzzlePieceIcon, HeartIcon } from '@heroicons/react/24/outline';
import ProgramHero from '@/components/ui/ProgramHero';
import ProgramFeatures from '@/components/ui/ProgramFeatures';
import ProgramDetails from '@/components/ui/ProgramDetails';
import ProgramSchedule from '@/components/ui/ProgramSchedule';
import ProgramCTA from '@/components/ui/ProgramCTA';

export default function ChinesePrimaryPage() {
  const features = [
    {
      icon: <UserGroupIcon />,
      title: 'Small Class Sizes',
      description: 'Maximum 6 students per class for personalized attention and active participation.'
    },
    {
      icon: <AcademicCapIcon />,
      title: 'Experienced Teachers',
      description: 'Qualified teachers specialized in teaching Chinese to young learners.'
    },
    {
      icon: <PuzzlePieceIcon />,
      title: 'Interactive Learning',
      description: 'Fun activities, games, and multimedia resources to keep children engaged.'
    },
    {
      icon: <BookOpenIcon />,
      title: 'Age-Appropriate Content',
      description: 'Curriculum designed specifically for primary school students aged 6-12.'
    },
    {
      icon: <HeartIcon />,
      title: 'Supportive Environment',
      description: 'Create a positive and encouraging atmosphere for young learners.'
    },
    {
      icon: <ClockIcon />,
      title: 'Flexible Schedule',
      description: 'After-school and weekend classes to fit your children\'s schedule.'
    }
  ];

  const levels = [
    {
      title: 'Foundation Level',
      badge: 'Ages 6-8',
      duration: '12 weeks',
      weeklyHours: '6 hours',
      prerequisites: 'None',
      description: 'Introduction to Chinese language through fun and interactive activities. Focus on basic vocabulary, simple conversations, and character recognition.',
      outcomes: [
        'Recognize and write basic Chinese characters',
        'Learn Pinyin pronunciation system',
        'Master basic greetings and phrases',
        'Count numbers and tell time',
        'Understand simple instructions',
        'Participate in basic conversations'
      ]
    },
    {
      title: 'Intermediate Level',
      badge: 'Ages 8-10',
      duration: '12 weeks',
      weeklyHours: '6 hours',
      prerequisites: 'Foundation Level or equivalent',
      description: 'Build on basic knowledge with more vocabulary, sentence patterns, and reading comprehension. Introduce cultural elements and stories.',
      outcomes: [
        'Write short paragraphs in Chinese',
        'Read simple Chinese stories',
        'Express likes and dislikes',
        'Describe daily activities',
        'Understand Chinese customs',
        'Participate in group activities'
      ]
    },
    {
      title: 'Advanced Level',
      badge: 'Ages 10-12',
      duration: '12 weeks',
      weeklyHours: '6 hours',
      prerequisites: 'Intermediate Level or equivalent',
      description: 'Develop more complex language skills, including reading comprehension, composition writing, and cultural understanding.',
      outcomes: [
        'Write compositions in Chinese',
        'Read age-appropriate books',
        'Give short presentations',
        'Understand Chinese culture',
        'Express opinions clearly',
        'Work on creative projects'
      ]
    }
  ];

  const scheduleOptions = [
    {
      title: 'After School Program',
      time: '3:30 PM - 5:30 PM',
      days: 'Monday and Wednesday',
      features: [
        'Convenient after-school timing',
        'Homework assistance included',
        'Snacks provided',
        'Interactive learning activities',
        'Progress reports for parents'
      ]
    },
    {
      title: 'Weekend Morning',
      time: '9:00 AM - 12:00 PM',
      days: 'Saturday',
      features: [
        'Intensive weekend learning',
        'Cultural activities included',
        'Group projects and games',
        'Regular parent updates',
        'Make-up classes available'
      ]
    },
    {
      title: 'Weekend Afternoon',
      time: '2:00 PM - 5:00 PM',
      days: 'Sunday',
      features: [
        'Relaxed learning environment',
        'Creative activities',
        'Reading and writing focus',
        'Monthly progress assessments',
        'Parent-teacher meetings'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <ProgramHero
        title="Chinese Primary Program"
        description="A fun and engaging Chinese language program specially designed for primary school students aged 6-12"
      />
      
      <ProgramFeatures features={features} />
      
      <ProgramDetails levels={levels} />
      
      <ProgramSchedule scheduleOptions={scheduleOptions} />
      
      <ProgramCTA
        title="Give Your Child the Gift of Language"
        description="Enroll your child in our Chinese Primary Program and watch them develop valuable language skills while having fun. Our experienced teachers create an engaging and supportive learning environment."
      />
    </main>
  );
} 