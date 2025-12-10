import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { Scenario, EmotionType } from '../types/database'

interface UseScenariosReturn {
  scenarios: Record<EmotionType, Scenario[]>
  loading: boolean
  error: string | null
  addScenario: (
    emotion: EmotionType,
    trigger: string,
    feeling: string,
    targetEmotion?: EmotionType
  ) => Promise<void>
  deleteScenario: (scenarioId: string) => Promise<void>
  updateScenario: (
    scenarioId: string,
    updates: { trigger?: string; feeling?: string; targetEmotion?: EmotionType }
  ) => Promise<void>
  refreshScenarios: () => Promise<void>
}

export function useScenarios(): UseScenariosReturn {
  const { user } = useAuth()
  const [scenarios, setScenarios] = useState<Record<EmotionType, Scenario[]>>({
    disappointment: [],
    frustration: [],
    anger: [],
    anxiety: [],
    calmness: [],
    excitement: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchScenarios = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('scenarios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (fetchError) throw fetchError

      // Group scenarios by emotion
      const scenarioMap: Record<EmotionType, Scenario[]> = {
        disappointment: [],
        frustration: [],
        anger: [],
        anxiety: [],
        calmness: [],
        excitement: [],
      }

      data?.forEach((scenario) => {
        const emotion = scenario.emotion as EmotionType
        scenarioMap[emotion].push(scenario as Scenario)
      })

      setScenarios(scenarioMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch scenarios')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchScenarios()
  }, [fetchScenarios])

  const addScenario = async (
    emotion: EmotionType,
    trigger: string,
    feeling: string,
    targetEmotion?: EmotionType
  ) => {
    if (!user) {
      setError('Must be logged in to add scenarios')
      return
    }

    try {
      setError(null)
      const { error: insertError } = await supabase.from('scenarios').insert({
        user_id: user.id,
        emotion,
        trigger,
        feeling,
        target_emotion: targetEmotion || null,
      })

      if (insertError) throw insertError

      await fetchScenarios()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add scenario')
      throw err
    }
  }

  const deleteScenario = async (scenarioId: string) => {
    if (!user) {
      setError('Must be logged in to delete scenarios')
      return
    }

    try {
      setError(null)
      const { error: deleteError } = await supabase
        .from('scenarios')
        .delete()
        .eq('id', scenarioId)

      if (deleteError) throw deleteError

      await fetchScenarios()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete scenario')
      throw err
    }
  }

  const updateScenario = async (
    scenarioId: string,
    updates: { trigger?: string; feeling?: string; targetEmotion?: EmotionType }
  ) => {
    if (!user) {
      setError('Must be logged in to update scenarios')
      return
    }

    try {
      setError(null)
      const { error: updateError } = await supabase
        .from('scenarios')
        .update({
          ...(updates.trigger && { trigger: updates.trigger }),
          ...(updates.feeling && { feeling: updates.feeling }),
          ...(updates.targetEmotion && { target_emotion: updates.targetEmotion }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', scenarioId)

      if (updateError) throw updateError

      await fetchScenarios()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update scenario')
      throw err
    }
  }

  return {
    scenarios,
    loading,
    error,
    addScenario,
    deleteScenario,
    updateScenario,
    refreshScenarios: fetchScenarios,
  }
}
