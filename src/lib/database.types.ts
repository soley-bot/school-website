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