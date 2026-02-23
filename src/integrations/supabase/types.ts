export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      kahoot_answers: {
        Row: {
          answer_time_ms: number
          created_at: string
          id: string
          is_correct: boolean
          player_id: string
          question_index: number
          room_id: string
          score: number
          selected_option: number | null
        }
        Insert: {
          answer_time_ms?: number
          created_at?: string
          id?: string
          is_correct?: boolean
          player_id: string
          question_index: number
          room_id: string
          score?: number
          selected_option?: number | null
        }
        Update: {
          answer_time_ms?: number
          created_at?: string
          id?: string
          is_correct?: boolean
          player_id?: string
          question_index?: number
          room_id?: string
          score?: number
          selected_option?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kahoot_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "kahoot_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kahoot_answers_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "kahoot_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      kahoot_players: {
        Row: {
          created_at: string
          id: string
          nickname: string
          room_id: string
          total_score: number
        }
        Insert: {
          created_at?: string
          id?: string
          nickname: string
          room_id: string
          total_score?: number
        }
        Update: {
          created_at?: string
          id?: string
          nickname?: string
          room_id?: string
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "kahoot_players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "kahoot_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      kahoot_rooms: {
        Row: {
          created_at: string
          current_question_index: number
          difficulty: Database["public"]["Enums"]["kahoot_difficulty"]
          host_id: string
          id: string
          pin: string
          question_count: number
          scheduled_at: string | null
          status: Database["public"]["Enums"]["kahoot_room_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_question_index?: number
          difficulty?: Database["public"]["Enums"]["kahoot_difficulty"]
          host_id: string
          id?: string
          pin: string
          question_count?: number
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["kahoot_room_status"]
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_question_index?: number
          difficulty?: Database["public"]["Enums"]["kahoot_difficulty"]
          host_id?: string
          id?: string
          pin?: string
          question_count?: number
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["kahoot_room_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kahoot_rooms_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      kahoot_difficulty: "temel" | "orta"
      kahoot_room_status: "waiting" | "playing" | "finished"
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
      kahoot_difficulty: ["temel", "orta"],
      kahoot_room_status: ["waiting", "playing", "finished"],
    },
  },
} as const
