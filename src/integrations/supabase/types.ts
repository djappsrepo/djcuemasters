export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      "balance pay": {
        Row: {
          amount: number | null;
          attrs: Json | null;
          balance_type: string | null;
          currency: string | null;
        };
        Insert: {
          amount?: number | null;
          attrs?: Json | null;
          balance_type?: string | null;
          currency?: string | null;
        };
        Update: {
          amount?: number | null;
          attrs?: Json | null;
          balance_type?: string | null;
          currency?: string | null;
        };
        Relationships: [];
      };
      dj_events: {
        Row: {
          created_at: string;
          description: string | null;
          dj_id: string;
          event_address: string | null;
          event_date: string | null;
          id: string;
          is_active: boolean;
          latitude: number | null;
          longitude: number | null;
          name: string;
          total_earnings: number;
          total_requests: number;
          updated_at: string;
          venue: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          dj_id: string;
          event_address?: string | null;
          event_date?: string | null;
          id?: string;
          is_active?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          total_earnings?: number;
          total_requests?: number;
          updated_at?: string;
          venue?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          dj_id?: string;
          event_address?: string | null;
          event_date?: string | null;
          id?: string;
          is_active?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          total_earnings?: number;
          total_requests?: number;
          updated_at?: string;
          venue?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "dj_events_dj_id_fkey";
            columns: ["dj_id"];
            isOneToOne: false;
            referencedRelation: "dj_profiles";
            referencedColumns: ["user_id"];
          }
        ];
      };
      dj_profiles: {
        Row: {
          active: boolean;
          average_rating: number | null;
          bio: string | null;
          created_at: string;
          id: string;
          latitude: number | null;
          location_address: string | null;
          longitude: number | null;
          minimum_tip: number;
          qr_code_url: string | null;
          stage_name: string;
          stripe_account_id: string | null;
          total_earnings: number;
          total_requests: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          active?: boolean;
          average_rating?: number | null;
          bio?: string | null;
          created_at?: string;
          id?: string;
          latitude?: number | null;
          location_address?: string | null;
          longitude?: number | null;
          minimum_tip?: number;
          qr_code_url?: string | null;
          stage_name: string;
          stripe_account_id?: string | null;
          total_earnings?: number;
          total_requests?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          active?: boolean;
          average_rating?: number | null;
          bio?: string | null;
          created_at?: string;
          id?: string;
          latitude?: number | null;
          location_address?: string | null;
          longitude?: number | null;
          minimum_tip?: number;
          qr_code_url?: string | null;
          stage_name?: string;
          stripe_account_id?: string | null;
          total_earnings?: number;
          total_requests?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
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
          id?: never;
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
          end_date: string | null;
          id: string;
          start_date: string | null;
          status: string;
          type: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string;
          type?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      music_requests: {
        Row: {
          artist_name: string;
          client_email: string | null;
          client_name: string;
          created_at: string;
          dj_id: string;
          event_id: string | null;
          id: string;
          message: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
          played_at: string | null;
          song_title: string;
          status: Database["public"]["Enums"]["request_status"];
          stripe_payment_intent_id: string | null;
          tip_amount: number;
          updated_at: string;
        };
        Insert: {
          artist_name: string;
          client_email?: string | null;
          client_name: string;
          created_at?: string;
          dj_id: string;
          event_id?: string | null;
          id?: string;
          message?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          played_at?: string | null;
          song_title: string;
          status?: Database["public"]["Enums"]["request_status"];
          stripe_payment_intent_id?: string | null;
          tip_amount?: number;
          updated_at?: string;
        };
        Update: {
          artist_name?: string;
          client_email?: string | null;
          client_name?: string;
          created_at?: string;
          dj_id?: string;
          event_id?: string | null;
          id?: string;
          message?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          played_at?: string | null;
          song_title?: string;
          status?: Database["public"]["Enums"]["request_status"];
          stripe_payment_intent_id?: string | null;
          tip_amount?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "music_requests_dj_id_fkey";
            columns: ["dj_id"];
            isOneToOne: false;
            referencedRelation: "dj_profiles";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "music_requests_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "dj_events";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          dj_id: string;
          id: string;
          net_amount: number | null;
          request_id: string;
          status: Database["public"]["Enums"]["payment_status"];
          stripe_fee: number | null;
          stripe_payment_intent_id: string;
          updated_at: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          dj_id: string;
          id?: string;
          net_amount?: number | null;
          request_id: string;
          status?: Database["public"]["Enums"]["payment_status"];
          stripe_fee?: number | null;
          stripe_payment_intent_id: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          dj_id?: string;
          id?: string;
          net_amount?: number | null;
          request_id?: string;
          status?: Database["public"]["Enums"]["payment_status"];
          stripe_fee?: number | null;
          stripe_payment_intent_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_dj_id_fkey";
            columns: ["dj_id"];
            isOneToOne: false;
            referencedRelation: "dj_profiles";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "payments_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "music_requests";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      site_config: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          last_modified_by: string | null;
          value: boolean;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          last_modified_by?: string | null;
          value?: boolean;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          last_modified_by?: string | null;
          value?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      dj_rankings: {
        Row: {
          dj_id: string | null;
          dj_name: string | null;
          total_donations: number | null;
          premio: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_user_role: {
        Args: { user_uuid: string };
        Returns: Database["public"]["Enums"]["app_role"];
      };
      is_admin: {
        Args: { user_uuid: string };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "dj" | "client";
      payment_status: "pending" | "succeeded" | "failed" | "canceled";
      request_status: "pending" | "accepted" | "rejected" | "played";
    };
    CompositeTypes: Record<string, never>;
  };
};
