export interface ProgramLevel {
  title: string;
  badge: string;
  name: string;
  description: string;
  duration: string;
  weeklyHours: number;
  prerequisites: string;
  requirements: string;
  outcomes: string[];
}

export interface CourseMaterial {
  title: string;
  description: string;
}

export interface ProgramSchedule {
  days: string[];
  times: string[];
}

export interface ProgramConfig {
  name: string;
  description: string;
  introduction: string;
  schedule: ProgramSchedule;
  tuition: {
    amount: number;
    currency: string;
    period: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  courseMaterials: CourseMaterial[];
} 