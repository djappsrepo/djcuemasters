export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      balance_events: {
        Row: {
          amount: number;
          created_at: string;
          dj_profile_id: string;
          id: string;
          type: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          dj_profile_id: string;
          id?: string;
          type: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          dj_profile_id?: string;
          id?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "balance_events_dj_profile_id_fkey";
            columns: ["dj_profile_id"];
            referencedRelation: "dj_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      dj_profiles: {
        Row: {
          artistic_name: string | null;
          balance: number;
          biography: string | null;
          created_at: string;
          id: string;
          music_genres: string[] | null;
          profile_id: string;
          social_links: Json | null;
        };
        Insert: {
          artistic_name?: string | null;
          balance?: number;
          biography?: string | null;
          created_at?: string;
          id?: string;
          music_genres?: string[] | null;
          profile_id: string;
          social_links?: Json | null;
        };
        Update: {
          artistic_name?: string | null;
          balance?: number;
          biography?: string | null;
          created_at?: string;
          id?: string;
          music_genres?: string[] | null;
          profile_id?: string;
          social_links?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "dj_profiles_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      donations: {
        Row: {
          id: number;
          created_at: string;
          dj_id: string;
          donador_id: string;
          monto: number;
          stripe_payment_id: string;
        };
        Insert: {
          id?: never; // Let the database generate it
          created_at?: string;
          dj_id: string;
          donador_id: string;
          monto: number;
          stripe_payment_id: string;
        };
        Update: {
          id?: never;
          created_at?: string;
          dj_id?: string;
          donador_id?: string;
          monto?: number;
          stripe_payment_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "donations_dj_id_fkey";
            columns: ["dj_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "donations_donador_id_fkey";
            columns: ["donador_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      memberships: {
        Row: {
          created_at: string;
          dj_id: string;
          end_date: string | null;
          id: string;
          start_date: string | null;
          status: string | null;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          dj_id: string;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string | null;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          dj_id?: string;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "memberships_dj_id_fkey";
            columns: ["dj_id"];
            referencedRelation: "dj_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      music_requests: {
        Row: {
          amount: number | null;
          created_at: string;
          dj_id: string;
          id: string;
          request_text: string;
          requester_id: string;
          status: string;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          dj_id: string;
          id?: string;
          request_text: string;
          requester_id: string;
          status?: string;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          dj_id?: string;
          id?: string;
          request_text?: string;
          requester_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "music_requests_dj_id_fkey";
            columns: ["dj_id"];
            referencedRelation: "dj_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "music_requests_requester_id_fkey";
            columns: ["requester_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          id: string;
          status: string;
          stripe_payment_intent_id: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          id?: string;
          status: string;
          stripe_payment_intent_id: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          status?: string;
          stripe_payment_intent_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          role: string | null;
          updated_at: string | null;
          user_id: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          role?: string | null;
          updated_at?: string | null;
          user_id: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          role?: string | null;
          updated_at?: string | null;
          user_id?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      site_config: {
        Row: {
          id: number;
          pricing_visible: boolean;
        };
        Insert: {
          id?: number;
          pricing_visible?: boolean;
        };
        Update: {
          id?: number;
          pricing_visible?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      dj_rankings: {
        Row: {
          dj_id: string | null;
          dj_name: string | null;
          premio: string | null;
          total_donations: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["dj_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      get_user_role: {
        Args: {
          p_user_id: string;
        };
        Returns: string;
      };
      is_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      set_user_role: {
        Args: {
          user_id: string;
          role_name: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};