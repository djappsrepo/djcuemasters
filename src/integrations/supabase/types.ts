export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      dj_events: {
        Row: {
          created_at: string
          description: string | null
          dj_id: string
          event_address: string | null
          event_date: string | null
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
          name: string
          total_earnings: number
          total_requests: number
          updated_at: string
          venue: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          dj_id: string
          event_address?: string | null
          event_date?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          total_earnings?: number
          total_requests?: number
          updated_at?: string
          venue?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          dj_id?: string
          event_address?: string | null
          event_date?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          total_earnings?: number
          total_requests?: number
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dj_events_dj_id_fkey"
            columns: ["dj_id"]
            isOneToOne: false
            referencedRelation: "dj_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      dj_profiles: {
        Row: {
          active: boolean
          average_rating: number | null
          bio: string | null
          created_at: string
          id: string
          latitude: number | null
          location_address: string | null
          longitude: number | null
          minimum_tip: number
          qr_code_url: string | null
          stage_name: string
          stripe_account_id: string | null
          total_earnings: number
          total_requests: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          minimum_tip?: number
          qr_code_url?: string | null
          stage_name: string
          stripe_account_id?: string | null
          total_earnings?: number
          total_requests?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          minimum_tip?: number
          qr_code_url?: string | null
          stage_name?: string
          stripe_account_id?: string | null
          total_earnings?: number
          total_requests?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      music_requests: {
        Row: {
          artist_name: string
          client_email: string | null
          client_name: string
          created_at: string
          dj_id: string
          event_id: string | null
          id: string
          message: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          played_at: string | null
          song_title: string
          status: Database["public"]["Enums"]["request_status"]
          stripe_payment_intent_id: string | null
          tip_amount: number
          updated_at: string
        }
        Insert: {
          artist_name: string
          client_email?: string | null
          client_name: string
          created_at?: string
          dj_id: string
          event_id?: string | null
          id?: string
          message?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          played_at?: string | null
          song_title: string
          status?: Database["public"]["Enums"]["request_status"]
          stripe_payment_intent_id?: string | null
          tip_amount?: number
          updated_at?: string
        }
        Update: {
          artist_name?: string
          client_email?: string | null
          client_name?: string
          created_at?: string
          dj_id?: string
          event_id?: string | null
          id?: string
          message?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          played_at?: string | null
          song_title?: string
          status?: Database["public"]["Enums"]["request_status"]
          stripe_payment_intent_id?: string | null
          tip_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "music_requests_dj_id_fkey"
            columns: ["dj_id"]
            isOneToOne: false
            referencedRelation: "dj_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "music_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "dj_events"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          dj_id: string
          id: string
          net_amount: number | null
          request_id: string
          status: Database["public"]["Enums"]["payment_status"]
          stripe_fee: number | null
          stripe_payment_intent_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          dj_id: string
          id?: string
          net_amount?: number | null
          request_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_fee?: number | null
          stripe_payment_intent_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          dj_id?: string
          id?: string
          net_amount?: number | null
          request_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_fee?: number | null
          stripe_payment_intent_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_dj_id_fkey"
            columns: ["dj_id"]
            isOneToOne: false
            referencedRelation: "dj_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "music_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      is_dj: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      set_user_role: {
        Args: { user_email: string; new_role: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "dj" | "cliente" | "user"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      request_status: "pending" | "playing" | "played" | "rejected" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "dj", "cliente", "user"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      request_status: ["pending", "playing", "played", "rejected", "archived"],
    },
  },
} as const
