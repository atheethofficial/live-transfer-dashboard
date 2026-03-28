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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      calls: {
        Row: {
          attempt_num: number | null
          call_cost: number | null
          call_end: string | null
          call_id: string
          call_start: string | null
          call_window_bucket: string | null
          client: string | null
          contact_id: string
          created_at: string | null
          day_of_week: string | null
          did_number: string | null
          drop_off_stage: string | null
          duration_sec: number | null
          email: string | null
          ended_reason: string | null
          followup_day: number | null
          full_name: string | null
          hook_agent_engaged: boolean | null
          hook_outcome: string | null
          id: string
          intent_agent_engaged: boolean | null
          intent_level: string | null
          intent_outcome: string | null
          is_terminal: boolean | null
          key_objections: Json | null
          objection_agent_engaged: boolean | null
          objection_resolved: boolean | null
          outcome: string | null
          outcome_tag: string | null
          phone: string | null
          pipeline_stage: string | null
          prospect_interest: string | null
          recording_url: string | null
          sentiment: string | null
          squad_id: string | null
          status: string | null
          structured_data: Json | null
          success_eval: string | null
          success_eval_reason: string | null
          summary: string | null
          transcript: string | null
          transfer_agent_engaged: boolean | null
          transfer_attempted: boolean | null
          transfer_completed: boolean | null
          transfer_outcome: string | null
          transfer_target: string | null
          within_calling_hours: boolean | null
        }
        Insert: {
          attempt_num?: number | null
          call_cost?: number | null
          call_end?: string | null
          call_id: string
          call_start?: string | null
          call_window_bucket?: string | null
          client?: string | null
          contact_id: string
          created_at?: string | null
          day_of_week?: string | null
          did_number?: string | null
          drop_off_stage?: string | null
          duration_sec?: number | null
          email?: string | null
          ended_reason?: string | null
          followup_day?: number | null
          full_name?: string | null
          hook_agent_engaged?: boolean | null
          hook_outcome?: string | null
          id?: string
          intent_agent_engaged?: boolean | null
          intent_level?: string | null
          intent_outcome?: string | null
          is_terminal?: boolean | null
          key_objections?: Json | null
          objection_agent_engaged?: boolean | null
          objection_resolved?: boolean | null
          outcome?: string | null
          outcome_tag?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          prospect_interest?: string | null
          recording_url?: string | null
          sentiment?: string | null
          squad_id?: string | null
          status?: string | null
          structured_data?: Json | null
          success_eval?: string | null
          success_eval_reason?: string | null
          summary?: string | null
          transcript?: string | null
          transfer_agent_engaged?: boolean | null
          transfer_attempted?: boolean | null
          transfer_completed?: boolean | null
          transfer_outcome?: string | null
          transfer_target?: string | null
          within_calling_hours?: boolean | null
        }
        Update: {
          attempt_num?: number | null
          call_cost?: number | null
          call_end?: string | null
          call_id?: string
          call_start?: string | null
          call_window_bucket?: string | null
          client?: string | null
          contact_id?: string
          created_at?: string | null
          day_of_week?: string | null
          did_number?: string | null
          drop_off_stage?: string | null
          duration_sec?: number | null
          email?: string | null
          ended_reason?: string | null
          followup_day?: number | null
          full_name?: string | null
          hook_agent_engaged?: boolean | null
          hook_outcome?: string | null
          id?: string
          intent_agent_engaged?: boolean | null
          intent_level?: string | null
          intent_outcome?: string | null
          is_terminal?: boolean | null
          key_objections?: Json | null
          objection_agent_engaged?: boolean | null
          objection_resolved?: boolean | null
          outcome?: string | null
          outcome_tag?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          prospect_interest?: string | null
          recording_url?: string | null
          sentiment?: string | null
          squad_id?: string | null
          status?: string | null
          structured_data?: Json | null
          success_eval?: string | null
          success_eval_reason?: string | null
          summary?: string | null
          transcript?: string | null
          transfer_agent_engaged?: boolean | null
          transfer_attempted?: boolean | null
          transfer_completed?: boolean | null
          transfer_outcome?: string | null
          transfer_target?: string | null
          within_calling_hours?: boolean | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          client: string | null
          consent_source: string | null
          consent_status: string | null
          consent_timestamp: string | null
          contact_id: string
          created_at: string | null
          current_sequence_day: number | null
          current_status: string | null
          email: string | null
          first_call_date: string | null
          full_name: string | null
          id: string
          is_dnc: boolean | null
          is_on_hold: boolean | null
          last_call_attempt_num: number | null
          last_call_date: string | null
          last_call_outcome: string | null
          lead_created_at: string | null
          phone: string | null
          sequence_completed: boolean | null
          source: string | null
          total_answered: number | null
          total_calls: number | null
          updated_at: string | null
        }
        Insert: {
          client?: string | null
          consent_source?: string | null
          consent_status?: string | null
          consent_timestamp?: string | null
          contact_id: string
          created_at?: string | null
          current_sequence_day?: number | null
          current_status?: string | null
          email?: string | null
          first_call_date?: string | null
          full_name?: string | null
          id?: string
          is_dnc?: boolean | null
          is_on_hold?: boolean | null
          last_call_attempt_num?: number | null
          last_call_date?: string | null
          last_call_outcome?: string | null
          lead_created_at?: string | null
          phone?: string | null
          sequence_completed?: boolean | null
          source?: string | null
          total_answered?: number | null
          total_calls?: number | null
          updated_at?: string | null
        }
        Update: {
          client?: string | null
          consent_source?: string | null
          consent_status?: string | null
          consent_timestamp?: string | null
          contact_id?: string
          created_at?: string | null
          current_sequence_day?: number | null
          current_status?: string | null
          email?: string | null
          first_call_date?: string | null
          full_name?: string | null
          id?: string
          is_dnc?: boolean | null
          is_on_hold?: boolean | null
          last_call_attempt_num?: number | null
          last_call_date?: string | null
          last_call_outcome?: string | null
          lead_created_at?: string | null
          phone?: string | null
          sequence_completed?: boolean | null
          source?: string | null
          total_answered?: number | null
          total_calls?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      daily_metrics: {
        Row: {
          answered: number | null
          callback_requested: number | null
          client: string
          created_at: string | null
          date: string
          dids_flagged: number | null
          errors: number | null
          hook_engaged: number | null
          hook_rate: number | null
          hook_to_intent_rate: number | null
          id: string
          intent_engaged: number | null
          intent_to_transfer_rate: number | null
          no_answer: number | null
          not_interested: number | null
          not_interested_rate: number | null
          objection_engaged: number | null
          pickup_rate: number | null
          qualified: number | null
          stale_records_found: number | null
          total_dials: number | null
          transfer_completion_rate: number | null
          transfer_engaged: number | null
          transfer_rate: number | null
          transferred: number | null
          voicemails: number | null
          wrong_person: number | null
        }
        Insert: {
          answered?: number | null
          callback_requested?: number | null
          client: string
          created_at?: string | null
          date: string
          dids_flagged?: number | null
          errors?: number | null
          hook_engaged?: number | null
          hook_rate?: number | null
          hook_to_intent_rate?: number | null
          id?: string
          intent_engaged?: number | null
          intent_to_transfer_rate?: number | null
          no_answer?: number | null
          not_interested?: number | null
          not_interested_rate?: number | null
          objection_engaged?: number | null
          pickup_rate?: number | null
          qualified?: number | null
          stale_records_found?: number | null
          total_dials?: number | null
          transfer_completion_rate?: number | null
          transfer_engaged?: number | null
          transfer_rate?: number | null
          transferred?: number | null
          voicemails?: number | null
          wrong_person?: number | null
        }
        Update: {
          answered?: number | null
          callback_requested?: number | null
          client?: string
          created_at?: string | null
          date?: string
          dids_flagged?: number | null
          errors?: number | null
          hook_engaged?: number | null
          hook_rate?: number | null
          hook_to_intent_rate?: number | null
          id?: string
          intent_engaged?: number | null
          intent_to_transfer_rate?: number | null
          no_answer?: number | null
          not_interested?: number | null
          not_interested_rate?: number | null
          objection_engaged?: number | null
          pickup_rate?: number | null
          qualified?: number | null
          stale_records_found?: number | null
          total_dials?: number | null
          transfer_completion_rate?: number | null
          transfer_engaged?: number | null
          transfer_rate?: number | null
          transferred?: number | null
          voicemails?: number | null
          wrong_person?: number | null
        }
        Relationships: []
      }
      phone_numbers: {
        Row: {
          answered_today: number | null
          calls_last_7d: number | null
          calls_today: number | null
          client: string | null
          created_at: string | null
          did_number: string
          flagged_reason: string | null
          id: string
          last_flagged_date: string | null
          pickup_rate_last_7d: number | null
          pickup_rate_today: number | null
          spam_reports: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          answered_today?: number | null
          calls_last_7d?: number | null
          calls_today?: number | null
          client?: string | null
          created_at?: string | null
          did_number: string
          flagged_reason?: string | null
          id?: string
          last_flagged_date?: string | null
          pickup_rate_last_7d?: number | null
          pickup_rate_today?: number | null
          spam_reports?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          answered_today?: number | null
          calls_last_7d?: number | null
          calls_today?: number | null
          client?: string | null
          created_at?: string | null
          did_number?: string
          flagged_reason?: string | null
          id?: string
          last_flagged_date?: string | null
          pickup_rate_last_7d?: number | null
          pickup_rate_today?: number | null
          spam_reports?: number | null
          status?: string | null
          updated_at?: string | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
