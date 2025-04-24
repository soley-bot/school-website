import { AcademicCapIcon, ClockIcon, UserGroupIcon, BookOpenIcon, ChartBarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import ProgramHero from '@/components/ui/ProgramHero';
import ProgramFeatures from '@/components/ui/ProgramFeatures';
import ProgramDetails from '@/components/ui/ProgramDetails';
import ProgramSchedule from '@/components/ui/ProgramSchedule';
import ProgramCTA from '@/components/ui/ProgramCTA';

export default function IELTSPreparationPage() {
  const features = [
    {
      icon: <UserGroupIcon />,
      title: 'Small Class Sizes',
      description: 'Maximum 10 students per class for intensive IELTS preparation and personalized feedback.'
    },
    {
      icon: <AcademicCapIcon />,
      title: 'Expert IELTS Instructors',
      description: 'Learn from certified IELTS examiners and experienced test preparation specialists.'
    },
    {
      icon: <ClockIcon />,
      title: 'Flexible Schedule',
      description: 'Choose from morning, evening, or weekend classes to fit your study plan.'
    },
    {
      icon: <BookOpenIcon />,
      title: 'Complete Test Coverage',
      description: 'Comprehensive preparation for all four IELTS modules: Listening, Reading, Writing, and Speaking.'
    },
    {
      icon: <ChartBarIcon />,
      title: 'Practice Tests',
      description: 'Regular mock tests and detailed performance analysis to track your progress.'
    },
    {
      icon: <TrophyIcon />,
      title: 'Success Guarantee',
      description: 'Our proven methodology helps students achieve their target IELTS band scores.'
    }
  ];

  const levels = [
    {
      title: 'Foundation IELTS',
      badge: '4.0-5.5',
      duration: '8 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'Basic English proficiency',
      description: 'Perfect for students aiming to achieve IELTS bands 5.0-6.0. This course focuses on building fundamental test-taking strategies and improving basic language skills.',
      outcomes: [
        'Understand IELTS test format and requirements',
        'Develop basic test-taking strategies',
        'Improve essential grammar and vocabulary',
        'Practice basic writing tasks for IELTS',
        'Build confidence in speaking',
        'Learn time management skills'
      ]
    },
    {
      title: 'Intermediate IELTS',
      badge: '5.5-7.0',
      duration: '8 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'IELTS 5.0 or equivalent',
      description: 'Designed for students targeting bands 6.0-7.0. This course enhances academic language skills and develops advanced test strategies.',
      outcomes: [
        'Master complex IELTS task types',
        'Enhance academic vocabulary',
        'Improve writing structure and coherence',
        'Develop critical thinking skills',
        'Practice advanced speaking strategies',
        'Learn detailed performance analysis'
      ]
    },
    {
      title: 'Advanced IELTS',
      badge: '7.0-9.0',
      duration: '8 weeks',
      weeklyHours: '12 hours',
      prerequisites: 'IELTS 6.5 or equivalent',
      description: 'For students aiming for bands 7.0 and above. This intensive course focuses on achieving excellence in all test components.',
      outcomes: [
        'Perfect advanced writing techniques',
        'Master complex academic vocabulary',
        'Develop sophisticated speaking skills',
        'Excel in high-level reading comprehension',
        'Achieve near-perfect listening scores',
        'Learn examiner-level strategies'
      ]
    }
  ];

  const scheduleOptions = [
    {
      title: 'Morning Intensive',
      time: '8:30 AM - 11:30 AM',
      days: 'Monday through Friday',
      features: [
        'Start your day with focused study',
        'Complete mock tests and analysis',
        'One-on-one feedback sessions',
        'Additional speaking practice',
        'Access to online resources'
      ]
    },
    {
      title: 'Evening Program',
      time: '6:30 PM - 9:30 PM',
      days: 'Monday through Friday',
      features: [
        'Perfect for working professionals',
        'Intensive practice sessions',
        'Regular progress assessments',
        'Weekend mock tests included',
        'Flexible attendance options'
      ]
    },
    {
      title: 'Weekend Course',
      time: '9:00 AM - 3:00 PM',
      days: 'Saturdays and Sundays',
      features: [
        'Intensive weekend preparation',
        'Full mock tests each weekend',
        'Comprehensive feedback sessions',
        'Small group tutorials',
        'Online weekday support'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <ProgramHero
        title="IELTS Preparation Program"
        description="Achieve your target IELTS score with our comprehensive preparation program designed by expert instructors and certified examiners"
      />
      
      <ProgramFeatures features={features} />
      
      <ProgramDetails levels={levels} />
      
      <ProgramSchedule scheduleOptions={scheduleOptions} />
      
      <ProgramCTA
        title="Ready to Achieve Your Target Score?"
        description="Join our IELTS preparation program and get expert guidance to reach your desired band score. Our experienced instructors are here to help you succeed."
      />
    </main>
  );
} 