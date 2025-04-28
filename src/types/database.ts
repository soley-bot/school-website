export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  theme: 'blue' | 'red';
  hero_image: string | File;
  features: ProgramFeature[];
  levels: ProgramLevel[];
  schedule: ProgramSchedule;
  tuition: ProgramTuition[];
  created_at: string;
  updated_at: string;
  introduction?: {
    image?: string;
  };
}

export interface ProgramContent {
  id: string;
  program_id: string;
  section: string;
  content: {
    text?: string;
    image?: string;
    whyChooseTitle?: string;
    whyChooseText?: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface ProgramLevel {
  id: string;
  program_id: string;
  title: string;
  badge: string;
  duration: string;
  weekly_hours: number;
  prerequisites: string;
  description: string;
  learning_outcomes: string[];
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramFeature {
  id: string;
  program_id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramSchedule {
  id: string;
  program_id: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface ProgramTuition {
  id: string;
  program_id: string;
  price: number;
  levels: string[];
  applicable_levels: number[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CourseMaterial {
  id: string;
  program_id: string;
  name: string;
  description: string;
  image_url?: string;
  created_at?: string;
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
    };
  };
} 