import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// データベース型定義
export type Database = {
  public: {
    Tables: {
      manuals: {
        Row: {
          id: number
          category: string
          content: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: number
          category: string
          content: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: number
          category?: string
          content?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      chat_logs: {
        Row: {
          id: number
          question: string
          answer: string
          feedback: string | null
          created_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          feedback?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          feedback?: string | null
          created_at?: string
        }
      }
    }
  }
}