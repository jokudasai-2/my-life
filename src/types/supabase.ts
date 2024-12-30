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
      plans: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          target: string
          priority: 'low' | 'medium' | 'high'
          status: 'not-started' | 'in-progress' | 'completed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          target: string
          priority?: 'low' | 'medium' | 'high'
          status?: 'not-started' | 'in-progress' | 'completed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          target?: string
          priority?: 'low' | 'medium' | 'high'
          status?: 'not-started' | 'in-progress' | 'completed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          plan_id: string
          title: string
          target_date: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          title: string
          target_date: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          title?: string
          target_date?: string
          completed?: boolean
          created_at?: string
        }
      }
    }
  }
}