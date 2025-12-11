import { useState, useCallback } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useScenarios } from '../../../hooks/useScenarios'
import type { DebriefAnalysis, DebriefSummary } from '../../../types/database'
import type { ChatMessage, DebriefStage, MatchInputData } from '../types/debrief'

interface UseDebriefChatReturn {
  // State
  stage: DebriefStage
  sessionId: string | null
  messages: ChatMessage[]
  analysis: DebriefAnalysis | null
  summary: DebriefSummary | null
  isLoading: boolean
  error: string | null

  // Actions
  startSession: (input: MatchInputData) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  endSession: () => Promise<void>
  resetSession: () => void
}

export function useDebriefChat(): UseDebriefChatReturn {
  const { user, session } = useAuth()
  const { scenarios } = useScenarios()

  const [stage, setStage] = useState<DebriefStage>('input')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [analysis, setAnalysis] = useState<DebriefAnalysis | null>(null)
  const [summary, setSummary] = useState<DebriefSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get auth token for edge functions
  const getAuthHeaders = useCallback(() => {
    if (!session?.access_token) {
      throw new Error('Not authenticated')
    }
    return {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    }
  }, [session])

  // Extract user's triggers from scenarios for context
  const getUserTriggers = useCallback((): string[] => {
    const triggers: string[] = []
    Object.values(scenarios).forEach(scenarioList => {
      scenarioList.forEach(scenario => {
        triggers.push(scenario.trigger)
      })
    })
    return triggers
  }, [scenarios])

  // Start a new debrief session
  const startSession = useCallback(async (input: MatchInputData) => {
    if (!user) {
      setError('Please sign in to start a debrief session')
      return
    }

    setIsLoading(true)
    setError(null)
    setStage('analyzing')

    try {
      const headers = getAuthHeaders()
      const userTriggers = getUserTriggers()

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/debrief-analyze`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            matchDescription: input.matchDescription,
            userTriggers,
            matchDate: input.matchDate,
            opponent: input.opponent,
            score: input.score
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze match')
      }

      const data = await response.json()

      setSessionId(data.sessionId)
      setAnalysis(data.analysis)

      // Add the opening message
      const openingMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.openingMessage,
        referencedEmotion: data.analysis.emotions_detected[0]?.emotion,
        timestamp: new Date()
      }
      setMessages([openingMessage])
      setStage('chat')

    } catch (err) {
      console.error('Failed to start session:', err)
      setError(err instanceof Error ? err.message : 'Failed to start session')
      setStage('input')
    } finally {
      setIsLoading(false)
    }
  }, [user, getAuthHeaders, getUserTriggers])

  // Send a message in the chat
  const sendMessage = useCallback(async (message: string) => {
    if (!sessionId || !user) {
      setError('No active session')
      return
    }

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Add a placeholder for the assistant's response
    const assistantPlaceholder: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    }
    setMessages(prev => [...prev, assistantPlaceholder])

    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/debrief-chat`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            sessionId,
            message
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      const data = await response.json()

      // Replace the placeholder with the actual response
      setMessages(prev => {
        const newMessages = [...prev]
        const lastIndex = newMessages.length - 1
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          content: data.message,
          referencedEmotion: data.referencedEmotion,
          isStreaming: false
        }
        return newMessages
      })

    } catch (err) {
      console.error('Failed to send message:', err)
      // Mark the last message as an error
      setMessages(prev => {
        const newMessages = [...prev]
        const lastIndex = newMessages.length - 1
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          content: 'Sorry, I had trouble responding. Please try again.',
          isStreaming: false,
          isError: true
        }
        return newMessages
      })
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, user, getAuthHeaders])

  // End the session and get summary
  const endSession = useCallback(async () => {
    if (!sessionId || !user) {
      setError('No active session')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/debrief-summary`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ sessionId })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate summary')
      }

      const data = await response.json()
      setSummary(data.summary)
      setStage('summary')

    } catch (err) {
      console.error('Failed to end session:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate summary')
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, user, getAuthHeaders])

  // Reset everything for a new session
  const resetSession = useCallback(() => {
    setStage('input')
    setSessionId(null)
    setMessages([])
    setAnalysis(null)
    setSummary(null)
    setIsLoading(false)
    setError(null)
  }, [])

  return {
    stage,
    sessionId,
    messages,
    analysis,
    summary,
    isLoading,
    error,
    startSession,
    sendMessage,
    endSession,
    resetSession
  }
}
