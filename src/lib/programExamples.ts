export const exampleProgramLevel = {
  title: 'Intermediate Level',
  badge: 'B1-B2',
  duration: '2.5 months',
  weeklyHours: '6 hours',
  prerequisites: 'Completion of Elementary Level or equivalent',
  description: 'Build upon your foundation with more complex language structures and vocabulary.',
  outcomes: [
    'Can understand the main ideas of complex texts',
    'Can interact with a degree of fluency and spontaneity',
    'Can produce clear, detailed text on a wide range of subjects'
  ]
}

export const exampleProgramFeature: {
  icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book'
  title: string
  description: string
} = {
  icon: 'academic',
  title: 'Expert Teachers',
  description: 'Learn from qualified and experienced language teachers who are passionate about student success.'
}

export const exampleCourseMaterial = {
  title: 'Complete Language Package',
  description: 'Comprehensive textbook with audio materials and online resources.',
  image: '/images/course-materials/textbook-sample.jpg',
  level: 'All Levels'
}

export const programIcons = [
  { value: 'academic', label: 'Academic Cap', description: 'Best for educational features' },
  { value: 'users', label: 'Users Group', description: 'Best for community/group features' },
  { value: 'chat', label: 'Chat Bubble', description: 'Best for communication features' },
  { value: 'puzzle', label: 'Puzzle Piece', description: 'Best for learning methodology' },
  { value: 'globe', label: 'Globe', description: 'Best for international/language features' },
  { value: 'clock', label: 'Clock', description: 'Best for schedule/duration features' },
  { value: 'book', label: 'Book', description: 'Best for study materials' }
] 