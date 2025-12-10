export type EmotionType =
  | 'disappointment'
  | 'frustration'
  | 'anger'
  | 'anxiety'
  | 'calmness'
  | 'excitement'

export interface UserProfile {
  id: string
  display_name: string | null
  skill_level: string | null
  created_at: string
  updated_at: string
}

export interface Routine {
  id: string
  user_id: string
  emotion: EmotionType
  name: string
  steps: string[]
  created_at: string
  updated_at: string
}

export interface Scenario {
  id: string
  user_id: string
  trigger: string
  feeling: string
  emotion: EmotionType
  target_emotion: EmotionType | null
  created_at: string
  updated_at: string
}

export interface RoutineLog {
  id: string
  user_id: string
  routine_id: string
  scenario_id: string | null
  executed_at: string
  effectiveness_rating: number | null
  notes: string | null
}

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
      }
      routines: {
        Row: Routine
        Insert: Omit<Routine, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Routine, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      scenarios: {
        Row: Scenario
        Insert: Omit<Scenario, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Scenario, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      routine_logs: {
        Row: RoutineLog
        Insert: Omit<RoutineLog, 'id' | 'executed_at'>
        Update: Partial<Omit<RoutineLog, 'id' | 'user_id' | 'executed_at'>>
      }
    }
    Enums: {
      emotion_type: EmotionType
    }
  }
}
