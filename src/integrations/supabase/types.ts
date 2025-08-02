export type Json = | string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dj_events: {
        Row: {
          created_at: string
          dj_id: string
          event_address: string | null
          event_name: string
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          created_at?: string
          dj_id: string
          event_address?: string | null
          event_name: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          created_at?: string
          dj_id?: string
          event_address?: string | null
          event_name?: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dj_events_dj_id_fkey"
            columns: ["dj_id"]
            referencedRelation: "dj_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      dj_profiles: {
        Row: {
          active: boolean
          average_rating: number
          bio: string | null
          created_at: string
          id: string
          location_address: string | null
          latitude: number | null
          longitude: number | null
          minimum_tip: number
          qr_code_url: string | null
          stage_name: string
          stripe_account_id: string | null
          total_earnings: number
          total_requests: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean
          average_rating?: number
          bio?: string | null
          created_at?: string
          id: string
          location_address?: string | null
          latitude?: number | null
          longitude?: number | null
          minimum_tip?: number
          qr_code_url?: string | null
          stage_name: string
          stripe_account_id?: string | null
          total_earnings?: number
          total_requests?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean
          average_rating?: number
          bio?: string | null
          created_at?: string
          id?: string
          location_address?: string | null
          latitude?: number | null
          longitude?: number | null
          minimum_tip?: number
          qr_code_url?: string | null
          stage_name?: string
          stripe_account_id?: string | null
          total_earnings?: number
          total_requests?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dj_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      music_requests: {
        Row: {
          artist_name: string | null
          client_email: string | null
          client_name: string | null
          created_at: string
          dj_id: string
          event_id: string
          id: string
          message: string | null
          payment_status: string
          song_title: string
          status: string
          tip_amount: number
        }
        Insert: {
          artist_name?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          dj_id: string
          event_id: string
          id?: string
          message?: string | null
          payment_status?: string
          song_title: string
          status?: string
          tip_amount: number
        }
        Update: {
          artist_name?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          dj_id?: string
          event_id?: string
          id?: string
          message?: string | null
          payment_status?: string
          song_title?: string
          status?: string
          tip_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "music_requests_dj_id_fkey"
            columns: ["dj_id"]
            referencedRelation: "dj_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_requests_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "dj_events"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
