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

// Debrief Session Types
export interface DebriefSession {
  id: string
  user_id: string
  match_date: string | null
  opponent: string | null
  score: string | null
  initial_input: string
  analysis: DebriefAnalysis | null
  summary: DebriefSummary | null
  created_at: string
  completed_at: string | null
}

export interface DebriefMessage {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  referenced_emotion: EmotionType | null
  created_at: string
}

export interface DebriefReframe {
  id: string
  session_id: string
  original_thought: string
  reframed_thought: string
  emotion: EmotionType | null
  created_at: string
}

// Analysis structure returned by AI
export interface DebriefAnalysis {
  emotions_detected: Array<{
    emotion: EmotionType
    confidence: number
    evidence: string
  }>
  key_moments: Array<{
    description: string
    emotion: EmotionType
    significance: 'high' | 'medium' | 'low'
  }>
  patterns: Array<{
    pattern: string
    type: 'attribution' | 'self_talk' | 'trigger' | 'other'
  }>
  matched_triggers: string[]
}

// Summary structure generated at end of session
export interface DebriefSummary {
  emotions_explored: EmotionType[]
  key_insights: string[]
  reframes_created: Array<{
    original: string
    reframed: string
  }>
  routines_to_practice: string[]
  focus_for_next_match: string
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
      debrief_sessions: {
        Row: DebriefSession
        Insert: Omit<DebriefSession, 'id' | 'created_at' | 'completed_at'>
        Update: Partial<Omit<DebriefSession, 'id' | 'user_id' | 'created_at'>>
      }
      debrief_messages: {
        Row: DebriefMessage
        Insert: Omit<DebriefMessage, 'id' | 'created_at'>
        Update: Partial<Omit<DebriefMessage, 'id' | 'session_id' | 'created_at'>>
      }
      debrief_reframes: {
        Row: DebriefReframe
        Insert: Omit<DebriefReframe, 'id' | 'created_at'>
        Update: Partial<Omit<DebriefReframe, 'id' | 'session_id' | 'created_at'>>
      }
    }
    Enums: {
      emotion_type: EmotionType
    }
  }
}
