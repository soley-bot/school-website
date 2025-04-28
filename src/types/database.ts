export interface Program {
  id: string;
  name: string;
  slug: string;
  type: 'english' | 'chinese' | 'ielts';
  description: string;
  theme: 'blue' | 'red';
  hero_image: string | File;
  features: ProgramFeature[];
  levels: ProgramLevel[];
  schedule: ProgramSchedule;
  tuition: ProgramTuition[];
  created_at: string;
  updated_at: string;
}

export interface ProgramContent {
  id: string;
  program_id: string;
  section: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export interface ProgramLevel {
  id: string;
  program_id: string;
  title: string;
  badge: string;
  duration: string;
  weekly_hours: string;
  prerequisites: string;
  description: string;
  outcomes: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramFeature {
  id: string;
  program_id: string;
  title: string;
  description: string;
  icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book' | 'trophy';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramSchedule {
  id: string;
  program_id: string;
  times: any;
  duration: any;
  created_at: string;
  updated_at: string;
}

export interface ProgramTuition {
  id: string;
  program_id: string;
  price: number;
  levels: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CourseMaterial {
  id: string;
  program_id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Schedule {
  times: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  duration: {
    weekday: {
      hours: number;
      minutes: number;
    };
    weekend: {
      hours: number;
      minutes: number;
    };
  };
}

export interface ProgramPage {
  id: string;
  name: string;
  slug: string;
  type: 'english' | 'chinese' | 'ielts';
  description: string;
  theme: 'blue' | 'red';
  hero_image: string | File;
  features: ProgramPageFeature[];
  levels: ProgramPageLevel[];
  schedule: ProgramPageSchedule;
  tuition: ProgramPageTuition[];
  created_at: string;
  updated_at: string;
}

export interface ProgramPageContent {
  id: string;
  program_id: string;
  section: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export interface ProgramPageLevel {
  id: string;
  program_id: string;
  title: string;
  badge: string;
  duration: string;
  weekly_hours: string;
  prerequisites: string;
  description: string;
  outcomes: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramPageFeature {
  id: string;
  program_id: string;
  title: string;
  description: string;
  icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book' | 'trophy';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramPageSchedule {
  id: string;
  program_id: string;
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
  created_at: string;
  updated_at: string;
}

export interface ProgramPageTuition {
  id: string;
  program_id: string;
  price: number;
  levels: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramPageMaterial {
  id: string;
  program_id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      programs: {
        Row: Program;
        Insert: Omit<Program, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Program, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_content: {
        Row: ProgramContent;
        Insert: Omit<ProgramContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramContent, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_levels: {
        Row: ProgramLevel;
        Insert: Omit<ProgramLevel, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramLevel, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_features: {
        Row: ProgramFeature;
        Insert: Omit<ProgramFeature, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramFeature, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_schedule: {
        Row: ProgramSchedule;
        Insert: Omit<ProgramSchedule, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramSchedule, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_tuition: {
        Row: ProgramTuition;
        Insert: Omit<ProgramTuition, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramTuition, 'id' | 'created_at' | 'updated_at'>>;
      };
      course_materials: {
        Row: CourseMaterial;
        Insert: Omit<CourseMaterial, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CourseMaterial, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages: {
        Row: ProgramPage;
        Insert: Omit<ProgramPage, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPage, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_content: {
        Row: ProgramPageContent;
        Insert: Omit<ProgramPageContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageContent, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_levels: {
        Row: ProgramPageLevel;
        Insert: Omit<ProgramPageLevel, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageLevel, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_features: {
        Row: ProgramPageFeature;
        Insert: Omit<ProgramPageFeature, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageFeature, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_schedule: {
        Row: ProgramPageSchedule;
        Insert: Omit<ProgramPageSchedule, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageSchedule, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_tuition: {
        Row: ProgramPageTuition;
        Insert: Omit<ProgramPageTuition, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageTuition, 'id' | 'created_at' | 'updated_at'>>;
      };
      program_pages_materials: {
        Row: ProgramPageMaterial;
        Insert: Omit<ProgramPageMaterial, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProgramPageMaterial, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
} 