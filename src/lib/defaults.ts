import { v4 as uuidv4 } from 'uuid'
import type { PageContent } from '@/types/content'

export const defaultContent: PageContent = {
  hero: {
    id: uuidv4(),
    tag: 'Classes Enrolling Now',
    title: 'Master Languages with Confidence',
    description: 'Join our expert-led English and Chinese programs designed to help you achieve fluency faster. Learn from native speakers in a supportive environment.',
    primary_button_text: 'Explore Courses',
    primary_button_link: '#programs',
    secondary_button_text: 'Free Trial Class',
    secondary_button_link: '#',
    image_url: '/images/classroom.jpg',
    created_at: new Date().toISOString()
  },
  stats: [
    {
      id: uuidv4(),
      name: 'Students Taught',
      stat: '1000+',
      icon: 'M12 14l9-5-9-5-9 5 9 5z',
      created_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'Success Rate',
      stat: '95%',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      created_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'Expert Teachers',
      stat: '20+',
      icon: 'M12 4.354a4 4 0 110 5.292V12H5.69a4 4 0 110-5.292V4.5a.5.5 0 01.5-.5h6.6a.5.5 0 01.5.5v2.146z',
      created_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'Years Experience',
      stat: '10',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      created_at: new Date().toISOString()
    }
  ],
  statsTitle: 'Our Numbers Speak for Themselves',
  programs: [
    {
      id: uuidv4(),
      name: 'General English Program',
      description: 'Comprehensive training covering speaking, listening, reading, and writing skills for everyday communication.',
      tag: 'Most Popular',
      price: 299,
      features: ['Native English teachers', 'Weekly tests', 'Modern study materials'],
      button_text: 'Learn More',
      button_link: '/academics/general-english',
      created_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'General Chinese Program',
      description: 'Master Mandarin Chinese with our structured curriculum designed for real-world applications.',
      tag: 'Comprehensive',
      price: 349,
      features: ['Native Chinese teachers', 'Character writing practice', 'Cultural immersion'],
      button_text: 'Learn More',
      button_link: '/academics/general-chinese',
      created_at: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'IELTS Preparation',
      description: 'Specialized program to help you achieve your target IELTS score with proven strategies and practice.',
      tag: 'Exam Prep',
      price: 399,
      features: ['Practice tests', 'One-on-one feedback', 'Score improvement guarantee'],
      button_text: 'Learn More',
      button_link: '/academics/ielts-preparation',
      created_at: new Date().toISOString()
    }
  ],
  whyChooseUs: {
    id: uuidv4(),
    title: 'Why Choose Us',
    description: 'Experience the difference with our proven teaching methods and dedicated instructors.',
    features: [
      {
        title: 'Expert Teachers',
        description: 'Learn from qualified native speakers with years of teaching experience.',
        icon: 'M12 14l9-5-9-5-9 5 9 5z'
      },
      {
        title: 'Modern Facilities',
        description: 'State-of-the-art classrooms equipped with the latest learning technology.',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      },
      {
        title: 'Proven Results',
        description: '95% of our students achieve their language learning goals within their target timeframe.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      }
    ],
    created_at: new Date().toISOString()
  },
  facilities: [
    {
      id: 1,
      title: 'Modern Classrooms',
      description: 'Spacious and well-equipped classrooms with interactive whiteboards and comfortable seating.',
      image_url: '/images/facilities/classroom.jpg'
    },
    {
      id: 2,
      title: 'Study Areas',
      description: 'Quiet study spaces for individual or group work with high-speed internet access.',
      image_url: '/images/facilities/study-area.jpg'
    }
  ],
  events: [
    {
      id: 1,
      title: 'Open House',
      description: 'Join us for a tour of our facilities and meet our teachers.',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      image_url: '/images/events/open-house.jpg'
    },
    {
      id: 2,
      title: 'Free Trial Class',
      description: 'Experience our teaching methods with a complimentary trial lesson.',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      image_url: '/images/events/trial-class.jpg'
    }
  ],
  termBanner: {
    id: 1,
    text: 'New term starting soon! Enroll now and get 10% off.',
    is_active: true,
    created_at: new Date().toISOString()
  },
  footer: {
    id: 1,
    about_text: 'STANFORD AMERICAN SCHOOL provides quality education with a focus on academic excellence and personal growth.',
    address_line1: '123 Education Street',
    address_line2: 'Bangkok, Thailand',
    phone: '(123) 456-7890',
    email: 'info@stanford.edu',
    copyright_text: 'STANFORD AMERICAN SCHOOL. All rights reserved.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
} 