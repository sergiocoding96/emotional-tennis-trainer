import type { EmotionType, DebriefSession, DebriefAnalysis, DebriefSummary } from '../../../types/database'

// Chat message for UI rendering (includes local-only states)
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  referencedEmotion?: EmotionType
  timestamp: Date
  isStreaming?: boolean
  isError?: boolean
}

// Session state for the debrief flow
export type DebriefStage = 'input' | 'analyzing' | 'chat' | 'summary'

export interface DebriefState {
  stage: DebriefStage
  session: DebriefSession | null
  messages: ChatMessage[]
  analysis: DebriefAnalysis | null
  summary: DebriefSummary | null
  isLoading: boolean
  error: string | null
}

// Input form data
export interface MatchInputData {
  matchDescription: string
  opponent?: string
  matchDate?: string
  score?: string
}

// API request/response types
export interface AnalyzeRequest {
  matchDescription: string
  userTriggers: string[]  // From user's scenarios
}

export interface AnalyzeResponse {
  analysis: DebriefAnalysis
  openingMessage: string
}

export interface ChatRequest {
  sessionId: string
  message: string
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

export interface ChatResponse {
  message: string
  referencedEmotion?: EmotionType
  suggestedReframe?: {
    original: string
    reframed: string
  }
}

export interface SummaryRequest {
  sessionId: string
}

export interface SummaryResponse {
  summary: DebriefSummary
}

// Emotion profile for display (shared with other features)
export interface EmotionProfile {
  name: string
  icon: string
  color: string
  gradient: string
  arousal: number
  timeline: string
  ego: string
  danger: string
  description: string
}

// Emotion profiles data
export const EMOTION_PROFILES: Record<EmotionType, EmotionProfile> = {
  disappointment: {
    name: 'Disappointment',
    icon: '\u{1F61E}',
    color: 'slate',
    gradient: 'from-slate-500 to-slate-600',
    arousal: 3,
    timeline: 'Past',
    ego: 'Ego-Threatened',
    danger: 'Critical',
    description: 'Low energy withdrawal from challenge'
  },
  frustration: {
    name: 'Frustration',
    icon: '\u{1F624}',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    arousal: 6,
    timeline: 'Past/Present',
    ego: 'Task \u2192 Ego-Pressured',
    danger: 'Moderate',
    description: 'Productive tension seeking solution'
  },
  anger: {
    name: 'Anger',
    icon: '\u{1F620}',
    color: 'rose',
    gradient: 'from-rose-500 to-red-500',
    arousal: 8,
    timeline: 'Past/Present',
    ego: 'Ego-Defensive',
    danger: 'High',
    description: 'Explosive reaction to perceived injustice'
  },
  anxiety: {
    name: 'Anxiety',
    icon: '\u{1F630}',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    arousal: 7,
    timeline: 'Future',
    ego: 'Ego-Pressured',
    danger: 'High',
    description: 'Anticipatory fear of failure'
  },
  calmness: {
    name: 'Calmness',
    icon: '\u{1F60C}',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    arousal: 4,
    timeline: 'Present',
    ego: 'Task-Focused',
    danger: 'Low',
    description: 'Centered presence and clarity'
  },
  excitement: {
    name: 'Excitement',
    icon: '\u{1F604}',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500',
    arousal: 7,
    timeline: 'Present/Future',
    ego: 'Task-Focused',
    danger: 'Low',
    description: 'Energized engagement with challenge'
  }
}
