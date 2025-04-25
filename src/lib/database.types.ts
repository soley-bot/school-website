export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hero_content: {
        Row: {
          id: string
          tag: string
          title: string
          description: string
          primary_button_text: string
          primary_button_link: string
          secondary_button_text: string
          secondary_button_link: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tag: string
          title: string
          description: string
          primary_button_text: string
          primary_button_link: string
          secondary_button_text: string
          secondary_button_link: string
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tag?: string
          title?: string
          description?: string
          primary_button_text?: string
          primary_button_link?: string
          secondary_button_text?: string
          secondary_button_link?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string
          tag: string
          price: number
          features: string[]
          button_text: string
          button_link: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          tag: string
          price: number
          features: string[]
          button_text: string
          button_link: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          tag?: string
          price?: number
          features?: string[]
          button_text?: string
          button_link?: string
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: number
          title: string
          content: string
          excerpt: string
          category: string
          published_at: string
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          excerpt: string
          category: string
          published_at?: string
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          excerpt?: string
          category?: string
          published_at?: string
          created_at?: string
        }
      }
      staff: {
        Row: {
          id: number
          name: string
          position: string
          department: string
          bio: string | null
          email: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          position: string
          department: string
          bio?: string | null
          email: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          position?: string
          department?: string
          bio?: string | null
          email?: string
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: number
          first_name: string
          last_name: string
          email: string
          message: string
          created_at: string
          status: 'pending' | 'reviewed' | 'responded'
        }
        Insert: {
          id?: number
          first_name: string
          last_name: string
          email: string
          message: string
          created_at?: string
          status?: 'pending' | 'reviewed' | 'responded'
        }
        Update: {
          id?: number
          first_name?: string
          last_name?: string
          email?: string
          message?: string
          created_at?: string
          status?: 'pending' | 'reviewed' | 'responded'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 